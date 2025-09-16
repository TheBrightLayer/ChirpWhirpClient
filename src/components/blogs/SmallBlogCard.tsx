import React from "react";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import blogImage from "../../assets/newslaundary.png";

interface SmallBlogCardProps {
  slug: string;
  title: string;
  image?: string;
  category: string;
  author: string;
  date: string;
  userRole?: string;
  onDelete?: (slug: string) => void;
}

const SmallBlogCard: React.FC<SmallBlogCardProps> = ({
  slug,
  title,
  image,
  category,
  author,
  date,
  userRole,
  onDelete,
}) => {
  const img = image || blogImage;

  return (
    <div className="small-blog-card" style={{ position: "relative" }}>
      <Link to={`/blogs/${slug}`}>
        <img src={img} alt={title} />
      </Link>
      <div className="info">
        <span className="category">
          <Link to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
            {category}
          </Link>
        </span>
        <h4>
          <Link
            to={`/blogs/${slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {title}
          </Link>
        </h4>
        <p className="meta">
          {author} • {date}
        </p>
      </div>
      {userRole === "superAdmin" && (
        <button
          onClick={() => onDelete?.(slug)}
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
    </div>
  );
};

export default SmallBlogCard;
