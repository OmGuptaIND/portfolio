"use client";

import type React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface SocialLink {
	id: string;
	name: string;
	url: string;
	icon: React.ReactNode;
}

interface SocialLinksProps {
	links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const baseButtonClass =
		"flex h-10 w-10 items-center justify-center rounded-full transition-colors";
	const lightButtonClass =
		"bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800";
	const darkButtonClass =
		"bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200";
	const focusRingClass =
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 focus-visible:ring-offset-2";
	const focusRingOffsetClass = isDark
		? "focus-visible:ring-offset-gray-900"
		: "focus-visible:ring-offset-white";

	return (
		<div className="mb-8 flex space-x-4">
			{links.map((link) => (
				<a
					key={link.id}
					href={link.url}
					target="_blank"
					rel="noopener noreferrer"
					className={`${baseButtonClass} ${isDark ? darkButtonClass : lightButtonClass} ${focusRingClass} ${focusRingOffsetClass}`}
					aria-label={link.name}
				>
					{link.icon}
				</a>
			))}
		</div>
	);
};

export default SocialLinks;
