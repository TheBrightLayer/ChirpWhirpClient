import React from "react";
import { Link } from "react-router-dom";
import "../styles/Blogs.css";
import { posts } from "../data/posts";

const BlogList: React.FC = () => {
  return (
    <section className="blog-list">
      <h2>Latest Articles</h2>
      <div className="posts">
        {posts.map((post) => (
          <div className="post-card" key={post.slug}>
            <h3>{post.title}</h3>
            <p className="date">
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>
            <p>{post.excerpt}</p>
            {/* 👇 This links to Blogs/:slug */}
            <Link to={`/blogs/${post.slug}`} className="read-more">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogList;
