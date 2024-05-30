import { Button } from "@headlessui/react";
import Image from "next/image";
import HeroDesktop from "@/assets/images/hero-desktop.jpg";

export default function HeroSection() {
  return (
    <div className="relative w-full h-[100vh] flex justify-center">
      <Image src={HeroDesktop} alt={"Hero Desktop"} className="w-full h-full object-cover absolute top-0 left-0" />

      <div className="z-10 flex f-full items-center justify-center flex-col w-full bg-black/90">
        <div className="flex items-center justify-center flex-col gap-5">
          <h1 className="text-6xl font-bold text-white text-center max-w-[59%] leading-snug">
            Quer aprender a criar uma loja <span className={"text-green-400"}>Shopify</span> para o seu negócio?
          </h1>

          <p className={"text-zinc-400 text-xl text-center font-normal max-w-[40%] leading-normal"}>
            Junte-se ao nosso curso de criação de lojas Shopify e domine todas as ferramentas e técnicas necessárias
            para
            <span className={"text-green-400 font-bold"}> impulsionar seu negócio</span> online.
          </p>

          <div className={"flex gap-3 mt-4"}>
            <Button className={"bg-green-400 px-5 py-3 rounded-3xl text-white font-bold"}>Inscreva-se Agora</Button>
            <Button className={"px-5 py-3 rounded-3xl text-white font-bold border-green-500 border-2"}>
              Saber Mais
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
