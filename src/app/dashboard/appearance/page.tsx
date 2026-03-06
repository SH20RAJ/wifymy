import { db } from "@/db";
import { pages, links } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import AppearanceClient from "./AppearanceClient";

export default async function AppearancePage(props: { searchParams: Promise<{ page?: string }> }) {
    const searchParams = await props.searchParams;
    const pageId = searchParams.page;
    if (!pageId) return redirect("/dashboard");

    const user = await stackServerApp.getUser();
    if (!user) return redirect("/dashboard");

    const page = await db.select().from(pages).where(and(eq(pages.id, pageId), eq(pages.userId, user.id))).get();
    if (!page) return redirect("/dashboard");

    const pageLinks = await db.select().from(links).where(eq(links.pageId, pageId)).orderBy(links.order).all();

    const sanitizedLinks = pageLinks.map(l => ({
        id: l.id,
        title: l.title,
        url: l.url,
        isActive: l.isActive ?? true
    }));

    return <AppearanceClient initialPage={page} initialLinks={sanitizedLinks} />;
}
