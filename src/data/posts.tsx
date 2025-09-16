// src/data/posts.ts
export type Post = {
  slug: string;
  title: string;
  cover: string;
  excerpt: string;
  date: string;
  tags: string[];
};

// Dummy posts (you can replace with real data later)
export const posts: Post[] = [
  {
    slug: "react-performance-tips",
    title: "10 React Performance Tips",
    cover: "/images/react-performance.jpg",
    excerpt: "Learn how to optimize your React apps with these performance tips...",
    date: "2025-08-15",
    tags: ["React", "Performance"],
  },
  {
    slug: "design-systems",
    title: "Building Scalable Design Systems",
    cover: "/images/design-systems.jpg",
    excerpt: "A guide to building flexible and scalable design systems for modern apps.",
    date: "2025-08-10",
    tags: ["Design", "UI"],
  },
  {
    slug: "motion-ui",
    title: "Motion UI with Framer Motion",
    cover: "/images/motion-ui.jpg",
    excerpt: "Enhance your user experience with smooth animations and transitions.",
    date: "2025-08-05",
    tags: ["FramerMotion", "Animation"],
  },
];
