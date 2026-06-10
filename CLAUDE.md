# CLAUDE.md — Medcina Pvt Ltd Website

## Project
Medical supply company website with CMS.
Frontend: Next.js + Tailwind + Framer Motion
Backend/CMS: Laravel + Filament
DB: MySQL
Hosting: DigitalOcean VPS

## Rules
- Never invent product names, certifications, brands, prices, or medical claims
- Use [To be provided by Medcina] for missing info
- Always confirm medical/compliance content before finalizing

## Stack Decisions
- CMS: Laravel Filament (chosen over Strapi/Directus — same PHP stack, full control)
- API: Laravel REST API consumed by Next.js
- Animations: Framer Motion + CSS (no GSAP unless needed)
