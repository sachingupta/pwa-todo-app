import * as React from "react";
import { useContext } from "react";
import { ThemeContext } from "../components/ThemeContext";

export function ThemedButton() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <button
            onClick={toggleTheme}
            style={{ backgroundColor: theme.background, color: theme.color }}>
            Toggle Theme
        </button>
    );
}