"use client";

import { User } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";

export function ProfileCard() {
    const { content } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center p-6 w-[300px] rounded-3xl bg-background/40 backdrop-blur-md border border-foreground/10 shadow-2xl hover:bg-background/60 transition-colors duration-300 group">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-foreground/20 mb-5 bg-foreground/5 flex items-center justify-center group-hover:border-foreground/40 transition-colors duration-300">
                <User className="w-12 h-12 text-foreground/40 group-hover:text-foreground/70 transition-colors duration-300" />
            </div>
            
            <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="text-lg font-bold tracking-[0.1em] text-foreground/90 uppercase">
                    {content.about.profile?.name || "Mukunth Gopi"}
                </span>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mt-1">
                    {content.about.profile?.role || "Full-Stack & AI Developer"}
                </span>
            </div>

            <div className="w-full h-px bg-foreground/10 my-6" />

            <div className="flex flex-col items-center gap-1.5 text-center w-full">
                <span className="text-[13px] text-muted-foreground font-medium">
                    {content.about.profile?.education || "SRM IST - Btech.CSE"}
                </span>
                <span className="text-[13px] text-muted-foreground">
                    {content.about.profile?.class_info || "Current CGPA : 9.0"}
                </span>
            </div>

            <div className="w-full h-px bg-foreground/10 my-6" />

            <div className="flex flex-col items-center text-center w-full">
                <span className="text-[13px] text-muted-foreground font-medium">
                    {content.about.profile?.location || "Chennai, Tamil Nadu, India"}
                </span>
            </div>
        </div>
    );
}
