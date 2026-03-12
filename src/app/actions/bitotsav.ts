'use server';

import { db } from "@/db";
import { pages } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function incrementClaps(slug: string) {
    try {
        await db.update(pages)
            .set({ 
                claps: sql`${pages.claps} + 1` 
            })
            .where(eq(pages.slug, slug));
        
        revalidatePath(`/bitotsav`);
        return { success: true };
    } catch (error) {
        console.error("Error incrementing claps:", error);
        return { success: false, error: "Failed to update claps" };
    }
}

export async function getBitotsavData() {
    const slug = 'bitotsav';
    const page = await db.query.pages.findFirst({
        where: eq(pages.slug, slug)
    });

    if (!page) {
        // We might want to seed this page if it doesn't exist, 
        // but for now let's just return what we find.
        return null;
    }

    return page;
}
