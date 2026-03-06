export const posts = [
  {
    id: 0,
    img: '/images/roszkowice/park/park.jpg',
    day: '19',
    monthKey: 'months.october',
    year: '2025',
    title: 'Złota jesień w parku pałacowym',
    author: 'Pałac Roszkowice',
    comments: 0,
    content: `Tak pięknie jest w naszym parku jesienią! ☀️ Drzewa w Roszkowicach skąpane w ciepłym słońcu.
Prace renowacyjne trwają, a my z każdym dniem zbliżamy się do celu: ponownego otwarcia tego niezwykłego miejsca. Dziękujemy, że jesteście z nami! 🍁
#Pałac #Roszkowice #HistoryczneMiejsca #Park #ZłotaJesień`
  },
  {
    id: 1,
    img: '/images/roszkowice/slider/zima.jpg',
    day: '24',
    monthKey: 'months.december',
    year: '2025',
    title: 'Wigilijny wieczór w Roszkowicach',
    author: 'Pałac Roszkowice',
    comments: 0,
    content: `Dziś, w ten wyjątkowy Wigilijny wieczór, w Roszkowicach panuje cisza i oczekiwanie na pierwszą gwiazdkę ⭐, a my z niecierpliwością oczekujemy – gdy to miejsce znów będzie tętniło życiem, światłem i radością odwiedzających. 🕯️
Czekamy na moment, w którym będziemy mogli otworzyć Pałac dla Was! ❤️
#Pałac #Wigilia #BożeNarodzenie #ŻyczeniaŚwiąteczne #Zabytek`
  },
  {
    id: 2,
    img: '/images/roszkowice/zewn/pionowa_zima.jpg',
    day: '01',
    monthKey: 'months.january',
    year: '2026',
    title: 'Nowy Rok 2026 – plany i przyspieszenie renowacji',
    author: 'Pałac Roszkowice',
    comments: 0,
    content: `Nowy Rok w Pałacu Roszkowice to czas wielkich zmian i przyspieszenia prac renowacyjnych. Mamy ambitne plany, dotyczące otworzenia dla Was Pałacu i parku! 🌳🔑
Możemy obiecać jedno: będzie się działo! 🛠️🔥 Nasza misja, by przywrócić pałacowi dawny blask i otworzyć go dla Was, wkracza w decydującą fazę.
Nie możemy się doczekać, aż wszystko zobaczycie na własne oczy 👀 i przejdziecie się odnowionymi salami oraz parkowymi alejami. Śledźcie nas – będziemy regularnie dzielić się postępami! 👇
#Pałac #NowyRok2026 #PlanyNaNowyRok #Renowacja #Odbudowa #Zabytek #Wizja #Rewitalizacja`
  },
  {
    id: 3,
    img: '/images/roszkowice/zewn/IMG-20251021-WA0011.jpg',
    day: '20',
    monthKey: 'months.january',
    year: '2026',
    title: 'Jesteśmy na Instagramie!',
    author: 'Pałac Roszkowice',
    comments: 0,
    content: `Jesteśmy na Instagramie! 📸🏰
Chcesz widzieć Pałac Roszkowice w najlepszym wydaniu? Zapraszamy na nasz nowy profil, gdzie królować będą piękne zdjęcia.
Bądź na bieżąco i wspieraj naszą działalność ✨ 👇
https://www.instagram.com/palac_roszkowice/
#Pałac #Instagram #FollowUs #PolskaJestPiękna`
  }
]

export function getLatestPosts(t) {
  return [...posts].reverse().slice(0, 3).map((p) => ({
    img: p.img,
    title: p.title,
    date: `${p.day} ${t(p.monthKey)} ${p.year}`,
    id: p.id
  }))
}

function extractTagNames(content) {
  const matches = content.match(/#[^\s#]+/g) || []
  return matches.map((m) => m.slice(1))
}

export function getPostTags(post) {
  return extractTagNames(post.content)
}

export function getTagsFromPosts() {
  const tagSet = new Set()
  posts.forEach((p) => getPostTags(p).forEach((t) => tagSet.add(t)))
  return [...tagSet].sort()
}

export function getPostsByTag(tag) {
  return posts.filter((p) =>
    getPostTags(p).some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}
