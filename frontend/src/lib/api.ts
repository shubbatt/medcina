import axios from 'axios';
import type { PaginatedResponse, ApiResponse, Product, Category, EnquiryFormData, ContactFormData, SiteSettings, HeroSettings, AboutSettings } from '@/types';

const baseURL =
  typeof window === 'undefined'
    ? (process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1')
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// ─── Products ──────────────────────────────────────────────────────────────

export const getProducts = async (params?: {
  category?: string;
  search?: string;
  page?: number;
  per_page?: number;
  featured?: boolean;
}): Promise<PaginatedResponse<Product>> => {
  const { data } = await api.get('/products', { params });
  return data;
};

export const getProduct = async (slug: string): Promise<Product> => {
  const { data } = await api.get<ApiResponse<Product>>(`/products/${slug}`);
  return data.data;
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<ApiResponse<Product[]>>('/products/featured');
  return data.data;
};

// ─── Categories ────────────────────────────────────────────────────────────

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<ApiResponse<Category[]>>('/categories');
  return data.data;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const { data } = await api.get<ApiResponse<Category>>(`/categories/${slug}`);
  return data.data;
};

// ─── Settings ──────────────────────────────────────────────────────────────

export const getContactSettings = async (): Promise<SiteSettings> => {
  const { data } = await api.get<ApiResponse<SiteSettings>>('/settings/contact');
  return data.data;
};

export const getHeroSettings = async (): Promise<HeroSettings> => {
  const { data } = await api.get<ApiResponse<HeroSettings>>('/settings/hero');
  return data.data;
};

export const getAboutSettings = async (): Promise<AboutSettings> => {
  const { data } = await api.get<ApiResponse<AboutSettings>>('/settings/about');
  return data.data;
};

// ─── Forms ─────────────────────────────────────────────────────────────────

export const submitEnquiry = async (formData: EnquiryFormData): Promise<{ message: string }> => {
  const { data } = await api.post('/enquiries', formData);
  return data;
};

export const submitContact = async (formData: ContactFormData): Promise<{ message: string }> => {
  const { data } = await api.post('/contact', formData);
  return data;
};

export default api;
