"use client";

import type React from "react";

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
	return (
		<header className="mb-8">
			<div className="mb-4 flex items-start justify-between">
				<div>
					<h1 className="var(--font-geist-sans) mb-2 font-bold text-4xl">
						Hi, I'm {name}
					</h1>
					<p className="var(--font-geist-sans) mb-4 font-light text-gray-600 text-md italic">
						{title}
					</p>
				</div>
				<button
					type="button"
					className="rounded-full bg-gray-100 p-2 transition-colors hover:bg-gray-200"
					aria-label="Toggle theme"
				>
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<title>Theme toggle</title>
						<circle cx="12" cy="12" r="5" />
						<path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" />
					</svg>
				</button>
			</div>

			<div className="mb-6">
				<h2 className="var(--font-geist-sans) mb-2 font-medium text-lg">
					About
				</h2>
				<p className="var(--font-geist-sans) text-gray-700 leading-relaxed">
					{description}
				</p>
			</div>
		</header>
	);
};

export default ProfileHeader;
