import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Quality Construction Services
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Trusted by homeowners and businesses for reliable builds
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/estimate"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            Get Free Estimate
          </Link>
          <Link
            href="/portfolio"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
