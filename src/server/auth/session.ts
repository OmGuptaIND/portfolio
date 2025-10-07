import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes, createHash } from "node:crypto";
import { and, eq, gt, isNull, or } from "drizzle-orm";

import { db } from "@/server/db";
import { adminSessions, adminUsers } from "@/server/db/schema";

const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

const hashToken = (token: string) =>
	createHash("sha256").update(token).digest("hex");

const requireDatabase = () => {
	if (!db) {
		throw new Error(
			"Database connection is not configured. Set NEON_DATABASE_URL to use the admin area.",
		);
	}
	return db;
};

export const createSession = async (userId: string) => {
 const database = requireDatabase();
 const rawToken = randomBytes(32).toString("hex");
 const tokenHash = hashToken(rawToken);
 const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_SECONDS * 1000).toISOString();

 await database.insert(adminSessions).values({
  userId,
  tokenHash,
  expiresAt,
 });

 const cookieJar = await cookies();
 cookieJar.set({
  name: SESSION_COOKIE,
  value: rawToken,
  maxAge: SESSION_MAX_AGE_SECONDS,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  sameSite: "lax",
 });
};

export const destroySession = async () => {
 const database = requireDatabase();
 const cookieJar = await cookies();
 const sessionToken = cookieJar.get(SESSION_COOKIE);
 if (!sessionToken) return;

 const hashed = hashToken(sessionToken.value);
 await database
  .delete(adminSessions)
  .where(eq(adminSessions.tokenHash, hashed));

 cookieJar.delete(SESSION_COOKIE);
};

export const getCurrentUser = async () => {
 const database = requireDatabase();
 const cookieJar = await cookies();
 const sessionToken = cookieJar.get(SESSION_COOKIE);
 if (!sessionToken) return null;

	const hashed = hashToken(sessionToken.value);
	const nowIso = new Date().toISOString();

	const rows = await database
		.select({
			id: adminUsers.id,
			email: adminUsers.email,
			expiresAt: adminSessions.expiresAt,
		})
		.from(adminSessions)
		.innerJoin(adminUsers, eq(adminUsers.id, adminSessions.userId))
		.where(
			and(
				eq(adminSessions.tokenHash, hashed),
				or(
					isNull(adminSessions.expiresAt),
					gt(adminSessions.expiresAt, nowIso),
				),
			),
		)
		.limit(1);

	const [result] = rows;

 if (!result) {
  cookieJar.delete(SESSION_COOKIE);
  return null;
 }

	return {
		id: result.id,
		email: result.email,
	};
};

export const requireAuthenticatedUser = async () => {
	const user = await getCurrentUser();
	if (!user) {
		redirect("/admin");
	}
	return user;
};
