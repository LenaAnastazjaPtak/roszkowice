import { getModelByName } from "@adminjs/prisma";

const LOCALES = ["pl", "en", "de"];
const TRANSLATION_FIELDS = [
  { locale: "pl", key: "translationPl", label: "Polski" },
  { locale: "en", key: "translationEn", label: "Angielski" },
  { locale: "de", key: "translationDe", label: "Niemiecki" },
];

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

export function buildResources(prisma) {
  const translationFieldKeys = getTranslationFieldKeys();

  return [
    {
      resource: { model: getModelByName("BlogPost"), client: prisma },
      options: {
        navigation: { name: "Blog", icon: "DocumentText" },
        listProperties: ["id", "image", "publishedAt", "createdAt"],
        editProperties: ["image", "publishedAt", ...translationFieldKeys],
        showProperties: [
          "id",
          "image",
          "publishedAt",
          "createdAt",
          "updatedAt",
          ...translationFieldKeys,
        ],
        properties: getTranslationProperties(),
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
