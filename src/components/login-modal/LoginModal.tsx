import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { handleSocialLogin } from "@/app/backend/actions/auth";
import { Constants } from "@/utils/Constants";
import GoogleIco from "@/assets/icons/google-icon.svg";
import * as React from "react";

interface LoginModalProps {
  open: boolean;
  onChange: (isOpen: boolean) => void;
}
export default function LoginModal(props: LoginModalProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.onChange} modal={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entrar</DialogTitle>
          <DialogDescription>Para aceder aos cursos, faça login com a sua conta.</DialogDescription>
        </DialogHeader>
        <form className={"flex flex-col gap-4"} action={handleSocialLogin}>
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
      </DialogContent>
    </Dialog>
  );
}
