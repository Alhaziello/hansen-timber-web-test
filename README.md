# Hansen Timber Digital Experience

A premium, luxury digital experience, built with enterprise-grade architecture for Hansen Timber. This platform features a high-end, animated architectural aesthetic powered by Next.js Server Components, rigorous SEO optimizations, and seamless headless content management via Sanity CMS.

## 🌟 Architecture & Features

- **Server-First Architecture**: Built using Next.js 16 App Router natively utilizing Server Components to guarantee blazing fast initial load times and top-tier SEO discoverability. 
- **Automated Technical SEO**: Programmatic generation of `sitemap.xml`, configuration of `robots.txt`, and advanced pre-configured 301 URL redirects mapping `hansentimber.co.nz` legacy paths to the new architecture.
- **Client-Side Micro-animations**: Complex page transitions and UI physics isolated into client-side layout abstractions (`ClientMotionDiv`) using Framer Motion.
- **Sanity Studio Integration**: Embedded Headless CMS at `/studio` for intuitive, zero-code management of Products, Species, and the Architectural Journal.
- **Serverless Form Ready**: UI configured for easy drop-in of headless form providers (like Formspree) for secure email delivery.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **CMS / Database**: [Sanity.io](https://www.sanity.io/)
- **Styling**: Tailwind CSS & Styled Components
- **Animations**: Framer Motion
- **Language**: TypeScript

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 20+
- A Sanity.io account and API Token

### 1. Installation
```bash
git clone <your-repo-url>
cd hansen-timber-web
npm install
```

### 2. Environment Variables
You must connect the application to the Sanity database.
```bash
cp .env.example .env.local
```
Fill in `.env.local` with your exact Project ID, Dataset name, and the Write Token.

### 3. Development Server
Start the localized Turbopack server:
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🌱 Production Seeding (First-Time Setup)

When the client provides the final, high-resolution photography and official copy, you can push the data straight into the Sanity Production Database using the included migration script.

1. **Update Local Data**: Replace the placeholder strings and objects in `data/products.ts` and `data/articles.ts` with the real client content. 
2. **Add Images**: Place all referenced `.png` or `.jpg` image files directly into the `public/` directory.
3. **Execute the Migration Pipeline**:
```bash
npx tsx scripts/migrateToSanity.ts
```
The script will programmatically upload the images into the Sanity cloud CDN, link them to the documents, and build the category relationships in seconds.

---

## 📝 Content Management (Sanity Studio)

Once deployed, Hansen Timber staff will manage their content dynamically without interacting with code.

### Accessing the Studio
Navigate to `yourdomain.com/studio` to log in. 

*Note: For the studio to work on the live domain, the production URL (e.g., `https://www.hansentimber.co.nz`) must be added to the **CORS Origins** whitelist inside the Sanity Management Dashboard.*

---

## 📧 Contact Form Delivery

The platform is designed to use **Serverless Form Providers** (such as Formspree or Web3Forms) for lead generation to avoid exposing private SMTP credentials.

To hook up the production form, refer to the strategy guide located at:
`docs/emailstrategy`

## 📄 License
[MIT](LICENSE)
