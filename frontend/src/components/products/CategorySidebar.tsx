'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, LayoutGrid, Tag } from 'lucide-react';
import type { Category } from '@/types';

interface CategorySidebarProps {
  categories: Category[];
  activeSlug?: string;
  activeSearch?: string;
}

export default function CategorySidebar({ categories, activeSlug, activeSearch }: CategorySidebarProps) {
  const router = useRouter();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const q = fd.get('search') as string;
    const params = new URLSearchParams();
    if (activeSlug) params.set('category', activeSlug);
    if (q) params.set('search', q);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full lg:w-60 flex-shrink-0"
    >
      <div className="bg-white rounded-2xl border border-medical-border shadow-card p-5 sticky top-24 space-y-6">

        {/* Search */}
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold text-medical-muted uppercase tracking-widest mb-3">
            <Search size={12} /> Search
          </p>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                name="search"
                defaultValue={activeSearch}
                placeholder="Search products…"
                className="w-full bg-medical-light border border-medical-border rounded-xl px-4 py-2.5 text-sm text-medical-dark placeholder:text-medical-muted focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition"
              />
            </div>
            <button
              type="submit"
              className="mt-2.5 w-full bg-primary-700 hover:bg-primary-800 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Categories */}
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold text-medical-muted uppercase tracking-widest mb-3">
            <Tag size={12} /> Categories
          </p>
          <div className="space-y-0.5">
            <Link
              href="/products"
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                !activeSlug
                  ? 'bg-primary-700 text-white shadow-sm'
                  : 'text-medical-muted hover:bg-medical-light hover:text-medical-dark'
              }`}
            >
              <LayoutGrid size={14} className="flex-shrink-0" />
              <span className="flex-1">All Products</span>
            </Link>

            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSlug === cat.slug
                    ? 'bg-primary-700 text-white shadow-sm'
                    : 'text-medical-muted hover:bg-medical-light hover:text-medical-dark'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-60" />
                <span className="flex-1 truncate">{cat.name}</span>
                {cat.products_count !== undefined && (
                  <span className={`text-xs tabular-nums ${activeSlug === cat.slug ? 'text-white/70' : 'text-medical-muted/60'}`}>
                    {cat.products_count}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
