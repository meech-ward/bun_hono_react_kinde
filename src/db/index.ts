import { drizzle } from 'drizzle-orm/postgres-js';
export * from 'drizzle-orm';
import postgres from 'postgres';

const queryClient = postgres(process.env.DB_URL!);
export const db = drizzle(queryClient,  { logger: true });
