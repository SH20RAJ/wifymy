'use client';

import { useEffect } from 'react';

export default function AnalyticsTracker({ pageId }: { pageId: string }) {
    useEffect(() => {
        const track = async () => {
            try {
                await fetch('/api/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pageId,
                        type: 'view',
                        timestamp: new Date().toISOString(),
                    }),
                });
            } catch (error) {
                console.error('Failed to track view:', error);
            }
        };

        track();
    }, [pageId]);

    return null;
}
