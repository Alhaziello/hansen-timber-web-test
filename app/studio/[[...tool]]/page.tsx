/**
 * @file page.tsx (Sanity Studio)
 * @description Embedded Sanity Studio route. Allows content editors to manage CMS data directly from the Next.js app.
 * @dependencies next-sanity/studio
 * @route /studio
 * @state Static (forced static generation).
 */
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

/**
 * Renders the Next.js embedded Sanity Studio.
 */
export default function StudioPage() {
  // NOTE: This component wraps the official `NextStudio` component and mounts it using our local `sanity.config`.
  // EDGE CASE: If deployed, ensure the route is protected or the Studio configuration manages its own auth.
  return <NextStudio config={config} />
}
