"use client"; // Must be a client component because it interfaces with the browser's `navigator.clipboard` API

import { HTMLAttributes } from "react";

interface ShareButtonProps extends HTMLAttributes<HTMLButtonElement> {}

/**
 * ShareButton Component
 * 
 * A simple utility wrapper around a button that copies the current URL to the user's clipboard.
 * It passes through any child elements and CSS classes provided to it so it can be styled easily.
 * 
 * Beginner Note:
 * Standard `button` elements don't inherently know how to copy text. We add an `onClick` event
 * that utilizes the browser's `navigator.clipboard.writeText` to perform the actual copying.
 */
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
