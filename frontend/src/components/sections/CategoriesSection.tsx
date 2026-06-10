'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Layers, Droplets, Zap, Shield, ArrowRight } from 'lucide-react';

const categories = [
  {
    icon: Layers,
    name: 'Foam Dressings',
    description: 'Advazorb range — border, lite, and silicone foam dressings for moderate to high exudate wounds.',
    href: '/products?category=foam-dressings',
    bg: 'bg-primary-50',
    iconColor: 'text-primary-700',
  },
  {
    icon: Droplets,
    name: 'Super Absorbent',
    description: 'Eclypse range — super absorbent pads and dressings for heavily exuding wounds.',
    href: '/products?category=super-absorbent',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-700',
  },
  {
    icon: Zap,
    name: 'Manuka Honey',
    description: 'Activon range — medical grade Manuka honey dressings for infected and hard-to-heal wounds.',
    href: '/products?category=manuka-honey',
    bg: 'bg-primary-50',
    iconColor: 'text-primary-700',
  },
  {
    icon: Shield,
    name: 'Antimicrobial',
    description: 'Advanced antimicrobial dressings for infection prevention and wound biofilm management.',
    href: '/products?category=antimicrobial',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-700',
  },
  {
    icon: Layers,
    name: 'Specialist Dressings',
    description: 'Silflex, Siltape, Advasil Conform and specialist wound contact layers.',
    href: '/products?category=specialist-dressings',
    bg: 'bg-primary-50',
    iconColor: 'text-primary-700',
  },
  {
    icon: Zap,
    name: 'NPWT',
    description: 'Negative Pressure Wound Therapy systems and accessories for complex wound management.',
    href: '/products?category=npwt',
    bg: 'bg-teal-50',
    iconColor: 'text-teal-700',
  },
];

export default function CategoriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-gradient-section">
      <div className="container-site">
        <div className="text-center mb-14">
          <span className="badge-teal text-xs font-semibold uppercase tracking-widest mb-4 inline-flex">
            Product Range
          </span>
          <h2 className="section-title">Advancis Medical Product Lines</h2>
          <p className="section-subtitle mx-auto text-center">
            As the authorised Maldives distributor for Advancis Medical, we supply the full range of clinically proven wound care products.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={cat.href}>
                  <div className="card group cursor-pointer p-7 h-full">
                    <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={26} className={cat.iconColor} />
                    </div>
                    <h3 className="font-display font-semibold text-xl text-medical-dark mb-2">{cat.name}</h3>
                    <p className="text-medical-muted text-sm leading-relaxed mb-5">{cat.description}</p>
                    <div className="flex items-center gap-2 text-primary-700 text-sm font-semibold group-hover:gap-3 transition-all">
                      View Products <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
