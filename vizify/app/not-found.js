import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-6xl font-heading font-bold text-midnight-blue mb-4">404</h1>
      <h2 className="text-2xl font-heading text-rich-gold mb-8">Page Not Found</h2>
      <p className="text-midnight-blue mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary px-8 py-3">
        Return Home
      </Link>
    </div>
  );
}