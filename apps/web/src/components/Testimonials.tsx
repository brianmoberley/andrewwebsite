import { Star } from "lucide-react";

const testimonials = [
  {
    name: "John Smith",
    text: "Excellent work and professional team. Highly recommend!",
    rating: 5,
  },
  {
    name: "Sarah Johnson",
    text: "They completed our kitchen remodel on time and on budget.",
    rating: 5,
  },
  {
    name: "Mike Davis",
    text: "Great communication throughout the entire project.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">&quot;{testimonial.text}&quot;</p>
              <p className="font-bold text-gray-900">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
