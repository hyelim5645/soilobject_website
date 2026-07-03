"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Button } from "@/components/ui/button";
import { IMAGE_SLOTS, SITE_NAME_KO } from "@/lib/utils/constants";

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
  const heroImage = {
    src: "/hero/hero-01.png",
    alt: "이끼 정원과 앰비언트 조명이 있는 실내 정경",
    width: IMAGE_SLOTS.hero.width,
    height: IMAGE_SLOTS.hero.height,
  };

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-ink text-paper">
      <PlaceholderImage
        image={heroImage}
        tone="dark"
        priority
        sizes="100vw"
        className="absolute inset-0 h-full w-full"
      />
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
