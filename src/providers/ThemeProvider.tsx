"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const scriptProps =
  typeof window === "undefined"
    ? undefined
    : ({ type: "application/json" } as const);

export default function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}
