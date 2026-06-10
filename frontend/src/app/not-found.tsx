import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero">
      <div className="text-center px-4">
        <div className="text-8xl font-display font-bold text-primary-100 mb-4">404</div>
        <h1 className="text-3xl font-display font-bold text-medical-dark mb-3">Page Not Found</h1>
        <p className="text-medical-muted mb-8 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
