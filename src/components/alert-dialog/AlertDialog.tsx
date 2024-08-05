import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertDialogProps {
  children: React.ReactNode;
  title: string;
  description: string;
  cancelButtonLabel?: string;
  actionButtonLabel?: string;
  onAction: () => void;
  onCancel?: () => void;
  open: boolean;
  loading?: boolean;
  setOpen: (open: boolean) => void;
}

export function CustomAlertDialog({
  children,
  title,
  description,
  cancelButtonLabel = "Cancelar",
  actionButtonLabel = "Confirmar",
  onAction,
  onCancel,
  open,
  setOpen,
}: AlertDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="p-0 m-0 my-auto align-middle">
          {children}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{cancelButtonLabel}</AlertDialogCancel>
          <AlertDialogAction className="hover:bg-active hover:text-active-foreground" onClick={onAction}>
            {actionButtonLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
