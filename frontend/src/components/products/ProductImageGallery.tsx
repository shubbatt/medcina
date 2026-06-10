'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { formatImageUrl } from '@/lib/utils';
import type { ProductImage } from '@/types';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="bg-medical-light rounded-2xl h-96 flex items-center justify-center border border-medical-border">
        <p className="text-medical-muted text-sm">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative bg-medical-light rounded-2xl overflow-hidden border border-medical-border h-96">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={formatImageUrl(images[activeIndex].url)}
              alt={images[activeIndex].alt || productName}
              fill
              className="object-contain p-8"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                i === activeIndex
                  ? 'border-primary-700 shadow-md'
                  : 'border-medical-border hover:border-primary-300'
              )}
            >
              <div className="relative w-full h-full bg-medical-light">
                <Image
                  src={formatImageUrl(img.url)}
                  alt={img.alt || `${productName} ${i + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
