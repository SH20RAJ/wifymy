import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
import { getDeeplinks } from "@/app/actions/deeplinks";
import DeeplinksClient from "./DeeplinksClient";

export default async function DeeplinksPage() {
    const user = await stackServerApp.getUser();
    if (!user) {
        redirect("/dashboard");
    }

    const initialDeeplinks = await getDeeplinks();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Managed Deeplinks</h1>
                <p className="text-neutral-500 mt-2">
                    Create shortened URLs that intelligently route mobile users to the native app instead of the web browser.
                </p>
            </div>
            
            <DeeplinksClient initialDeeplinks={initialDeeplinks} />
        </div>
    );
}
