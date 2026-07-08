"use client";

import { Children } from "react";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// Shared scroll-reveal primitives so every homepage section unfurls the same
// way Hero's title/subtitle/buttons do, instead of just snapping into view.
// Trigger point is pushed inward (viewport margin) and the motion is slower
// than a typical UI micro-interaction, on purpose: at a normal scroll speed a
// quick/early-firing reveal finishes before the section is even centered on
// screen, which reads as "nothing happened" rather than as a reveal.
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

/** Wraps a section's direct children (each must be Reveal.Item or RevealGrid) so they stagger in as the section scrolls into view. */
export function Reveal({
  children,
  className,
  amount = 0.3,
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
      viewport={{ once: true, amount, margin: "0px 0px -20% 0px" }}
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
