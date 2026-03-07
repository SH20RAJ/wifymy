'use client';

import { ReactNode } from 'react';

export function TrackedLink({ 
    href, 
    deepLink,
    pageId, 
    linkId, 
    className, 
    style, 
    children 
}: { 
    href: string, 
    deepLink?: string,
    pageId: string, 
    linkId: string, 
    className?: string, 
    style?: React.CSSProperties,
    children: ReactNode
}) {
    const handleClick = (e: React.MouseEvent) => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Track the click
        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pageId,
                linkId,
                type: 'CLICK',
                deviceType: isMobile ? 'Mobile' : 'Desktop'
            }),
            keepalive: true
        }).catch(e => console.error("Failed to track click", e));

        // Smart Deeplinking Logic
        if (isMobile && deepLink) {
            e.preventDefault();
            
            // Try deep link
            window.location.href = deepLink;
            
            // Fallback to web link if app isn't installed (checked after a short delay)
            setTimeout(() => {
                // If visibility doesn't change, it likely failed or we are still here
                if (document.visibilityState === 'visible') {
                    window.location.href = href;
                }
            }, 2500);
        }
    };

    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={className}
            style={style}
        >
            {children}
        </a>
    );
}
