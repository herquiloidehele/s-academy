import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon } from "@heroicons/react/24/outline";
import GoogleIco from "@/assets/icons/google-icon.svg";
import { handleSocialLogin } from "@/app/actions/auth";
import { Constants } from "@/utils/Constants";
import { auth } from "@/auth";

export async function SignupForm() {
  const session = await auth();
  const user = session?.user;

  return (
    <Card className="">
      <CardHeader>
        <div className={"flex gap-2 items-center"}>
          <div className={"bg-green-200 p-1 rounded-lg"}>
            <UserIcon className="w-6 h-6 stroke-green-500" />
          </div>
          <CardTitle className={"text-xl text-blue-950"}>{user ? `Olá, ${user.name}` : "Crie uma conta"}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {user ? (
          <>
            <p className={"text-gray-500 max-w-xl"}>
              Você já está autenticado 🎉, continue para finalizar a compra 🚀🚀.
            </p>
          </>
        ) : (
          <form className={"flex flex-col gap-4"} action={handleSocialLogin}>
            <p className={"text-gray-500 max-w-xl"}>
              Crie uma conta para ter acesso a todos os cursos disponíveis na nossa plataforma.
            </p>
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
        )}
      </CardContent>
    </Card>
  );
}
