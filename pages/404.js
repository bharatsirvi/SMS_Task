import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-600 mb-6">Sorry, we couldn't find the page you're looking for.</p>
        <div className="space-y-2">
          <Link href="/" className="block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Go Back Home
          </Link>
          <Link href="/showSchools" className="block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
            View Schools
          </Link>
        </div>
      </div>
    </div>
  );
}