import { Router } from "express";

const VALID_LOCALES = new Set(["pl", "en", "de"]);

export function createPostsRouter(prisma) {
  const router = Router();

  router.get("/", async (req, res) => {
    const locale = req.query.locale;
    if (!locale || !VALID_LOCALES.has(locale)) {
      return res.status(400).json({ error: "Missing or invalid locale query param (pl, en, de)" });
    }

    const posts = await prisma.blogPost.findMany({
      orderBy: { publishedAt: "desc" },
      include: {
        translations: { where: { locale } },
      },
    });

    const result = posts
      .filter((p) => p.translations.length > 0)
      .map((p) => formatPost(p, p.translations[0], getPublicBaseUrl(req)));

    res.json(result);
  });

  router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid post id" });
    }

    const locale = req.query.locale;
    if (!locale || !VALID_LOCALES.has(locale)) {
      return res.status(400).json({ error: "Missing or invalid locale query param (pl, en, de)" });
    }

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        translations: { where: { locale } },
      },
    });

    if (!post || post.translations.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(formatPost(post, post.translations[0], getPublicBaseUrl(req)));
  });

  return router;
}

function getPublicBaseUrl(req) {
  return `${req.protocol}://${req.get("host")}`;
}

function normalizeImageUrl(image, publicBaseUrl) {
  if (!image) {
    return image;
  }
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  if (image.startsWith("uploads/")) {
    return `${publicBaseUrl}/${image}`;
  }
  if (image.startsWith("/")) {
    return `${publicBaseUrl}${image}`;
  }
  return `${publicBaseUrl}/uploads/${image}`;
}

function formatPost(post, translation, publicBaseUrl) {
  return {
    id: post.id,
    image: normalizeImageUrl(post.image, publicBaseUrl),
    publishedAt: post.publishedAt,
    title: translation.title,
    header: translation.header,
    content: translation.content,
  };
}
