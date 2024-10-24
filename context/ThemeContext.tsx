import { createContext, useState } from "react";
import { IThemeContext, ThemeContextType } from "types";

export const ThemeContext = createContext<IThemeContext | null>(null)

export const ThemeContextContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeContextType>("light")

    const updateTheme = (theme: ThemeContextType) => {
        setTheme(theme)
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            updateTheme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}