/**
 * @file ShareButton.tsx
 * @description A utility component that leverages the Clipboard API to allow users to copy the current page URL.
 * Designed as a headless-style wrapper to accept generic children and external CSS classes.
 * @dependencies react
 * @state Stateless, but interfaces with the browser's `navigator.clipboard` API.
 */
/* eslint-disable */
"use client"; // NOTE: Must be a client component because it interfaces with the browser's `navigator.clipboard` API

import { HTMLAttributes } from "react";

/**
 * Configuration properties for the ShareButton, extending standard HTML button attributes.
 */
interface ShareButtonProps extends HTMLAttributes<HTMLButtonElement> {}

/**
 * Renders a customizable button that copies the current `window.location.href` to the clipboard on click.
 */
export default function ShareButton({ className, children, ...props }: ShareButtonProps) {
  return (
    <button
      {...props}
      onClick={(e) => {
        // NOTE: The Clipboard API requires a secure context (HTTPS) or localhost to function properly.
        // EDGE CASE: If the clipboard write fails (e.g., due to permissions), it silently fails here. A proper implementation should catch the Promise rejection.
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
