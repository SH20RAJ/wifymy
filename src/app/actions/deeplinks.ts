'use server';

import { getCollection } from "@/lib/mongodb";
import { stackServerApp } from "@/stack/server";
import { revalidatePath } from "next/cache";

export interface MongoDeeplink {
    id: string;
    userId: string;
    slug: string;
    destinationUrl: string;
    createdAt: Date;
}

export async function getDeeplinks() {
    const user = await stackServerApp.getUser();
    if (!user) return [];

    const collection = await getCollection<MongoDeeplink>("deeplinks");
    return await collection.find({ userId: user.id }).sort({ createdAt: -1 }).toArray();
}

export async function createDeeplink(slug: string, destinationUrl: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const collection = await getCollection<MongoDeeplink>("deeplinks");

    // Check if slug exists (managed or pages)
    const existing = await collection.findOne({ slug });
    if (existing) throw new Error("Slug already taken as a deeplink");

    const pages = await getCollection("pages");
    const existingPage = await pages.findOne({ slug });
    if (existingPage) throw new Error("Slug already taken as a profile page");

    const newDeeplink: MongoDeeplink = {
        id: crypto.randomUUID(),
        userId: user.id,
        slug: slug.toLowerCase().trim(),
        destinationUrl: destinationUrl.trim(),
        createdAt: new Date()
    };

    await collection.insertOne(newDeeplink);
    revalidatePath("/dashboard/deeplinks");
    return newDeeplink;
}

export async function deleteDeeplink(id: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    const collection = await getCollection<MongoDeeplink>("deeplinks");
    await collection.deleteOne({ id, userId: user.id });
    revalidatePath("/dashboard/deeplinks");
}
