"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>("light");
	const [mounted, setMounted] = useState(false);

	// Check for saved theme preference or default to 'light'
	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") as Theme | null;
		const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
			.matches
			? "dark"
			: "light";

		setTheme(savedTheme || systemPreference);
		setMounted(true);
	}, []);

	// Update document class and localStorage when theme changes
	useEffect(() => {
		if (mounted) {
			document.documentElement.classList.toggle("dark", theme === "dark");
			localStorage.setItem("theme", theme);
		}
	}, [theme, mounted]);

	const toggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
	};

	// Always provide the context, but handle the mounted state properly
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{mounted ? children : <div suppressHydrationWarning>{children}</div>}
		</ThemeContext.Provider>
	);
};
