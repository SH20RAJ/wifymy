'use server';

import { getCollection } from "@/lib/mongodb";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";

export interface MongoLink {
    id: string;
    pageId: string;
    title: string;
    url: string;
    icon?: string;
    order: number;
    isActive: boolean;
    createdAt: Date;
}

export async function getLinksForPage(pageId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const links = await getCollection<MongoLink>("links");
    return await links.find({ pageId }).sort({ order: 1 }).toArray();
}

export async function addLink(pageId: string, title: string, url: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const links = await getCollection<MongoLink>("links");
    
    // Get current max order
    const pageLinks = await links.find({ pageId }).toArray();
    const maxOrder = pageLinks.length > 0 ? Math.max(...pageLinks.map(l => l.order || 0)) : -1;

    try {
        await links.insertOne({
            id: crypto.randomUUID(),
            pageId,
            title,
            url,
            order: maxOrder + 1,
            isActive: true,
            createdAt: new Date(),
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
    
    const links = await getCollection<MongoLink>("links");
    await links.updateOne(
        { id: linkId },
        { $set: data }
    );
        
    revalidatePath("/dashboard/links");
}

export async function deleteLink(linkId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const links = await getCollection<MongoLink>("links");
    await links.deleteOne({ id: linkId });
    
    revalidatePath("/dashboard/links");
}

export async function reorderLinks(pageId: string, orderedLinkIds: string[]) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const links = await getCollection<MongoLink>("links");
    
    // Use bulkWrite for efficiency if possible, or simple loop for now
    for (let i = 0; i < orderedLinkIds.length; i++) {
        await links.updateOne(
            { id: orderedLinkIds[i], pageId },
            { $set: { order: i } }
        );
    }
    
    revalidatePath("/dashboard/links");
}
