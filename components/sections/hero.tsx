"use client";

import { useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useMotionTemplate, motion } from "framer-motion";
import { useLanguage } from "@/providers/language-provider";
import { ArrowRight, Mouse } from "lucide-react";
import { ContactModal } from "@/components/modals/contact-modal";
import { InteractiveParticles } from "@/components/effects/interactive-particles";
import IdCard from "@/components/effects/id-card";

export default function Hero() {
    const { content } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const [contactOpen, setContactOpen] = useState(false);

    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 800], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], [1, 0.94]);
    const y = useTransform(scrollY, [0, 800], [0, -150]);
    const blurValue = useTransform(scrollY, [0, 800], [0, 10]);
    const filter = useMotionTemplate`blur(${blurValue}px)`;

    const scrollToProjects = useCallback(() => {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    return (
        <section
            ref={containerRef}
            className="sticky top-0 h-screen w-full flex flex-col justify-between bg-background px-container md:px-16 pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12 2xl:pb-20 overflow-hidden"
            id="home"
        >
            <InteractiveParticles />

            <div className="absolute inset-0 z-10">
                <IdCard />
            </div>

            <motion.div
                style={{ opacity, scale, y, filter }}
                className="relative z-20 flex-1 flex flex-col gap-4 sm:gap-8 xl:gap-10 2xl:gap-16 justify-end w-full h-full will-change-[opacity,transform,filter] pointer-events-none"
            >

                <div className="w-full">
                    <div className="text-4xl sm:text-6xl text-foreground/10 grunge-text rotate-90 pointer-events-none select-none w-fit">
                    {"////"}
                    </div>
                </div>

                <div className="w-full mt-auto flex flex-col justify-center relative z-20 mix-blend-difference">
                    <div className="overflow-hidden">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[7rem] 2xl:text-[140px] font-black tracking-tighter leading-[0.85] text-foreground uppercase whitespace-nowrap">
                            Mukunth
                            <br />
                            <span className="text-foreground/80">
                                Portfolio
                            </span>
                        </h1>
                    </div>
                </div>

                <div className="space-y-4 sm:space-y-8 2xl:space-y-10">
                    <p className="sm:text-lg 2xl:text-xl text-muted-foreground font-light leading-relaxed max-w-xl mix-blend-difference">
                        {content.about.description}
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4 pointer-events-auto">
                        <button
                            onClick={() => setContactOpen(true)}
                            className="w-fit group relative flex h-10 sm:h-12 2xl:h-16 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border/50 bg-foreground px-6 xl:px-8 2xl:px-10 text-background transition-all duration-500 ease-out hover:bg-background hover:border-foreground/30 hover:text-foreground shadow-2xl hover:-translate-y-0.5"
                        >
                            <div className="absolute inset-0 flex h-full w-full justify-center -translate-x-full -skew-x-12 group-hover:duration-1000 group-hover:translate-x-full">
                                <div className="relative h-full w-8 bg-background/20 dark:bg-foreground/10" />
                            </div>
                            <span className="relative z-10 flex items-center gap-2 xl:gap-3 text-xs xl:text-base font-semibold tracking-[0.15em] uppercase">
                                {content.hero.cta_primary}
                                <ArrowRight className="w-3.5 xl:w-5 h-3.5 xl:h-5 transition-transform duration-500 group-hover:translate-x-1" />
                            </span>
                        </button>

                        <button
                            onClick={scrollToProjects}
                            className="w-fit group relative flex h-10 sm:h-12 2xl:h-16 cursor-pointer items-center justify-center px-6 xl:px-8 2xl:px-10 text-muted-foreground transition-all duration-500 hover:text-foreground hover:bg-secondary/15 rounded-full border border-border sm:border-transparent hover:border-border/30 backdrop-blur-sm"
                        >
                            <span className="relative z-10 text-xs xl:text-base font-semibold tracking-[0.15em] uppercase flex items-center gap-2 xl:gap-3">
                                <Mouse className="w-3.5 xl:w-5 h-3.5 xl:h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                {content.hero.cta_secondary}
                            </span>
                        </button>
                    </div>
                </div>

            </motion.div>

            <motion.div 
                style={{ opacity }}
                className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-none mix-blend-difference"
            >
                <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                    Scroll to explore
                </span>
                <div className="w-[14px] h-[24px] rounded-full border-[1px] border-muted-foreground/60 flex justify-center pt-1">
                    <motion.div
                        className="w-[3px] h-[5px] rounded-full bg-blue-500"
                        animate={{
                            y: [0, 8, 0],
                            opacity: [1, 0, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>
            </motion.div>

            <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
        </section>
    );
}