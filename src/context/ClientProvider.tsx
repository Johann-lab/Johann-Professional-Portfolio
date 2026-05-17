"use client";

import { ThemeProvider } from "./ThemeContext";
import { ToastProvider } from "@/hooks/use-toast";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  );
}