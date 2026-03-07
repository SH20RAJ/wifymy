'use client';

import { useState, useEffect } from "react";
import CreatePageForm from "./CreatePageForm";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CreatePageModal() {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <>
            <Button 
                onClick={() => setIsOpen(true)}
                className="rounded-2xl h-12 px-6 bg-white text-black hover:bg-neutral-200 font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create New Page
            </Button>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsOpen(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-neutral-900 border border-white/10 w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        
                        <div className="p-8">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Create New Page</h2>
                                    <p className="text-neutral-400 text-sm mt-1">Setup your new smart profile page.</p>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <CreatePageForm onSuccess={() => setIsOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
