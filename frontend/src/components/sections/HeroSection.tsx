'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Award, Truck, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import type { HeroSettings } from '@/types';

// ─── Data ──────────────────────────────────────────────────────────────────

const trustBadges = [
  { icon: ShieldCheck, label: 'Clinically Tested' },
  { icon: Award,       label: 'Advancis Medical' },
  { icon: Truck,       label: 'Reliable Supply' },
];

const categories = [
  'Foam Dressings',
  'Manuka Honey',
  'Super Absorbent',
  'Antimicrobial',
  'Specialist',
  'NPWT',
];

const stats = [
  { value: '13+', label: 'Product Ranges' },
  { value: '100%', label: 'Clinically Proven' },
  { value: '3',   label: 'Countries Served' },
];

// ─── Tilt panel ────────────────────────────────────────────────────────────

function TiltPanel({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx = useSpring(rawX, { stiffness: 140, damping: 22 });
  const sy = useSpring(rawY, { stiffness: 140, damping: 22 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-5, 5]);

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={e => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        rawX.set((e.clientX - r.left) / r.width - 0.5);
        rawY.set((e.clientY - r.top)  / r.height - 0.5);
      }}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

// ─── Floating card ─────────────────────────────────────────────────────────

function Float({ children, delay = 0, yRange = 10, className = '' }: {
  children: React.ReactNode; delay?: number; yRange?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -yRange, 0] }}
      transition={{ duration: 5 + delay * 0.8, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger variants ──────────────────────────────────────────────────────

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp  = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function HeroSection({ settings }: { settings: HeroSettings }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasImage   = !!settings.hero_image;
  const headline    = settings.hero_headline    ?? 'Advanced Medical Supplies';
  const subheadline = settings.hero_subheadline ?? 'Medcina supplies medical equipment, consumables, and wound care products across the Maldives, Nepal, and Myanmar — and is the authorised distributor of Advancis Medical wound care range in the region.';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">

      {/* ── Background: hero image OR sage gradient ── */}
      {hasImage ? (
        <>
          {/* Full-bleed photo */}
          <Image
            src={settings.hero_image!}
            alt="Medcina hero"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Directional overlay — dark left for text legibility, fades right */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20" />
          {/* Bottom vignette */}
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
        </>
      ) : (
        <>
          {/* Sage gradient background */}
          <div className="absolute inset-0 bg-[#F5F8F5]" />
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, #c8e0c8 0%, transparent 65%)' }}
            />
            <div
              className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #a0c8a0 0%, transparent 65%)' }}
            />
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: 'radial-gradient(circle, #436243 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>
        </>
      )}

      {/* ── Content ── */}
      <div className="container-site relative z-10 py-16 lg:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT ── */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-xl">

            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest mb-6 ${
                hasImage
                  ? 'bg-white/10 border border-white/25 text-white backdrop-blur-sm'
                  : 'bg-primary-50 border border-primary-200 text-primary-700'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${hasImage ? 'bg-white' : 'bg-primary-500'}`} />
                Medical Supply — Maldives · Nepal · Myanmar
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} className={`text-5xl md:text-6xl font-display font-extrabold leading-[1.05] tracking-tight mb-6 ${
              hasImage ? 'text-white' : 'text-medical-dark'
            }`}>
              <span className="relative inline-block">
                {hasImage ? (
                  <span>{headline}</span>
                ) : (
                  <span className="text-gradient">{headline}</span>
                )}
                <motion.span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full ${
                    hasImage
                      ? 'bg-gradient-to-r from-white/80 to-white/30'
                      : 'bg-gradient-to-r from-primary-500 to-sage-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
              </span>
            </motion.h1>

            {/* Body */}
            <motion.p variants={fadeUp} className={`text-lg leading-relaxed mb-8 ${
              hasImage ? 'text-white/85' : 'text-medical-muted'
            }`}>
              {subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              <Link href="/products" className="btn-primary text-sm px-7 py-3.5 rounded-2xl">
                Browse Products <ArrowRight size={17} />
              </Link>
              <Link href="/contact" className={`inline-flex items-center gap-2 text-sm px-7 py-3.5 rounded-2xl font-semibold transition-all ${
                hasImage
                  ? 'bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20'
                  : 'btn-secondary'
              }`}>
                Make an Enquiry <ChevronRight size={16} />
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-5 mb-10">
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    hasImage ? 'bg-white/15 backdrop-blur-sm' : 'bg-primary-100'
                  }`}>
                    <Icon size={15} className={hasImage ? 'text-white' : 'text-primary-600'} />
                  </div>
                  <span className={`font-medium ${hasImage ? 'text-white/90' : 'text-medical-muted'}`}>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className={`flex gap-8 pt-8 border-t ${hasImage ? 'border-white/20' : 'border-primary-100'}`}>
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className={`text-2xl font-display font-extrabold ${hasImage ? 'text-white' : 'text-primary-700'}`}>{s.value}</p>
                  <p className={`text-xs font-medium mt-0.5 ${hasImage ? 'text-white/70' : 'text-medical-muted'}`}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT — floating cards always shown ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <TiltPanel>
              <div className="relative w-[420px] h-[480px]">

                {/* Central logo card */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Animated ring 1 */}
                    <motion.div
                      className={`absolute rounded-full border-2 ${hasImage ? 'border-white/30' : 'border-primary-200'}`}
                      style={{ inset: -40 }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                      <span className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${hasImage ? 'bg-white/60' : 'bg-primary-400'}`} />
                    </motion.div>

                    {/* Animated ring 2 */}
                    <motion.div
                      className={`absolute rounded-full border ${hasImage ? 'border-white/15' : 'border-sage-300/50'}`}
                      style={{ inset: -72 }}
                      animate={{ rotate: -360 }}
                      transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    >
                      <span className={`absolute bottom-0 right-1/4 w-2 h-2 rounded-full ${hasImage ? 'bg-white/30' : 'bg-sage-400/60'}`} />
                    </motion.div>

                    {/* Logo card */}
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative rounded-3xl shadow-hero border border-primary-100 overflow-hidden z-10"
                    >
                      <Image
                        src="/images/logo.jpeg"
                        alt="Medcina Pvt Ltd"
                        width={200}
                        height={164}
                        className="w-44 h-auto block"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Floating: top-left */}
                <Float delay={0} yRange={10} className="absolute top-2 left-0">
                  <div className="bg-white rounded-2xl border border-primary-100 shadow-card px-5 py-3.5">
                    <p className="text-xl font-display font-extrabold text-primary-700">13+</p>
                    <p className="text-xs text-medical-muted font-medium mt-0.5">Product Ranges</p>
                  </div>
                </Float>

                {/* Floating: top-right */}
                <Float delay={1.2} yRange={8} className="absolute top-4 right-0">
                  <div className="bg-primary-700 rounded-2xl shadow-hover px-5 py-3.5">
                    <p className="text-xl font-display font-extrabold text-white">100%</p>
                    <p className="text-xs text-primary-200 font-medium mt-0.5">Clinically Proven</p>
                  </div>
                </Float>

                {/* Floating: categories bottom */}
                <Float delay={0.6} yRange={6} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xs">
                  <div className="bg-white rounded-2xl border border-primary-100 shadow-card p-4">
                    <p className="text-[10px] font-bold text-medical-muted uppercase tracking-widest mb-2.5 text-center">
                      Product Categories
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {categories.map((cat, i) => (
                        <motion.span
                          key={cat}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="text-xs font-medium bg-primary-50 border border-primary-100 text-primary-700 px-2.5 py-1 rounded-full"
                        >
                          {cat}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </Float>

                {/* Floating: left badge */}
                <Float delay={1.8} yRange={12} className="absolute left-0 bottom-1/3">
                  <div className="bg-white rounded-2xl border border-primary-100 shadow-card px-4 py-3 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary-100 flex items-center justify-center">
                      <ShieldCheck size={15} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-medical-dark leading-tight">Certified</p>
                      <p className="text-[10px] text-medical-muted">Medical Grade</p>
                    </div>
                  </div>
                </Float>

                {/* Floating: right badge */}
                <Float delay={2.3} yRange={9} className="absolute right-0 bottom-2/5">
                  <div className="bg-sage-500 rounded-2xl shadow-hover px-4 py-3 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                      <Award size={15} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Advancis</p>
                      <p className="text-[10px] text-white/70">Partner</p>
                    </div>
                  </div>
                </Float>

              </div>
            </TiltPanel>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade into page */}
      <div className={`absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t pointer-events-none ${
        hasImage ? 'from-black/40 to-transparent' : 'from-white to-transparent'
      }`} />
    </section>
  );
}
