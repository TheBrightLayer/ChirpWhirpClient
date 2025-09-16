import React from "react";
import { Link } from "react-router-dom";
import FeaturedBlog from "../components/FeaturedBlog";
import SmallBlogCard from "../components/SmallBlogCard";

interface CategoryBlockProps {
  category: string;
  cards: any[];
  userRole?: string;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({
  category,
  cards,
  userRole,
}) => {
  if (!cards || cards.length === 0) return null;

  const [featured, ...rest] = cards;
  const small = rest.slice(0, 3);

  return (
    <div className="category-block">
      <Link
        to={`/blogs/${featured.slug}`}
        style={{ textDecoration: "none" }}
        className="featured-blog"
      >
        <FeaturedBlog {...featured} />
      </Link>

      <div className="small-blogs-row">
        {small.map((b) => (
          <SmallBlogCard key={b.slug} {...b} userRole={userRole} />
        ))}
      </div>
    </div>
  );
};

export default CategoryBlock;
