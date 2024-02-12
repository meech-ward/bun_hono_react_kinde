import { defineConfig } from 'drizzle-kit'
export default defineConfig({
 schema: "./server/db/schema/*",
  driver: 'pg',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  verbose: true,
  strict: true,
})