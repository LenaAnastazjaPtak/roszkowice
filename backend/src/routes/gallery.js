import { Router } from "express";

const VALID_CATEGORIES = new Set(["exterior", "park", "remont"]);

export function createGalleryRouter(prisma) {
  const router = Router();

  router.get("/", async (req, res) => {
    const images = await prisma.galleryImage.findMany({
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });

    const publicBaseUrl = `${req.protocol}://${req.get("host")}`;
    const result = images
      .filter((image) => VALID_CATEGORIES.has(image.category))
      .map((image) => ({
        id: image.id,
        src: normalizeImageUrl(image.image, publicBaseUrl),
        category: image.category,
      }));

    res.json(result);
  });

  return router;
}

function normalizeImageUrl(image, publicBaseUrl) {
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
