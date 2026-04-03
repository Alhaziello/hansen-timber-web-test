"use client";

import { motion, HTMLMotionProps } from "framer-motion";

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
