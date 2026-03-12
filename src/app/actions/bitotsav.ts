'use server';

import { revalidatePath } from "next/cache";

const VISITOR_BADGE_URL = "https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fbitotsav.bitmesra.ac.in%2Ftheme-reveal&countColor=%23263759";

export async function incrementClaps() {
    try {
        // Fetching the badge API increments the counter
        await fetch(VISITOR_BADGE_URL, { cache: 'no-store' });
        revalidatePath('/bitotsav');
    } catch (error) {
        console.error("Failed to increment claps via visitorbadge:", error);
    }
}

export async function getBitotsavData() {
    try {
        const res = await fetch(VISITOR_BADGE_URL, { cache: 'no-store' });
        if (!res.ok) {
            console.error("Visitor badge API returned:", res.status);
            return { claps: 0 };
        }
        
        const svg = await res.text();
        
        // Extract the number from the SVG text tags
        // Usually looks like: <text ...>1234</text>
        const matches = [...svg.matchAll(/<text[^>]*>([0-9,]+)<\/text>/g)];
        if (matches && matches.length > 0) {
            // The value is typically the last text element in the badge
            const lastMatch = matches[matches.length - 1][1];
            const num = parseInt(lastMatch.replace(/,/g, ''), 10);
            return { claps: isNaN(num) ? 0 : num };
        }
        
        return { claps: 0 };
    } catch (error) {
        console.error("Error fetching bitotsav claps from visitorbadge:", error);
        return { claps: 0 };
    }
}
