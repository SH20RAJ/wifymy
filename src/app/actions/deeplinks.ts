'use server';

import { db } from "@/db";
import { deeplinks, pages } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";
import { eq, desc, and } from "drizzle-orm";

export type Deeplink = typeof deeplinks.$inferSelect;

export async function getDeeplinks() {
    const user = await stackServerApp.getUser();
    if (!user) return [];

    return await db.query.deeplinks.findMany({
        where: eq(deeplinks.userId, user.id),
        orderBy: [desc(deeplinks.createdAt)]
    });
}

export async function getDeeplinkBySlug(slug: string) {
    const cleanSlug = slug.toLowerCase().trim();
    return await db.query.deeplinks.findFirst({
        where: eq(deeplinks.slug, cleanSlug)
    });
}

export async function createDeeplink(slug: string, destinationUrl: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const cleanSlug = slug.toLowerCase().trim();

    // Check if slug exists in deeplinks
    const existingDeeplink = await db.query.deeplinks.findFirst({
        where: eq(deeplinks.slug, cleanSlug)
    });
    if (existingDeeplink) throw new Error("Slug already taken as a deeplink");

    // Check if slug exists in pages
    const existingPage = await db.query.pages.findFirst({
        where: eq(pages.slug, cleanSlug)
    });
    if (existingPage) throw new Error("Slug already taken as a profile page");

    const newDeeplink = {
        id: crypto.randomUUID(),
        userId: user.id,
        slug: cleanSlug,
        destinationUrl: destinationUrl.trim(),
        createdAt: new Date()
    };

    await db.insert(deeplinks).values(newDeeplink);
    revalidatePath("/dashboard/deeplinks");
    return newDeeplink;
}

export async function deleteDeeplink(id: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await db.delete(deeplinks)
        .where(and(eq(deeplinks.id, id), eq(deeplinks.userId, user.id)));
        
    revalidatePath("/dashboard/deeplinks");
}
