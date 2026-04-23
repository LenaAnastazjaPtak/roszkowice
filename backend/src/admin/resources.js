import { getModelByName } from "@adminjs/prisma";
import uploadFeature from "@adminjs/upload";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";

const LOCALES = ["pl", "en", "de"];
const IMAGE_UPLOAD_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
const IMAGE_UPLOAD_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const GALLERY_CATEGORIES = [
  { value: "exterior", label: "Zewnatrz" },
  { value: "park", label: "Park" },
  { value: "remont", label: "Remont" },
];
const TRANSLATION_FIELDS = [
  { locale: "pl", key: "translationPl", label: "Polski" },
  { locale: "en", key: "translationEn", label: "Angielski" },
  { locale: "de", key: "translationDe", label: "Niemiecki" },
];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getTranslationFieldKeys() {
  return TRANSLATION_FIELDS.flatMap(({ key }) => [
    `${key}Title`,
    `${key}Header`,
    `${key}Content`,
  ]);
}

function getTranslationProperties() {
  return TRANSLATION_FIELDS.reduce((acc, { key, label }, index) => {
    const positionOffset = index * 10;
    acc[`${key}Title`] = {
      type: "string",
      position: 100 + positionOffset,
      isVisible: { list: false, filter: false, show: true, edit: true },
      label: `${label} - tytul`,
    };
    acc[`${key}Header`] = {
      type: "string",
      position: 101 + positionOffset,
      isVisible: { list: false, filter: false, show: true, edit: true },
      label: `${label} - naglowek`,
    };
    acc[`${key}Content`] = {
      type: "textarea",
      position: 102 + positionOffset,
      isVisible: { list: false, filter: false, show: true, edit: true },
      label: `${label} - tresc`,
    };
    return acc;
  }, {});
}

function normalizeValue(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

function extractTranslationPayload(payload = {}) {
  const cleanPayload = { ...payload };
  const translations = TRANSLATION_FIELDS.map(({ locale, key }) => {
    const titleKey = `${key}Title`;
    const headerKey = `${key}Header`;
    const contentKey = `${key}Content`;
    const translation = {
      locale,
      title: normalizeValue(payload[titleKey]),
      header: normalizeValue(payload[headerKey]),
      content: normalizeValue(payload[contentKey]),
    };
    delete cleanPayload[titleKey];
    delete cleanPayload[headerKey];
    delete cleanPayload[contentKey];
    return translation;
  });

  return { cleanPayload, translations };
}

function validateTranslations(translations) {
  for (const translation of translations) {
    const hasAnyValue =
      Boolean(translation.title) ||
      Boolean(translation.header) ||
      Boolean(translation.content);
    const hasAllValues =
      Boolean(translation.title) &&
      Boolean(translation.header) &&
      Boolean(translation.content);

    if (hasAnyValue && !hasAllValues) {
      throw new Error(
        `Uzupelnij wszystkie pola tlumaczenia dla jezyka: ${translation.locale.toUpperCase()}`,
      );
    }
  }
}

async function saveTranslations(prisma, blogPostId, translations) {
  for (const translation of translations) {
    const hasAllValues =
      Boolean(translation.title) &&
      Boolean(translation.header) &&
      Boolean(translation.content);

    if (!hasAllValues) {
      await prisma.blogPostTranslation.deleteMany({
        where: { blogPostId, locale: translation.locale },
      });
      continue;
    }

    await prisma.blogPostTranslation.upsert({
      where: { blogPostId_locale: { blogPostId, locale: translation.locale } },
      update: {
        title: translation.title,
        header: translation.header,
        content: translation.content,
      },
      create: {
        blogPostId,
        locale: translation.locale,
        title: translation.title,
        header: translation.header,
        content: translation.content,
      },
    });
  }
}

async function enrichRecordWithTranslations(prisma, record) {
  const recordId = Number(record?.params?.id);
  if (!recordId) {
    return;
  }

  const translations = await prisma.blogPostTranslation.findMany({
    where: { blogPostId: recordId },
  });

  const byLocale = translations.reduce((acc, translation) => {
    acc[translation.locale] = translation;
    return acc;
  }, {});

  for (const { locale, key } of TRANSLATION_FIELDS) {
    const translation = byLocale[locale];
    record.params[`${key}Title`] = translation?.title ?? "";
    record.params[`${key}Header`] = translation?.header ?? "";
    record.params[`${key}Content`] = translation?.content ?? "";
  }
}

function buildUploadPath(filename, directory) {
  const extension = path.extname(String(filename)).toLowerCase();
  if (!IMAGE_UPLOAD_EXTENSIONS.has(extension)) {
    throw new Error("Nieprawidlowe rozszerzenie obrazka.");
  }
  return `${directory}/${Date.now()}-${randomUUID()}${extension}`;
}

async function getNextGallerySortOrder(prisma) {
  const latest = await prisma.galleryImage.findFirst({
    orderBy: [{ sortOrder: "desc" }, { id: "desc" }],
    select: { sortOrder: true },
  });
  return latest ? latest.sortOrder + 1 : 1;
}

async function moveGalleryImage(prisma, galleryImageId, direction) {
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    select: { id: true, sortOrder: true },
  });

  const currentIndex = images.findIndex((image) => image.id === galleryImageId);
  if (currentIndex < 0) {
    return;
  }

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= images.length) {
    return;
  }

  const reordered = [...images];
  const [moved] = reordered.splice(currentIndex, 1);
  reordered.splice(targetIndex, 0, moved);

  await prisma.$transaction(
    reordered.map((image, index) =>
      prisma.galleryImage.update({
        where: { id: image.id },
        data: { sortOrder: index + 1 },
      }),
    ),
  );
}

