import PortfolioGallery from "@/components/PortfolioGallery";

export const metadata = {
  title: "Portfolio - Our Work",
  description:
    "View examples of our completed construction and remodeling projects",
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h1>
          <p className="text-xl text-gray-600">
            Explore our portfolio of completed projects
          </p>
        </div>

        <PortfolioGallery />
      </div>
    </div>
  );
}
