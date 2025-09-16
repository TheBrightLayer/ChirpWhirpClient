import React from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import "../styles/FeaturedBlog.css";

interface FeaturedBlogProps {
  slug: string;
  title: string;
  excerpt?: string;
  image: string;
  category: string;
  author: string;
  date: string;
  userRole?: string;
  onDelete?: (slug: string) => void;
}

const FeaturedBlog: React.FC<FeaturedBlogProps> = ({
  slug,
  title,
  excerpt,
  image,
  category,
  author,
  date,
  userRole,
  onDelete,
}) => {
  return (
    <div className="featured-blog" style={{ position: "relative" }}>
      <Link to={`/blogs/${slug}`}>
        <img src={image} alt={title} className="featured-image" />
      </Link>
      <div className="featured-info">
        <span className="featured-category">
          <Link to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
            {category}
          </Link>
        </span>
        <h3 className="featured-title">
          <Link 
            to={`/blogs/${slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {title}
          </Link>
        </h3>
        {/* {excerpt && <p>{excerpt}</p>} */}
        <p className="featured-meta">
          {author} • {date}
        </p>
      </div>

      {/* ✅ Show delete for admin */}
      {userRole === "admin" && (
        <button
          onClick={() => onDelete && onDelete(slug)}
          className="delete-btn"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Delete
        </button>
      )}

      {/* Edit button if needed */}
      {/* {userRole && (userRole === "admin" || userRole === "superAdmin") && (
        <Link to={`/edit-blog/${slug}`} className="edit-btn">
          <Edit size={22} />
        </Link>
      )} */}
    </div>
  );
};

export default FeaturedBlog;
