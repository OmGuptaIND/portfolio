import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const connectionString = env.DATABASE_URL;

export const db = connectionString
	? drizzle(neon(connectionString), { schema })
	: null;

export type Database = typeof db;
