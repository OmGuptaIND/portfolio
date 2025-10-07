"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { count, eq } from "drizzle-orm";

import { db } from "@/server/db";
import { adminUsers, blogPosts } from "@/server/db/schema";
import {
	createSession,
	destroySession,
	getCurrentUser,
} from "@/server/auth/session";

type ActionState = {
	error?: string;
	success?: string;
};

const ensureDatabase = () => {
	if (!db) {
		throw new Error(
			"Database connection not configured. Set NEON_DATABASE_URL to use the admin console.",
		);
	}
	return db;
};

const parseTags = (value: FormDataEntryValue | null): string[] | null => {
	if (!value) {
		return null;
	}
	const tags = value
		.toString()
		.split(",")
		.map((tag) => tag.trim())
		.filter((tag) => tag.length > 0);
	return tags.length > 0 ? tags : null;
};

const parsePublishedAt = (value: FormDataEntryValue | null): string | null => {
	if (!value) {
		return null;
	}
	const iso = new Date(value.toString());
	return Number.isNaN(iso.getTime()) ? null : iso.toISOString();
};

const parseReadTime = (value: FormDataEntryValue | null): number | null => {
	if (!value) {
		return null;
	}
	const asNumber = Number.parseInt(value.toString(), 10);
	return Number.isFinite(asNumber) && asNumber > 0 ? asNumber : null;
};

export const registerAdmin = async (
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> => {
	const database = ensureDatabase();

	const email = formData.get("email")?.toString().toLowerCase().trim() ?? "";
	const password = formData.get("password")?.toString() ?? "";
	const confirm = formData.get("confirmPassword")?.toString() ?? "";

	if (!email || !email.includes("@")) {
		return { error: "Enter a valid email address." };
	}
	if (password.length < 8) {
		return { error: "Password must be at least 8 characters long." };
	}
	if (password !== confirm) {
		return { error: "Passwords do not match." };
	}

	const userCountResult = await database
		.select({ value: count() })
		.from(adminUsers);
	const userCount = Number(userCountResult[0]?.value ?? 0);

	if (userCount > 0) {
		return { error: "An admin account already exists. Please sign in." };
	}

	const passwordHash = await bcrypt.hash(password, 12);

	const [user] = await database
		.insert(adminUsers)
		.values({ email, passwordHash })
		.returning({ id: adminUsers.id });

	if (!user) {
		return { error: "Unable to create account. Please try again." };
	}

	await createSession(user.id);
	redirect("/admin");
};

export const loginAdmin = async (
	_prev: ActionState,
	formData: FormData,
): Promise<ActionState> => {
	const database = ensureDatabase();

	const email = formData.get("email")?.toString().toLowerCase().trim() ?? "";
	const password = formData.get("password")?.toString() ?? "";

	if (!email || !password) {
		return { error: "Email and password are required." };
	}

	const user = await database.query.adminUsers.findFirst({
		where: eq(adminUsers.email, email),
	});

	if (!user) {
		return { error: "Invalid credentials. Please try again." };
	}

	const isValid = await bcrypt.compare(password, user.passwordHash);
	if (!isValid) {
		return { error: "Invalid credentials. Please try again." };
	}

	await createSession(user.id);
	redirect("/admin");
};

export const logoutAdmin = async () => {
	await destroySession();
	redirect("/admin");
};

export const createBlogPost = async (
	prev: ActionState,
	formData: FormData,
): Promise<ActionState> => {
	const database = ensureDatabase();
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return { error: "You need to be signed in to publish posts." };
	}

	const title = formData.get("title")?.toString().trim() ?? "";
	const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
	const url = formData.get("url")?.toString().trim() ?? "";
	const tags = parseTags(formData.get("tags"));
	const publishedAt = parsePublishedAt(formData.get("publishedAt"));
	const readTimeMinutes = parseReadTime(formData.get("readTime"));

	if (!title) {
		return { error: "Title is required." };
	}
	if (!excerpt) {
		return { error: "Excerpt is required." };
	}

	await database.insert(blogPosts).values({
		title,
		excerpt,
		url: url || null,
		tags,
		publishedAt,
		readTimeMinutes,
		updatedAt: new Date().toISOString(),
	});

	revalidatePath("/admin");
	revalidatePath("/");
	return { success: "Post published." };
};

export const updateBlogPost = async (
	prev: ActionState,
	formData: FormData,
): Promise<ActionState> => {
	const database = ensureDatabase();
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return { error: "You need to be signed in to update posts." };
	}

	const id = formData.get("id")?.toString();
	const title = formData.get("title")?.toString().trim() ?? "";
	const excerpt = formData.get("excerpt")?.toString().trim() ?? "";
	const url = formData.get("url")?.toString().trim() ?? "";
	const tags = parseTags(formData.get("tags"));
	const publishedAt = parsePublishedAt(formData.get("publishedAt"));
	const readTimeMinutes = parseReadTime(formData.get("readTime"));

	if (!id) {
		return { error: "Post identifier missing." };
	}
	if (!title) {
		return { error: "Title is required." };
	}
	if (!excerpt) {
		return { error: "Excerpt is required." };
	}

	await database
		.update(blogPosts)
		.set({
			title,
			excerpt,
			url: url || null,
			tags,
			publishedAt,
			readTimeMinutes,
			updatedAt: new Date().toISOString(),
		})
		.where(eq(blogPosts.id, id));

	revalidatePath("/admin");
	revalidatePath("/");
	return { success: "Post updated." };
};

export const deleteBlogPost = async (formData: FormData): Promise<ActionState> => {
	const database = ensureDatabase();
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return { error: "You need to be signed in to delete posts." };
	}

	const id = formData.get("id")?.toString();
	if (!id) {
		return { error: "Post identifier missing." };
	}

	await database.delete(blogPosts).where(eq(blogPosts.id, id));

	revalidatePath("/admin");
	revalidatePath("/");
	return { success: "Post removed." };
};
