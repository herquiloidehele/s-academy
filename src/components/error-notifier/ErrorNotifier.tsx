"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useGlobalStore } from "@/app/globalStore";

const ErrorNotifier = () => {
  const { error } = useGlobalStore((state) => ({
    error: state.error,
  }));

  useEffect(() => {
    if (error) {
      toast.error(error);
      useGlobalStore.getState?.()?.setError("");
    }
  }, [error]);

  return null;
};

export default ErrorNotifier;
