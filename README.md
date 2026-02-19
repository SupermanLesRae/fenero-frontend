This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Structure

```bash

project/
│
├── app/
│   ├── (site)
│   │   ├── page.jsx
│   │   └── ...
│   ├── ... #layout, loading, not found, global.css
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts
│   │   ├── requestcallback/
│   │   │   └── route.ts
│   │   └── search/
│   │       └── route.ts
│
├── components/
│   └── global/ # Reusable Global UI components eg Footer, Header Menus
│   └── layout/
│   └── navigation/  # Reusable Menu UI components
│   └── sections/ # Reusable custom UI components
│   └── ui/
│   └── utilities/
│
├── lib/ # Utilities, helpers, configs
│   └── ...
│
├── public/ # Static assets, sitemaps, robot.txt
│   └── images/
│
├── next.config.js
├── tailwind.config.js
├── postcss.config.mjs
├── package.json
└── README.md


```

## How the Site Works

Static-Generated Pages (SSG)

The pages inside app/(site) are pre-rendered at build time using Static Site Generation.
This means:

Pages are turned into HTML before deployment

They load extremely fast

They can be cached on the CDN

They only rebuild when content changes or when you manually rebuild the site

This approach is ideal for a marketing website, blog, or landing pages where content doesn’t change every second.

## API Calls via GraphQL

The website communicates with the backend using GraphQL queries and mutations.
Your API routes (e.g. /api/contact, /api/search, /api/requestcallback) act as secure server-side middle layers that:

Receive requests from your frontend

Call the headless CMS via GraphQL

Return data or perform an action

Never expose private tokens to the client

This keeps your keys and schemas protected on the server.

## Headless CMS: WordPress (GraphQL Endpoint)

Content is managed in WordPress, which is used purely as a headless CMS.

Editors manage content in the WordPress dashboard

WordPress exposes that content through its GraphQL API (usually via WPGraphQL plugin)

Your Next.js API routes fetch this data during build or runtime

The frontend renders the content using static generation

Benefits:

You get the familiar WordPress editing experience

But the frontend is fully custom, modern, and lightning-fast

The site stays secure since users never access WordPress directly

## Server-Side Rendering (SSR)

The pages inside the app/(site) directory are rendered using Server-Side Rendering, meaning each page is generated on the server at request time, not ahead of time during the build.

A user visits a page (e.g., /services, /about, /search).

The server fetches the required data — often via GraphQL queries to your headless CMS.

The server builds the HTML for the page on the fly.

The completed page is sent to the browser.

This ensures users always receive fresh, up-to-date content, even when your CMS content changes frequently.

## Server-Side Rendering (SSR)

SSR is ideal when:

Content updates often and must appear immediately.

SEO is important (server-rendered HTML is crawler-friendly).

Pages rely on dynamic data (e.g., search results or listings).

You want predictable performance without waiting for static regeneration.

Because rendering happens on the server, client bundles remain smaller, helping page load performance.

## SR + GraphQL API Layer

Your API routes (such as /api/search, /api/contact, /api/requestcallback) act as secure server endpoints that handle GraphQL operations.

During SSR:

The server page requests data from these API routes.

The API routes communicate with your CMS via GraphQL.

The rendered page includes the latest data directly from the server.

This structure keeps private tokens secure while ensuring every page load receives accurate, current content.

## Email & Form Handling

The site uses a secure, layered approach for processing form submissions and sending emails. This ensures reliability, spam protection, and flexibility across environments.

## Email Sending with Resend

All form submissions (e.g., Contact, Request Callback) use Resend as the primary email delivery service.

How it works:

The user submits a form.

The corresponding API route (/api/contact or /api/requestcallback) validates the input.

The API route calls Resend’s server-side SDK.

Resend delivers the email to the destination inbox.

Benefits:

No SMTP management required

High deliverability

Built-in logging and tracking

API keys stay securely on the server

Works seamlessly with Next.js Route Handlers

## Spam Protection with Google reCAPTCHA

To prevent automated submissions, forms are protected using Google reCAPTCHA.

How it works:

The frontend executes reCAPTCHA and receives a token.

The token is sent along with the form submission to your API route.

The API route validates the token against Google's reCAPTCHA verification endpoint.

Only valid, human-submitted requests continue to email sending.

Benefits:

Blocks bots and spam

Lightweight and easy to integrate

Keeps your email API quotas clean

Enhances security for all form endpoints

## SMTP (Fallback / Alternative)

In addition to Resend, the project is configured to optionally send email using standard SMTP settings when required.

This allows:

Flexible deployment environments

Compatibility with corporate mail servers

Local development without relying on external services

Typical SMTP values stored in environment variables:

SMTP_HOST – mail server hostname

SMTP_PORT – server port

SMTP_USER – username

SMTP_PASSWORD – password

SMTP_FROM – default From address

Your API route decides which method to use (Resend or SMTP) based on environment configuration.

## Combined Flow

Frontend → reCAPTCHA → API Route → (Resend or SMTP) → Email Sent

This architecture ensures:

Secure form submissions

Spam-free processing

Reliable email delivery

Server-only access to secrets

Flexible fallback options

## Deploying to Vercel

The project is deployed using Vercel, which provides automatic builds, previews, and production deployments based on your Git repository activity.

How Deployment Works

You push commits to your Git repository.

Vercel detects the changes automatically.

Vercel rebuilds the project using the updated code.

Once the build finishes, the latest version is deployed.

This ensures the site is always up to date with the latest changes—no manual deployments required.

## Development & Staging Environments

Vercel automatically provides Preview Deployments for non-production branches (such as development, dev, staging, etc.).

How this helps:

Every commit to your development branch gets its own unique staging/preview URL.

You can share these URLs with team members or clients to review changes before they go live.

These preview environments use your configured development environment variables.

Example workflow:

main branch → Production deployment

development branch → Staging/Preview deployment

Feature branches → Temporary preview URLs for testing before merging

This keeps production stable while allowing work-in-progress features to be reviewed safely.

## Summary

Commit code → Vercel rebuilds and deploys automatically

main = production

development = staging/preview

Every update generates a new preview URL

No manual servers, no deployments to manage
