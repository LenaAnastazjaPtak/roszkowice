import { getModelByName } from "@adminjs/prisma";

const LOCALES = ["pl", "en", "de"];

export function buildResources(prisma) {
  return [
    {
      resource: { model: getModelByName("BlogPost"), client: prisma },
      options: {
        navigation: { name: "Blog", icon: "DocumentText" },
        listProperties: ["id", "image", "publishedAt", "createdAt"],
        editProperties: ["image", "publishedAt"],
        showProperties: [
          "id",
          "image",
          "publishedAt",
          "createdAt",
          "updatedAt",
        ],
      },
    },
    {
      resource: {
        model: getModelByName("BlogPostTranslation"),
        client: prisma,
      },
      options: {
        navigation: { name: "Blog", icon: "Translate" },
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
