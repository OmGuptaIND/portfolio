"use client";

import type React from "react";
import ImageWithFallback from "./ImageWithFallback";
import { useTheme } from "@/contexts/ThemeContext";

interface WorkItem {
	id: string;
	title: string;
	company: string;
	description: string;
	image?: string;
	url?: string;
	ctaLabel?: string;
	imageClassName?: string;
}

interface WorkSectionProps {
	title: string;
	items: WorkItem[];
}

interface ThemeStyles {
	sectionTitle: string;
	itemTitle: string;
	companyText: string;
	descriptionText: string;
	linkText: string;
}

const getThemeStyles = (isDark: boolean): ThemeStyles => ({
	sectionTitle: isDark ? "text-gray-100" : "text-gray-700",
	itemTitle: isDark ? "text-gray-100" : "text-gray-900",
	companyText: isDark ? "text-gray-400" : "text-gray-600",
	descriptionText: isDark ? "text-gray-300" : "text-gray-700",
	linkText: isDark
		? "text-blue-400 hover:text-blue-300"
		: "text-blue-600 hover:text-blue-800",
});

interface WorkCardProps {
	item: WorkItem;
	styles: ThemeStyles;
}

const WorkCard: React.FC<WorkCardProps> = ({ item, styles }) => {
	const linkLabel = item.ctaLabel ?? "Learn more →";
	const imageClassName = item.imageClassName ?? "object-cover";

	return (
		<div className="flex items-start space-x-4">
			{item.image && (
				<div className="flex-shrink-0">
					<ImageWithFallback
						src={item.image}
						alt={`${item.company} logo`}
						className={`h-12 w-12 rounded-lg ${imageClassName}`}
					/>
				</div>
			)}
			<div className="min-w-0 flex-1">
				<h3
					className={`font-[family-name:var(--font-geist-sans)] font-medium ${styles.itemTitle}`}
				>
					{item.title}
				</h3>
				<p
					className={`font-[family-name:var(--font-geist-sans)] text-sm ${styles.companyText}`}
				>
					{item.company}
				</p>
				<p
					className={`mt-2 font-[family-name:var(--font-geist-sans)] text-sm ${styles.descriptionText}`}
				>
					{item.description}
				</p>
				{item.url && (
					<a
						href={item.url}
						target="_blank"
						rel="noopener noreferrer"
						className={`mt-2 inline-block font-[family-name:var(--font-geist-sans)] text-sm ${styles.linkText} focus-visible:outline-none focus-visible:underline`}
					>
						{linkLabel}
					</a>
				)}
			</div>
		</div>
	);
};

const WorkSection: React.FC<WorkSectionProps> = ({ title, items }) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const styles = getThemeStyles(isDark);

	return (
		<section className="mb-8">
			<h2
				className={`${styles.sectionTitle} mb-6 font-[family-name:var(--font-geist-sans)] font-semibold text-lg`}
			>
				{title}
			</h2>
			<div className="space-y-6">
				{items.map((item) => (
					<WorkCard key={item.id} item={item} styles={styles} />
				))}
			</div>
		</section>
	);
};

export default WorkSection;
