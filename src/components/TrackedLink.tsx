'use client';

import { ReactNode } from 'react';

export function TrackedLink({ 
    href, 
    pageId, 
    linkId, 
    className, 
    style, 
    children 
}: { 
    href: string, 
    pageId: string, 
    linkId: string, 
    className?: string, 
    style?: React.CSSProperties,
    children: ReactNode
}) {
    const handleClick = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pageId,
                linkId,
                type: 'CLICK',
                deviceType: isMobile ? 'Mobile' : 'Desktop'
            }),
            keepalive: true // Ensure request is sent even if navigating away
        }).catch(e => console.error("Failed to track click", e));
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
