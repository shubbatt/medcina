import { Metadata } from 'next';
import Image from 'next/image';
import AnimatedSection from '@/components/ui/AnimatedSection';
import CTASection from '@/components/sections/CTASection';
import { Target, Eye, Heart, Users, Building2, Pill, ShieldCheck, Award } from 'lucide-react';
import { getAboutSettings } from '@/lib/api';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Medcina Pvt Ltd — medical supply company and authorised distributor of Advancis Medical wound care products across Maldives, Nepal, and Myanmar.',
};

export const revalidate = 60;

const values = [
  { icon: Heart,      title: 'Patient First',  description: 'Every product we supply is chosen for its clinical effectiveness and patient outcomes.' },
  { icon: ShieldCheck,title: 'Authenticity',   description: 'We supply only genuine products — never substitutes or grey-market goods.' },
  { icon: Award,      title: 'Excellence',     description: 'We hold ourselves to the highest standards in product quality, service, and clinical support.' },
  { icon: Users,      title: 'Partnership',    description: 'We work closely with healthcare professionals to ensure the right product reaches every patient.' },
];

const industries = [
  { icon: Building2,   label: 'Hospitals' },
  { icon: Users,       label: 'Clinics' },
  { icon: Pill,        label: 'Pharmacies' },
  { icon: Heart,       label: 'Wound Care Specialists' },
  { icon: ShieldCheck, label: 'Healthcare Professionals' },
];

const products = [
  { name: 'Advazorb',  desc: 'Foam dressing range for moderate to heavily exuding wounds' },
  { name: 'Eclypse',   desc: 'Super absorbent dressings for heavily exuding wounds' },
  { name: 'Activon',   desc: 'Medical grade Manuka honey for infected and hard-to-heal wounds' },
  { name: 'Silflex',   desc: 'Soft silicone wound contact layer' },
  { name: 'Siltape',   desc: 'Soft silicone retention tape' },
  { name: 'Advasil',   desc: 'Silicone conforming dressing' },
  { name: 'Advadraw',  desc: 'Ribbon dressing for cavity wounds' },
  { name: 'NPWT',      desc: 'Negative Pressure Wound Therapy systems' },
];

export default async function AboutPage() {
  const about = await getAboutSettings().catch(() => ({
    about_headline:      null,
    about_subheadline:   null,
    about_company_image: null,
    about_intro_1:       null,
    about_intro_2:       null,
    about_mission:       null,
    about_vision:        null,
  }));

  const headline    = about.about_headline    ?? 'Medical Supply Specialists';
  const subheadline = about.about_subheadline ?? 'Serving clinics, hospitals, and healthcare providers across Maldives, Nepal, and Myanmar.';
  const intro1      = about.about_intro_1     ?? 'Medcina Pvt Ltd supplies medical equipment, consumables, and wound care products across the Maldives, Nepal, and Myanmar. We are the authorised distributor of Advancis Medical wound care products in the region.';
  const intro2      = about.about_intro_2     ?? 'Advancis Medical is a UK-based specialist wound care company with a strong clinical evidence base and an international reputation for product innovation. As their regional partner, Medcina ensures healthcare providers have direct access to genuine Advancis products with local support.';
  const mission     = about.about_mission     ?? 'To improve patient outcomes across our markets by providing healthcare professionals with reliable access to clinically proven medical products and equipment.';
  const vision      = about.about_vision      ?? 'To be the most trusted medical supply partner in the region — known for product authenticity, clinical expertise, and a commitment to healthcare excellence.';

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-site text-center">
          <AnimatedSection>
            <span className="badge-primary text-xs font-semibold uppercase tracking-widest mb-4 inline-flex">
              About Medcina
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-medical-dark mb-5">
              <span className="text-gradient">{headline}</span>
            </h1>
            <p className="text-lg text-medical-muted max-w-2xl mx-auto">
              {subheadline}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Intro */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              {about.about_company_image ? (
                <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-medical-border shadow-card">
                  <Image
                    src={about.about_company_image}
                    alt="Medcina team"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl h-80 flex items-center justify-center border border-medical-border">
                  <p className="text-medical-muted text-sm text-center px-8">
                    [Company / team photo — to be provided by Medcina]
                  </p>
                </div>
              )}
            </AnimatedSection>
            <AnimatedSection direction="right">
              <span className="badge-primary text-xs font-semibold uppercase tracking-widest mb-4 inline-flex">
                Who We Are
              </span>
              <h2 className="section-title mb-5">
                Specialists in Medical Supply
              </h2>
              <div className="space-y-4 text-medical-muted leading-relaxed">
                <p>{intro1}</p>
                <p>{intro2}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gradient-section">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection delay={0}>
              <div className="bg-white rounded-xl p-8 border border-medical-border h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                  <Target size={22} className="text-primary-700" />
                </div>
                <h3 className="text-xl font-display font-bold text-medical-dark mb-3">Our Mission</h3>
                <p className="text-medical-muted leading-relaxed">{mission}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-xl p-8 border border-medical-border h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5">
                  <Eye size={22} className="text-primary-700" />
                </div>
                <h3 className="text-xl font-display font-bold text-medical-dark mb-3">Our Vision</h3>
                <p className="text-medical-muted leading-relaxed">{vision}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Product Portfolio */}
      <section className="section-padding bg-white">
        <div className="container-site">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">The Advancis Medical Range</h2>
            <p className="section-subtitle mx-auto">Wound care products we distribute across Maldives, Nepal, and Myanmar.</p>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((p, i) => (
              <AnimatedSection key={p.name} delay={i * 0.07}>
                <div className="bg-medical-light rounded-xl p-5 border border-medical-border">
                  <h4 className="font-display font-bold text-primary-700 mb-1">{p.name}</h4>
                  <p className="text-xs text-medical-muted leading-relaxed">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gradient-section">
        <div className="container-site">
          <AnimatedSection className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <AnimatedSection key={v.title} delay={i * 0.08}>
                  <div className="text-center p-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                      <Icon size={24} className="text-primary-700" />
                    </div>
                    <h4 className="font-display font-semibold text-medical-dark mb-2">{v.title}</h4>
                    <p className="text-sm text-medical-muted leading-relaxed">{v.description}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding bg-white">
        <div className="container-site text-center">
          <AnimatedSection>
            <h2 className="section-title mb-3">Who We Supply</h2>
            <p className="section-subtitle mx-auto mb-10">
              We work with all types of healthcare providers across Maldives, Nepal, and Myanmar.
            </p>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <AnimatedSection key={ind.label} delay={i * 0.08}>
                  <div className="bg-white rounded-xl px-6 py-4 border border-medical-border shadow-card flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                      <Icon size={17} className="text-primary-700" />
                    </div>
                    <span className="font-medium text-medical-dark">{ind.label}</span>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
