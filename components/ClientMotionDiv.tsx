"use client";

import { motion, HTMLMotionProps } from "framer-motion";

export const ClientMotionDiv = (props: HTMLMotionProps<"div">) => {
  return <motion.div {...props}>{props.children}</motion.div>;
};

export const ClientMotionSpan = (props: HTMLMotionProps<"span">) => {
  return <motion.span {...props}>{props.children}</motion.span>;
};
