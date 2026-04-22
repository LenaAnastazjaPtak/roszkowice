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

function buildUploadPath(filename) {
  const extension = path.extname(String(filename)).toLowerCase();
  if (!IMAGE_UPLOAD_EXTENSIONS.has(extension)) {
    throw new Error("Nieprawidlowe rozszerzenie obrazka.");
  }
  return `posts/${Date.now()}-${randomUUID()}${extension}`;
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
          uploadPath: (record, filename) => buildUploadPath(filename),
        }),
      ],
      options: {
        navigation: { name: "Blog", icon: "DocumentText" },
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
  ];
}
