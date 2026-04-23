import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import AdminJS, { ComponentLoader } from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import { buildResources } from "./admin/resources.js";
import { createGalleryRouter } from "./routes/gallery.js";
import { createPostsRouter } from "./routes/posts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDirectory = path.resolve(__dirname, "../uploads");
const frontendImagesDirectory = path.resolve(__dirname, "../../app/public/images");
const componentLoader = new ComponentLoader();
const adminDashboardComponent = componentLoader.add(
  "AdminDashboard",
  path.join(__dirname, "admin", "components", "AdminDashboard.js"),
);
componentLoader.override("Login", path.join(__dirname, "admin", "components", "Login.js"));

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
  mkdirSync(uploadsDirectory, { recursive: true });
  app.use("/uploads", express.static(uploadsDirectory));
  app.use("/images", express.static(frontendImagesDirectory));
  app.use("/admin-assets", express.static(path.resolve(__dirname, "admin", "assets")));

  const admin = new AdminJS({
    resources: buildResources(prisma, componentLoader),
    rootPath: "/",
    dashboard: {
      component: adminDashboardComponent,
    },
    branding: {
      companyName: "Pałac Roszkowice Admin",
      logo: "/images/roszkowice/logo_admin_128.png",
      favicon: "/images/roszkowice/logo_with_transparent_background.png",
      withMadeWithLove: false,
      theme: {
        colors: {
          primary100: "#c19a6b",
          info: "#c19a6b",
          love: "#c19a6b",
        },
      },
    },
    assets: {
      scripts: ["/admin-assets/login-layout.js"],
    },
    componentLoader,
    locale: {
      language: "pl",
      availableLanguages: ["pl"],
      translations: {
        pl: {
          labels: {
            dashboard: "Panel",
            BlogPost: "Posty",
            BlogPostTranslation: "Tlumaczenia postow",
            GalleryImage: "Galeria",
          },
          components: {
            Login: {
              welcomeHeader: "Witamy",
              welcomeMessage: "Logowanie do panelu administracyjnego",
            },
          },
          resources: {
            BlogPost: {
              properties: {
                id: "ID",
                image: "Zdjecie",
                imageFile: "Plik zdjecia",
                imageThumb: "Miniaturka",
                publishedAt: "Data publikacji",
                createdAt: "Data utworzenia",
                updatedAt: "Data aktualizacji",
                translationPlTitle: "Polski - tytuł",
                translationPlHeader: "Polski - nagłówek",
                translationPlContent: "Polski - treść",
                translationEnTitle: "Angielski - tytuł",
                translationEnHeader: "Angielski - nagłówek",
                translationEnContent: "Angielski - treść",
                translationDeTitle: "Niemiecki - tytuł",
                translationDeHeader: "Niemiecki - nagłówek",
                translationDeContent: "Niemiecki - treść",
              },
            },
            GalleryImage: {
              properties: {
                id: "ID",
                image: "Zdjecie",
                imageFile: "Plik zdjecia",
                imageThumb: "Miniaturka",
                category: "Kategoria",
                sortOrder: "Kolejnosc",
                createdAt: "Data utworzenia",
                updatedAt: "Data aktualizacji",
              },
            },
          },
          actions: {
            openPost: "Zobacz post",
            moveUp: "Wyzej",
            moveDown: "Nizej",
            reorderGallery: "Ułóż kolejność",
          },
        },
      },
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

  app.use("/api/posts", createPostsRouter(prisma));
  app.use("/api/gallery", createGalleryRouter(prisma));
  app.use(admin.options.rootPath, adminRouter);

  admin.watch();

  return app;
}
