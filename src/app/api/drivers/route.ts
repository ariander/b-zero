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

function escapeHtml(unsafe: string) {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // Check honeypot field
    const websiteUrl = formData.get('website_url');
    if (websiteUrl) {
      console.warn('Bot detected via honeypot');
      return NextResponse.json({ success: true, docId: 'fake-id' });
    }

    // Parse text fields
    const name = formData.get('name') as string;
    const teamName = formData.get('teamName') as string;
    const startNumber = formData.get('startNumber') as string;
    const debutYearString = formData.get('debutYear') as string;
    const debutYear = debutYearString ? parseInt(debutYearString, 10) : undefined;
    const carMake = formData.get('carMake') as string;
    const bio = formData.get('bio') as string;
    const contactEmail = formData.get('contactEmail') as string;

    if (!name || !carMake || !contactEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Helper to process an image field
    async function processImage(fieldName: string) {
      const file = formData.get(fieldName);
      if (file && file instanceof File) {
        if (!file.type.startsWith('image/')) {
          throw new Error('Kun bildefiler er tillatt.');
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Et eller flere bilder er over 5MB.');
        }
        const buffer = await file.arrayBuffer();
        const asset = await client.assets.upload('image', Buffer.from(buffer), {
          filename: file.name,
          contentType: file.type,
        });
        return {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        };
      }
      return undefined;
    }

    let profileImageRef, carImageRef;
    try {
      profileImageRef = await processImage('profileImage');
      carImageRef = await processImage('carImage');
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    // Create document in Sanity
    const doc = {
      _id: `drafts.driver-${crypto.randomUUID()}`,
      _type: 'driver',
      name,
      teamName,
      slug: { _type: 'slug', current: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now() },
      startNumber,
      debutYear,
      carMake,
      bio: bio ? [{
        _type: 'block',
        _key: crypto.randomUUID(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: crypto.randomUUID(),
            text: bio,
            marks: [],
          },
        ],
      }] : undefined,
      profileImage: profileImageRef,
      carImage: carImageRef,
    };

    const createdDoc = await client.create(doc);

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: 'B-Zero Sjåfører <onboarding@resend.dev>', // Should be verified domain in prod
        to: [process.env.ADMIN_EMAIL],
        subject: `Ny sjåfør registrert: ${escapeHtml(name)}`,
        html: `
          <h1>Ny sjåfør registrert</h1>
          <p><strong>Navn:</strong> ${escapeHtml(name)}</p>
          <p><strong>E-post:</strong> ${escapeHtml(contactEmail)}</p>
          <p><strong>Team:</strong> ${escapeHtml(teamName || 'Ingen team angitt')}</p>
          <p><strong>Bil:</strong> ${escapeHtml(carMake)}</p>
          <p>En ny sjåførprofil er lagt inn og ligger klar som et <strong>utkast</strong> i Sanity.</p>
          <p>Logg inn i Sanity Studio for å se over teksten og bildene før du publiserer profilen.</p>
        `,
      });
    } else {
      console.warn("RESEND_API_KEY or ADMIN_EMAIL is missing. Notification not sent.");
    }

    return NextResponse.json({ success: true, docId: createdDoc._id });
  } catch (error) {
    console.error('Error creating driver profile:', error);
    return NextResponse.json({ error: 'Failed to create driver profile. Make sure SANITY_API_WRITE_TOKEN is set.' }, { status: 500 });
  }
}
