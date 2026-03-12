import { db } from "../src/db";
import { pages, users } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function seedBitotsav() {
    const slug = 'bitotsav';
    const existing = await db.query.pages.findFirst({
        where: eq(pages.slug, slug)
    });

    if (!existing) {
        console.log("Ensuring system user exists...");
        await db.insert(users).values({
            id: 'system',
            email: 'system@wifymy.com',
            createdAt: new Date()
        }).onConflictDoNothing();

        console.log("Seeding Bitotsav page...");
        await db.insert(pages).values({
            id: 'bitotsav-page-id', 
            userId: 'system', 
            slug: slug,
            displayName: 'Bitotsav 2026',
            bio: 'The biggest cultural fest of East India is back! 🎊 👏',
            themeId: 'minimalist',
            claps: 0,
            createdAt: new Date()
        });
        console.log("Bitotsav page seeded!");
    } else {
        console.log("Bitotsav page already exists.");
    }
    process.exit(0);
}

seedBitotsav().catch(console.error);
