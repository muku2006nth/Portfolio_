"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionTemplate } from "framer-motion";

import ThemeSwitcher from "@/components/widgets/theme-switcher";
import { useLanguage } from "@/providers/language-provider";
import { useLenis } from "@/providers/smooth-scroll-provider";

export default function Navbar() {
  const { content } = useLanguage();
  const lenis = useLenis();
  const [screenWidth, setScreenWidth] = useState(1920);
  const [containerWidth, setContainerWidth] = useState(1280);
  const [scrollHeight, setScrollHeight] = useState(800);
  const dummyRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const bgOpacity = useTransform(scrollY, (val) => Math.min(val / scrollHeight, 1));
  const backdropBlur = useTransform(scrollY, (val) => Math.min(val / scrollHeight, 1) * 16);
  const backdropFilter = useMotionTemplate`blur(${backdropBlur}px)`;

  const py = useTransform(scrollY, (val) => {
    const ratio = Math.min(val / scrollHeight, 1);
    return 24 - ratio * 12;
  });

  const startWidth = Math.max(screenWidth, containerWidth);
  const navMaxWidth = useTransform(scrollY, (val) => {
    const ratio = Math.min(val / scrollHeight, 1);
    return startWidth - ratio * (startWidth - containerWidth);
  });

  const navLinks = useMemo(() => [
    { name: content.nav.home, href: "#home" },
    { name: content.nav.about, href: "#about" },
    { name: content.nav.stack, href: "#stack" },
    { name: content.nav.projects, href: "#projects" },
    { name: content.nav.roadmap, href: "#roadmap" },
    { name: content.nav.contact, href: "#contact" },
  ], [content.nav]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      setScrollHeight(window.innerHeight);

      const updateDimensions = () => {
        setScreenWidth(window.innerWidth);
        setScrollHeight(window.innerHeight);
        if (dummyRef.current) {
          setContainerWidth(dummyRef.current.getBoundingClientRect().width);
        }
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, []);



  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);

    if (elem || targetId === "home") {

      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(targetId === "home" ? 0 : elem!, {
            offset: targetId === "home" ? 0 : -80,
            duration: 1.5,
          });
        } else {
          if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            elem?.scrollIntoView({
              behavior: "smooth",
            });
          }
        }
      }, 100);
    }
  };

  return (
    <motion.header
      style={{
        paddingTop: py,
        paddingBottom: py,
      }}
      className="fixed top-0 left-0 right-0 z-[100] transition-colors duration-300"
    >
      <div ref={dummyRef} className="container invisible absolute pointer-events-none -z-50" />

      <motion.div
        style={{
          opacity: bgOpacity,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
        }}
        className="absolute inset-0 bg-background/75 border-b border-border/40 -z-10 pointer-events-none"
      />

      <motion.nav
        style={{
          maxWidth: navMaxWidth,
        }}
        className="mx-auto px-container flex items-center justify-between w-full"
      >
        <Link
          href="#home"
          onClick={(e) => scrollToSection(e, "#home")}
          className="relative z-[110] flex items-center gap-2 group shrink-0 mr-4 sm:mr-8"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tighter uppercase text-foreground transition-all duration-300 group-hover:opacity-70">
            mukunth gopi
          </span>
        </Link>

        <div className="flex items-center overflow-x-auto no-scrollbar flex-1 justify-center mr-4 lg:mr-8">
          <ul className="flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.name} className="shrink-0">
                <Link
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          <Link
            href="https://drive.google.com/file/d/1bvmXs-ALVv7-KFmvVh8BHvIU-Vv8vUBX/view?usp=sharing"
            target="_blank"
            className="shrink-0 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-md shadow-primary/20"
          >
            {content.nav.resume}
          </Link>
          <ThemeSwitcher />
        </div>
      </motion.nav>


    </motion.header>
  );
}
