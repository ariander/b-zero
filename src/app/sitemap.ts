import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

export const revalidate = 3600

async function getSitemapData() {
  const [posts, races, drivers] = await Promise.all([
    client.fetch<{ slug: string; publishedAt: string }[]>(`
      *[_type == "post"] { "slug": slug.current, publishedAt }
    `),
    client.fetch<{ slug: string; date: string }[]>(`
      *[_type == "race"] { "slug": slug.current, date }
    `),
    client.fetch<{ slug: string }[]>(`
      *[_type == "driver"] { "slug": slug.current }
    `),
  ])
  return { posts, races, drivers }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.bzero.no'
  const { posts, races, drivers } = await getSitemapData()

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/nyheter`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/sesonger`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/sjaforer`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/kom-i-gang`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/reglement`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/baerekraft`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/om-oss`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/leiebors`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/arskontrollorer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/nyheter/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const racePages: MetadataRoute.Sitemap = races.map((race) => ({
    url: `${base}/sesonger/${race.slug}`,
    lastModified: race.date ? new Date(race.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const driverPages: MetadataRoute.Sitemap = drivers.map((driver) => ({
    url: `${base}/sjaforer/${driver.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...staticPages, ...postPages, ...racePages, ...driverPages]
}
