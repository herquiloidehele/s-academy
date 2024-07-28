import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon } from "@heroicons/react/24/outline";
import GoogleIco from "@/assets/icons/google-icon.svg";
import { handleSocialLogin } from "@/app/backend/actions/auth";
import { Constants } from "@/utils/Constants";
import { auth } from "@/auth";
import { SignupType } from "@/utils/interfaces";

interface SignupFormProps {
  courseId?: string;
}
export async function SignupForm(props: SignupFormProps) {
  const session = await auth();
  const user = session?.user;

  return (
    <Card className="">
      <CardHeader>
        <div className={"flex gap-2 items-center"}>
          <div className={"bg-green-200 p-1 rounded-lg"}>
            <UserIcon className="w-4 h-4 lg:w-6 lg:h-6 stroke-green-500" />
          </div>
          <CardTitle className={"text-blue-950"}>{user ? `Olá, ${user.name}` : "Crie uma conta"}</CardTitle>
        </div>
      </CardHeader>

      {!user && (
        <CardContent>
          <form className={"flex flex-col gap-4"} action={handleSocialLogin}>
            <p className={"text-sm md:text-md text-gray-500 max-w-lg"}>
              Crie uma conta para ter acesso a todos os cursos disponíveis na nossa plataforma.
            </p>
            <input type={"hidden"} name={Constants.AUTH_ATTRIBUTES.SINGNUP_TYPE} value={SignupType.GENERAL_LOGIN} />
            <input type={"hidden"} name={Constants.AUTH_ATTRIBUTES.COURSE_ID} value={props.courseId} />
            <div className="flex justify-center">
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
        </CardContent>
      )}
    </Card>
  );
}
