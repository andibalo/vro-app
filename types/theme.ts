export type ThemeContextType = "light" | "dark";

export interface IThemeContext {
    theme: ThemeContextType
    updateTheme: (theme: ThemeContextType) => void;
}