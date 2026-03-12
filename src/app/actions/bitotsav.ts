'use server';

import { db } from "@/db";
import { claps, pages } from "@/db/schema";
import { eq, sql, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function incrementClaps(slug: string) {
    const page = await db.query.pages.findFirst({
        where: eq(pages.slug, slug)
    });

    if (!page) throw new Error("Page not found");

    await db.insert(claps).values({
        id: crypto.randomUUID(),
        pageId: page.id,
        createdAt: new Date()
    });

    revalidatePath('/bitotsav');
    revalidatePath(`/${slug}`);
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
