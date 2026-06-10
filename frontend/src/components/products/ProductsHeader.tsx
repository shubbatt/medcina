'use client';

import { motion } from 'framer-motion';
import { Package2 } from 'lucide-react';

interface ProductsHeaderProps {
  total: number;
  activeCategoryName?: string;
  search?: string;
}

export default function ProductsHeader({ total, activeCategoryName, search }: ProductsHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-700/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
            <Package2 size={14} className="text-teal-300" />
            <span className="text-xs font-semibold text-white/80 uppercase tracking-widest">Product Catalogue</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 leading-tight">
            {activeCategoryName ? (
              <>{activeCategoryName}</>
            ) : search ? (
              <>Results for <span className="text-teal-300">"{search}"</span></>
            ) : (
              <>Medical Supplies<br className="hidden sm:block" /> <span className="text-teal-300">& Equipment</span></>
            )}
          </h1>

          <p className="text-white/60 text-lg max-w-xl">
            {total > 0
              ? `${total} product${total !== 1 ? 's' : ''} available for healthcare professionals`
              : 'Quality medical products sourced from trusted manufacturers'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
