import { count, desc } from "drizzle-orm";

import { getCurrentUser } from "@/server/auth/session";
import { db } from "@/server/db";
import { adminUsers, blogPosts } from "@/server/db/schema";
import AdminDashboard from "./AdminDashboard";
import AuthForms from "./AuthForms";

const ensureDatabase = () => {
	if (!db) {
		throw new Error(
			"Database connection not configured. Set NEON_DATABASE_URL to manage content.",
		);
	}
	return db;
};

const fetchPosts = async () => {
	const database = ensureDatabase();
	const posts = await database
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
		.orderBy(desc(blogPosts.publishedAt), desc(blogPosts.createdAt));

	return posts;
};

const existingUserCount = async () => {
	const database = ensureDatabase();
	const [result] = await database.select({ value: count() }).from(adminUsers);
	return Number(result?.value ?? 0);
};

export default async function AdminPage() {
	ensureDatabase();
	const user = await getCurrentUser();

	if (!user) {
		const userCount = await existingUserCount();
		return (
			<main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-12">
				<AuthForms hasUser={userCount > 0} />
			</main>
		);
	}

	const posts = await fetchPosts();

	return (
		<main className="mx-auto min-h-screen max-w-4xl px-4 py-12">
			<AdminDashboard posts={posts} user={user} />
		</main>
	);
}
