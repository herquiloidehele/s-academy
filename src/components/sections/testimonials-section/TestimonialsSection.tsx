const TESTIMONIALS_DATA = [
  {
    name: "Daniella Martins",
    role: "Estudante",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    testimonial:
      "Estou muito satisfeita com o curso, aprendi muito e recomendo a todos os meus conhecidos. Quando comecei nao sabia nada de shopify e e-commerce, agora ja tenho a minha loja online e estou a vender bem.",
  },
  {
    name: "João Neves",
    role: "Empresário",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    testimonial:
      "O curso foi muito bom, aprendi muito sobre como criar uma loja online e como vender os meus produtos. Recomendo a todos que querem ter uma loja online.",
  },
  {
    name: "Maria Silva",
    role: "Estudante",
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
    testimonial:
      "O curso é autoguiado, então você pode completá-lo no seu próprio ritmo. A maioria dos alunos termina em 2 semanas ou menos.",
  },
  {
    name: "António Costa",
    role: "Empresário",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    testimonial:
      "Este curso mudou a minha vida! Agora eu tenho uma loja online lucrativa e em crescimento constante. Estou a espera de mais cursos desta qualidade.",
  },
  {
    name: "Ana Maria",
    role: "Estudante",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    testimonial:
      "O curso é muito prático e fácil de seguir. Aprendi muito sobre como criar uma loja online e como vender os meus produtos. Recomendo a todos que querem ter uma loja online.",
  },
  {
    name: "João Neves",
    role: "Empresário",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
    testimonial:
      "O curso foi muito bom, aprendi muito sobre como criar uma loja online e como vender os meus produtos. Recomendo a todos que querem ter uma loja online.",
  },
];

export default function TestimonialsSection() {
  return (
    <div className="w-full py-32" id="testimonials">
      <div className={"max-w-[1300px] mx-auto"}>
        <div className="mb-20 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold text-gray-800 md:text-4xl">O que dizem os nossos clientes?</h2>
        </div>
        <div className="md:columns-2 lg:columns-3 gap-8 space-y-8">
          {TESTIMONIALS_DATA.map((testimonial, index) => (
            <div
              key={index}
              className="aspect-auto p-8 border border-gray-100 rounded-3xl bg-white shadow-2xl shadow-gray-600/10"
            >
              <div className="flex gap-4">
                <img
                  className="w-12 h-12 rounded-full filter grayscale"
                  src={testimonial.avatar}
                  alt="user avatar"
                  width="400"
                  height="400"
                  loading="lazy"
                />
                <div>
                  <h6 className="text-lg font-medium text-gray-700">{testimonial.name}</h6>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="mt-8">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
