"use client";

import { HTMLAttributes } from "react";

interface ShareButtonProps extends HTMLAttributes<HTMLButtonElement> {}

export default function ShareButton({ className, children, ...props }: ShareButtonProps) {
  return (
    <button
      {...props}
      onClick={(e) => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard");
        props.onClick?.(e);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
