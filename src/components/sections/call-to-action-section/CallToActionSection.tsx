"use client";
import { Button } from "@headlessui/react";
import { motion } from "framer-motion";

const TESTIMONIALS_AVATARS_DATA = [
  {
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
  },
];

export default function CallToActionSection() {
  return (
    <div className="relative py-16">
      <div aria-hidden="true" className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-green-400 to-blue-400"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-blue-500 to-green-300"></div>
      </div>
      <div className={"max-w-7xl mx-auto px-6 md:px-12 xl:px-6"}>
        <div className="relative">
          <motion.div
            className="flex items-center justify-center -space-x-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              loading="lazy"
              width="400"
              height="400"
              src={TESTIMONIALS_AVATARS_DATA[0].avatar}
              alt="member photo"
              className="h-8 w-8 rounded-full object-cover filter grayscale"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src={TESTIMONIALS_AVATARS_DATA[1].avatar}
              alt="member photo"
              className="h-12 w-12 rounded-full object-cover filter grayscale"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src={TESTIMONIALS_AVATARS_DATA[2].avatar}
              alt="member photo"
              className="z-10 h-16 w-16 rounded-full object-cover filter grayscale"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src={TESTIMONIALS_AVATARS_DATA[3].avatar}
              alt="member photo"
              className="relative h-12 w-12 rounded-full object-cover filter grayscale"
            />
            <img
              loading="lazy"
              width="200"
              height="200"
              src={TESTIMONIALS_AVATARS_DATA[4].avatar}
              alt="member photo"
              className="h-8 w-8 rounded-full object-cover filter grayscale"
            />
          </motion.div>
          <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
            <motion.h1
              className="text-center text-4xl font-bold text-gray-800 md:text-4xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Começe agora
            </motion.h1>
            <motion.p
              className="text-center text-xl text-gray-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Faça parte da nossa comunidade e comece a criar a sua loja online hoje mesmo.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="#">
                <Button
                  className={
                    "bg-green-400 px-5 py-3 rounded-3xl text-white font-bold shadow-2xl shadow-green-400  shadow-[5px_3px_60px_-8px] hover:bg-green-300 animate-blurred-fade-in animate-delay-800"
                  }
                >
                  Inscreva-se Agora
                </Button>
              </a>
              <a href="whatsapp://send?phone=+258847005571&text=Olá, gostaria de saber mais sobre os vossos cursos.">
                <Button
                  className={
                    "px-5 py-3 rounded-3xl text-white bg-blue-950 font-bold animate-blurred-fade-in animate-delay-800"
                  }
                >
                  Fale Connosco
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
