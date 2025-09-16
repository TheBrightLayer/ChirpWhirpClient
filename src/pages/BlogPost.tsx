import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/Blogs.css";

const blogContent: Record<string, { title: string; content: string }> = {
  "why-good-design-matters": {
    title: "Why Good Design Matters",
    content: `
      Design isn’t just decoration — it’s problem solving. 
      A good design anticipates user needs, removes friction, 
      and communicates clearly without needing a manual.  
      
      Whether it’s a website, an app, or even a coffee mug — 
      design shapes how we interact with the world. 
    `,
  },
  "future-of-web-development": {
    title: "The Future of Web Development",
    content: `
      Web development is evolving faster than ever. 
      With frameworks like React and Vue, plus emerging AI-driven tooling, 
      developers are moving closer to building apps by describing intent 
      rather than writing every single line of code.  

      Edge computing and serverless architectures are making apps 
      faster and more global than ever.
    `,
  },
  "building-a-startup-team": {
    title: "Building a Startup Team",
    content: `
      The first 5 hires can define your startup’s culture for years to come.  
      Look for people who believe in your mission, not just your product.  

      Skills can be taught, but passion, resilience, and adaptability 
      are what truly make or break an early-stage team. 
    `,
  },
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogContent[slug] : undefined;

  if (!post) {
    return (
      <div className="blog-post not-found">
        <h2>Post Not Found</h2>
        <Link to="/blogs" className="back-link">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="blog-post"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/blogs" className="back-link">
        ← Back to Blogs
      </Link>
    </motion.div>
  );
};

export default BlogPost;
