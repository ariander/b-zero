import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '27g9u6ol',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

async function run() {
    try {
        const deleted = await client.delete({ query: '*[_type == "post"]' });
        console.log("Deleted old posts", deleted);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        console.error("Error deleting posts:", err.message);
    }
}
run();
