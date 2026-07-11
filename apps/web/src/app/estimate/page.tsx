import EstimateForm from "@/components/EstimateForm";

export const metadata = {
  title: "Free Estimate - Construction Platform",
  description:
    "Request a free estimate for your construction project. Fast, easy, and secure.",
};

export default function EstimatePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Estimate Request
          </h1>
          <p className="text-xl text-gray-600">
            Tell us about your project and we&apos;ll provide a detailed estimate
          </p>
        </div>

        <EstimateForm />
      </div>
    </div>
  );
}
