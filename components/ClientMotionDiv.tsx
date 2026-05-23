/**
 * @file ClientMotionDiv.tsx
 * @description Provides a suite of "use client" wrappers around Framer Motion's HTML components.
 * This architectural pattern allows Server Components to safely render animated client-side elements
 * without forcing the entire parent tree into client-side rendering boundaries.
 * @dependencies framer-motion
 * @state Stateless pure layout wrappers.
 */
"use client"; // NOTE: Marks this as a client component because Framer Motion animations require the browser's DOM.

import { motion, HTMLMotionProps } from "framer-motion";

// EDGE CASE: If these wrappers are abused to wrap massive non-animated DOM trees, 
// they will inflate the JS bundle and defeat the purpose of React Server Components.
// Only wrap the specific elements that require interaction or layout animations.

/**
 * A client-side Framer Motion wrapper for standard <div> elements.
 * @param props Standard HTML properties combined with Framer Motion animation properties.
 */
export const ClientMotionDiv = (props: HTMLMotionProps<"div">) => {
  return <motion.div {...props}>{props.children}</motion.div>;
};

/**
 * A client-side Framer Motion wrapper for standard <span> elements.
 * @param props Standard HTML properties combined with Framer Motion animation properties.
 */
export const ClientMotionSpan = (props: HTMLMotionProps<"span">) => {
  return <motion.span {...props}>{props.children}</motion.span>;
};

/**
 * A client-side Framer Motion wrapper for standard <header> elements.
 * @param props Standard HTML properties combined with Framer Motion animation properties.
 */
export const ClientMotionHeader = (props: HTMLMotionProps<"header">) => {
  return <motion.header {...props}>{props.children}</motion.header>;
};

/**
 * A client-side Framer Motion wrapper for standard <footer> elements.
 * @param props Standard HTML properties combined with Framer Motion animation properties.
 */
export const ClientMotionFooter = (props: HTMLMotionProps<"footer">) => {
  return <motion.footer {...props}>{props.children}</motion.footer>;
};

/**
 * A client-side Framer Motion wrapper for standard <article> elements.
 * @param props Standard HTML properties combined with Framer Motion animation properties.
 */
export const ClientMotionArticle = (props: HTMLMotionProps<"article">) => {
  return <motion.article {...props}>{props.children}</motion.article>;
};
