import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import React from "react";

export default function FormButtonWithLoader(props: { loading: boolean; label: string; loadingLabel?: string }) {
  return (
    <Button className="hover:bg-green-600" type="submit">
      {props.loading ? (
        <div className="flex flex-row gap-2">
          <Loader2Icon className="size-6 animate-spin" /> <span>{props.loadingLabel}</span>
        </div>
      ) : (
        props.label
      )}
    </Button>
  );
}
