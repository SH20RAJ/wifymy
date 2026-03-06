'use client';

import { useEffect, useState } from 'react';
import { LinkData } from '@/lib/deep-links';

export default function ClientRedirect({ data }: { data: LinkData }) {
    const [status, setStatus] = useState('Opening app...');

    useEffect(() => {
        // Attempt deep link
        if (data.deepLink) {
            window.location.href = data.deepLink;
        }

        // Fallback to web link
        const timer = setTimeout(() => {
            // If the user hasn't left the page (i.e. app didn't open), redirect to web
            // Note: Smart banners or certain browsers might block this if the deep link worked, 
            // but typically the page session pauses.
            setStatus('Redirecting to web...');
            window.location.href = data.webLink;
        }, 800); // 800ms delay per prompt

        return () => clearTimeout(timer);
    }, [data]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black p-4 text-center">
            <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                Opening {data.platform !== 'unknown' ? data.platform.charAt(0).toUpperCase() + data.platform.slice(1) : 'Link'}...
            </h1>
            <p className="text-sm text-gray-500 text-balance animate-pulse">{status}</p>

            <div className="mt-8">
                <a
                    href={data.webLink}
                    className="text-sm text-blue-600 hover:text-blue-500 underline decoration-blue-600/30 underline-offset-4"
                >
                    Click here if not redirected
                </a>
            </div>
        </div>
    );
}
