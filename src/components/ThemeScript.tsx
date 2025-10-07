"use client";

import { useEffect } from "react";

export function ThemeScript() {
	useEffect(() => {
		// This runs on the client side only
		const initializeTheme = () => {
			try {
				const savedTheme = localStorage.getItem("theme");
				const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
					.matches
					? "dark"
					: "light";
				const currentTheme = savedTheme || systemTheme;

				if (currentTheme === "dark") {
					document.documentElement.classList.add("dark");
				} else {
					document.documentElement.classList.remove("dark");
				}
			} catch (error) {
				// Fallback to light theme if there's an error
				document.documentElement.classList.remove("dark");
			}
		};

		initializeTheme();
	}, []);

	return null;
}
