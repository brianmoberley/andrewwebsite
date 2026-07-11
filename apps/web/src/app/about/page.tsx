export const metadata = {
  title: "About Us",
  description: "Learn about our construction company and team",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>
        <div className="space-y-6 text-gray-600 text-lg">
          <p>
            We are a professional construction company dedicated to delivering
            quality builds and excellent customer service.
          </p>
          <p>
            With years of experience in residential and commercial construction,
            we bring expertise, reliability, and craftsmanship to every project.
          </p>
        </div>
      </div>
    </div>
  );
}
