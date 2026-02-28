import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
});

export async function getPosts() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage {
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      "excerpt": array::join(string::split((pt::text(body)), "")[0..120], "") + "..."
    }
  `);
}

export async function getLatestPost() {
  return client.fetch(`
    *[_type == "post"] | order(publishedAt desc)[0] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage {
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      "excerpt": array::join(string::split((pt::text(body)), "")[0..120], "") + "..."
    }
  `);
}


export async function getPostBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      mainImage {
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      body,
      relatedRace->{
        title,
        slug
      }
    }
  `,
    { slug }
  );
}

// Henter sesong-dokumenter
export async function getSeasonDocuments() {
  return client.fetch(`
    *[_type == "season"] | order(year desc) {
      _id,
      year,
      documents[] {
        title,
        "fileUrl": file.asset->url
      }
    }
  `);
}

// Henter alle løp sortert på sesong og dato
export async function getSeasons() {
  return client.fetch(`
    *[_type == "race"] | order(date desc) {
      _id,
      title,
      slug,
      season,
      date,
      endDate,
      raceCategory,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      track->{
        name,
        slug,
        logo { asset->{ url } },
        trackMap { asset->{ url } },
        thumbnail { asset->{ url } }
      }
    }
  `);
}

export async function getUpcomingRaces() {
  const today = new Date().toISOString().split('T')[0];
  return client.fetch(`
    {
      "racing": *[_type == "race" && raceCategory == "racing" && date >= $today] | order(date asc)[0] {
        _id, title, slug, date, raceCategory,
        links[] {
          title,
          url,
          "fileUrl": file.asset->url
        }
      },
      "rally": *[_type == "race" && raceCategory == "rally" && date >= $today] | order(date asc)[0] {
        _id, title, slug, date, raceCategory,
        links[] {
          title,
          url,
          "fileUrl": file.asset->url
        }
      }
    }
  `, { today }, { next: { revalidate: 3600 } }); // Cache for 1 hour to handle date changes
}

// Henter ALLE løp for inneværende år
export async function getCurrentYearRaces() {
  const currentYear = new Date().getFullYear();
  return client.fetch(`
    *[_type == "race" && season == $currentYear] | order(date asc) {
      _id,
      title,
      slug,
      date,
      endDate,
      raceCategory
    }
  `, { currentYear }, { next: { revalidate: 3600 } });
}

// Henter et spesifikt løp (inklusive galleri og referat) basert på slug
export async function getRaceBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "race" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      season,
      date,
      endDate,
      raceCategory,
      mainImage {
        asset->{
          _id,
          url
        }
      },
      track->{
        name,
        slug,
        logo { asset->{ url } },
        trackMap { asset->{ url } },
        thumbnail { asset->{ url } },
        mapsLink
      },
      report,
      links[] {
        title,
        url,
        "fileUrl": file.asset->url
      },
      gallery[] {
        asset->{
          _id,
          url
        },
        alt
      },
      relatedPosts[]->{
        title,
        slug
      }
    }
  `,
    { slug }
  );
}

export async function getDrivers() {
  return client.fetch(`
    *[_type == "driver"] | order(startNumber asc) {
      _id,
      name,
      slug,
      startNumber,
      carMake,
      profileImage
    }
  `);
}

export async function getDriverBySlug(slug: string) {
  return client.fetch(`
    *[_type == "driver" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      startNumber,
      carMake,
      carImage,
      debutYear,
      profileImage,
      bio
    }
  `,
    { slug }
  );
}

export async function getPresentationDrivers() {
  return client.fetch(`
    *[_type == "driver"] | order(startNumber asc) {
      _id,
      name,
      slug,
      startNumber,
      carMake,
      carImage,
      debutYear,
      profileImage,
      bio
    }
  `);
}
