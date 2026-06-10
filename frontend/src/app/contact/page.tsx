import { Metadata } from 'next';
import { Suspense } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from '@/components/forms/ContactForm';
import { getContactSettings } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Medcina Pvt Ltd for medical supply enquiries, orders, and support.',
};

export const revalidate = 60;

export default async function ContactPage() {
  const contact = await getContactSettings().catch(() => ({
    contact_phone:    null,
    contact_email:    null,
    contact_address:  null,
    contact_whatsapp: null,
    opening_hours:    null,
    company_tagline:  null,
  }));

  const hours = contact.opening_hours
    ? contact.opening_hours.split('\n').filter(Boolean)
    : [];

  const contactItems = [
    contact.contact_phone   && { icon: Phone,  label: 'Phone',   value: contact.contact_phone,   href: `tel:${contact.contact_phone}` },
    contact.contact_email   && { icon: Mail,   label: 'Email',   value: contact.contact_email,   href: `mailto:${contact.contact_email}` },
    contact.contact_address && { icon: MapPin, label: 'Address', value: contact.contact_address, href: '#' },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href: string }[];

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container-site text-center">
          <AnimatedSection>
            <span className="badge-primary text-xs font-semibold uppercase tracking-widest mb-4 inline-flex">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-medical-dark mb-4">
              Contact <span className="text-gradient">Medcina</span>
            </h1>
            <p className="text-lg text-medical-muted max-w-xl mx-auto">
              Have a question or need to place an order? Our team is ready to help.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Contact info */}
            <div className="space-y-4">
              <AnimatedSection direction="left">
                <h2 className="text-xl font-display font-bold text-medical-dark mb-6">Contact Information</h2>
              </AnimatedSection>

              {contactItems.length > 0 ? (
                contactItems.map(({ icon: Icon, label, value, href }, i) => (
                  <AnimatedSection key={label} direction="left" delay={i * 0.1}>
                    <a href={href} className="flex items-start gap-4 p-5 rounded-xl border border-medical-border hover:border-primary-200 hover:shadow-card transition-all group">
                      <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-primary-700" />
                      </div>
                      <div>
                        <p className="text-xs text-medical-muted font-medium uppercase tracking-wide mb-0.5">{label}</p>
                        <p className="text-medical-dark text-sm font-medium group-hover:text-primary-700 transition-colors whitespace-pre-line">{value}</p>
                      </div>
                    </a>
                  </AnimatedSection>
                ))
              ) : (
                <AnimatedSection direction="left">
                  <p className="text-sm text-medical-muted italic">Contact details coming soon.</p>
                </AnimatedSection>
              )}

              {/* Business hours */}
              {hours.length > 0 && (
                <AnimatedSection direction="left" delay={0.3}>
                  <div className="p-5 rounded-xl bg-medical-light border border-medical-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={16} className="text-primary-700" />
                      <h4 className="font-semibold text-medical-dark text-sm">Opening Hours</h4>
                    </div>
                    <div className="space-y-1.5 text-sm text-medical-muted">
                      {hours.map((line, i) => {
                        const [day, ...rest] = line.split(':');
                        return rest.length > 0 ? (
                          <div key={i} className="flex justify-between gap-2">
                            <span>{day.trim()}</span>
                            <span className="font-medium text-medical-dark">{rest.join(':').trim()}</span>
                          </div>
                        ) : (
                          <p key={i}>{line}</p>
                        );
                      })}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Enquiry form */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="right">
                <div className="bg-white rounded-2xl border border-medical-border p-8 shadow-card">
                  <h2 className="text-xl font-display font-bold text-medical-dark mb-6">
                    Send an Enquiry
                  </h2>
                  <Suspense fallback={<div className="text-medical-muted text-sm">Loading form...</div>}>
                    <ContactForm />
                  </Suspense>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
