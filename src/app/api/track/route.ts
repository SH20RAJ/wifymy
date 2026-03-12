import { db } from "@/db";
import { analytics } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

interface TrackBody {
    pageId: string;
    linkId?: string;
    type: 'VIEW' | 'CLICK';
    deviceType?: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as TrackBody;
        const { pageId, linkId, type, deviceType } = body;

        if (!pageId || !type) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const userAgent = (req.headers.get("user-agent") || "Unknown").substring(0, 255);
        const referrer = (req.headers.get("referer") || "Direct").substring(0, 255);

        await db.insert(analytics).values({
            id: crypto.randomUUID(),
            pageId,
            linkId: linkId || null,
            type,
            userAgent,
            referrer,
            deviceType: deviceType || "Unknown",
            createdAt: new Date()
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics Tracking Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
