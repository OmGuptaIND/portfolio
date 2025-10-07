import { desc } from "drizzle-orm";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { blogPosts } from "@/server/db/schema";
import type { BlogPost } from "@/types/content";

const formatPublishedDate = (
	input: string | null | undefined,
): string | undefined => {
	if (!input) {
		return undefined;
	}
	const parsed = new Date(input);
	if (Number.isNaN(parsed.getTime())) {
		return input ?? undefined;
	}

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(parsed);
};

const formatReadTime = (
	input: number | string | null | undefined,
): string | undefined => {
	if (input === null || input === undefined) {
		return undefined;
	}
	if (typeof input === "number") {
		return `${input} min read`;
	}
	const trimmed = input.trim();
	if (!trimmed) {
		return undefined;
	}
	return /min read$/i.test(trimmed) ? trimmed : `${trimmed} min read`;
};

interface BlogListResponse {
	posts: BlogPost[];
	errorMessage?: string | null;
}

export const blogRouter = createTRPCRouter({
	list: publicProcedure.query(async (): Promise<BlogListResponse> => {
		if (!db) {
			return {
				posts: [],
				errorMessage:
					"Database connection not configured. No posts to display.",
			};
		}

		try {
			const rows = await db
				.select({
					id: blogPosts.id,
					title: blogPosts.title,
					excerpt: blogPosts.excerpt,
					url: blogPosts.url,
					tags: blogPosts.tags,
					publishedAt: blogPosts.publishedAt,
					readTimeMinutes: blogPosts.readTimeMinutes,
				})
				.from(blogPosts)
				.orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt))
				.limit(3);

			const posts: BlogPost[] = rows
				.filter((row) => row.id && row.title && row.excerpt)
				.map((row) => ({
					id: row.id,
					title: row.title,
					excerpt: row.excerpt,
					url: row.url ?? undefined,
					tags: row.tags ?? undefined,
					date: formatPublishedDate(row.publishedAt),
					readTime: formatReadTime(row.readTimeMinutes),
				}));

			if (posts.length === 0) {
				return {
					posts: [],
					errorMessage: "No posts in the database yet.",
				};
			}

			return {
				posts,
			};
		} catch (error) {
			console.error("Failed to load blog posts from database:", error);
			return {
				posts: [],
				errorMessage: "Unable to load posts right now.",
			};
		}
	}),
});
