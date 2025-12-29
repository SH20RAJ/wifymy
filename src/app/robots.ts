import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'], // Protect API routes if any form in future
        },
        sitemap: 'https://wify.my/sitemap.xml',
    };
}
