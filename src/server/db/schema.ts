import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const blogPosts = pgTable("blog_posts", {
	id: uuid("id").defaultRandom().primaryKey(),
	title: text("title").notNull(),
	excerpt: text("excerpt").notNull(),
	url: text("url"),
	tags: text("tags").array(),
	publishedAt: timestamp("published_at", {
		withTimezone: true,
		mode: "string",
	}),
	readTimeMinutes: integer("read_time_minutes"),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
	updatedAt: timestamp("updated_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
});

export const adminUsers = pgTable("admin_users", {
	id: uuid("id").defaultRandom().primaryKey(),
	email: text("email").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
});

export const adminSessions = pgTable("admin_sessions", {
	id: uuid("id").defaultRandom().primaryKey(),
	userId: uuid("user_id")
		.notNull()
		.references(() => adminUsers.id, { onDelete: "cascade" }),
	tokenHash: text("token_hash").notNull(),
	expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "string",
	}),
	createdAt: timestamp("created_at", {
		withTimezone: true,
		mode: "string",
	}).defaultNow(),
});

export type BlogPostRow = InferSelectModel<typeof blogPosts>;
export type InsertBlogPost = InferInsertModel<typeof blogPosts>;
export type AdminUserRow = InferSelectModel<typeof adminUsers>;
export type InsertAdminUser = InferInsertModel<typeof adminUsers>;
