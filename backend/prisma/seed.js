import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    image: "/images/roszkowice/park/park.jpg",
    publishedAt: new Date("2025-10-19"),
    translations: {
      pl: {
        title: "Złota jesień w parku pałacowym",
        header: "Pałac Roszkowice",
        content:
          "Tak pięknie jest w naszym parku jesienią! ☀️ Drzewa w Roszkowicach skąpane w ciepłym słońcu.\nPrace renowacyjne trwają, a my z każdym dniem zbliżamy się do celu: ponownego otwarcia tego niezwykłego miejsca. Dziękujemy, że jesteście z nami! 🍁",
      },
      en: {
        title: "Golden Autumn in the Palace Park",
        header: "Roszkowice Palace",
        content:
          "Our park is so beautiful in autumn! ☀️ The trees in Roszkowice are bathed in warm sunlight.\nRenovation work is ongoing, and every day brings us closer to our goal: reopening this remarkable place. Thank you for being with us! 🍁",
      },
      de: {
        title: "Goldener Herbst im Schlosspark",
        header: "Schloss Roszkowice",
        content:
          "So schön ist unser Park im Herbst! ☀️ Die Bäume in Roszkowice baden im warmen Sonnenlicht.\nDie Renovierungsarbeiten laufen weiter, und mit jedem Tag kommen wir unserem Ziel näher: der Wiedereröffnung dieses besonderen Ortes. Danke, dass ihr bei uns seid! 🍁",
      },
    },
  },
  {
    image: "/images/roszkowice/slider/zima.jpg",
    publishedAt: new Date("2025-12-24"),
    translations: {
      pl: {
        title: "Wigilijny wieczór w Roszkowicach",
        header: "Pałac Roszkowice",
        content:
          "Dziś, w ten wyjątkowy Wigilijny wieczór, w Roszkowicach panuje cisza i oczekiwanie na pierwszą gwiazdkę ⭐, a my z niecierpliwością oczekujemy – gdy to miejsce znów będzie tętniło życiem, światłem i radością odwiedzających. 🕯️\nCzekamy na moment, w którym będziemy mogli otworzyć Pałac dla Was! ❤️",
      },
      en: {
        title: "Christmas Eve in Roszkowice",
        header: "Roszkowice Palace",
        content:
          "Today, on this special Christmas Eve, Roszkowice is filled with silence and anticipation of the first star ⭐, and we are eagerly waiting for the moment when this place is alive again with life, light, and the joy of visitors. 🕯️\nWe are waiting for the moment when we can open the Palace for you! ❤️",
      },
      de: {
        title: "Heiligabend in Roszkowice",
        header: "Schloss Roszkowice",
        content:
          "Heute, an diesem besonderen Heiligabend, liegt in Roszkowice Stille und die Erwartung des ersten Sterns in der Luft ⭐, und wir warten voller Vorfreude auf den Moment, in dem dieser Ort wieder von Leben, Licht und der Freude der Besucher erfüllt sein wird. 🕯️\nWir warten auf den Moment, in dem wir das Schloss für euch öffnen können! ❤️",
      },
    },
  },
  {
    image: "/images/roszkowice/zewn/pionowa_zima.jpg",
    publishedAt: new Date("2026-01-01"),
    translations: {
      pl: {
        title: "Nowy Rok 2026 – plany i przyspieszenie renowacji",
        header: "Pałac Roszkowice",
        content:
          "Nowy Rok w Pałacu Roszkowice to czas wielkich zmian i przyspieszenia prac renowacyjnych. Mamy ambitne plany, dotyczące otworzenia dla Was Pałacu i parku! 🌳🔑\nMożemy obiecać jedno: będzie się działo! 🛠️🔥 Nasza misja, by przywrócić pałacowi dawny blask i otworzyć go dla Was, wkracza w decydującą fazę.\nNie możemy się doczekać, aż wszystko zobaczycie na własne oczy 👀 i przejdziecie się odnowionymi salami oraz parkowymi alejami. Śledźcie nas – będziemy regularnie dzielić się postępami! 👇",
      },
      en: {
        title: "New Year 2026 - Plans and Faster Renovation",
        header: "Roszkowice Palace",
        content:
          "The New Year at Roszkowice Palace is a time of major changes and accelerated renovation work. We have ambitious plans to open the Palace and park for you! 🌳🔑\nWe can promise one thing: a lot is going to happen! 🛠️🔥 Our mission to restore the palace's former splendor and open it to you is entering a decisive phase.\nWe cannot wait for you to see everything with your own eyes 👀 and walk through the renovated halls and park alleys. Follow us - we will share updates regularly! 👇",
      },
      de: {
        title: "Neujahr 2026 - Pläne und beschleunigte Renovierung",
        header: "Schloss Roszkowice",
        content:
          "Das neue Jahr im Schloss Roszkowice ist eine Zeit großer Veränderungen und beschleunigter Renovierungsarbeiten. Wir haben ehrgeizige Pläne, das Schloss und den Park für euch zu öffnen! 🌳🔑\nEines können wir versprechen: Es wird viel passieren! 🛠️🔥 Unsere Mission, dem Schloss seinen früheren Glanz zurückzugeben und es für euch zu öffnen, tritt in die entscheidende Phase ein.\nWir können es kaum erwarten, dass ihr alles mit eigenen Augen seht 👀 und durch die renovierten Säle und Parkalleen spaziert. Folgt uns - wir werden regelmäßig über die Fortschritte berichten! 👇",
      },
    },
  },
  {
    image: "/images/roszkowice/zewn/IMG-20251021-WA0011.jpg",
    publishedAt: new Date("2026-01-20"),
    translations: {
      pl: {
        title: "Jesteśmy na Instagramie!",
        header: "Pałac Roszkowice",
        content:
          "Jesteśmy na Instagramie! 📸🏰\nChcesz widzieć Pałac Roszkowice w najlepszym wydaniu? Zapraszamy na nasz nowy profil, gdzie królować będą piękne zdjęcia.\nBądź na bieżąco i wspieraj naszą działalność ✨ 👇\nhttps://www.instagram.com/palac_roszkowice/",
      },
      en: {
        title: "We're on Instagram!",
        header: "Roszkowice Palace",
        content:
          "We're on Instagram! 📸🏰\nWant to see Roszkowice Palace at its best? Visit our new profile, where beautiful photos will take center stage.\nStay up to date and support our activities ✨ 👇\nhttps://www.instagram.com/palac_roszkowice/",
      },
      de: {
        title: "Wir sind auf Instagram!",
        header: "Schloss Roszkowice",
        content:
          "Wir sind auf Instagram! 📸🏰\nMöchtest du das Schloss Roszkowice von seiner schönsten Seite sehen? Besuche unser neues Profil, auf dem wunderschöne Fotos im Mittelpunkt stehen.\nBleib auf dem Laufenden und unterstütze unsere Arbeit ✨ 👇\nhttps://www.instagram.com/palac_roszkowice/",
      },
    },
  },
];

async function seed() {
  for (const postData of posts) {
    const post = await prisma.blogPost.create({
      data: {
        image: postData.image,
        publishedAt: postData.publishedAt,
        translations: {
          create: Object.entries(postData.translations).map(
            ([locale, fields]) => ({
              locale,
              ...fields,
            }),
          ),
        },
      },
    });
    console.log(`Created post #${post.id}: ${postData.translations.pl.title}`);
  }

  console.log("Seed complete.");
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
