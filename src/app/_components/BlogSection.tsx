"use client";

import { useTheme } from "@/contexts/ThemeContext";
import type { BlogPost } from "@/types/content";
import { Loader2 } from "lucide-react";
import { Fragment } from "react";
import type React from "react";

interface BlogSectionProps {
	title: string;
	posts: BlogPost[];
	isLoading?: boolean;
	errorMessage?: string | null;
}

const BlogSection: React.FC<BlogSectionProps> = ({
	title,
	posts,
	isLoading = false,
	errorMessage = null,
}) => {
	const { theme } = useTheme();
	const isDark = theme === "dark";
	const sectionTitleColor = isDark ? "text-gray-100" : "text-gray-700";
	const borderColor = isDark ? "border-gray-800" : "border-gray-100";
	const metaTextColor = isDark ? "text-gray-400" : "text-gray-500";
	const postTitleColor = isDark ? "text-gray-100" : "text-gray-900";
	const excerptColor = isDark ? "text-gray-300" : "text-gray-700";
	const tagColor = isDark
		? "bg-gray-800 text-gray-400"
		: "bg-gray-100 text-gray-600";
	const linkColor = isDark
		? "text-blue-400 hover:text-blue-300"
		: "text-blue-600 hover:text-blue-800";
	const infoCardClass = `mt-2 flex items-center gap-2 rounded-lg border px-3 py-2 font-[family-name:var(--font-geist-sans)] text-sm ${
		isDark
			? "border-gray-800 bg-gray-900/60 text-gray-300"
			: "border-gray-200 bg-gray-50 text-gray-600"
	}`;
	const errorCardClass = `mt-2 flex items-center gap-2 rounded-lg border px-3 py-2 font-[family-name:var(--font-geist-sans)] text-sm ${
		isDark
			? "border-red-500/40 bg-red-950/40 text-red-200"
			: "border-red-200 bg-red-50 text-red-600"
	}`;

	return (
		<section className="mb-8">
			<h2
				className={`mb-6 font-[family-name:var(--font-geist-sans)] font-semibold text-lg ${sectionTitleColor}`}
			>
				{title}
			</h2>
			{isLoading && (
				<div className={infoCardClass}>
					<Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
					<span>Fetching the latest posts…</span>
				</div>
			)}
			{errorMessage && !isLoading && (
				<div className={errorCardClass} role="alert">
					<span>{errorMessage}</span>
				</div>
			)}
			{!isLoading && !errorMessage && posts.length === 0 && (
				<div className={infoCardClass}>
					<span>No posts yet. Check back soon!</span>
				</div>
			)}
			<div className="space-y-6">
				{posts.map((post) => (
					<div
						key={post.id}
						className={`border-b pb-6 last:border-b-0 ${borderColor}`}
					>
						{(() => {
							const metaItems = [post.date, post.readTime].filter(
								(item): item is string =>
									Boolean(item && item.trim().length > 0),
							);
							if (metaItems.length === 0) {
								return null;
							}
							return (
								<div
									className={`mb-2 flex flex-wrap items-center gap-2 text-sm ${metaTextColor}`}
								>
									{metaItems.map((item, index) => (
										<Fragment key={`${post.id}-meta-${index}`}>
											{index > 0 && <span>•</span>}
											<span>{item}</span>
										</Fragment>
									))}
								</div>
							);
						})()}
						<h3
							className={`mb-2 font-[family-name:var(--font-geist-sans)] font-medium ${postTitleColor}`}
						>
							{post.title}
						</h3>
						<p
							className={`mb-3 font-[family-name:var(--font-geist-sans)] text-sm ${excerptColor}`}
						>
							{post.excerpt}
						</p>
						{post.tags && post.tags.length > 0 && (
							<div className="mb-3 flex flex-wrap gap-2">
								{post.tags.map((tag) => (
									<span
										key={tag}
										className={`rounded-full px-2 py-1 font-[family-name:var(--font-geist-sans)] text-xs ${tagColor}`}
									>
										{tag}
									</span>
								))}
							</div>
						)}
						{post.url && (
							<a
								href={post.url}
								target="_blank"
								rel="noopener noreferrer"
								className={`inline-block font-[family-name:var(--font-geist-sans)] text-sm ${linkColor} focus-visible:underline focus-visible:outline-none`}
							>
								Read more →
							</a>
						)}
					</div>
				))}
			</div>
		</section>
	);
};

export default BlogSection;
