'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MessageCircle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { cn, formatImageUrl, truncate } from '@/lib/utils';
import type { Product } from '@/types';

const statusConfig = {
  available:    { label: 'In Stock',     icon: CheckCircle2, className: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  out_of_stock: { label: 'Out of Stock', icon: XCircle,      className: 'text-red-600 bg-red-50 border-red-200' },
  discontinued: { label: 'Discontinued', icon: Clock,        className: 'text-gray-500 bg-gray-50 border-gray-200' },
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const status     = statusConfig[product.availability_status];
  const StatusIcon = status.icon;
  const primaryImage = product.images.find(img => img.is_primary) ?? product.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-shadow duration-300 h-full flex flex-col border border-medical-border/60">

        {/* ── Image ── */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#f8faf8] to-[#f0f5f0] flex-shrink-0">

          {/* Invisible full-area link for card navigation */}
          <Link href={`/products/${product.slug}`} className="absolute inset-0 z-10" aria-label={product.name} />

          {primaryImage ? (
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={formatImageUrl(primaryImage.url)}
                alt={primaryImage.alt || product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-contain"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
                <span className="text-3xl">💊</span>
              </div>
              <span className="text-xs text-medical-muted">No image</span>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute inset-x-0 top-0 p-3 flex items-start justify-between pointer-events-none z-20">
            <span className="text-[11px] font-semibold bg-white/95 backdrop-blur-sm border border-medical-border/60 text-primary-700 px-2.5 py-1 rounded-full shadow-sm">
              {product.category.name}
            </span>
            {product.is_featured && (
              <span className="text-[11px] font-semibold bg-amber-500 text-white px-2.5 py-1 rounded-full shadow-sm">
                ★ Featured
              </span>
            )}
          </div>

          {/* Hover overlay — quick enquiry slides up */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
            <div className="bg-gradient-to-t from-primary-900/90 to-primary-900/60 backdrop-blur-sm px-4 py-4 flex items-center justify-center">
              <Link
                href={`/contact?product=${product.slug}&product_name=${encodeURIComponent(product.name)}`}
                className="flex items-center gap-2 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/30 px-4 py-2 rounded-xl transition-colors"
              >
                <MessageCircle size={14} />
                Quick Enquiry
              </Link>
            </div>
          </div>

          {/* Bottom depth gradient */}
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none z-10" />
        </div>

        {/* ── Content ── */}
        <div className="p-5 flex flex-col flex-1 gap-3">
          <div className="flex-1">
            <Link href={`/products/${product.slug}`} className="group/title">
              <h3 className="font-display font-bold text-medical-dark text-[15px] leading-snug group-hover/title:text-primary-700 transition-colors line-clamp-2 mb-1.5">
                {product.name}
              </h3>
            </Link>
            <p className="text-medical-muted text-sm leading-relaxed line-clamp-2">
              {truncate(product.short_description, 90)}
            </p>
          </div>

          <div className="pt-3 border-t border-medical-border/60 flex items-center justify-between gap-3">
            <span className={cn('inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border', status.className)}>
              <StatusIcon size={11} />
              {status.label}
            </span>

            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-900 transition-colors group/link"
            >
              View Details
              <ArrowUpRight
                size={14}
                className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Left accent bar — grows in on hover */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-primary-400 to-sage-500 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-400 ease-out rounded-l-2xl" />
      </div>
    </motion.article>
  );
}
