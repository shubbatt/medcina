import { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import ProductsHeader from '@/components/products/ProductsHeader';
import CategorySidebar from '@/components/products/CategorySidebar';
import { getProducts, getCategories } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Products | Medcina Pvt Ltd',
  description: 'Browse Medcina\'s full range of medical equipment, consumables, and wound care products.',
};

export const revalidate = 60;

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const [productsData, categories] = await Promise.all([
    getProducts({
      category: params.category,
      search: params.search,
      page: params.page ? parseInt(params.page) : 1,
      per_page: 12,
    }).catch(() => ({
      data: [],
      meta: { current_page: 1, last_page: 1, per_page: 12, total: 0 },
      links: { first: '', last: '', prev: null, next: null },
    })),
    getCategories().catch(() => []),
  ]);

  const products = productsData.data;
  const activeCategoryName = categories.find(c => c.slug === params.category)?.name;

  return (
    <div className="min-h-screen bg-[#F7FAFE]">
      <ProductsHeader
        total={productsData.meta.total}
        activeCategoryName={activeCategoryName}
        search={params.search}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <CategorySidebar
            categories={categories}
            activeSlug={params.category}
            activeSearch={params.search}
          />

          {/* Main grid */}
          <div className="flex-1 min-w-0">
            {products.length > 0 ? (
              <>
                <p className="text-sm text-medical-muted mb-6">
                  Showing <span className="font-semibold text-medical-dark">{productsData.meta.total}</span> product{productsData.meta.total !== 1 ? 's' : ''}
                  {activeCategoryName && <> in <span className="font-semibold text-medical-dark">{activeCategoryName}</span></>}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </div>

                {/* Pagination */}
                {productsData.meta.last_page > 1 && (
                  <div className="flex justify-center gap-2 mt-12">
                    {Array.from({ length: productsData.meta.last_page }, (_, i) => i + 1).map((page) => (
                      <Link
                        key={page}
                        href={`/products?${new URLSearchParams({ ...(params.category ? { category: params.category } : {}), ...(params.search ? { search: params.search } : {}), page: page.toString() })}`}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                          page === productsData.meta.current_page
                            ? 'bg-primary-700 text-white shadow-md'
                            : 'bg-white border border-medical-border text-medical-muted hover:border-primary-400 hover:text-primary-700'
                        }`}
                      >
                        {page}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-20 h-20 rounded-3xl bg-white border border-medical-border flex items-center justify-center mb-6 shadow-card">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-xl font-display font-bold text-medical-dark mb-2">No products found</h3>
                <p className="text-medical-muted text-sm max-w-xs">
                  Try a different category or search term, or{' '}
                  <Link href="/products" className="text-primary-700 font-medium hover:underline">browse all products</Link>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
