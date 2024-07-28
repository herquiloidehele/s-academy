import { Dialog, DialogContent } from "@/components/ui/dialog";
import { handleSocialLogin } from "@/app/backend/actions/auth";
import { Constants } from "@/utils/Constants";
import GoogleIco from "@/assets/icons/google-icon.svg";
import HeroImage4 from "@/assets/images/hero4.jpg";
import HeroImage6 from "@/assets/images/hero6.jpg";
import * as React from "react";
import Image from "next/image";
import { SignupType } from "@/utils/interfaces";

interface TutorSignupModalProps {
  open: boolean;
  onChange: (isOpen: boolean) => void;
  signupModalType?: SignupType;
}
export default function GenericSignupModal(props: TutorSignupModalProps) {
  if (!props.signupModalType) {
    return null;
  }

  const modalInfo: Record<SignupType, { title: JSX.Element | string; description: string; image: string }> = {
    [SignupType.TUTOR_SIGN_UP]: {
      title: (
        <span>
          Torne-se um <span className={"text-green-400"}>Tutor</span> hoje mesmo
        </span>
      ),
      description: "Comece a vender os seus cursos online para uma audiência global.",
      image: HeroImage4.src,
    },
    [SignupType.GENERAL_LOGIN]: {
      title: (
        <span>
          Encontre os melhores <span className={"text-green-400"}>cursos</span> online
        </span>
      ),
      description: "Encontre os melhores cursos online e comece a aprender hoje mesmo.",
      image: HeroImage6.src,
    },
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onChange} modal={true}>
      <DialogContent className="max-w-[90vw] md:max-w-[70vw]" hideCloseButton>
        <div className="mx-auto p-0 md:p-5">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            <div className="lg:col-span-3">
              <h1 className="block text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white">
                {modalInfo[props.signupModalType]?.title}
              </h1>
              <p className="mt-3 text-lg text-gray-600 dark:text-neutral-400">
                {modalInfo[props.signupModalType]?.description}
              </p>

              <form className={"flex flex-col gap-4 mt-5"} action={handleSocialLogin}>
                <div className="flex justify-start">
                  <input type={"hidden"} name={Constants.AUTH_ATTRIBUTES.SINGNUP_TYPE} value={props.signupModalType} />
                  <button
                    aria-label="Sign in with Google"
                    className="flex items-center bg-white border border-button-border-light rounded-md p-0.5 pr-3"
                    type={"submit"}
                    name={Constants.ACTIONS.LOGIN}
                    value={Constants.AUTH_PROVIDER.GOOGLE}
                  >
                    <div className="flex items-center justify-center bg-white w-10 h-10 rounded-l">
                      <GoogleIco className="w-6 h-6" />
                    </div>
                    <span className="text-sm text-google-text-gray tracking-wider">Continuar com Google</span>
                  </button>
                </div>
              </form>
            </div>

            <div className="lg:col-span-4 mt-10 lg:mt-0 relative">
              <Image
                width={1200}
                height={1200}
                className="w-full rounded-xl"
                src={modalInfo[props.signupModalType].image}
                alt="Hero Image"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
