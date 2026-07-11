export const metadata = {
  title: "Contact Us",
  description: "Get in touch with our construction company",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-4">Phone: (555) 123-4567</p>
            <p className="text-gray-600 mb-4">Email: info@company.com</p>
            <p className="text-gray-600">
              Ready to start your project? Contact us today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
