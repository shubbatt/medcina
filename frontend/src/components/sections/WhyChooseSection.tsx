'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShieldCheck, FlaskConical, Leaf, HeadphonesIcon, Globe, Award } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Authorised Distributor',
    description: 'Medcina is the exclusive authorised distributor of Advancis Medical products in the Maldives.',
  },
  {
    icon: ShieldCheck,
    title: 'Clinically Proven',
    description: 'All Advancis Medical products are clinically tested and validated for wound care effectiveness.',
  },
  {
    icon: FlaskConical,
    title: 'Advanced Formulations',
    description: 'From Manuka honey to super-absorbent technology — products engineered for superior clinical outcomes.',
  },
  {
    icon: Leaf,
    title: 'Full NPWT Solutions',
    description: 'Complete Negative Pressure Wound Therapy systems for complex and hard-to-heal wounds.',
  },
  {
    icon: Globe,
    title: 'Nationwide Supply',
    description: 'Serving clinics, hospitals, and pharmacies across the Maldives with reliable stock availability.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Clinical Support',
    description: 'Our team provides product education and support to help clinicians choose the right dressing.',
  },
];

const stats = [
  { value: '6+',   label: 'Product ranges' },
  { value: '50+',  label: 'SKUs available' },
  { value: '100%', label: 'Genuine Advancis products' },
  { value: '1',    label: 'Authorised distributor in Maldives' },
];

export default function WhyChooseSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <span className="badge-primary text-xs font-semibold uppercase tracking-widest mb-4 inline-flex">
              The Advancis Advantage
            </span>
            <h2 className="section-title mb-5">
              Why Choose{' '}
              <span className="text-gradient">Medcina</span>
            </h2>
            <p className="text-medical-muted leading-relaxed mb-8">
              As the Maldives' authorised distributor for Advancis Medical, Medcina brings world-class wound care technology to local healthcare providers — with the assurance of genuine products, clinical support, and reliable availability.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-medical-light rounded-xl p-5 border border-medical-border">
                  <p className="text-3xl font-display font-bold text-primary-700">{stat.value}</p>
                  <p className="text-sm text-medical-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-white rounded-xl p-5 border border-medical-border hover:border-primary-200 hover:shadow-card transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-primary-700" />
                  </div>
                  <h4 className="font-semibold text-medical-dark text-sm mb-1.5">{reason.title}</h4>
                  <p className="text-xs text-medical-muted leading-relaxed">{reason.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
