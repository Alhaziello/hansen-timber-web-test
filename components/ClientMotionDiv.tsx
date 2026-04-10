"use client"; // Marks this as a client component because Framer Motion animations require the browser's DOM.

import { motion, HTMLMotionProps } from "framer-motion";

/**
 * Client Motion Wrappers
 * 
 * What is this?
 * Next.js App Router defaults to "Server Components" which cannot run browser animations.
 * However, turning an entire page into a "Client Component" just to use Framer Motion ruins SEO and performance.
 * 
 * The Solution:
 * We create these tiny wrapper components. They take standard HTML elements (div, span, header)
 * and wrap them in Framer Motion functionality. By importing these wrappers into Server Components,
 * we get the best of both worlds: Server-side rendering AND client-side animations!
 */

export const ClientMotionDiv = (props: HTMLMotionProps<"div">) => {
  return <motion.div {...props}>{props.children}</motion.div>;
};

export const ClientMotionSpan = (props: HTMLMotionProps<"span">) => {
  return <motion.span {...props}>{props.children}</motion.span>;
};

export const ClientMotionHeader = (props: HTMLMotionProps<"header">) => {
  return <motion.header {...props}>{props.children}</motion.header>;
};

export const ClientMotionFooter = (props: HTMLMotionProps<"footer">) => {
  return <motion.footer {...props}>{props.children}</motion.footer>;
};

export const ClientMotionArticle = (props: HTMLMotionProps<"article">) => {
  return <motion.article {...props}>{props.children}</motion.article>;
};
