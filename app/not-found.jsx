import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#AFCE67] text-[#000E47] rounded-lg hover:bg-[#D1DF20] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
