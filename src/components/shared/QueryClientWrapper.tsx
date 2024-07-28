"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/app/backend/services/ReactQueryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

interface AppComponentProps {
  children: ReactNode;
}
export default function QueryClientWrapper({ children }: AppComponentProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools client={queryClient} initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
