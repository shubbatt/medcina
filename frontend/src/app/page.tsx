import { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import WhyChooseSection from '@/components/sections/WhyChooseSection';
import CTASection from '@/components/sections/CTASection';
import { getFeaturedProducts, getHeroSettings } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Medical Supply Company | Medcina Pvt Ltd',
  description:
    'Medcina provides high-quality medical equipment, consumables, and wound care products for clinics, hospitals, and healthcare professionals.',
};

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProducts, heroSettings] = await Promise.all([
    getFeaturedProducts().catch(() => []),
    getHeroSettings().catch(() => ({ hero_image: null, hero_headline: null, hero_subheadline: null })),
  ]);

  return (
    <>
      <HeroSection settings={heroSettings} />
      <CategoriesSection />
      {featuredProducts.length > 0 && <FeaturedProducts products={featuredProducts} />}
      <WhyChooseSection />
      <CTASection />
    </>
  );
}
