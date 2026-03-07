import { Skeleton } from "@/components/ui/skeleton";

export default function PublicProfileLoading() {
    return (
        <div className="min-h-dvh flex flex-col pt-16 pb-8 px-4 sm:px-6 relative animate-in fade-in duration-700 bg-neutral-950">
            <div className="max-w-[680px] w-full mx-auto relative z-10 flex-1 flex flex-col items-center">
                {/* Profile Header Skeleton */}
                <div className="flex flex-col items-center text-center space-y-4 mb-10 w-full">
                    <Skeleton className="w-24 h-24 rounded-full" />
                    <div className="space-y-2 w-full flex flex-col items-center">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-64" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>

                {/* Links Skeleton */}
                <div className="flex flex-col gap-4 w-full">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-10 h-10 rounded-full" />
                                <Skeleton className="h-5 w-32" />
                            </div>
                            <Skeleton className="w-5 h-5 rounded" />
                        </div>
                    ))}
                </div>

                {/* Footer Skeleton */}
                <div className="mt-auto pt-16 flex justify-center">
                    <Skeleton className="h-8 w-32 rounded-full" />
                </div>
            </div>
        </div>
    );
}
