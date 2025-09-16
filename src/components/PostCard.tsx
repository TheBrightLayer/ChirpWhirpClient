import React from "react";
import "../styles/PostCard.css";

interface PostCardProps {
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
}

const PostCard: React.FC<PostCardProps> = ({
  title,
  image,
  category,
  author,
  date,
}) => {
  return (
    <div className="post-card">
      <img src={image} alt={title} className="post-image" />
      <div className="post-content">
        <span className="post-category">{category}</span>
        <h3 className="post-title">{title}</h3>
        <span className="post-meta">
          {author} • {date}
        </span>
      </div>
    </div>
  );
};

export default PostCard;
