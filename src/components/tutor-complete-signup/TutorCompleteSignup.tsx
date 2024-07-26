import Header from "@/components/header/Header";
import Input from "@/components/shared/Input/Input";
import TextArea from "@/components/shared/text-area/TextArea";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import Image from "next/image";
import HeroImage4 from "@/assets/images/hero4.jpg";
import { IUser } from "@/app/backend/business/auth/UsersData";

interface ITutorCompleteSignupProps {
  user: IUser;
}
export default function TutorCompleteSignup(props: ITutorCompleteSignupProps) {
  return (
    <div
      className={
        "w-full h-[100vh] overflow-hidden flex justify-center items-center bg-gray-100 p-4 pt-4 md:10 lg:pt-20"
      }
    >
      <Header solidBg />
      <div className="mx-auto p-4 md:p-5 lg:p-10 w-full lg:w-[70vw] h-auto bg-white rounded-xl border shadow-sm border-gray-200">
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
          <div className="lg:col-span-3 space-y-5">
            <div className={"space-y-2"}>
              <h1 className={"text-2xl font-bold text-black/70"}>Finalize o seu Registo</h1>
              <p className={"text-gray-500 text-sm"}>
                Complete o seu registo para começar a vender os seus cursos online.
              </p>
            </div>
            <div className="grid gap-y-4">
              <Input label={"Nome Público"} placeholder={"Nome Público"} name={"public_name"} />

              <Input
                label={"Número de Telefone"}
                placeholder={"Número de Telefone"}
                name={"phone_Number"}
                type={"number"}
                inputMode={"tel"}
                min={0}
              />

              <TextArea label={"Descrição"} placeholder={"Descrição"} name={"description"} rows={3} />

              <ButtonElement
                type={ButtonType.PRIMARY}
                fillType={FillType.FILLED}
                size={ButtonSize.MEDIUM}
                shape={ButtonShape.SQUARE}
                isLoading={false}
              >
                Finalizar Registo
              </ButtonElement>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4 mt-10 lg:mt-0 relative">
            <Image width={1200} height={1200} className="w-full rounded-xl" src={HeroImage4.src} alt="Hero Image" />
          </div>
        </div>
      </div>
    </div>
  );
}
