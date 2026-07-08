"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SITE_NAME_KO } from "@/lib/utils/constants";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.4 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 36, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink text-paper">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        poster="/hero/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/hero/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="font-display text-4xl italic leading-tight sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-display), serif" }}
          variants={itemVariants}
        >
          Nature Designed.
          <br />
          Space Completed.
        </motion.p>
        <motion.p
          className="mt-6 text-base text-paper/90 md:text-lg"
          variants={itemVariants}
        >
          자연을 설계하고
          <br />
          공간을 완성합니다.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          variants={itemVariants}
        >
          <Button asChild size="lg">
            <Link href="/objects">오브제 보러가기</Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="border-paper/60 text-paper hover:bg-paper hover:text-ink"
          >
            <Link href="/about">
              Explore {SITE_NAME_KO}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
