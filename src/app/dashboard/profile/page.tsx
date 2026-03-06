import { stackServerApp } from "@/stack/server";

export default async function ProfilePage() {
    const user = await stackServerApp.getUser({ or: "redirect" });

    return (
        <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
            
            <div className="bg-card rounded-2xl border border-border p-6 md:p-10 shadow-sm space-y-8">
                <section>
                    <h2 className="text-xl font-medium mb-4">Account Information</h2>
                    <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                            <input disabled type="email" value={user.primaryEmail || ''} className="w-full h-10 px-3 rounded-lg border border-border bg-secondary/50 text-muted-foreground cursor-not-allowed" />
                            <p className="text-xs text-muted-foreground mt-1">Managed via Stack Auth.</p>
                        </div>


                    </div>
                </section>

                <hr className="border-border" />

                <section>
                    <h2 className="text-xl font-medium mb-4 text-red-500">Danger Zone</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button className="h-10 px-4 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 font-medium text-sm transition-colors border border-red-500/20">
                        Delete Account
                    </button>
                </section>
            </div>
        </div>
    );
}
