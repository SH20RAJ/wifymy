import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://wify.my',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        // We do NOT list dynamic routes here as they are technically infinite utility pages
    ];
}
