import React from "react";
import { Link } from "react-router-dom";
import "../styles/CategorySection.css";
import Loader from "../components/Loader";

interface Blog {
  slug: string;
  title: string;
  mainImage: string;
  category: string;
  author: string;
  date: string;
  content?: string;
}

interface Props {
  title: string;
  blogs: Blog[];
}

// Helper to resolve image src
const resolveImageSrc = (img?: string): string => {
  if (!img) return "";

  if (img.startsWith("data:image")) {
    return img;
  } else if (/^[A-Za-z0-9+/=]+$/.test(img)) {
    return `data:image/jpeg;base64,${img}`;
  } else {
    return `https://thebrightlayerbackend.onrender.com/${String(img).replace(/\\/g, "/")}`;
  }
};

const CategorySection: React.FC<Props> = ({ title, blogs }) => {
  if (!blogs) return <Loader />;
  if (!blogs || blogs.length === 0) return null;

  // Sort blogs by date descending and limit to 30
  const limitedBlogs = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 30);

  return (
    <div className="category-section">
      <h2 className="section-title">{title}</h2>

      <div className="blog-grid">
        {limitedBlogs.map((blog) => (
          <Link
            key={blog.slug}
            to={`/blogs/${blog.slug}`}
            state={{ blog }}
            className="blog-link"
          >
            <div className="featured-blog">
              <img
                src={resolveImageSrc(blog.mainImage)}
                alt={blog.title}
                className="featured-image"
              />
              <div className="featured-content">
                <span className="featured-category">{blog.category}</span>
                <h3 className="featured-title">{blog.title}</h3>
                <p className="featured-meta">
                  {blog.author} • {blog.date}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
