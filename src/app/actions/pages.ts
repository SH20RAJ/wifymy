'use server';

import { getCollection } from "@/lib/mongodb";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";

export interface MongoUser {
    id: string;
    email: string;
    createdAt: Date;
}

export interface CustomTheme {
    backgroundType: 'solid' | 'gradient' | 'image' | 'video';
    backgroundValue: string;
    backgroundOverlay?: number;
    fontFamily: string;
    textColor: string;
    buttonStyle: 'flat' | 'shadow' | 'outline' | 'soft' | 'glass';
    buttonColor: string;
    buttonTextColor: string;
    buttonRadius: string;
    buttonBorderWidth?: string;
    buttonShadowColor?: string;
    customCss?: string;
}

export interface MongoPage {
    id: string; // UUID or ObjectId as string
    userId: string;
    slug: string;
    displayName?: string;
    bio?: string;
    avatarUrl?: string;
    themeId: string;
    customTheme?: CustomTheme;
    createdAt: Date;
}

// Sync user to MongoDB if they don't exist
async function syncUser(userId: string, email: string) {
    const users = await getCollection<MongoUser>("users");
    const existingUser = await users.findOne({ id: userId });
    if (!existingUser) {
        await users.insertOne({
            id: userId,
            email: email,
            createdAt: new Date(),
        });
    }
}

export async function getUserPages() {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await syncUser(user.id, user.primaryEmail || "");

    const pages = await getCollection<MongoPage>("pages");
    return await pages.find({ userId: user.id }).toArray();
}

export async function createPage(slug: string, displayName: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    await syncUser(user.id, user.primaryEmail || "");

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const pages = await getCollection<MongoPage>("pages");

    // Check if slug exists
    const existing = await pages.findOne({ slug: cleanSlug });
    if (existing) {
        return { success: false, error: "Slug already taken." };
    }

    try {
        await pages.insertOne({
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

    const pages = await getCollection<MongoPage>("pages");
    await pages.updateOne(
        { id: pageId, userId: user.id },
        { $set: { ...data } }
    );

    revalidatePath("/dashboard");
}

export async function updatePageTheme(pageId: string, themeId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const pages = await getCollection<MongoPage>("pages");
    await pages.updateOne(
        { id: pageId, userId: user.id },
        { $set: { themeId } }
    );

    revalidatePath("/dashboard");
}

export async function updatePageCustomTheme(pageId: string, customTheme: CustomTheme) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const pages = await getCollection<MongoPage>("pages");
    await pages.updateOne(
        { id: pageId, userId: user.id },
        { $set: { customTheme } }
    );

    revalidatePath("/dashboard");
}
