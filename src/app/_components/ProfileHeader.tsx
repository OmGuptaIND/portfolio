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
	return (
		<header className="mb-8">
			<div className="mb-4 flex items-start justify-between">
				<div>
					<h1 className="var(--font-geist-sans) mb-2 font-bold text-4xl">
						Hi, I'm {name}
					</h1>
					<p className="var(--font-geist-sans) mb-4 font-light text-gray-600 text-md italic dark:text-gray-400">
						{title}
					</p>
				</div>
				<button
					onClick={toggleTheme}
					type="button"
					className="cursor-pointer rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
					aria-label="Toggle theme"
				>
					{theme === "dark" ? (
						<Sun className="h-5 w-5 text-yellow-400" />
					) : (
						<Moon className="h-5 w-5 text-gray-600" />
					)}
				</button>
			</div>

			<div className="mb-6">
				<h2 className="var(--font-geist-sans) mb-2 font-medium text-lg">
					About
				</h2>
				<div className="var(--font-geist-sans) text-gray-700 leading-relaxed dark:text-gray-300">
					{description}
				</div>
			</div>
		</header>
	);
};

export default ProfileHeader;
