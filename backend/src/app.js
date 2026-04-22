import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AdminJS, { locales } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import { buildResources } from "./admin/resources.js";
import { createPostsRouter } from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDirectory = path.resolve(__dirname, "../uploads");

AdminJS.registerAdapter({ Database, Resource });

const prisma = new PrismaClient();

function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function createApp() {
  const app = express();

  const adminEmail = getRequiredEnv("ADMIN_EMAIL");
  const adminPassword = getRequiredEnv("ADMIN_PASSWORD");
  const sessionSecret = getRequiredEnv("SESSION_SECRET");
  const corsOrigin = getRequiredEnv("CORS_ORIGIN");
  const databaseUrl = getRequiredEnv("DATABASE_URL");

  app.use(cors({ origin: corsOrigin }));
  app.use(express.json());
  mkdirSync(uploadsDirectory, { recursive: true });
  app.use("/uploads", express.static(uploadsDirectory));

  const admin = new AdminJS({
    resources: buildResources(prisma),
    rootPath: "/admin",
    locale: {
      language: "pl",
      availableLanguages: Object.keys(locales),
    },
  });

  const PgSession = ConnectPgSimple(session);
  const sessionStore = new PgSession({
    conString: databaseUrl,
    tableName: "session",
    createTableIfMissing: true,
  });

  const authenticate = async (email, password) => {
    if (email === adminEmail && password === adminPassword) {
      return { email: adminEmail };
    }
    return null;
  };

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: sessionSecret,
    },
    null,
    {
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      secret: sessionSecret,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    },
  );

  app.use(admin.options.rootPath, adminRouter);
  app.use("/api/posts", createPostsRouter(prisma));

  admin.watch();

  return app;
}
