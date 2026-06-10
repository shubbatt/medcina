'use client';

import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import type { Product } from '@/types';

interface ProductEnquiryButtonProps {
  product: Product;
}

export default function ProductEnquiryButton({ product }: ProductEnquiryButtonProps) {
  return (
    <Link
      href={`/contact?product=${product.slug}&product_name=${encodeURIComponent(product.name)}`}
      className="btn-primary"
    >
      <MessageSquare size={18} />
      Enquire About This Product
    </Link>
  );
}
