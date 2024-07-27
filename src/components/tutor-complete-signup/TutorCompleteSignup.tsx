"use client";

import Input from "@/components/shared/Input/Input";
import TextArea from "@/components/shared/text-area/TextArea";
import ButtonElement, { ButtonShape, ButtonSize, ButtonType, FillType } from "@/components/shared/Button";
import Image from "next/image";
import HeroImage4 from "@/assets/images/hero4.jpg";
import { IUser } from "@/app/backend/business/auth/UsersData";
import { SubmitHandler, useForm } from "react-hook-form";
import { ITutorSignupForm, tutorSingnupFormSchema } from "@/components/tutor-complete-signup/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useMutation } from "@tanstack/react-query";
import { createOrUpdateTutor } from "@/app/backend/actions/users";
import { toast } from "sonner";

interface ITutorCompleteSignupProps {
  user: IUser;
}
export default function TutorCompleteSignup(props: ITutorCompleteSignupProps) {
  const { isPending } = useMutation({
    mutationKey: ["createOrUpdateTutor"],
    mutationFn: (formData: ITutorSignupForm) => {
      return createOrUpdateTutor(formData);
    },
    onError: () => {
      toast.error("Erro ao guardar os dados, por favor tente novamente");
    },
    onSuccess: () => {
      toast.success("Dados guardados com sucesso");
    },
  });

  const { handleSubmit, register, formState, watch, getValues } = useForm<ITutorSignupForm>({
    resolver: zodResolver(tutorSingnupFormSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      description: "",
      isRegistrationComplete: true,
      userId: props.user.id,
      id: undefined,
    },
  });

  const { isValid } = formState;

  const onSubmit: SubmitHandler<ITutorSignupForm> = (data: ITutorSignupForm) => {
    createOrUpdateTutor(data);
  };

  return (
    <div
      className={
        "w-full h-[100vh] overflow-hidden flex justify-center items-center bg-gray-100 p-4 pt-4 md:10 lg:pt-20"
      }
    >
      <div className="mx-auto p-4 md:p-5 lg:p-10 w-full lg:w-[70vw] h-auto bg-white rounded-xl border shadow-sm border-gray-200">
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
          <div className="lg:col-span-3 space-y-5">
            <div className={"space-y-2"}>
              <h1 className={"text-2xl font-bold text-black/70"}>Finalize o seu Registo</h1>
              <p className={"text-gray-500 text-sm"}>
                Complete o seu registo para começar a vender os seus cursos online.
              </p>
            </div>
            <form className="grid gap-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label={"Nome Público"}
                placeholder={"Nome Público"}
                {...register("name")}
                error={formState.errors.name}
              />

              <Input
                label={"Número de Telefone"}
                placeholder={"Número de Telefone"}
                inputMode={"tel"}
                type={"number"}
                {...register("phoneNumber")}
              />
              <TextArea label={"Descrição"} placeholder={"Descrição"} rows={3} {...register("description")} />
              <ButtonElement
                type={ButtonType.PRIMARY}
                fillType={FillType.FILLED}
                size={ButtonSize.MEDIUM}
                shape={ButtonShape.SQUARE}
                isLoading={isPending}
                disabled={!isValid}
                inputType="submit"
              >
                Finalizar Registo
              </ButtonElement>
            </form>
          </div>

          <div className="hidden lg:block lg:col-span-4 mt-10 lg:mt-0 relative">
            <Image width={1200} height={1200} className="w-full rounded-xl" src={HeroImage4.src} alt="Hero Image" />
          </div>
        </div>
      </div>
    </div>
  );
}
