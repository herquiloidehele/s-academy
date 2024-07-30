"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import { Constants } from "@/utils/Constants";
import { useRouter } from "next/navigation";
import { ICourse } from "@/app/backend/business/course/CourseData";
import { formatCurrency } from "@/lib/utils";

const itemsIncluded = [
  "04 módulos de vídeo aulas",
  "Acesso vitalício ao curso",
  "Grupo de suporte no WhatsApp",
  "Atualizações gratuitas",
];

interface IPriceSectionProps {
  course: ICourse;
}

export default function PriceSection(props: IPriceSectionProps) {
  const router = useRouter();

  return (
    <div className="w-full py-14 lg:py-32 px-6 lg:px-20 relative bg-white overflow-visible">
      <div className={"max-w-[1300px] flex flex-col gap-5 lg:gap-10 mx-auto  justify-center items-center "}>
        <motion.h1
          className={"text-blue-950 text-2xl lg:text-4xl font-bold text-center max-w-[90%] lg:max-w-[55%] leading-snug"}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Aprenda a criar uma loja Shopify do zero.
        </motion.h1>

        <div
          className={
            "shadow-2xl shadow-gray-200 border border-gray-100 rounded-3xl p-6 lg:p-16 w-full grid grid-1 lg:grid-cols-2 gap-10 lg:divide-x-2 z-10 bg-white"
          }
        >
          <motion.div
            className={"flex flex-col gap-12 items-center justify-center"}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className={"flex flex-col justify-center gap-1"}>
              <h2 className={"text-blue-950 text-xl lg:text-2xl font-bold"}>Curso Shopify</h2>
              <p className={"text-center text-md text-gray-500"}>Aprenda a criar uma loja Shopify do zero.</p>
            </div>

            <div className={"flex flex-col justify-center gap-5 items-center"}>
              <h3 className={"font-bold text-blue-950 text-2xl lg:text-3xl"}>
                {formatCurrency(props.course.price - props.course.discount)}
              </h3>
              <ButtonElement
                size={ButtonSize.MEDIUM}
                shape={ButtonShape.ROUNDED}
                type={ButtonType.PRIMARY}
                fillType={FillType.FILLED}
                shadow
                onClick={() => {
                  router.push(Constants.APP_ROUTES.CHECKOUT(props.course.id));
                }}
              >
                COMPRAR AGORA
              </ButtonElement>
            </div>

            <p className={"text-center text-gray-400 text-sm max-w-80"}>
              Acesso vitalício ao curso, incluindo atualizações e novos conteúdos. Pagamento único.
            </p>
          </motion.div>

          <motion.div
            className={"h-full flex flex-col lg:pl-16 gap-5"}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className={"text-blue-950 font-bold text-xl lg:text-2xl"}>O que está incluído?</h2>
            <ul className={"flex flex-col gap-3"}>
              {itemsIncluded.map((item, index) => (
                <li key={index} className={"flex items-center gap-2"}>
                  <CheckCircleIcon className={"text-green-400 w-6 h-6"} />
                  <span className={"text-md text-gray-600"}>{item}</span>
                </li>
              ))}
            </ul>

            <p className={"text-sm text-gray-500"}>
              <span className={"text-blue-950 font-bold"}>Garantia:</span> Até o final do curso conseguirá fazer a sua
              própria loja Shopify, caso contrário, comprometemo-nos a ajudar com o desenvolvimento.
            </p>
          </motion.div>
        </div>
      </div>

      <div className={"absolute bottom-0 left-0 w-full grid grid-cols-2"}>
        <div className={"bg-gradient-to-br from-green-400 to-blue-100 h-56 blur-[106px]"}></div>
        <div className={"bg-gradient-to-br from-blue-100 to-green-100 blur-[106px] h-56"}></div>
      </div>
    </div>
  );
}
