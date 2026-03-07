import { Skeleton } from "@/components/ui/skeleton";

export default function LinksLoading() {
    return (
        <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Left Side: Link Editor Skeleton */}
                <div className="flex-1 w-full space-y-8">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-10 w-48" />
                        <Skeleton className="h-10 w-10 rounded-xl" />
                    </div>

                    <Skeleton className="h-12 w-full rounded-xl" />

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4">
                                <Skeleton className="w-5 h-8 rounded" />
                                <div className="flex-1 space-y-3">
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <div className="space-y-2 flex flex-col items-center">
                                    <Skeleton className="h-5 w-9 rounded-full" />
                                    <Skeleton className="h-8 w-8 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Mobile Preview Skeleton */}
                <div className="hidden lg:block sticky top-8">
                    <div className="w-[340px] aspect-9/19 rounded-[3rem] border-8 border-neutral-900 bg-neutral-900/50 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
                            <div className="w-24 h-5 bg-neutral-900 rounded-b-3xl"></div>
                        </div>
                        <div className="p-12 space-y-8 flex flex-col items-center">
                            <Skeleton className="w-20 h-20 rounded-full" />
                            <div className="space-y-2 w-full items-center flex flex-col">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                            <div className="w-full space-y-3">
                                <Skeleton className="h-12 w-full rounded-xl" />
                                <Skeleton className="h-12 w-full rounded-xl" />
                                <Skeleton className="h-12 w-full rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
