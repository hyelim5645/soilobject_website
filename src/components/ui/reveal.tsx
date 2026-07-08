"use client";

import { Children } from "react";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Shared scroll-reveal primitives so every homepage section unfurls the same
// way Hero's title/subtitle/buttons do, instead of just snapping into view.
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

/** Wraps a section's direct children (each must be Reveal.Item or RevealGrid) so they stagger in as the section scrolls into view. */
export function Reveal({
  children,
  className,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

/** A single reveal step within a <Reveal> (e.g. a heading row). */
export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/** A grid/row of cards: reveals as one step in the parent stagger, then cascades its own children in afterward. */
export function RevealGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={containerVariants}>
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
