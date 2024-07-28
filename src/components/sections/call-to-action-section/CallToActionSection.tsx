"use client";
import { motion } from "framer-motion";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import Image from "next/image";
import Link from "next/link";

import AvatarImage1 from "@/assets/images/avatar1.png";
import AvatarImage2 from "@/assets/images/avatar2.png";
import AvatarImage3 from "@/assets/images/avatar3.png";
import AvatarImage4 from "@/assets/images/avatar4.png";
import { SignupType } from "@/utils/interfaces";
import GenericSignupModal from "@/components/generic-signup-modal/GenericSignupModal";
import { useState } from "react";

const TESTIMONIALS_AVATARS_DATA = [
  {
    avatar: AvatarImage1.src,
  },
  {
    avatar: AvatarImage2.src,
  },
  {
    avatar: AvatarImage3.src,
  },
  {
    avatar: AvatarImage4.src,
  },
  {
    avatar: AvatarImage1.src,
  },
  {
    avatar: AvatarImage2.src,
  },
];

export default function CallToActionSection() {
  const [isOpenTutorSignupModal, setIsOpenTutorSignupModal] = useState(false);

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
            <Image
              loading="lazy"
              width="400"
              height="400"
              src={TESTIMONIALS_AVATARS_DATA[0].avatar}
              alt="member photo"
              className="h-8 w-8 rounded-full object-cover filter grayscale"
            />
            <Image
              loading="lazy"
              width="200"
              height="200"
              src={TESTIMONIALS_AVATARS_DATA[1].avatar}
              alt="member photo"
              className="h-12 w-12 rounded-full object-cover filter grayscale"
            />
            <Image
              loading="lazy"
              width="200"
              height="200"
              src={TESTIMONIALS_AVATARS_DATA[2].avatar}
              alt="member photo"
              className="z-10 h-16 w-16 rounded-full object-cover filter grayscale"
            />
            <Image
              loading="lazy"
              width="200"
              height="200"
              src={TESTIMONIALS_AVATARS_DATA[3].avatar}
              alt="member photo"
              className="relative h-12 w-12 rounded-full object-cover filter grayscale"
            />
            <Image
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
              Faça parte da nossa comunidade de partilha de conhecimento e experiências.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3 lg:gap-5">
              <Link href={`#${Constants.UI.SECTIONS.COURSES}`}>
                <ButtonElement
                  size={ButtonSize.SMALL}
                  shape={ButtonShape.ROUNDED}
                  type={ButtonType.PRIMARY}
                  fillType={FillType.FILLED}
                  shadow
                >
                  Comprar Cursos
                </ButtonElement>
              </Link>
              <Link
                href={"#"}
                onClick={(event) => {
                  event.preventDefault();
                  setIsOpenTutorSignupModal(true);
                }}
              >
                <ButtonElement
                  size={ButtonSize.SMALL}
                  shape={ButtonShape.ROUNDED}
                  type={ButtonType.SECONDARY}
                  fillType={FillType.FILLED}
                  shadow
                >
                  Vender meu Curso
                </ButtonElement>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <GenericSignupModal
        open={isOpenTutorSignupModal}
        onChange={(value) => {
          setIsOpenTutorSignupModal(value);
        }}
        signupModalType={SignupType.TUTOR_SIGN_UP}
      />
    </div>
  );
}
