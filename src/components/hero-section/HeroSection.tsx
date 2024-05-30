import { Button } from "@headlessui/react";
import Image from "next/image";
import HeroDesktop from "@/assets/images/hero-desktop.jpg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[100vh] flex justify-center">
      <Image src={HeroDesktop} alt={"Hero Desktop"} className="w-full h-full object-cover absolute top-0 left-0" />

      <div className="z-10 flex f-full items-center justify-center flex-col w-full bg-blue-950/90">
        <div className="flex items-center justify-center flex-col gap-5">
          <h1 className="sm:text-2xl lg:text-6xl font-bold text-white text-center max-w-[59%] leading-snug animate-fade-in-up animate-delay-100">
            Quer aprender a criar uma loja <span className={"text-green-400"}>Shopify</span> para o seu negócio?
          </h1>

          <p
            className={
              "text-gray-300 text-xl text-center font-normal max-w-[40%] leading-normal animate-fade-in-up animate-delay-500"
            }
          >
            Junte-se ao nosso curso de criação de lojas Shopify e domine todas as ferramentas e técnicas necessárias
            para
            <span className={"text-green-400 font-bold"}> impulsionar seu negócio</span> online.
          </p>

          <div className={"flex gap-3 mt-4"}>
            <Button
              className={
                "bg-green-400 px-5 py-3 rounded-3xl text-white font-bold shadow-2xl shadow-green-400  shadow-[5px_3px_60px_-8px] hover:bg-green-300 animate-blurred-fade-in animate-delay-800"
              }
            >
              Inscreva-se Agora
            </Button>
            <Button
              className={
                "px-5 py-3 rounded-3xl text-white font-bold border-green-500 border-2 animate-blurred-fade-in animate-delay-800"
              }
            >
              Saber Mais
            </Button>
          </div>
        </div>

        <div className={"animate-fade-in animate-delay-1000"}>
          <ChevronDownIcon className="absolute bottom-5 w-10 h-10 text-white animate-bouncing animate-iteration-count-infinite cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
