// ─── Product Types ─────────────────────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  products_count?: number;
}

export interface ProductImage {
  id: number;
  url: string;
  alt: string | null;
  is_primary: boolean;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: Category;
  short_description: string;
  full_description: string;
  images: ProductImage[];
  specifications: ProductSpecification[];
  brochure_url: string | null;
  availability_status: 'available' | 'out_of_stock' | 'discontinued';
  is_featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

// ─── API Response Types ─────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

// ─── Enquiry Types ──────────────────────────────────────────────────────────

export interface EnquiryFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
  product_id?: number;
  turnstile_token?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
}

// ─── Page Content Types ────────────────────────────────────────────────────

export interface HeroContent {
  headline: string;
  subheadline: string;
  cta_primary: string;
  cta_secondary: string;
  image: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  mission: string;
  vision: string;
  values: { title: string; description: string }[];
  phone: string;
  email: string;
  address: string;
}

// ─── Site Settings ─────────────────────────────────────────────────────────

export interface SiteSettings {
  contact_phone:    string | null;
  contact_email:    string | null;
  contact_address:  string | null;
  contact_whatsapp: string | null;
  opening_hours:    string | null;
  company_tagline:  string | null;
}

export interface HeroSettings {
  hero_image:       string | null;
  hero_headline:    string | null;
  hero_subheadline: string | null;
}

export interface AboutSettings {
  about_headline:       string | null;
  about_subheadline:    string | null;
  about_company_image:  string | null;
  about_intro_1:        string | null;
  about_intro_2:        string | null;
  about_mission:        string | null;
  about_vision:         string | null;
}

// ─── Navigation ────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
