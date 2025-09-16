// pages/CategoryPage.tsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { blogServices } from "../services/blogCategoryService";
import CategorySection from "../components/CategorySection";
import SkeletonLoader from "../components/SkeletonLoader";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import AnimatedNews from "../components/AnimatedNews";
import logo from "../assets/BrightLayerLogo.png";
import myVideo from "../assets/M0.5.mp4";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet-async";

import { Mail, Search, Settings, User } from "react-feather";
import "../styles/Blogs.css";

interface Blog {
  slug: string;
  title: string;
  mainImage?: string;
  category: string;
  author: string;
  date: string;
}

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    if (categoryName) {
      setLoading(true); // start loader
      blogServices
        .getBlogsByCategory(categoryName)
        .then((data) => {
          const mappedBlogs = data.map((b: any) => ({
            slug: b.slug,
            title: b.title,
            mainImage: b.mainImage,
            category: b.category,
            author: b?.author ?? "Unknown",
            date: new Date(b.createdAt).toLocaleDateString(),
          }));
          setBlogs(mappedBlogs);
        })
        .catch(console.error)
        .finally(() => setLoading(false)); // stop loader
    }
  }, [categoryName]);

  return (
    <>

    <div className="blogs-page">
      <Header />
      {/* ===== Hero Header with Logo and Navbar ===== */}
      <video
        src={myVideo}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "fixed",

          objectFit: "cover",
          zIndex: -1,
          pointerEvents: "none",
        }}
      >
        Your browser does not support the video tag.
      </video>

      {/* ===== Blog Category Content ===== */}
      <div className="blogs-container">
        {/* ===== Breadcrumb ===== */}
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">
            {categoryName?.toUpperCase()}
          </span>
        </div>

        {/* ✅ Loader animation */}
        {loading ? (
         <SkeletonLoader type="small" count={3} />
        ) : (
          <CategorySection
            // title={categoryName?.toUpperCase() || ""}
            blogs={blogs}
          />
        )}
      </div>
      {/* <Footer/> */}
    </div>
    </>
  );
};

export default CategoryPage;
