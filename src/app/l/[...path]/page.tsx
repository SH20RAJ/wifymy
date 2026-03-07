import { generateLinks } from '@/lib/deep-links';
import { headers } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import ClientRedirect from './client-redirect';
import { getCollection } from '@/lib/mongodb';
import { MongoDeeplink } from '@/app/actions/deeplinks';

// Force no caching for redirects to ensure User-Agent logic always runs
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return {
        title: 'Redirecting...',
        robots: {
            index: false,
            follow: false,
        },
    };
}

export default async function RedirectPage({
    params,
    searchParams,
}: {
    params: Promise<{ path: string[] }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    // Reconstruct the URL path + query
    // params.path is ['instagram.com', 'p', 'xyz'] or ['my-slug']
    const pathStr = resolvedParams.path.join('/');

    // PREVENT STATIC ASSETS FROM BEING REDIRECTED
    const ignoredExtensions = [
        '.ico', '.png', '.jpg', '.jpeg', '.svg', '.json', '.xml', '.txt', '.css', '.js', '.woff', '.woff2', '.ttf', '.eot'
    ];
    if (ignoredExtensions.some(ext => pathStr.toLowerCase().endsWith(ext))) {
        notFound();
    }

    // 1. Check if this is a managed deeplink slug
    const deeplinksCollection = await getCollection<MongoDeeplink>("deeplinks");
    const managedLink = await deeplinksCollection.findOne({ slug: pathStr.toLowerCase() });

    let finalUrl = pathStr;
    if (managedLink) {
        finalUrl = managedLink.destinationUrl;
    } else {
        // Reconstruct query string if any for zero-auth links
        const searchParamsObj = new URLSearchParams();
        Object.entries(resolvedSearchParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => searchParamsObj.append(key, v));
            } else if (value !== undefined) {
                searchParamsObj.append(key, value);
            }
        });
        const queryString = searchParamsObj.toString();
        finalUrl = queryString ? `${pathStr}?${queryString}` : pathStr;
    }

    const data = generateLinks(finalUrl);

    const headersList = await headers();
    const userAgent = headersList.get('user-agent') || '';
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);

    // If it's a desktop user, or we failed to simplify the link (unknown), 
    // or checks fail => Redirect directly to web to avoid "Opening..." screen on desktop.
    if (!isMobile || data.platform === 'unknown') {
        redirect(data.webLink);
    }

    // If Mobile, render client component to try deep link
    return <ClientRedirect data={data} />;
}
