'use server';

import { db } from "@/db";
import { users, pages } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

export interface CustomTheme {
    backgroundType: 'solid' | 'gradient' | 'image';
    backgroundValue: string;
    backgroundSize?: 'cover' | 'contain' | 'auto';
    backgroundPosition?: string;
    backgroundRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';
    backgroundOverlay?: string; // rgba color for overlay
    
    buttonColor: string;
    buttonTextColor: string;
    buttonStyle: 'flat' | 'shadow' | 'outline' | 'soft' | 'glass';
    buttonRadius: string;
    buttonShadowColor?: string; // Moved from original position
    
    textColor: string;
    fontFamily: string;
    
    avatarStyle?: 'circle' | 'square' | 'rounded' | 'hidden';
    avatarBorderColor?: string;
    avatarBorderSize?: string;
    avatarBorderRadius?: string;

    seoTitle?: string;
    seoDescription?: string;
    socialImage?: string;

    customCss?: string;
}

// Sync user to Postgres if they don't exist
async function syncUser(userId: string, email: string) {
    try {
        await db.insert(users).values({
            id: userId,
            email: email,
            createdAt: new Date(),
        }).onConflictDoNothing();
    } catch (error) {
        console.error("Error syncing user:", error);
    }
}

export async function getPageBySlug(slug: string) {
    const cleanSlug = slug.toLowerCase();
    return await db.query.pages.findFirst({
        where: eq(pages.slug, cleanSlug)
    });
}

export async function getPageByIdForUser(pageId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");
    return await db.query.pages.findFirst({
        where: and(eq(pages.id, pageId), eq(pages.userId, user.id))
    });
}

export async function getUserPages() {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await syncUser(user.id, user.primaryEmail || "");

    const result = await db.query.pages.findMany({
        where: eq(pages.userId, user.id)
    });
    
    // Convert JSONB customTheme fallback
    return result.map(p => ({
        ...p,
        customTheme: p.customTheme as CustomTheme | null | undefined
    }));
}

export async function createPage(slug: string, displayName: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await syncUser(user.id, user.primaryEmail || "");

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');

    // Check if slug exists
    const existing = await db.query.pages.findFirst({
        where: eq(pages.slug, cleanSlug)
    });
    
    if (existing) {
        return { success: false, error: "Slug already taken." };
    }

    try {
        await db.insert(pages).values({
            id: crypto.randomUUID(),
            userId: user.id,
            slug: cleanSlug,
            displayName,
            themeId: "minimalist",
            createdAt: new Date(),
        });
        revalidatePath("/dashboard");
        return { success: true, slug: cleanSlug };
    } catch {
        return { success: false, error: "Error creating page." };
    }
}

export async function updatePageProfile(pageId: string, data: { displayName?: string, bio?: string, avatarUrl?: string }) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await db.update(pages)
        .set(data)
        .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)));

    revalidatePath("/dashboard");
}

export async function updatePageTheme(pageId: string, themeId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await db.update(pages)
        .set({ themeId })
        .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)));

    revalidatePath("/dashboard");
}

export async function updatePageCustomTheme(pageId: string, customTheme: CustomTheme) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    // Drizzle handles JSONB updates automatically
    await db.update(pages)
        .set({ customTheme })
        .where(and(eq(pages.id, pageId), eq(pages.userId, user.id)));

    revalidatePath("/dashboard");
}
