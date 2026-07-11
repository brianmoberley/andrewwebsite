export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <p className="text-gray-400">Professional construction services</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400">(555) 123-4567</p>
            <p className="text-gray-400">info@company.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Hours</h3>
            <p className="text-gray-400">Mon-Fri: 8am-6pm</p>
            <p className="text-gray-400">Sat-Sun: Closed</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow</h3>
            <p className="text-gray-400">Social links coming soon</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Construction Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
