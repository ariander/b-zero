import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@sanity/block-tools';
import { JSDOM } from 'jsdom';
import { Schema } from '@sanity/schema';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Ensure we have a token
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
if (!token) {
    console.error("Missing SANITY_API_WRITE_TOKEN or SANITY_API_READ_TOKEN in .env.local");
    process.exit(1);
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '27g9u6ol',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: token,
    apiVersion: '2024-01-01',
    useCdn: false,
});

const defaultSchema = Schema.compile({
    name: 'myBlog',
    types: [
        {
            type: 'object',
            name: 'blogPost',
            fields: [
                {
                    title: 'Body',
                    name: 'body',
                    type: 'array',
                    of: [{ type: 'block' }, { type: 'image' }],
                },
            ],
        },
    ],
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockContentType = defaultSchema.get('blogPost').fields.find((field: any) => field.name === 'body').type

const MIGRATION_DIR = '/Users/arildandersen/Documents/bzeroracingcom/b-zero-racing-news-migration';

async function uploadImage(imagePath: string) {
    const fullPath = path.join(MIGRATION_DIR, imagePath);
    if (!fs.existsSync(fullPath)) {
        console.warn(`Image not found: ${fullPath}`);
        return null;
    }
    const buffer = fs.readFileSync(fullPath);
    const asset = await client.assets.upload('image', buffer, {
        filename: path.basename(fullPath),
    });
    return asset._id;
}

async function migrate() {
    const files = fs.readdirSync(MIGRATION_DIR).filter((f: string) => f.endsWith('.md'));

    for (const file of files) {
        console.log(`Processing ${file}...`);
        const filePath = path.join(MIGRATION_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Parse frontmatter
        const { data, content: markdownBody } = matter(content);

        const title = data.title || file.replace('.md', '');
        let date = data.date ? new Date(data.date).toISOString() : new Date().toISOString();

        // parse filename: YYYY-MM-DD_slug.md
        let slugStr = file.replace('.md', '');
        const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})_(.*)\.md$/);
        if (dateMatch) {
            if (!data.date) {
                date = new Date(dateMatch[1]).toISOString();
            }
            slugStr = dateMatch[2];
        }

        // Find images and upload them
        let processedMarkdown = markdownBody;
        const imgRegex = /!\[(.*?)\]\((images\/.*?)\)/g;
        let match;
        let firstImageId = null;

        while ((match = imgRegex.exec(markdownBody)) !== null) {
            const alt = match[1];
            const imgPath = match[2];
            console.log(`Uploading image: ${imgPath}`);
            try {
                const assetId = await uploadImage(imgPath);
                if (assetId) {
                    if (!firstImageId) firstImageId = assetId;
                    // Replace in markdown with a special img tag that block-tools can parse
                    processedMarkdown = processedMarkdown.replace(match[0], `<img src="${assetId}" alt="${alt}" data-sanity-asset="${assetId}" />`);
                }
            } catch (err) {
                console.error(`Error uploading image ${imgPath}:`, err);
            }
        }

        // Convert markdown to HTML
        const html = await marked.parse(processedMarkdown);

        // Convert HTML to Portable Text
        const blocks = htmlToBlocks(html, blockContentType, {
            parseHtml: (htmlContent: string) => new JSDOM(htmlContent).window.document,
            rules: [
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    deserialize(el: any, next: any, block: any) {
                        if (el.tagName && el.tagName.toLowerCase() === 'img') {
                            const assetId = el.getAttribute('data-sanity-asset');
                            if (assetId) {
                                return block({
                                    _type: 'image',
                                    asset: {
                                        _type: 'reference',
                                        _ref: assetId
                                    }
                                });
                            }
                        }
                        return undefined;
                    }
                }
            ]
        });

        // Create sanity document
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const doc: any = {
            _type: 'post',
            title: title,
            slug: {
                _type: 'slug',
                current: slugStr
            },
            publishedAt: date,
            body: blocks,
        };

        if (firstImageId) {
            doc.mainImage = {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: firstImageId
                }
            };
        }

        try {
            await client.create(doc);
            console.log(`Successfully created '${title}' (slug: ${slugStr})`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(`Failed to create ${slugStr}:`, error.message);
        }
    }
}

migrate().catch(console.error);
