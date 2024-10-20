"use client";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

export const ThemeSwitcher = () => {
    
    const { resolvedTheme, theme, setTheme } = useTheme();
       
    return (
        <div className="flex items-center justify-center mx-4">
            {
                theme === "dark" ? (
                    <BiMoon
                        className="cursor-pointer"
                        fill="white"
                        size={25}
                        onClick={() => {
                            console.log("theme,",theme);
                            setTheme(resolvedTheme === "light"? "dark": "light");
                        }}
                    />
                ) : (
                    <BiSun
                        className="cursor-pointer"                       
                        size={25}
                        onClick={() => {
                            console.log("theme,",theme);
                            setTheme(resolvedTheme === "light"? "dark": "light");
                        }}
                    />
                )
            }
        </div>
    )
}

