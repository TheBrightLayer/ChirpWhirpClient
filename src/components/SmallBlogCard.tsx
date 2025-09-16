// src/components/SmallBlogCard.tsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/SmallBlogCard.css";

interface SmallBlogCardProps {
  slug: string;
  title: string;
  image: string;
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
  const [flipped, setFlipped] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      if (!paused) setFlipped((f) => !f);
    }, 5000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [paused]);

  return (
    <div
      className="small-blog-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label={title}
    >
 <motion.div
  className="small-blog-card"
  style={{ position: "relative" }}
  whileHover={{
    rotateY: 8, // subtle tilt instead of full 180°
    scale: 1.02,
  }}
  transition={{ type: "spring", stiffness: 200, damping: 18 }}
>

        {/* FRONT */}
        <div className="small-blog-face front">
          <Link to={`/blogs/${slug}`} className="image-link">
            <div className="small-blog-image">
              <img src={image} alt={title} loading="lazy" />
            </div>
          </Link>

          <div className="small-blog-content">
            <div className="card-header">
              <span className="card-category">
                <Link to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                  {category}
                </Link>
              </span>
              <span className="card-date">{date}</span>
            </div>

            <h4 className="card-title">
              <Link to={`/blogs/${slug}`}>{title}</Link>
            </h4>

            <p className="card-meta">By {author}</p>
          </div>

          {userRole === "admin" && (
            <button
              className="delete-btn"
              onClick={() => onDelete && onDelete(slug)}
              aria-label="Delete"
            >
              Delete
            </button>
          )}
        </div>

        {/* BACK */}
        <div className="small-blog-face back">
          <div className="small-blog-image">
            <img src={image} alt={`${title} - back`} loading="lazy" />
          </div>
          <div className="small-blog-content back-content">
            <h4 className="back-title">{title}</h4>
            <p className="back-desc">Click Read to open full article.</p>
            <Link to={`/blogs/${slug}`} className="read-btn">
              Read
            </Link>
          </div>

          {userRole === "superAdmin" && (
            <button
              className="delete-btn back-delete"
              onClick={() => onDelete && onDelete(slug)}
              aria-label="Delete"
            >
              Delete
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SmallBlogCard;