async function normalizeGallerySortOrder(prisma) {
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    select: { id: true, sortOrder: true },
  });

  const requiresNormalization = images.some(
    (image, index) => image.sortOrder !== index + 1,
  );
  if (!requiresNormalization) {
    return images.map((image, index) => ({ id: image.id, sortOrder: index + 1 }));
  }

  await prisma.$transaction(
    images.map((image, index) =>
      prisma.galleryImage.update({
        where: { id: image.id },
        data: { sortOrder: index + 1 },
      }),
    ),
  );

  return images.map((image, index) => ({ id: image.id, sortOrder: index + 1 }));
}

export function buildResources(prisma, componentLoader) {
  const translationFieldKeys = getTranslationFieldKeys();
  const openPostActionComponent = componentLoader.add(
    "OpenPostAction",
    path.join(__dirname, "components", "OpenPostAction.js"),
  );
  const imageThumbComponent = componentLoader.add(
    "ImageThumb",
    path.join(__dirname, "components", "ImageThumb.js"),
  );
  const galleryReorderActionComponent = componentLoader.add(
    "GalleryReorderAction",
    path.join(__dirname, "components", "GalleryReorderAction.js"),
  );

  return [
    {
      resource: { model: getModelByName("BlogPost"), client: prisma },
      features: [
        uploadFeature({
          componentLoader,
          provider: {
            local: {
              bucket: "uploads",
              opts: {
                baseUrl: "/uploads",
              },
            },
          },
          validation: {
            mimeTypes: IMAGE_UPLOAD_MIME_TYPES,
            maxSize: 15 * 1024 * 1024,
          },
          properties: {
            key: "image",
            file: "imageFile",
          },
          uploadPath: (record, filename) => buildUploadPath(filename, "posts"),
        }),
      ],
      options: {
        navigation: null,
        listProperties: ["id", "imageThumb", "publishedAt", "createdAt"],
        editProperties: ["imageFile", "publishedAt", ...translationFieldKeys],
        showProperties: [
          "id",
          "imageThumb",
          "imageFile",
          "image",
          "publishedAt",
          "createdAt",
          "updatedAt",
          ...translationFieldKeys,
        ],
        properties: {
          ...getTranslationProperties(),
          imageThumb: {
            isVisible: { list: true, show: true, filter: false, edit: false },
            components: {
              list: imageThumbComponent,
              show: imageThumbComponent,
            },
            label: "Miniaturka",
          },
        },
        actions: {
          new: {
            before: async (request, context) => {
              if (request.method?.toLowerCase() !== "post") {
                return request;
              }

              const { cleanPayload, translations } = extractTranslationPayload(
                request.payload,
              );
              validateTranslations(translations);
              context.translationsPayload = translations;
              return { ...request, payload: cleanPayload };
            },
            after: async (response, request, context) => {
              if (
                request.method?.toLowerCase() === "post" &&
                response.record?.params?.id &&
                context.translationsPayload
              ) {
                await saveTranslations(
                  prisma,
                  Number(response.record.params.id),
                  context.translationsPayload,
                );
                await enrichRecordWithTranslations(prisma, response.record);
              }
              return response;
            },
          },
          edit: {
            before: async (request, context) => {
              if (request.method?.toLowerCase() !== "post") {
                return request;
              }

              const { cleanPayload, translations } = extractTranslationPayload(
                request.payload,
              );
              validateTranslations(translations);
              context.translationsPayload = translations;
              return { ...request, payload: cleanPayload };
            },
            after: async (response, request, context) => {
              if (
                request.method?.toLowerCase() === "post" &&
                response.record?.params?.id &&
                context.translationsPayload
              ) {
                await saveTranslations(
                  prisma,
                  Number(response.record.params.id),
                  context.translationsPayload,
                );
              }

              if (response.record) {
                await enrichRecordWithTranslations(prisma, response.record);
              }

              return response;
            },
          },
          show: {
            after: async (response) => {
              if (response.record) {
                await enrichRecordWithTranslations(prisma, response.record);
              }
              return response;
            },
          },
          openPost: {
            actionType: "record",
            icon: "ExternalLink",
            showInDrawer: false,
            component: openPostActionComponent,
            handler: async (request, response, context) => {
              if (!context.record) {
                throw new Error("Nie znaleziono posta.");
              }
              return {
                record: context.record.toJSON(context.currentAdmin),
              };
            },
          },
        },
      },
    },
    {
      resource: {
        model: getModelByName("BlogPostTranslation"),
        client: prisma,
      },
      options: {
        navigation: false,
        listProperties: ["id", "locale", "title", "blogPostId"],
        editProperties: ["locale", "title", "header", "content", "blogPostId"],
        properties: {
          locale: {
            availableValues: LOCALES.map((l) => ({ value: l, label: l.toUpperCase() })),
          },
          content: {
            type: "textarea",
          },
        },
      },
    },
    {
      resource: { model: getModelByName("GalleryImage"), client: prisma },
      features: [
        uploadFeature({
          componentLoader,
          provider: {
            local: {
              bucket: "uploads",
              opts: {
                baseUrl: "/uploads",
              },
            },
          },
          validation: {
            mimeTypes: IMAGE_UPLOAD_MIME_TYPES,
            maxSize: 15 * 1024 * 1024,
          },
          properties: {
            key: "image",
            file: "imageFile",
          },
          uploadPath: (record, filename) => buildUploadPath(filename, "gallery"),
        }),
      ],
      options: {
        navigation: null,
        listProperties: [
          "id",
          "imageThumb",
          "category",
          "sortOrder",
          "updatedAt",
        ],
        editProperties: ["imageFile", "category"],
        showProperties: [
          "id",
          "imageThumb",
          "imageFile",
          "image",
          "category",
          "sortOrder",
          "createdAt",
          "updatedAt",
        ],
        sort: {
          sortBy: "sortOrder",
          direction: "asc",
        },
        properties: {
          imageThumb: {
            isVisible: { list: true, show: true, filter: false, edit: false },
            components: {
              list: imageThumbComponent,
              show: imageThumbComponent,
            },
            label: "Miniaturka",
          },
          category: {
            availableValues: GALLERY_CATEGORIES,
          },
        },
        actions: {
          reorderGallery: {
            actionType: "resource",
            icon: "Move",
            label: "Ułóż kolejność",
            component: galleryReorderActionComponent,
            handler: async (request, response, context) => {
              await normalizeGallerySortOrder(prisma);

              if (request.method?.toLowerCase() === "post") {
                const rawOrder = request.payload?.order;
                let inputOrder = [];
                if (Array.isArray(rawOrder)) {
                  inputOrder = rawOrder;
                } else if (typeof rawOrder === "string") {
                  try {
                    const parsed = JSON.parse(rawOrder);
                    if (Array.isArray(parsed)) {
                      inputOrder = parsed;
                    }
                  } catch {
                    inputOrder = rawOrder.split(",").map((value) => value.trim());
                  }
                } else if (rawOrder && typeof rawOrder === "object") {
                  inputOrder = Object.values(rawOrder);
                }
                const order = inputOrder
                  .map((value) => Number(value))
                  .filter((value) => Number.isInteger(value) && value > 0);

                if (order.length > 0) {
                  const existingImages = await prisma.galleryImage.findMany({
                    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
                    select: { id: true },
                  });
                  const existingIds = existingImages.map((image) => image.id);
                  const submittedIds = order.filter((id) => existingIds.includes(id));
                  const remainingIds = existingIds.filter(
                    (id) => !submittedIds.includes(id),
                  );
                  const finalOrder = [...submittedIds, ...remainingIds];

                  await prisma.$transaction(
                    finalOrder.map((id, index) =>
                      prisma.galleryImage.update({
                        where: { id },
                        data: { sortOrder: index + 1 },
                      }),
                    ),
                  );
                }
              }

              const allImages = await prisma.galleryImage.findMany({
                orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
                select: { id: true },
              });
              const records = await Promise.all(
                allImages.map((image) =>
                  context.resource.findOne(String(image.id), context.currentAdmin),
                ),
              );

              return {
                records: records
                  .filter(Boolean)
                  .map((record) => record.toJSON(context.currentAdmin)),
              };
            },
          },
          new: {
            before: async (request) => {
              if (request.method?.toLowerCase() !== "post") {
                return request;
              }

              const payload = { ...(request.payload ?? {}) };
              payload.sortOrder = await getNextGallerySortOrder(prisma);

              return { ...request, payload };
            },
          },
          moveUp: {
            actionType: "record",
            component: false,
            icon: "ChevronUp",
            label: "Wyzej",
            guard: "",
            handler: async (request, response, context) => {
              if (!context.record) {
                throw new Error("Nie znaleziono rekordu galerii.");
              }
              await moveGalleryImage(prisma, Number(context.record.id()), "up");
              const record = await context.resource.findOne(
                context.record.id(),
                context.currentAdmin,
              );
              return {
                record: record?.toJSON(context.currentAdmin),
                redirectUrl: context.h.resourceActionUrl({
                  resourceId: context.resource.id(),
                  actionName: "list",
                }),
              };
            },
          },
          moveDown: {
            actionType: "record",
            component: false,
            icon: "ChevronDown",
            label: "Nizej",
            guard: "",
            handler: async (request, response, context) => {
              if (!context.record) {
                throw new Error("Nie znaleziono rekordu galerii.");
              }
              await moveGalleryImage(prisma, Number(context.record.id()), "down");
              const record = await context.resource.findOne(
                context.record.id(),
                context.currentAdmin,
              );
              return {
                record: record?.toJSON(context.currentAdmin),
                redirectUrl: context.h.resourceActionUrl({
                  resourceId: context.resource.id(),
                  actionName: "list",
                }),
              };
            },
          },
        },
      },
    },
  ];
}
