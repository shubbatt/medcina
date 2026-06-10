# Medcina Pvt Ltd — Website

Modern medical supply company website with CMS.

## Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | Next.js 14, Tailwind CSS, Framer Motion |
| Backend  | Laravel 11, PHP 8.2               |
| CMS      | Laravel Filament v3               |
| Database | MySQL 8                           |
| Media    | Spatie Media Library              |
| Hosting  | DigitalOcean VPS (Ubuntu 22.04)   |

---

## Project Structure

```
medcina/
├── frontend/               # Next.js app
│   ├── src/
│   │   ├── app/            # Pages (App Router)
│   │   │   ├── page.tsx            # Home
│   │   │   ├── about/page.tsx      # About
│   │   │   ├── products/page.tsx   # Products listing
│   │   │   ├── products/[slug]/    # Product detail
│   │   │   └── contact/page.tsx    # Contact/Enquiry
│   │   ├── components/
│   │   │   ├── layout/     # Navbar, Footer
│   │   │   ├── sections/   # Page sections
│   │   │   ├── products/   # Product components
│   │   │   └── ui/         # Shared UI
│   │   ├── lib/            # API client, utils
│   │   └── types/          # TypeScript types
│   └── public/
│
├── backend/                # Laravel API + Filament CMS
│   ├── app/
│   │   ├── Models/         # Product, Category, Enquiry
│   │   ├── Http/
│   │   │   ├── Controllers/Api/    # REST API
│   │   │   ├── Requests/           # Validation
│   │   │   └── Resources/          # API transformers
│   │   └── Filament/
│   │       ├── Resources/          # CMS panels
│   │       └── Widgets/            # Dashboard stats
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php
│
└── deploy/
    ├── nginx-api.conf
    ├── nginx-frontend.conf
    ├── ecosystem.config.js
    └── deploy.sh
```

---

## Local Development Setup

### Backend (Laravel)

```bash
cd backend
cp .env.example .env

# Edit .env — set DB credentials, APP_KEY, etc.

composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan serve  # Runs on http://localhost:8000
```

**Filament admin panel:** http://localhost:8000/admin
- Default email: `admin@medcina.mv`
- Default password: `change-me-immediately`
- **Change this immediately after first login.**

### Frontend (Next.js)

```bash
cd frontend
cp .env.local.example .env.local

# Edit .env.local:
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

npm install
npm run dev  # Runs on http://localhost:3000
```

---

## API Endpoints

| Method | Endpoint                    | Description           |
|--------|-----------------------------|-----------------------|
| GET    | /api/v1/products            | List products (paginated, filterable) |
| GET    | /api/v1/products/featured   | Featured products     |
| GET    | /api/v1/products/{slug}     | Single product        |
| GET    | /api/v1/categories          | All categories        |
| GET    | /api/v1/categories/{slug}   | Single category       |
| POST   | /api/v1/enquiries           | Submit enquiry        |

### Query params for `/api/v1/products`
- `category` — filter by category slug
- `search` — search by name/description
- `page` — page number
- `per_page` — results per page (max 48)
- `featured=1` — only featured products

---

## CMS Usage (Filament)

Login at `/admin`. The CMS allows you to:

- **Products** — Add, edit, delete products; upload images (reorderable), attach brochure PDFs, set specs, toggle availability/featured/active, manage SEO fields
- **Categories** — Add/edit product categories with images
- **Enquiries** — View all submitted enquiries, update status, add internal notes. Badge shows count of new enquiries.
- **Dashboard** — Stats overview: total products, categories, new/total enquiries

---

## Production Deployment (DigitalOcean)

**Minimum droplet:** 2 vCPU / 4GB RAM / 80GB SSD

```bash
# 1. Point DNS records:
#    medcina.mv        → Droplet IP
#    www.medcina.mv    → Droplet IP
#    api.medcina.mv    → Droplet IP

# 2. SSH into droplet and run:
bash deploy/deploy.sh

# 3. After deploy:
#    - Change Filament admin password
#    - Update .env mail settings for enquiry notifications
#    - Upload product images via /admin
```

**GitHub Actions CI/CD** — set these repository secrets:
- `VPS_HOST` — droplet IP
- `VPS_USER` — ssh user (root or deploy)
- `VPS_SSH_KEY` — private SSH key
- `NEXT_PUBLIC_API_URL` — https://api.medcina.mv/api/v1
- `NEXT_PUBLIC_SITE_URL` — https://medcina.mv

---

## Content To Provide (Placeholders)

Before launch, fill in all `[To be provided by Medcina]` placeholders:

- [ ] Phone number
- [ ] Email address
- [ ] Physical address / location
- [ ] Business hours
- [ ] Company introduction paragraphs
- [ ] Mission statement
- [ ] Vision statement
- [ ] Statistics (years experience, clients served, products count)
- [ ] Hero image / product showcase image
- [ ] Category images
- [ ] All product data (names, descriptions, specs, images)
- [ ] Certifications / approvals (if any)
- [ ] Partner logos (if any)

---

## Notes & Warnings

- **Never commit `.env` files** to git — `.gitignore` covers this
- **Image uploads** — Spatie Media Library stores files in `storage/app/public`. Run `php artisan storage:link` after each deploy.
- **Queue** — Enquiry email notifications use `QUEUE_CONNECTION=database`. Run `php artisan queue:work` as a daemon or add to supervisor.
- **Caching** — Run `php artisan optimize` after config changes in production
- **Backups** — Set up automated MySQL backups on DigitalOcean (Managed DB or `mysqldump` cron)
