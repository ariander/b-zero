import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';
import { Resend } from 'resend';
import { apiVersion, dataset, projectId } from '@/sanity/env';

// This client uses the token so it can write to Sanity
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Parse fields
    const title = formData.get('title') as string;
    const raceCategory = formData.get('raceCategory') as string || 'racing';
    const carInfo = formData.get('carInfo') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const availability = formData.get('availability') as string;
    const contactName = formData.get('contactName') as string;
    const contactEmail = formData.get('contactEmail') as string;
    const contactPhone = formData.get('contactPhone') as string;

    if (!title || !contactName || !contactEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Process images
    const imageAssets = [];
    for (const [key, value] of Array.from(formData.entries())) {
      if (key === 'images' && value instanceof File) {
        const buffer = await value.arrayBuffer();
        const asset = await client.assets.upload('image', Buffer.from(buffer), {
          filename: value.name,
          contentType: value.type,
        });
        
        imageAssets.push({
          _key: crypto.randomUUID(),
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        });
      }
    }

    // Create document in Sanity
    const doc = {
      _id: `drafts.rental-${crypto.randomUUID()}`,
      _type: 'rentalAd',
      title,
      slug: { _type: 'slug', current: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now() },
      raceCategory,
      carInfo,
      description: description ? [{
        _type: 'block',
        _key: crypto.randomUUID(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: crypto.randomUUID(),
            text: description,
            marks: [],
          },
        ],
      }] : undefined,
      price,
      availability,
      contactName,
      contactEmail,
      contactPhone,
      images: imageAssets.length > 0 ? imageAssets : undefined,
    };

    const createdDoc = await client.create(doc);

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'B-Zero Leiebørs <onboarding@resend.dev>', // Should be verified domain in prod
        to: [process.env.ADMIN_EMAIL],
        subject: `Ny utleieannonse: ${title}`,
        html: `
          <h1>Ny utleieannonse sendt inn</h1>
          <p><strong>Utleier:</strong> ${contactName} (${contactEmail})</p>
          <p><strong>Bil:</strong> ${title} / ${carInfo}</p>
          <p>En ny annonse er lagt inn og ligger klar som et <strong>utkast</strong> i Sanity.</p>
          <p>Logg inn i Sanity Studio for å se over og publisere annonsen.</p>
        `,
      });
    } else {
      console.warn("RESEND_API_KEY or ADMIN_EMAIL is missing. Notification not sent.");
    }

    return NextResponse.json({ success: true, docId: createdDoc._id });
  } catch (error) {
    console.error('Error creating rental ad:', error);
    return NextResponse.json({ error: 'Failed to create ad. Make sure SANITY_API_WRITE_TOKEN is set.' }, { status: 500 });
  }
}
