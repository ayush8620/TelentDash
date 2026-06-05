import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mx-auto mb-6">
        <span className="text-3xl font-bold text-muted">404</span>
      </div>
      <h1 className="text-3xl font-bold text-deep mb-3">Page Not Found</h1>
      <p className="text-body mb-8 max-w-md mx-auto">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link href="/salaries">
        <Button variant="primary">Browse Salaries</Button>
      </Link>
    </section>
  );
}
