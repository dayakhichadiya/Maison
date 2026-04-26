import Head from "next/head";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found — Maison</title>
      </Head>
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center animate-fadeUp opacity-0">
          <p className="font-display text-[120px] leading-none text-stone-200 font-light select-none">404</p>
          <h1 className="font-display text-3xl font-light text-stone-900 -mt-4 mb-3">Page not found</h1>
          <p className="text-stone-500 text-sm mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    </>
  );
}
