This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Content Management (Sanity Studio)

The Hansen Journal is powered by [Sanity CMS](https://www.sanity.io). This allows the client to manage articles, images, and technical narratives without touching the code.

### Instructions for Content Managers

1.  **Accessing the Studio**: Navigate to `/studio` in your browser. This is an embedded Sanity Studio directly within the application.
2.  **Authentication**: Sign in using your Sanity credentials (Google, GitHub, or Email/Password).
3.  **Managing the Journal**:
    -   Go to the **"Journal Post"** section.
    -   Click the **"+" icon** to create a new article.
    -   **Field Guide**:
        -   **Title**: The main header of the article.
        -   **Slug**: Click "Generate" to create a URL-friendly name.
        -   **Main Image**: High-resolution architectural photography (Auto-optimized).
        -   **Category**: Labels like "Technical Guide" or "Events".
        -   **Published At**: Controls the order of the articles.
        -   **Body**: Uses **Rich Text** (Portable Text) for advanced formatting and links.
4.  **Publishing**: Once finished, click the **"Publish"** button. The changes will reflect on the live site almost instantly.
