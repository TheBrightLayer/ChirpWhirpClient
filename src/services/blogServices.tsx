import axios from "axios";

export interface Blog {
  _id: string;
  title: string;
  slug: string; // 👈 added slug
  mainImage: string;
  category: string;
  createdAt: string;
}

const API_BASE = "https://chirpwhirpserver-1.onrender.com//api";

// Fetch blogs by category
export async function getBlogsByCategory(category: string): Promise<Blog[]> {
  const res = await fetch(`${API_BASE}/categories/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

// Get a single blog by slug (updated)
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const res = await fetch(`${API_BASE}/blogs/${slug}`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}
