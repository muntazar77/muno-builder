# Muno Builder

Muno Builder is a monorepo for creating content-driven websites with a Strapi backend and an Astro frontend. It is designed for multi-tenant projects where each client can have their own branded template, content sections, and SSR-rendered pages.

## Project structure
- apps/muno-builder-backend: Strapi v5 CMS, API, and admin configuration.
- apps/muno-builder-frontend: Astro 6 frontend with SSR pages, shared components, and template-based rendering.
- docs: project documentation and architecture notes.

## Tech stack
- Frontend: Astro 6, TypeScript, Tailwind CSS
- Backend: Strapi v5, Node.js
- Rendering: Server-side rendering (SSR)

## Quick start
### Backend
```bash
cd apps/muno-builder-backend
npm install
npm run develop
```

### Frontend
```bash
cd apps/muno-builder-frontend
npm install
npm run dev
```

## Notes
The frontend uses a dynamic section renderer so content from Strapi can be mapped to reusable UI components. New visual themes and vertical templates can be added under the frontend template folder.
