'use server';

import { db } from "@/db";
import { bitotsavClaps } from "@/db/schema";
import { count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function incrementClaps() {
    await db.insert(bitotsavClaps).values({
        id: crypto.randomUUID(),
        createdAt: new Date()
    });

    revalidatePath('/bitotsav');
}

export async function getBitotsavData() {
    try {
        const clapCountResult = await db.select({ value: count() }).from(bitotsavClaps);
        const clapCount = clapCountResult[0]?.value || 0;

        return {
            claps: Number(clapCount)
        };
    } catch (error) {
        console.error("Error fetching bitotsav data:", error);
        return { claps: 0 };
    }
}
