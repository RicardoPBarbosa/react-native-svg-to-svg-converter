"use client";

import { Toaster } from "sonner";

import { SvgConverterProvider } from "@/context";
import Toast from "@/components/Toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SvgConverterProvider>
      <Toaster richColors />
      <Toast />
      {children}
    </SvgConverterProvider>
  );
}
