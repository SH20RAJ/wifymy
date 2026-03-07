'use client';

import { CustomTheme } from "@/lib/themes";
import { 
    Palette, 
    Square, 
    MousePointer2, 
    ChevronDown,
    Zap,
    Type as TypeIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

type SectionProps = {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
};

const Section = ({ title, icon: Icon, children, defaultOpen = false }: SectionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-border rounded-xl overflow-hidden bg-white/5">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-semibold text-sm">{title}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>
            {isOpen && <div className="p-4 space-y-6">{children}</div>}
        </div>
    );
};

export default function CustomThemeEditor({ 
    customTheme, 
    onChange 
}: { 
    customTheme: CustomTheme, 
    onChange: (theme: CustomTheme) => void 
}) {
    const updateTheme = (updates: Partial<CustomTheme>) => {
        onChange({ ...customTheme, ...updates });
    };

    return (
        <div className="space-y-4">
            {/* Background Section */}
            <Section title="Background" icon={Palette} defaultOpen={true}>
                <div className="space-y-4">
                    <div className="flex bg-secondary p-1 rounded-lg">
                        {(['solid', 'gradient', 'image'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => updateTheme({ backgroundType: type })}
                                className={cn(
                                    "flex-1 py-1.5 text-xs font-bold capitalize rounded-md transition-all",
                                    customTheme.backgroundType === type 
                                        ? "bg-background text-foreground shadow-sm" 
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-3">
                        {customTheme.backgroundType === 'solid' && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Color</label>
                                <div className="flex items-center gap-3">
                                    <input 
                                        type="color" 
                                        value={customTheme.backgroundValue}
                                        onChange={(e) => updateTheme({ backgroundValue: e.target.value })}
                                        className="w-12 h-10 rounded-lg cursor-pointer bg-transparent"
                                    />
                                    <input 
                                        type="text" 
                                        value={customTheme.backgroundValue}
                                        onChange={(e) => updateTheme({ backgroundValue: e.target.value })}
                                        className="flex-1 h-10 px-3 rounded-lg border border-border bg-background font-mono text-sm uppercase"
                                    />
                                </div>
                            </div>
                        )}

                        {customTheme.backgroundType === 'gradient' && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Gradient CSS</label>
                                <textarea 
                                    value={customTheme.backgroundValue}
                                    onChange={(e) => updateTheme({ backgroundValue: e.target.value })}
                                    rows={2}
                                    className="w-full p-3 rounded-lg border border-border bg-background font-mono text-xs"
                                    placeholder="linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)"
                                />
                            </div>
                        )}

                        {customTheme.backgroundType === 'image' && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Image URL</label>
                                <input 
                                    type="text" 
                                    value={customTheme.backgroundValue}
                                    onChange={(e) => updateTheme({ backgroundValue: e.target.value })}
                                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* Buttons Section */}
            <Section title="Buttons" icon={MousePointer2}>
                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Button Color</label>
                            <input 
                                type="color" 
                                value={customTheme.buttonColor}
                                onChange={(e) => updateTheme({ buttonColor: e.target.value })}
                                className="w-full h-10 rounded-lg cursor-pointer bg-transparent"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Text Color</label>
                            <input 
                                type="color" 
                                value={customTheme.buttonTextColor}
                                onChange={(e) => updateTheme({ buttonTextColor: e.target.value })}
                                className="w-full h-10 rounded-lg cursor-pointer bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Style</label>
                        <div className="grid grid-cols-2 gap-2">
                            {(['flat', 'shadow', 'outline', 'soft', 'glass'] as const).map((style) => (
                                <button
                                    key={style}
                                    onClick={() => updateTheme({ buttonStyle: style })}
                                    className={cn(
                                        "px-3 py-2 text-xs font-medium rounded-lg border transition-all flex items-center justify-center gap-2",
                                        customTheme.buttonStyle === style 
                                            ? "bg-primary text-primary-foreground border-primary shadow-lg" 
                                            : "bg-background text-foreground border-border hover:border-primary/50"
                                    )}
                                >
                                    <Square className="w-3 h-3" />
                                    <span className="capitalize">{style}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Radius</label>
                        <div className="flex gap-2">
                            {['0px', '8px', '16px', '999px'].map((radius) => (
                                <button
                                    key={radius}
                                    onClick={() => updateTheme({ buttonRadius: radius })}
                                    className={cn(
                                        "flex-1 py-1.5 border rounded-lg text-xs font-medium transition-all",
                                        customTheme.buttonRadius === radius 
                                            ? "bg-primary text-primary-foreground border-primary" 
                                            : "bg-background text-foreground border-border hover:border-primary/50"
                                    )}
                                >
                                    {radius === '0px' ? 'Square' : radius === '999px' ? 'Pill' : radius}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Section>

            {/* Typography Section */}
            <Section title="Typography" icon={TypeIcon}>
                <div className="space-y-6">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Global Text Color</label>
                        <div className="flex items-center gap-3">
                            <input 
                                type="color" 
                                value={customTheme.textColor}
                                onChange={(e) => updateTheme({ textColor: e.target.value })}
                                className="w-12 h-10 rounded-lg cursor-pointer bg-transparent"
                            />
                            <input 
                                type="text" 
                                value={customTheme.textColor}
                                onChange={(e) => updateTheme({ textColor: e.target.value })}
                                className="flex-1 h-10 px-3 rounded-lg border border-border bg-background font-mono text-sm uppercase"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Font Family</label>
                        <select 
                            value={customTheme.fontFamily}
                            onChange={(e) => updateTheme({ fontFamily: e.target.value })}
                            className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                        >
                            <option value="var(--font-outfit), sans-serif">Outfit (Default)</option>
                            <option value="sans-serif">Standard Sans</option>
                            <option value="serif">Classic Serif</option>
                            <option value="monospace">Mono</option>
                            <option value="'Inter', sans-serif">Inter</option>
                        </select>
                    </div>
                </div>
            </Section>

            {/* Advanced Section */}
            <Section title="Custom CSS (Pro)" icon={Zap}>
                <div className="space-y-4">
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                        Add custom CSS to overwrite any part of your profile. Use securely as a pro user.
                    </p>
                    <textarea 
                        value={customTheme.customCss}
                        onChange={(e) => updateTheme({ customCss: e.target.value })}
                        rows={4}
                        className="w-full p-3 rounded-lg border border-border bg-background font-mono text-xs placeholder:text-muted-foreground"
                        placeholder=".link-card { border: 2px solid neon; }"
                    />
                </div>
            </Section>
        </div>
    );
}
