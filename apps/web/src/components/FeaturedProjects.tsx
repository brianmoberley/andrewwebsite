export default function FeaturedProjects() {
  const projects = [
    {
      id: 1,
      title: "Modern Kitchen Remodel",
      category: "Kitchen",
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      id: 2,
      title: "Luxury Bathroom",
      category: "Bathroom",
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      id: 3,
      title: "Home Addition",
      category: "Addition",
      image: "bg-gradient-to-br from-green-400 to-green-600",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow ${project.image}`}
            >
              <div className="h-full flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                <div>
                  <p className="text-blue-200 text-sm font-semibold">
                    {project.category}
                  </p>
                  <h3 className="text-white text-2xl font-bold">
                    {project.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
