"use client";

import { Moon, Sun } from "lucide-react";
import type React from "react";

import { useTheme } from "@/contexts/ThemeContext";

interface ProfileHeaderProps {
	name: string;
	title: string;
	description: React.ReactNode;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
	name,
	title,
	description,
}) => {
	const { theme, toggleTheme } = useTheme();
	const isDark = theme === "dark";
	const subtitleColor = isDark ? "text-gray-400" : "text-gray-800";
	const descriptionColor = isDark ? "text-gray-100" : "text-gray-700";
	const buttonColorClass = isDark
		? "bg-gray-800 hover:bg-gray-600"
		: "bg-gray-200 hover:bg-gray-300";

	return (
		<header className="mb-8">
			<div className="mb-4 flex items-start justify-between">
				<div>
					<h1 className="var(--font-geist-sans) mb-2 font-bold text-3xl">
						Hi, I'm {name}
					</h1>
					<p
						className={`var(--font-geist-sans) mb-4 font-extralight text-sm italic ${subtitleColor}`}
					>
						{title}
					</p>
				</div>
				<button
					onClick={toggleTheme}
					type="button"
					className={`${buttonColorClass} cursor-pointer rounded-full p-2 transition-colors`}
					aria-label="Toggle theme"
				>
					{theme === "dark" ? (
						<Sun className="h-5 w-5 text-yellow-400" />
					) : (
						<Moon className="h-5 w-5 text-blue-800" />
					)}
				</button>
			</div>

			<div className="mb-6">
				<h2 className="var(--font-geist-sans) mb-2 font-medium text-lg">
					About
				</h2>
				<div
					className={`var(--font-geist-sans) font-normal leading-relaxed ${descriptionColor}`}
				>
					{description}
				</div>
			</div>
		</header>
	);
};

export default ProfileHeader;
