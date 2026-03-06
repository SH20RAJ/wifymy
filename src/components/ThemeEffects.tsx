'use client';

import { Theme } from "@/lib/themes";

export function ThemeEffects({ theme }: { theme: Theme }) {
    if (!theme.effects || theme.effects.type === 'none') {
        return null;
    }

    const { type } = theme.effects;

    if (type === 'hearts') {
        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-50">
                {[...Array(15)].map((_, i) => {
                    const size = Math.random() * 20 + 10;
                    const left = Math.random() * 100;
                    const delay = Math.random() * 5;
                    const duration = Math.random() * 10 + 10;
                    return (
                        <div 
                            key={i} 
                            className="absolute bottom-0 text-rose-400/40 animate-float"
                            style={{
                                left: `${left}%`,
                                fontSize: `${size}px`,
                                animationDuration: `${duration}s`,
                                animationDelay: `${delay}s`,
                                animationFillMode: 'both',
                                animationIterationCount: 'infinite',
                                animationName: 'float-up',
                            }}
                        >
                            ❤
                        </div>
                    );
                })}
            </div>
        );
    }

    if (type === 'dots') {
        return (
            <div 
                className="absolute inset-0 pointer-events-none z-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                }}
            />
        );
    }

    if (type === 'grid') {
        return (
            <div 
                className="absolute inset-0 pointer-events-none z-0 opacity-10"
                style={{
                    backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />
        );
    }

    if (type === 'folk-pattern') {
        return (
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10 overflow-hidden flex items-center justify-center">
                 {/* A stylized subtle mandala/folk inspired CSS pattern using repeating gradients */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at center, transparent 30%, currentColor 31%, currentColor 34%, transparent 35%), radial-gradient(circle at center, transparent 50%, currentColor 51%, currentColor 54%, transparent 55%)`,
                    backgroundSize: '120px 120px',
                    backgroundPosition: 'center center'
                }} />
            </div>
        );
    }

    return null;
}
