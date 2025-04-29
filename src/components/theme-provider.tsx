// components/theme-provider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false);

  // Set mounted to true after the component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Render nothing or a fallback during SSR, then render the ThemeProvider on the client
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}