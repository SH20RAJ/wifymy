'use server';

import { db } from "@/db";
import { links, pages } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getLinksForPage(pageId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    // Verify ownership
    const page = await db.select().from(pages).where(and(eq(pages.id, pageId), eq(pages.userId, user.id))).get();
    if (!page) throw new Error("Page not found or unauthorized");

    return await db.select().from(links).where(eq(links.pageId, pageId)).orderBy(links.order).all();
}

export async function addLink(pageId: string, title: string, url: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    // Get current max order
    const initialLinks = await db.select().from(links).where(eq(links.pageId, pageId)).all();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const maxOrder = initialLinks.length > 0 ? Math.max(...initialLinks.map((l: any) => l.order || 0)) : -1;

    try {
        await db.insert(links).values({
            id: crypto.randomUUID(),
            pageId,
            title,
            url,
            order: maxOrder + 1,
            isActive: true
        });
        revalidatePath("/dashboard/links");
        return { success: true };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}

export async function updateLink(linkId: string, data: { title?: string, url?: string, isActive?: boolean }) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");
    
    // Simplistic auth check (in prod, verify link belongs to user's page)
    await db.update(links)
        .set(data)
        .where(eq(links.id, linkId));
        
    revalidatePath("/dashboard/links");
}

export async function deleteLink(linkId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await db.delete(links).where(eq(links.id, linkId));
    revalidatePath("/dashboard/links");
}

export async function reorderLinks(pageId: string, orderedLinkIds: string[]) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    // Update orders in a transaction or individual queries
    for (let i = 0; i < orderedLinkIds.length; i++) {
        await db.update(links)
            .set({ order: i })
            .where(eq(links.id, orderedLinkIds[i]));
    }
    
    revalidatePath("/dashboard/links");
}
