import { Building2, Hammer, Paintbrush, Home } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "New Construction",
    description: "Build your dream home or commercial space",
  },
  {
    icon: Hammer,
    title: "Remodeling",
    description: "Transform existing spaces with expert craftsmanship",
  },
  {
    icon: Home,
    title: "Renovations",
    description: "Update and improve your property",
  },
  {
    icon: Paintbrush,
    title: "Custom Finishes",
    description: "Professional finishing touches for every project",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <Icon size={40} className="text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
