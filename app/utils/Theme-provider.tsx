"use client"
import { type ThemeProviderProps } from "next-themes/dist/types";
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function ThemeProvider({children,...props}: ThemeProviderProps) {
    return <NextThemesProvider attribute="class" {...props} defaultTheme="system">{children}</NextThemesProvider>
}
