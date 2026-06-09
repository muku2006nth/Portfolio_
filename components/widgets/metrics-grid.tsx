/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLanguage } from "@/providers/language-provider";

export function MetricsGrid() {
    const { content } = useLanguage();

    if (!content.about.metrics) return null;

    return (
        <div className="grid grid-cols-2 gap-4 mt-8 w-[300px] mx-auto xl:mx-0">
            {content.about.metrics.map((metric: any, index: number) => (
                <div 
                    key={index}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background/40 backdrop-blur-md border border-foreground/10 hover:bg-background/60 hover:border-foreground/20 transition-colors duration-300 shadow-sm"
                >
                    <span className="text-2xl font-black tracking-tight text-foreground">
                        {metric.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 text-center font-medium">
                        {metric.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
