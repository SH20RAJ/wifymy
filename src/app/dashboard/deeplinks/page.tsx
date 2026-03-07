import { stackServerApp } from "@/stack/server";
import { getDeeplinks } from "@/app/actions/deeplinks";
import DeeplinksClient from "./DeeplinksClient";
import { redirect } from "next/navigation";

export default async function DeeplinksPage() {
    const user = await stackServerApp.getUser();
    if (!user) return redirect("/dashboard");

    const deeplinks = await getDeeplinks();

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white italic">Smart Deeplinks</h1>
                <p className="text-neutral-400">Create custom short links that open directly in native apps.</p>
            </div>
            
            <DeeplinksClient initialDeeplinks={JSON.parse(JSON.stringify(deeplinks))} />
        </div>
    );
}
