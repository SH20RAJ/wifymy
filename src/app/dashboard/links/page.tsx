import { stackServerApp } from "@/stack/server";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function LinksPage() {
    const user = await stackServerApp.getUser({ or: "redirect" });
    
    // In the future this will fetch links using Drizzle ORM based on user.id

    return (
        <div className="max-w-3xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Manage Links</h1>
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:flex">
                    <Plus className="w-4 h-4 mr-2" /> Add New Link
                </Button>
            </div>

            <Button className="w-full h-14 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/80 text-base font-semibold mb-8 sm:hidden">
                <Plus className="w-5 h-5 mr-2" /> Add New Link
            </Button>

            <div className="bg-card rounded-2xl border border-border p-10 text-center shadow-sm">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium text-card-foreground mb-2">You don&apos;t have any links yet</h3>
                <p className="text-muted-foreground mb-6 text-sm text-balance max-w-sm mx-auto">
                    Add your first social media link or website to start building your Wify smart profile.
                </p>
            </div>
        </div>
    );
}
