"use client";

import Image from "next/image";
import HeroDesktop from "@/assets/images/hero-desktop.jpg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/Constants";
import Link from "next/link";
import { ICourse } from "@/app/business/course/CourseData";

interface IHeroSectionProps {
  course: ICourse;
}
export default function HeroSection(props: IHeroSectionProps) {
  const router = useRouter();

  return (
    <div className="relative w-full h-[100vh] flex justify-center">
      <Image src={HeroDesktop} alt={"Hero Desktop"} className="w-full h-full object-cover absolute top-0 left-0" />

      <div className="z-10 flex f-full items-center justify-center flex-col w-full bg-blue-950/90">
        <div className="flex items-center justify-center flex-col gap-5">
          <h1 className="text-3xl lg:text-6xl font-bold text-white text-center max-w-[90%] lg:max-w-[59%] leading-snug animate-fade-in-up animate-delay-100">
            Quer aprender a criar uma loja <span className={"text-green-400"}>Shopify</span> para o seu negócio?
          </h1>

          <p
            className={
              "text-gray-300 text-md lg:text-xl text-center font-normal max-w-[90%] lg:max-w-[40%] leading-normal animate-fade-in-up animate-delay-500"
            }
          >
            Junte-se ao nosso curso de criação de lojas Shopify e domine todas as ferramentas e técnicas necessárias
            para
            <span className={"text-green-400 font-bold"}> impulsionar seu negócio</span> online.
          </p>

          <div className={"flex gap-3 mt-4"}>
            <ButtonElement
              type={ButtonType.PRIMARY}
              fillType={FillType.FILLED}
              size={ButtonSize.MEDIUM}
              shape={ButtonShape.ROUNDED}
              shadow
              animate
              onClick={() => {
                router.push(Constants.APP_ROUTES.CHECKOUT(props.course.id));
              }}
            >
              Inscreva-se Agora
            </ButtonElement>
            <Link href={`#${Constants.UI.SECTIONS.COURSE}`}>
              <ButtonElement
                type={ButtonType.PRIMARY}
                fillType={FillType.OUTLINE}
                shape={ButtonShape.ROUNDED}
                size={ButtonSize.MEDIUM}
                animate
              >
                Saber Mais
              </ButtonElement>
            </Link>
          </div>
        </div>

        <div className={"animate-fade-in animate-delay-1000"}>
          <Link href={`#${Constants.UI.SECTIONS.COURSE}`}>
            <ChevronDownIcon className="absolute bottom-5 w-10 h-10 text-white animate-bouncing animate-iteration-count-infinite cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
}
