"use client";

import ChartIcon from "@/assets/icons/chart-icon.svg";
import ChatIcon from "@/assets/icons/chat-icon.svg";
import LocationIcon from "@/assets/icons/location-icon.svg";
import { motion } from "framer-motion";
import { Constants } from "@/utils/Constants";

export default function CourseInfoSection() {
  return (
    <div
      className={"w-full py-14 px-4 lg:px-6 lg:py-32 bg-[rgba(217,255,229,34%)] relative scroll-mt-20"}
      id={Constants.UI.SECTIONS.COURSE}
    >
      <div className={"max-w-[1300px] mx-auto "}>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <motion.span initial={{ x: -1000 }} whileInView={{ x: 0 }}>
            <ChartIcon className="w-6 h-6 text-green-400" />
          </motion.span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-x-20 text-gray-600">
          <div className="">
            <motion.h2
              className="text-2xl lg:text-5xl font-bold text-blue-950"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Ensinamos desde o zero até ao lançamento da sua loja
            </motion.h2>
            <motion.p
              className="my-4 lg:my-8 text-gray-500 text-sm md-text-md"
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              O curso é composto por 4 módulos, com mais de 15 aulas práticas, apresentadas por um especialista na área
              de e-commerce e marketing digital. A cada módulo, você terá acesso a um material de apoio em PDF.
              <br /> <br /> Vamos guiá-lo passo a passo com exemplos práticos para que tú possas criar sua loja em
              poucos dias.
            </motion.p>

            <div className="divide-y space-y-2 lg:space-y-4 divide-gray-100">
              <motion.div
                className="mt-8 flex gap-4 md:items-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.6 }}
              >
                <div className="w-12 h-12 flex gap-4 rounded-full bg-blue-100">
                  <ChatIcon className="w-6 h-6 m-auto text-indigo-500" />
                </div>
                <div className="w-5/6">
                  <h4 className="font-semibold text-md lg:text-lg text-blue-950">Suporte Dsiponível</h4>
                  <p className="text-gray-500 text-sm md:text-md">
                    Temos uma equipa de suporte pronta para ajudar a qualquer momento.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="pt-4 flex gap-4 md:items-center"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
              >
                <div className="w-12 h-12 flex gap-4 rounded-full bg-teal-100">
                  <LocationIcon className="w-6 h-6 m-auto text-teal-500" />
                </div>
                <div className="w-5/6">
                  <h4 className="font-semibold text-md lg:text-lg text-blue-950">Aulas online</h4>
                  <p className="text-gray-500 text-sm md:text-md">
                    Aulas disponíveis 24/7, você pode assistir quando e onde quiser.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, y: 400 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <iframe
              src="https://www.youtube.com/embed/DDW5mjEHqWU?si=jNvGwj--YLRDaLNz&amp;controls=0&amp;showinfo=0&amp;rel=0&amp;autoplay=1&amp;mute=1&amp;loop=1&amp"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className={"w-full h-full rounded-xl"}
            ></iframe>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
