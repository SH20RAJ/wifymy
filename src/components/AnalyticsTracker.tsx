'use client';

import { useEffect, useRef } from 'react';

export function AnalyticsTracker({ pageId }: { pageId: string }) {
    const tracked = useRef(false);

    useEffect(() => {
        if (!tracked.current) {
            tracked.current = true;
            
            // Simple device detection
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const deviceType = isMobile ? 'Mobile' : 'Desktop';

            fetch('/api/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    pageId,
                    type: 'VIEW',
                    deviceType
                })
            }).catch(e => console.error("Failed to track view", e));
        }
    }, [pageId]);

    return null; // Invisible tracker
}
