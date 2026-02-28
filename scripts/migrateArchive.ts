import fs from 'fs';
import path from 'path';
import { createClient } from '@sanity/client';
import { htmlToBlocks } from '@sanity/block-tools';
import { JSDOM } from 'jsdom';
import { Schema } from '@sanity/schema';
import dotenv from 'dotenv';
import { marked } from 'marked';

dotenv.config({ path: '.env.local' });

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

const ARCHIVE_DIR = '/Users/arildandersen/Documents/B-Zero web/public/b-zero-racing-archive';
const FALLBACK_IMAGE_PATH = '/Users/arildandersen/Documents/B-Zero web/public/B-Zero Racing Regulations.jpg';

async function uploadFile(filePath: string, type: 'image' | 'file' = 'file') {
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${filePath}`);
        return null;
    }
    const buffer = fs.readFileSync(filePath);
    try {
        const asset = await client.assets.upload(type, buffer, {
            filename: path.basename(filePath),
        });
        return asset._id;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error(`Failed to upload ${filePath}:`, err.message);
        return null;
    }
}

function parseDate(dateStr: string) {
    // Expected format: DD/MM/YYYY or DD/MM/YYYY - DD/MM/YYYY
    const parts = dateStr.split('-');
    const firstDate = parts[0].trim();
    const [day, month, year] = firstDate.split('/');
    if (day && month && year) {
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return new Date().toISOString().split('T')[0];
}

async function migrate() {
    // 1. Ensure fallback image is uploaded
    console.log("Uploading fallback image...");
    const fallbackImageId = await uploadFile(FALLBACK_IMAGE_PATH, 'image');

    const years = fs.readdirSync(ARCHIVE_DIR).filter(f => /^\d{4}$/.test(f));

    for (const year of years) {
        const yearInt = parseInt(year, 10);
        const yearDir = path.join(ARCHIVE_DIR, year);
        console.log(`\n=== Processing Year: ${year} ===`);

        // Check for yearly documents (e.g. Poängtabell)
        const yearFiles = fs.readdirSync(yearDir).filter(f => f.toLowerCase().endsWith('.pdf'));
        const seasonDocs = [];

        for (const file of yearFiles) {
            console.log(`Uploading season document: ${file}`);
            const assetId = await uploadFile(path.join(yearDir, file), 'file');
            if (assetId) {
                seasonDocs.push({
                    _key: Math.random().toString(36).substring(7),
                    title: file.replace('.pdf', '').replace(/_/g, ' '),
                    file: {
                        _type: 'file',
                        asset: { _type: 'reference', _ref: assetId }
                    }
                });
            }
        }

        // Create Season Document
        const seasonId = `season-${year}`;
        const seasonDoc = {
            _id: seasonId,
            _type: 'season',
            year: yearInt,
            documents: seasonDocs.length > 0 ? seasonDocs : undefined
        };
        try {
            await client.createIfNotExists(seasonDoc);
            console.log(`Created/Ensured Season Document: ${year}`);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error(`Failed to create season ${year}:`, err.message);
        }

        // Process races for this year
        const raceDirs = fs.readdirSync(yearDir).filter(f => fs.statSync(path.join(yearDir, f)).isDirectory());

        for (const raceDir of raceDirs) {
            console.log(`\nProcessing race: ${raceDir}`);
            const racePath = path.join(yearDir, raceDir);
            const indexPath = path.join(racePath, 'index.md');

            let title = raceDir;
            let date = `${year}-06-01T12:00:00Z`;
            let description = '';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const links: any[] = [];

            if (fs.existsSync(indexPath)) {
                const mdContent = fs.readFileSync(indexPath, 'utf-8');

                // Extract Title
                const titleMatch = mdContent.match(/^# (.*?)$/m);
                if (titleMatch) title = titleMatch[1].trim();

                // Extract Date
                const dateMatch = mdContent.match(/\*\*Date:\*\*\s*(.+)$/m);
                if (dateMatch) date = parseDate(dateMatch[1]);

                // Extract Description (everything before the first ## or EOF)
                const descMatch = mdContent.match(/^([\s\S]*?)(?:^## |\Z)/m);
                if (descMatch) {
                    description = descMatch[1]
                        .replace(/^# .*$/m, '') // Remove title
                        .replace(/^\*\*.*?\*\*\s*.*?$/gm, '') // Remove metadata lines like **Venue:** ...
                        .trim();
                }

                // Extract external http/https links from markdown
                const linkRegex = /\[(.*?)\]\((http[s]?:\/\/.*?)\)/g;
                let linkMatch;
                while ((linkMatch = linkRegex.exec(mdContent)) !== null) {
                    links.push({
                        _key: Math.random().toString(36).substring(7),
                        title: linkMatch[1],
                        url: linkMatch[2]
                    });
                }
            }

            // Convert description to HTML and then Portable Text
            const html = await marked.parse(description);
            const blocks = htmlToBlocks(html, blockContentType, {
                parseHtml: (htmlContent: string) => new JSDOM(htmlContent).window.document
            });

            // Process docs directory
            const docsDir = path.join(racePath, 'docs');
            if (fs.existsSync(docsDir)) {
                const docsFiles = fs.readdirSync(docsDir).filter(f => !f.startsWith('.'));
                for (const docFile of docsFiles) {
                    const docPath = path.join(docsDir, docFile);
                    const isImg = /\.(jpg|jpeg|png|gif)$/i.test(docFile);
                    console.log(`Uploading doc: ${docFile}`);
                    const assetId = await uploadFile(docPath, isImg ? 'image' : 'file');
                    if (assetId) {
                        links.push({
                            _key: Math.random().toString(36).substring(7),
                            title: docFile.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
                            file: {
                                _type: 'file',
                                asset: { _type: 'reference', _ref: assetId }
                            }
                        });
                    }
                }
            }

            // Process gallery directory
            const galleryDir = path.join(racePath, 'gallery');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const galleryArray: any[] = [];
            let mainImageId = fallbackImageId;

            if (fs.existsSync(galleryDir)) {
                const galleryFiles = fs.readdirSync(galleryDir).filter(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
                for (let i = 0; i < galleryFiles.length; i++) {
                    const imgFile = galleryFiles[i];
                    console.log(`Uploading gallery image: ${imgFile}`);
                    const assetId = await uploadFile(path.join(galleryDir, imgFile), 'image');
                    if (assetId) {
                        const imgObj = {
                            _key: Math.random().toString(36).substring(7),
                            _type: 'image',
                            asset: { _type: 'reference', _ref: assetId }
                        };
                        galleryArray.push(imgObj);
                        if (i === 0) mainImageId = assetId; // Use first gallery image as mainImage
                    }
                }
            }

            // Create Race Document
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const raceDoc: any = {
                _id: `race-${raceDir}`,
                _type: 'race',
                title: title,
                slug: { _type: 'slug', current: raceDir },
                raceCategory: 'racing',
                season: yearInt,
                date: date,
                report: blocks.length > 0 ? blocks : undefined,
                links: links.length > 0 ? links : undefined,
                gallery: galleryArray.length > 0 ? galleryArray : undefined,
            };

            if (mainImageId) {
                raceDoc.mainImage = {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: mainImageId }
                };
            }

            try {
                await client.createIfNotExists(raceDoc);
                console.log(`Created Race: ${title}`);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
                console.error(`Failed to create race ${title}:`, err.message);
            }
        }
    }
}

migrate().then(() => {
    console.log("Migration complete!");
    process.exit(0);
}).catch(console.error);

