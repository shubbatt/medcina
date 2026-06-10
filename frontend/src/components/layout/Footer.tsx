import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight } from 'lucide-react';
import { getContactSettings } from '@/lib/api';

const footerLinks = {
  company: [
    { label: 'About Us',  href: '/about' },
    { label: 'Products',  href: '/products' },
    { label: 'Contact',   href: '/contact' },
  ],
  categories: [
    { label: 'Wound Care Dressings', href: '/products?category=foam-dressings' },
    { label: 'Manuka Honey',         href: '/products?category=manuka-honey' },
    { label: 'Antimicrobial',        href: '/products?category=antimicrobial' },
    { label: 'Super Absorbent',      href: '/products?category=super-absorbent' },
    { label: 'NPWT',                 href: '/products?category=npwt' },
  ],
};

export default async function Footer() {
  const settings = await getContactSettings().catch(() => ({
    contact_phone:    null,
    contact_email:    null,
    contact_address:  null,
    contact_whatsapp: null,
    opening_hours:    null,
    company_tagline:  null,
  }));

  const openingLines = settings.opening_hours?.split('\n').filter(Boolean) ?? [];

  return (
    <footer className="bg-medical-dark text-white">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <div className="rounded-xl overflow-hidden inline-block">
                <Image
                  src="/images/logo.jpeg"
                  alt="Medcina Pvt Ltd"
                  width={160}
                  height={132}
                  className="h-20 w-auto block"
                />
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {settings.company_tagline ?? 'Professional medical supply company serving clinics, hospitals, pharmacies, and healthcare professionals across the Maldives, Nepal, and Myanmar.'}
            </p>
            {settings.contact_whatsapp && (
              <a
                href={`https://wa.me/${settings.contact_whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] px-3 py-2 rounded-lg hover:bg-[#25D366]/20 transition-colors"
              >
                <MessageCircle size={13} />
                Chat on WhatsApp
              </a>
            )}
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product categories */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Hours */}
          <div className="space-y-6">
            <div>
              <h3 className="font-display font-semibold text-white mb-4">Contact</h3>
              <ul className="space-y-3">
                {settings.contact_phone && (
                  <li>
                    <a
                      href={`tel:${settings.contact_phone}`}
                      className="flex items-start gap-3 text-white/60 hover:text-white text-sm transition-colors"
                    >
                      <Phone size={14} className="mt-0.5 text-primary-400 flex-shrink-0" />
                      {settings.contact_phone}
                    </a>
                  </li>
                )}
                {settings.contact_email && (
                  <li>
                    <a
                      href={`mailto:${settings.contact_email}`}
                      className="flex items-start gap-3 text-white/60 hover:text-white text-sm transition-colors"
                    >
                      <Mail size={14} className="mt-0.5 text-primary-400 flex-shrink-0" />
                      {settings.contact_email}
                    </a>
                  </li>
                )}
                {settings.contact_address && (
                  <li>
                    <div className="flex items-start gap-3 text-white/60 text-sm">
                      <MapPin size={14} className="mt-0.5 text-primary-400 flex-shrink-0" />
                      <span>{settings.contact_address}</span>
                    </div>
                  </li>
                )}
                {!settings.contact_phone && !settings.contact_email && !settings.contact_address && (
                  <li className="text-white/30 text-xs italic">Contact details coming soon</li>
                )}
              </ul>
            </div>

            {openingLines.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                  <Clock size={14} className="text-primary-400" />
                  Opening Hours
                </h4>
                <ul className="space-y-1.5">
                  {openingLines.map((line, i) => {
                    const [label, ...rest] = line.split(':');
                    const hours = rest.join(':').trim();
                    return (
                      <li key={i} className="text-xs text-white/50 flex justify-between gap-4">
                        <span>{label.trim()}</span>
                        {hours && <span className="text-white/70 font-medium">{hours}</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Medcina Pvt Ltd. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Maldives · Nepal · Myanmar
          </p>
        </div>
      </div>
    </footer>
  );
}
