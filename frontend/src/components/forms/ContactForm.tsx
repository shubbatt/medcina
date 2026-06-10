'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Turnstile } from '@marsidev/react-turnstile';
import { submitEnquiry } from '@/lib/api';
import type { EnquiryFormData } from '@/types';

const enquirySchema = z.object({
  name:    z.string().min(2, 'Name must be at least 2 characters'),
  email:   z.string().email('Please enter a valid email address'),
  phone:   z.string().min(7, 'Please enter a valid phone number'),
  company: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function ContactForm() {
  const searchParams = useSearchParams();
  const productName = searchParams.get('product_name');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      subject: productName ? `Enquiry: ${productName}` : '',
      message: productName ? `I would like to enquire about ${productName}.\n\n` : '',
    },
  });

  const onSubmit = async (data: EnquiryFormData) => {
    if (!captchaToken) {
      setError('Please complete the security check before submitting.');
      return;
    }
    try {
      setError('');
      await submitEnquiry({ ...data, turnstile_token: captchaToken });
      setSubmitted(true);
    } catch {
      setError('Failed to send your enquiry. Please try again or call us directly.');
      setCaptchaToken(null);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-primary-600" />
        </div>
        <h3 className="text-2xl font-display font-bold text-medical-dark mb-2">Enquiry Sent!</h3>
        <p className="text-medical-muted">Our team will get back to you within 1–2 business days.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Full Name *</label>
          <input {...register('name')} className="input-field" placeholder="Your name" />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="label">Email Address *</label>
          <input {...register('email')} type="email" className="input-field" placeholder="your@email.com" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Phone Number *</label>
          <input {...register('phone')} type="tel" className="input-field" placeholder="+960 XXXXXXX" />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="label">Company / Organisation</label>
          <input {...register('company')} className="input-field" placeholder="Optional" />
        </div>
      </div>

      <div>
        <label className="label">Subject *</label>
        <input {...register('subject')} className="input-field" placeholder="What is your enquiry about?" />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>

      <div>
        <label className="label">Message *</label>
        <textarea
          {...register('message')}
          rows={5}
          className="input-field resize-none"
          placeholder="Describe what you need, quantities, or any specific requirements..."
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
        onSuccess={(token) => { setCaptchaToken(token); setError(''); }}
        onExpire={() => setCaptchaToken(null)}
        onError={() => { setCaptchaToken(null); setError('Security check failed. Please refresh and try again.'); }}
        options={{ theme: 'light', size: 'normal' }}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !captchaToken}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          <>
            Send Enquiry
            <Send size={16} />
          </>
        )}
      </button>
    </form>
  );
}
