import { createClient } from '@sanity/client';


import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: '27g9u6ol', // Hardcoded from src/sanity/env.ts
    dataset: 'production',
    apiVersion: '2024-02-23',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
});

async function main() {
    console.log("Starter bytting av bildefiler...");

    // 1. Omgå uploade bildet på nytt, vi vet at "image-ba2894c0248ae27586c2fc6d28bcd9a6fc95c2a2-1920x1080-png" ble opprettet forrige kjøring.
    const newImageId = "image-ba2894c0248ae27586c2fc6d28bcd9a6fc95c2a2-1920x1080-png";

    // Hent alle races for å se hva hovedbildet originalt het
    const query = `*[_type == "race"] { 
        _id, 
        title, 
        mainImage { 
            asset->{ 
                originalFilename 
            } 
        } 
    }`;
    const allRaces = await client.fetch(query);

    let updatedCount = 0;

    for (const race of allRaces) {
        if (race.mainImage && race.mainImage.asset && race.mainImage.asset.originalFilename === 'B-Zero Racing Regulations.jpg') {
            console.log(`Oppdaterer bilde for løp: ${race.title}`);

            await client.patch(race._id)
                .set({
                    mainImage: {
                        _type: 'image',
                        asset: {
                            _type: "reference",
                            _ref: newImageId
                        }
                    }
                })
                .commit();

            updatedCount++;
        }
    }

    console.log(`Ferdig! Oppdaterte ${updatedCount} løp.`);
}

main().catch(console.error);
