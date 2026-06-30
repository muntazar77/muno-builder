# Muno Builder Project Overview

## What this project is
Muno Builder is a monorepo for building multi-tenant marketing sites and content-driven web experiences. It combines a Strapi v5 backend for content management with an Astro 6 frontend for server-side rendering and flexible page templates.

## Main structure
- apps/muno-builder-backend: Strapi CMS, API, content types, and admin configuration.
- apps/muno-builder-frontend: Astro frontend, SSR pages, shared components, and template system.
- docs: project documentation and architecture notes.

## Backend
The backend is built with Strapi v5 and handles:
- content collections for pages, sections, menus, and site data
- dynamic zone content for reusable page blocks
- tenant-level data such as client names, addresses, and navigation links

## Frontend
The frontend is built with Astro 6 and uses:
- full SSR for fast and SEO-friendly pages
- a dynamic section renderer for mapping Strapi blocks to UI components
- reusable templates for different visual brands
- Tailwind CSS styling for responsive layouts

## Template approach
The frontend uses a registry-based rendering pattern. Each template can provide its own header, footer, hero, and section components, and the renderer selects the correct component based on the requested block type.

## Recommended workflow
1. Create or update content in Strapi.
2. Use the frontend to render pages through SSR.
3. Add new sections or templates in the frontend when a new vertical is needed.

## Tech stack summary
- Frontend: Astro 6, TypeScript, Tailwind CSS
- Backend: Strapi v5, Node.js
- Rendering: Server-side rendering (SSR)
