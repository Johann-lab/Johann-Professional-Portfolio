"use client";

import { ThemeProvider } from "./ThemeContext";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
