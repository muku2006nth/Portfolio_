"use client";

import { ArrowRight } from "lucide-react";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { useLanguage } from "@/providers/language-provider";
import { useState } from "react";
import { ContactModal } from "@/components/modals/contact-modal";
import { ProfileCard } from "@/components/widgets/profile-card";
import { MetricsGrid } from "@/components/widgets/metrics-grid";

export default function About() {
    const { content } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="w-full container-void bg-background text-foreground overflow-hidden relative">
            <div className="container mx-auto px-container">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    <div className="lg:w-[300px] xl:w-1/4 shrink-0">
                        <div className="flex flex-col gap-4 sticky top-32">

                            <div className="-mt-8 lg:-mt-12">
                                <BlurReveal>
                                    <span className="title-counter">
                                        [001]
                                    </span>
                                </BlurReveal>

                                <BlurReveal>
                                    <h2 className="title relative z-10 -mt-2 text-6xl md:text-7xl lg:text-[80px] font-black uppercase tracking-tighter">
                                        {content.about.title}
                                    </h2>
                                </BlurReveal>
                            </div>

                            <BlurReveal>
                                <div className="mt-8 hidden lg:flex lg:flex-col lg:items-center">
                                    <ProfileCard />
                                    <MetricsGrid />
                                </div>
                            </BlurReveal>

                        </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-10 lg:pl-8 xl:pl-12">

                        <BlurReveal>
                            <h3 className="text-3xl md:text-5xl lg:text-[56px] font-serif font-medium leading-[1.15] max-w-4xl tracking-tight text-foreground">
                                {content.about.intro}
                            </h3>
                        </BlurReveal>

                        <BlurReveal>
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
                                </span>
                                <span className="text-sm font-semibold tracking-wide text-green-600 dark:text-green-500 uppercase">
                                    {content.about.status}
                                </span>
                            </div>
                        </BlurReveal>

                        <div className="flex flex-col gap-6 text-lg md:text-[22px] text-muted-foreground leading-relaxed max-w-4xl font-light">
                            <BlurReveal>
                                <p>
                                    {content.about.description}
                                </p>
                            </BlurReveal>
                            <BlurReveal>
                                <p>
                                    {content.about.current_work}
                                </p>
                            </BlurReveal>
                        </div>

                        <BlurReveal>
                            <div className="flex flex-wrap gap-2.5 max-w-3xl pt-2">
                                {content.about.skills?.map((skill: string, index: number) => (
                                    <span key={index} className="px-4 py-2 text-[11px] font-mono tracking-widest uppercase rounded-full border border-foreground/10 text-foreground/70 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/30 hover:text-foreground transition-all duration-300">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </BlurReveal>

                        <BlurReveal>
                            <div className="flex flex-wrap items-center gap-6 mt-4">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="group relative inline-flex cursor-pointer items-center gap-3 text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                                >
                                    <span>{content.about.connect}</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </button>

                                <a
                                    href={content.about.resume_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 text-sm font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
                                >
                                    <span className="pb-0.5">{content.about.resume}</span>
                                </a>
                            </div>
                        </BlurReveal>
                        
                        <ContactModal open={isOpen} onOpenChange={setIsOpen} />

                    </div>
                </div>
            </div>
        </section>
    );
}
