import "dotenv/config"; // ensure .env variables are loaded for Prisma
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
    // Use a direct DB connection for migrations/DDL to avoid pooler-related delays
    directUrl: env("DIRECT_URL"),
  },
});
