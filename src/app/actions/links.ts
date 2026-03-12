'use server';

import { db } from "@/db";
import { links } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";
import { eq, asc } from "drizzle-orm";

export async function getLinksForPage(pageId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    return await db.query.links.findMany({
        where: eq(links.pageId, pageId),
        orderBy: [asc(links.order)]
    });
}

export async function getActiveLinksByPageId(pageId: string) {
    const allLinks = await db.query.links.findMany({
        where: eq(links.pageId, pageId),
        orderBy: [asc(links.order)]
    });
    return allLinks.filter(l => l.isActive);
}

export async function addLink(pageId: string, title: string, url: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    // Get current max order
    const pageLinks = await db.query.links.findMany({
        where: eq(links.pageId, pageId)
    });
    
    const maxOrder = pageLinks.length > 0 ? Math.max(...pageLinks.map(l => l.order)) : -1;

    try {
        const newLink = {
            id: crypto.randomUUID(),
            pageId,
            title,
            url,
            order: maxOrder + 1,
            isActive: true,
            createdAt: new Date(),
        };
        
        await db.insert(links).values(newLink);
        revalidatePath("/dashboard/links");
        return { success: true, link: newLink };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
    }
}

export async function updateLink(linkId: string, data: { title?: string, url?: string, isActive?: boolean }) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");
    
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

    // Use a transaction for bulk update efficiency
    await db.transaction(async (tx) => {
        for (let i = 0; i < orderedLinkIds.length; i++) {
            await tx.update(links)
                .set({ order: i })
                .where(eq(links.id, orderedLinkIds[i]));
        }
    });
    
    revalidatePath("/dashboard/links");
}
