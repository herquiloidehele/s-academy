import { Button } from "@/components/ui/button";
import React from "react";
import SpinnerIcon from "@/assets/icons/spinner-icon.svg";

export default function FormButtonWithLoader(props: { loading: boolean; label: string; loadingLabel?: string }) {
  return (
    <Button className="hover:bg-green-600" type="submit" disabled={props.loading}>
      {props.loading ? (
        <div className="flex items-center justify-center">
          <div className="w-7 h-7 border-t-2 border-b-2 border-green-400 rounded-full animate-spin">
            <SpinnerIcon className="w-full h-full text-green-400" />
          </div>
        </div>
      ) : (
        props.label
      )}
    </Button>
  );
}
