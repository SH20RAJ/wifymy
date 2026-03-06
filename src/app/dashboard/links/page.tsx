import { db } from "@/db";
import { pages, links } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack/server";
import LinksClient from "./LinksClient";

export default async function LinksPage(props: { searchParams: Promise<{ page?: string }> }) {
    const searchParams = await props.searchParams;
    const pageId = searchParams.page;
    if (!pageId) return redirect("/dashboard");

    const user = await stackServerApp.getUser();
    if (!user) return redirect("/dashboard");

    const page = await db.select().from(pages).where(and(eq(pages.id, pageId), eq(pages.userId, user.id))).get();
    if (!page) return redirect("/dashboard");

    const pageLinks = await db.select().from(links).where(eq(links.pageId, pageId)).orderBy(links.order).all();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanitizedLinks = pageLinks.map((l: any) => ({
        id: l.id,
        title: l.title,
        url: l.url,
        isActive: l.isActive ?? true
    }));

    return <LinksClient initialPage={page} initialLinks={sanitizedLinks} />;
}
