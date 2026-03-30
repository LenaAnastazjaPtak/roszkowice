export const postDefinitions = [
  {
    id: 0,
    img: "/images/roszkowice/park/park.jpg",
    day: "19",
    monthKey: "months.october",
    year: "2025",
    comments: 0,
  },
  {
    id: 1,
    img: "/images/roszkowice/slider/zima.jpg",
    day: "24",
    monthKey: "months.december",
    year: "2025",
    comments: 0,
  },
  {
    id: 2,
    img: "/images/roszkowice/zewn/pionowa_zima.jpg",
    day: "01",
    monthKey: "months.january",
    year: "2026",
    comments: 0,
  },
  {
    id: 3,
    img: "/images/roszkowice/zewn/IMG-20251021-WA0011.jpg",
    day: "20",
    monthKey: "months.january",
    year: "2026",
    comments: 0,
  },
];

export function getLatestPosts(posts, t) {
  return [...posts]
    .reverse()
    .slice(0, 3)
    .map((p) => ({
      img: p.img,
      title: p.title,
      date: `${p.day} ${t(p.monthKey)} ${p.year}`,
      id: p.id,
    }));
}

export function getPostTags(post) {
  return post.tags || [];
}

export function getTagsFromPosts(posts) {
  const tagSet = new Set();
  posts.forEach((p) => getPostTags(p).forEach((t) => tagSet.add(t)));
  return [...tagSet].sort();
}

export function getPostsByTag(posts, tag) {
  return posts.filter((p) =>
    getPostTags(p).some((t) => t.toLowerCase() === tag.toLowerCase()),
  );
}
