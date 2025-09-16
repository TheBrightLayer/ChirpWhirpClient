import React from "react";
import { Link } from "react-router-dom";
import FeaturedBlog from "../FeaturedBlog";
import SmallBlogCard from "./SmallBlogCard";
import CategoryBlock from "./CategoryBlock";

interface BlogsSectionProps {
  featuredToUse: any;
  latestToUse: any[];
  filteredBlogs: any[];
  searchTerm: string;
  hideBlogs: boolean;
  userRole?: string;
  blogsByCategory: Record<string, any[]>;
}

const BlogsSection: React.FC<BlogsSectionProps> = ({
  featuredToUse,
  latestToUse,
  filteredBlogs,
  searchTerm,
  hideBlogs,
  userRole,
  blogsByCategory,
}) => (
  <div className={`blogs-section ${hideBlogs ? "hidden" : ""}`}>
    <Link to={`/blogs/${featuredToUse.slug}`} className="featured-blog">
      <FeaturedBlog {...featuredToUse} />
    </Link>
    <div className="small-blogs-row">
      {(searchTerm ? filteredBlogs : latestToUse).map((blog) => (
        <SmallBlogCard key={blog.slug} {...blog} userRole={userRole} />
      ))}
    </div>
    <div className="categories-four-pack">
      {Object.keys(blogsByCategory).map((cat) => (
        <CategoryBlock
          key={cat}
          category={cat}
          cards={blogsByCategory[cat]}
          userRole={userRole}
        />
      ))}
    </div>
  </div>
);

export default BlogsSection;
