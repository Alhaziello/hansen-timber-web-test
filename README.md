# Hansen Timber Web

A premium, luxury digital experience for Hansen Timber, featuring a high-end architectural aesthetic and seamless content management via Sanity CMS.

## 🌟 Key Features

- **Luxury Design**: Minamalist, high-contrast UI with smooth animations (Framer Motion).
- **Dynamic Content**: Product, species, and blog data managed through Sanity CMS.
- **Micro-animations**: Subtle transitions and hover effects for a premium feel.
- **Responsive Layout**: Fully optimized for all device sizes.
- **Sanity Studio**: Embedded content management at `/studio`.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **CMS**: [Sanity.io](https://www.sanity.io/)
- **Styling**: Tailwind CSS & Styled Components
- **Animations**: Framer Motion
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A Sanity.io account

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd hansen-timber-web
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Copy the example file and fill in your Sanity credentials.
    ```bash
    cp .env.example .env.local
    ```
    *Required variables*: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_WRITE_TOKEN`.

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Content Management (Sanity Studio)

The site uses Sanity Studio to manage content dynamically.

### Accessing the Studio

Navigate to `/studio` on your local or deployed site. You can edit:
- **Products**: Manage timber product listings and details.
- **Species**: Update information on different timber species.
- **Journal Posts**: Write and publish articles for the "Journal" section.

### Instructions for Content Managers

1.  **Authentication**: Sign in using your Sanity credentials.
2.  **Creating Content**: Use the "Desk" tool to find the relevant schema (e.g., "Journal Post").
3.  **Publishing**: Click the "Publish" button to push changes live instantly.

## 🛡️ Security & Publication

- This project is configured with a robust `.gitignore` to prevent leaking secrets.
- Environment variables are managed via `.env.local` (ignored) and documented in `.env.example`.
- All dependencies have been audited for security.

## 📄 License

[MIT](LICENSE)
