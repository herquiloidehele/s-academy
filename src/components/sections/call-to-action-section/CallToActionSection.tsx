"use client";
import { motion } from "framer-motion";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { useRouter } from "next/navigation";
import { Constants } from "@/utils/Constants";
import { ICourse } from "@/app/business/course/CourseData";

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

interface ICallToActionSectionProps {
  course: ICourse;
}
export default function CallToActionSection(props: ICallToActionSectionProps) {
  const router = useRouter();

  return (
    <div className="relative py-8 lg:py-16">
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
              className="text-center font-bold text-gray-800 text-2xl md:text-4xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Começe agora
            </motion.h1>
            <motion.p
              className="text-center text-md md:text-xl text-gray-600"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Faça parte da nossa comunidade e comece a criar a sua loja online hoje mesmo.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3 lg:gap-5">
              <a href="#">
                <ButtonElement
                  size={ButtonSize.SMALL}
                  shape={ButtonShape.ROUNDED}
                  type={ButtonType.PRIMARY}
                  fillType={FillType.FILLED}
                  shadow
                  onClick={() => {
                    router.push(Constants.APP_ROUTES.CHECKOUT(props.course.id));
                  }}
                >
                  Inscreva-se Agora
                </ButtonElement>
              </a>
              <a href="whatsapp://send?phone=+258847005571&text=Olá, gostaria de saber mais sobre os vossos cursos.">
                <ButtonElement
                  size={ButtonSize.SMALL}
                  shape={ButtonShape.ROUNDED}
                  type={ButtonType.SECONDARY}
                  fillType={FillType.FILLED}
                  shadow
                >
                  Fale Connosco
                </ButtonElement>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
