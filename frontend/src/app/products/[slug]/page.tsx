import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api';
import { formatImageUrl } from '@/lib/utils';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ProductImageGallery from '@/components/products/ProductImageGallery';
import ProductEnquiryButton from '@/components/products/ProductEnquiryButton';
import { ArrowLeft, Download, CheckCircle, XCircle } from 'lucide-react';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProduct(params.slug);
    return {
      title: product.seo_title || product.name,
      description: product.seo_description || product.short_description,
    };
  } catch {
    return { title: 'Product Not Found' };
  }
}

export const revalidate = 1800;

export default async function ProductPage({ params }: ProductPageProps) {
  let product;
  try {
    product = await getProduct(params.slug);
  } catch {
    notFound();
  }

  const isAvailable = product.availability_status === 'available';

  return (
    <>
      <section className="pt-28 pb-8 bg-gradient-hero">
        <div className="container-site">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm text-medical-muted hover:text-primary-700 transition-colors mb-6">
            <ArrowLeft size={15} />
            Back to Products
          </Link>
          {/* Breadcrumb */}
          <nav className="text-sm text-medical-muted">
            <span><Link href="/" className="hover:text-primary-700 transition-colors">Home</Link></span>
            <span className="mx-2">/</span>
            <span><Link href="/products" className="hover:text-primary-700 transition-colors">Products</Link></span>
            <span className="mx-2">/</span>
            <span><Link href={`/products?category=${product.category.slug}`} className="hover:text-primary-700 transition-colors">{product.category.name}</Link></span>
            <span className="mx-2">/</span>
            <span className="text-medical-dark font-medium">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-14">

            {/* Image gallery */}
            <AnimatedSection direction="left">
              <ProductImageGallery images={product.images} productName={product.name} />
            </AnimatedSection>

            {/* Product info */}
            <AnimatedSection direction="right">
              <div>
                <span className="badge-primary text-xs mb-3 inline-flex">{product.category.name}</span>
                <h1 className="text-3xl font-display font-bold text-medical-dark mb-3">
                  {product.name}
                </h1>

                {/* Availability */}
                <div className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full mb-5 ${isAvailable ? 'bg-teal-50 text-teal-700' : 'bg-red-50 text-red-600'}`}>
                  {isAvailable ? <CheckCircle size={14} /> : <XCircle size={14} />}
                  {isAvailable ? 'Available for Order' : 'Currently Unavailable'}
                </div>

                <p className="text-medical-muted leading-relaxed mb-6">
                  {product.short_description}
                </p>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mb-8">
                  <ProductEnquiryButton product={product} />
                  {product.brochure_url && (
                    <a
                      href={formatImageUrl(product.brochure_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm"
                    >
                      <Download size={16} />
                      Download Brochure
                    </a>
                  )}
                </div>

                {/* Specifications */}
                {product.specifications.length > 0 && (
                  <div>
                    <h3 className="font-display font-semibold text-medical-dark mb-4">Specifications</h3>
                    <div className="rounded-xl border border-medical-border overflow-hidden">
                      {product.specifications.map((spec, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-2 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-medical-light' : 'bg-white'}`}
                        >
                          <span className="font-medium text-medical-dark">{spec.label}</span>
                          <span className="text-medical-muted">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          </div>

          {/* Full description */}
          {product.full_description && (
            <AnimatedSection className="mt-14 pt-10 border-t border-medical-border">
              <h2 className="text-2xl font-display font-bold text-medical-dark mb-5">
                Product Details
              </h2>
              <div
                className="prose prose-slate max-w-none text-medical-muted"
                dangerouslySetInnerHTML={{ __html: product.full_description }}
              />
            </AnimatedSection>
          )}
        </div>
      </section>
    </>
  );
}
