'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import type { Product } from '@/types';

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="badge-primary text-xs font-semibold uppercase tracking-widest mb-4 inline-flex">
                Featured Products
              </span>
              <h2 className="section-title">Products We Carry</h2>
              <p className="section-subtitle">
                A selection of medical products available for order and enquiry.
              </p>
            </div>
            <Link href="/products" className="btn-outline text-sm flex-shrink-0">
              View All Products
              <ArrowRight size={15} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
