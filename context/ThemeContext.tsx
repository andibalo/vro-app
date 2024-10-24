import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { IThemeContext, ThemeContextType } from "types";

export const ThemeContext = createContext<IThemeContext | null>(null)

export const ThemeContextContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeContextType>("light")
 
    useEffect(() => {
        const fetchSavedTheme = async () => {
            let savedTheme = await AsyncStorage.getItem("theme");

            if (savedTheme) {
                setTheme(savedTheme as ThemeContextType)
            }
        }

        fetchSavedTheme()
    }, [])


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