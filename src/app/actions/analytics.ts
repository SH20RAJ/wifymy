'use server';

import { db } from "@/db";
import { analytics, pages, links } from "@/db/schema";
import { stackServerApp } from "@/stack/server";
import { eq, and, sql, desc, inArray } from "drizzle-orm";

export async function getAnalyticsSummary(pageId: string) {
    const user = await stackServerApp.getUser();
    if (!user) throw new Error("Unauthorized");

    // Verify ownership
    const page = await db.query.pages.findFirst({
        where: eq(pages.id, pageId)
    });

    if (!page || page.userId !== user.id) {
        throw new Error("Unauthorized page access");
    }

    // Get total views
    const totalViewsQuery = await db.select({ count: sql<number>`count(*)` })
        .from(analytics)
        .where(and(eq(analytics.pageId, pageId), eq(analytics.type, 'VIEW')));
    
    // Get total clicks
    const totalClicksQuery = await db.select({ count: sql<number>`count(*)` })
        .from(analytics)
        .where(and(eq(analytics.pageId, pageId), eq(analytics.type, 'CLICK'))) as unknown as { count: number }[];

    // Get top links
    const topLinksQuery = await db.select({
        linkId: analytics.linkId,
        clicks: sql<number>`count(*)`
    })
    .from(analytics)
    .where(and(eq(analytics.pageId, pageId), eq(analytics.type, 'CLICK'), sql`${analytics.linkId} IS NOT NULL`))
    .groupBy(analytics.linkId)
    .orderBy(desc(sql`count(*)`))
    .limit(5);

    // Fetch link titles for the top links
    const topLinksData = [];
    if (topLinksQuery.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const linkIds = topLinksQuery.map((l: any) => l.linkId as string);
        const linkDetails = await db.select({ id: links.id, title: links.title }).from(links).where(inArray(links.id, linkIds));
        
        for (const stat of topLinksQuery) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const detail = (linkDetails as any[]).find((l: any) => l.id === stat.linkId);
            if (detail) {
                topLinksData.push({
                    id: detail.id,
                    title: detail.title,
                    clicks: stat.clicks
                });
            }
        }
    }

    // Device breakdown
    const devicesQuery = await db.select({
        deviceType: analytics.deviceType,
        count: sql<number>`count(*)`
    })
    .from(analytics)
    .where(eq(analytics.pageId, pageId))
    .groupBy(analytics.deviceType) as unknown as { deviceType: string | null, count: number }[];

    return {
        totalViews: totalViewsQuery[0].count,
        totalClicks: totalClicksQuery[0].count,
        topLinks: topLinksData,
        deviceBreakdown: devicesQuery
    };
}
