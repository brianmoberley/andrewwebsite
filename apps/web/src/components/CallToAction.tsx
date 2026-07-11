import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-blue-600 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Get a free estimate today and see how we can help
        </p>
        <Link
          href="/estimate"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block"
        >
          Request Free Estimate
        </Link>
      </div>
    </section>
  );
}
