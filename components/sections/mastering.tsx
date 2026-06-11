"use client";

import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { BookOpen, Activity } from "lucide-react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Mastering() {
    const { content } = useLanguage();
    const { resolvedTheme } = useTheme();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const isTablet = useMediaQuery("(max-width: 1024px)");

    if (!content.mastering) return null;

    return (
        <section className="w-full container-void bg-background text-foreground overflow-hidden relative py-16 lg:py-24 border-t border-border/50">
            <div className="container mx-auto px-container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    
                    {/* Left Column: Currently Mastering */}
                    <div className="flex flex-col gap-8">
                        <BlurReveal>
                            <div className="flex items-center gap-3 mb-2">
                                <BookOpen className="w-6 h-6 text-muted-foreground" />
                                <h3 className="text-2xl font-bold tracking-tight">
                                    {content.mastering.title}
                                </h3>
                            </div>
                        </BlurReveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {content.mastering.items.map((item: { id: string; title: string }, index: number) => (
                                <BlurReveal key={index} delay={index * 0.1}>
                                    <div className="flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-colors">
                                        <span className="text-xs font-mono text-muted-foreground">
                                            {item.id}
                                        </span>
                                        <span className="text-sm font-semibold tracking-wide">
                                            {item.title}
                                        </span>
                                    </div>
                                </BlurReveal>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Git Developer Cycle */}
                    <div className="flex flex-col gap-8">
                        <BlurReveal>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-6 h-6 text-muted-foreground" />
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        {content.mastering.github_title}
                                    </h3>
                                </div>
                                {/* The calendar itself usually provides the total commits, but we can also hardcode or hide their default to show ours. We'll let the calendar show its own text if possible, or hide it and show custom. Let's just rely on the calendar's default labels or customize them. */}
                            </div>
                        </BlurReveal>

                        <BlurReveal delay={0.2}>
                            <div className="p-4 sm:p-6 rounded-2xl border border-border/50 bg-foreground/[0.02] w-full flex justify-center overflow-hidden">
                                <div className="max-w-full overflow-hidden flex justify-center scale-x-100">
                                    <GitHubCalendar 
                                        username={content.mastering.github_username || "muku2006nth"} 
                                        colorScheme={resolvedTheme === 'dark' ? 'dark' : 'light'}
                                        theme={{
                                            light: ['#ebedf0', '#d4d4d8', '#a1a1aa', '#71717a', '#18181b'],
                                            dark: ['#161b22', '#3f3f46', '#71717a', '#a1a1aa', '#ffffff'],
                                        }}
                                        labels={{
                                            totalCount: `{{count}} ${content.mastering.commits_text}`
                                        }}
                                        blockSize={isMobile ? 7 : (isTablet ? 9 : 12)}
                                        blockMargin={isMobile ? 2 : 4}
                                        fontSize={isMobile ? 10 : 12}
                                        blockRadius={2}
                                    />
                                </div>
                            </div>
                        </BlurReveal>
                    </div>

                </div>
            </div>
        </section>
    );
}
