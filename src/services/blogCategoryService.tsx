// services/blogServices.ts
export interface Blog {
  _id: string;
  title: string;
  slug: string; // 👈 added slug
  mainImage: string;
  category: string;
  createdAt: string;
}

const API_BASE = "https://chirpwhirpserver-1.onrender.com/api";

export const blogServices = {
  async getBlogsByCategory(category: string): Promise<Blog[]> {
    try {
      const res = await fetch(`${API_BASE}/categories/category/${category}`);
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json();
    } catch (err) {
      console.error("❌ blogServices.getBlogsByCategory error:", err);
      return [];
    }
  },

  // ✅ Fetch blog by slug instead of ID
  async getBlogBySlug(slug: string): Promise<Blog | null> {
    try {
      const res = await fetch(`${API_BASE}/blogs/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch blog");
      return res.json();
    } catch (err) {
      console.error("❌ blogServices.getBlogBySlug error:", err);
      return null;
    }
  },
};
