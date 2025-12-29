import { generateLinks } from '@/lib/deep-links';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientRedirect from './client-redirect';

export const runtime = 'edge';

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
    // params.path is ['instagram.com', 'p', 'xyz']
    const pathStr = resolvedParams.path.join('/');

    // Reconstruct query string if any
    const searchParamsObj = new URLSearchParams();
    Object.entries(resolvedSearchParams).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => searchParamsObj.append(key, v));
        } else if (value !== undefined) {
            searchParamsObj.append(key, value);
        }
    });
    const queryString = searchParamsObj.toString();
    const fullUrlStr = queryString ? `${pathStr}?${queryString}` : pathStr;

    const data = generateLinks(fullUrlStr);

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
