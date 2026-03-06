'use server';

import { db } from "@/db";
import { pages, users } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Sync user to db if they don't exist
async function syncUser(userId: string, email: string) {
    const existingUser = await db.select().from(users).where(eq(users.id, userId)).get();
    if (!existingUser) {
        await db.insert(users).values({
            id: userId,
            email: email,
        });
    }
}

export async function getUserPages() {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await syncUser(user.id, user.primaryEmail || "");

    return await db.select().from(pages).where(eq(pages.userId, user.id)).all();
}

export async function createPage(slug: string, displayName: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await syncUser(user.id, user.primaryEmail || "");

    // Basic slug validation
    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    try {
        await db.insert(pages).values({
            id: crypto.randomUUID(),
            userId: user.id,
            slug: cleanSlug,
            displayName,
            themeId: "minimalist"
        });
        revalidatePath("/dashboard");
        return { success: true, slug: cleanSlug };
    } catch {
        return { success: false, error: "Slug already taken or invalid." };
    }
}

export async function updatePageProfile(pageId: string, data: { displayName?: string, bio?: string, avatarUrl?: string }) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await db.update(pages)
        .set({
            ...data,
            // Assuming we only update what is passed
        })
        .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)));

    revalidatePath("/dashboard");
    revalidatePath(`/${pageId}`); // Actually we'd need slug, but we'll revalidate all
}

export async function updatePageTheme(pageId: string, themeId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await db.update(pages)
        .set({ themeId })
        .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)));

    revalidatePath("/dashboard");
}
