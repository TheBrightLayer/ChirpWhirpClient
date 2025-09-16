import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SmallBlogCard from "../blogs/SmallBlogCard";
import blogImage from "../../assets/newslaundary.png";

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      fetch(
        `https://chirpwhirpserver-1.onrender.com/api/blogs?category=${encodeURIComponent(
          categoryName
        )}`
      )
        .then((res) => res.json())
        .then((data) =>
          setBlogs(Array.isArray(data) ? data : data?.blogs || [])
        )
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [categoryName]);

  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  const contentToExcerpt = (contentStr?: string) => {
    try {
      if (!contentStr) return "";
      const nodes = JSON.parse(contentStr);
      return Array.isArray(nodes) && nodes.length && nodes[0].children
        ? nodes[0].children
            .map((c: any) => c.text || "")
            .join(" ")
            .slice(0, 160)
        : "";
    } catch {
      return "";
    }
  };

  const toCard = (b: any) => {
    let img = blogImage;
    if (b?.mainImage) {
      if (b.mainImage.startsWith("data:image")) img = b.mainImage;
      else if (/^[A-Za-z0-9+/=]+$/.test(b.mainImage))
        img = `data:image/jpeg;base64,${b.mainImage}`;
      else
        img = `https://chirpwhirpserver-1.onrender.com/${String(
          b.mainImage
        ).replace(/\\/g, "/")}`;
    }
    return {
      slug: b?.slug || b?._id || String(Math.random()),
      title: b?.title || "Untitled",
      image: img,
      category: b?.category || "General",
      author: b?.author || "Team BrightLayer",
      date: formatDate(b?.createdAt || b?.updatedAt),
      excerpt: contentToExcerpt(b?.content),
    };
  };

  const cards = blogs.map(toCard);

  return (
    <div className="category-page">
      <h2 style={{ margin: "20px 0" }}>
        Category: {categoryName?.replace("-", " ")}
      </h2>
      {loading && <p>Loading...</p>}
      {!loading && cards.length === 0 && <p>No blogs found.</p>}
      <div className="all-category-blogs">
        {cards.map((blog) => (
          <SmallBlogCard
            key={blog.slug}
            slug={blog.slug}
            title={blog.title}
            image={blog.image}
            category={blog.category}
            author={blog.author}
            date={blog.date}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
