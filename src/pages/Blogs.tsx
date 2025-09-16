import React, { useState, useEffect, useRef } from "react";
import { Link, Routes, Route, useParams, useNavigate } from "react-router-dom";
import FeaturedBlog from "../components/FeaturedBlog";
import blogImage from "../assets/newslaundary.png";
import CategoryFab from "../components/CategoryFab";
import SplashScreen from "../components/SplashScreen";
import Pagination from "../components/Pagination";
import logo from "../assets/BrightLayerLogo.png";
import CategorySection from "../components/CategorySection";
import LoginForm from "../components/LoginForm";
import SettingsPage from "./SettingsPage";
import Footer from "../components/BlogsFooter";
import ProfileModal from "../components/ProfileModal";
import ShowcaseCarousel from "../components/ShowcaseCarousel";
import { Helmet } from "react-helmet-async";

import "../styles/Profile.css";
import AnimatedNews from "../components/AnimatedNews";
import myVideo from "../assets/M0.5.mp4";
import SkeletonLoader from "../components/SkeletonLoader";

import {
  Mail,
  Search,
  Settings,
  User,
  Monitor,
  Trophy,
  Clapperboard,
  Landmark,
  DollarSign,
  Pencil,
  Heart,
  Languages,
  Edit,
  Menu,
} from "lucide-react";
import "../styles/Blogs.css";

// ---------------- Small Blog Card ----------------
const SmallBlogCard: React.FC<{
  slug: string;
  title: string;
  image: string;
  category: string;
  author: string;
  date: string;
  userRole?: string;
  onDelete?: (slug: string) => void;
}> = ({ slug, title, image, category, author, date, userRole, onDelete }) => {
  return (
    <div className="small-blog-card" style={{ position: "relative" }}>
      <Link to={`/blogs/${slug}`}>
        <img src={image} alt={title} />
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

      {/* {userRole && (userRole === "admin" || userRole === "superAdmin") && (
        <Link to={`/edit-blog/${slug}`} className="edit-btn">
          <Edit size={22} />
        </Link>
      )} */}
    </div>
  );
};

// ---------------- Category Page ----------------
// Add this only: CategoryPage component
// ---------------- Category Page ----------------
const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true); // Splash screen

  // Fetch blogs with pagination
  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     setLoading(true);
  //     try {
  //       const url = categoryName
  //         ? `https://chirpwhirpserver-1.onrender.com//api/blogs?category=${encodeURIComponent(
  //             categoryName
  //           )}&page=${page}&limit=5`
  //         : `https://chirpwhirpserver-1.onrender.com//api/blogs?page=${page}&limit=5`;

  //       const res = await fetch(url);
  //       const data = await res.json();

  //       const newBlogs = Array.isArray(data) ? data : data?.blogs || [];

  //       if (newBlogs.length > 0) {
  //         setBlogs((prev) => [...prev, ...newBlogs]);
  //       } else {
  //         setHasMore(false);
  //       }
  //     } catch (e) {
  //       console.error("Error fetching blogs:", e);
  //       setHasMore(false);
  //     } finally {
  //       setLoading(false);
  //       setInitialLoading(false);
  //     }
  //   };

  //   fetchBlogs();
  // }, [page, categoryName]);

  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const url = categoryName
          ? `https://chirpwhirpserver-1.onrender.com//api/blogs?category=${encodeURIComponent(
              categoryName
            )}&page=${page}&limit=15`
          : `https://chirpwhirpserver-1.onrender.com//api/blogs?page=${page}&limit=15`;

        const res = await fetch(url);
        const data = await res.json();

        const newBlogs = Array.isArray(data) ? data : data?.blogs || [];
        setBlogs(newBlogs);
        setTotalPages(data.totalPages || 1); // assuming your backend returns totalPages
      } catch (e) {
        console.error("Error fetching blogs:", e);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchBlogs();
  }, [page, categoryName]);

  // Format helpers
  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  const contentToExcerpt = (contentStr?: string) => {
    try {
      if (!contentStr) return "";
      const nodes = JSON.parse(contentStr);
      const firstText =
        Array.isArray(nodes) && nodes.length > 0 && nodes[0].children
          ? nodes[0].children.map((c: any) => c.text || "").join(" ")
          : "";
      return firstText.slice(0, 160);
    } catch {
      return "";
    }
  };

  const toCard = (b: any) => {
    let img = blogImage;

    if (b?.mainImage) {
      if (b.mainImage.startsWith("data:image")) {
        img = b.mainImage;
      } else if (/^[A-Za-z0-9+/=]+$/.test(b.mainImage)) {
        img = `data:image/jpeg;base64,${b.mainImage}`;
      } else {
        img = `https://chirpwhirpserver-1.onrender.com//${String(
          b.mainImage
        ).replace(/\\/g, "/")}`;
      }
    }

    return {
      slug: b?.slug || b?._id || String(Math.random()),
      title: b?.title || "Untitled",
      image: img,
      category: b?.category || "General",
      author: b?.author || "Team BrightLayer",
      date: formatDate(b?.createdAt || b?.updatedAt),
      excerpt: contentToExcerpt(b?.content),
    };
  };

  const cards = blogs.map(toCard);

  // ✅ Splash screen on first load
  if (initialLoading) {
    return <SplashScreen />;
  }

  return (
    <div className="category-page">
      <h2 style={{ margin: "20px 0" }}>
        Category: {categoryName?.replace("-", " ") || "All"}
      </h2>

      {cards.length === 0 && !loading && <p>No blogs found.</p>}

      <div className="all-category-blogs">
        {cards.map((blog) => (
          <SmallBlogCard
            key={blog.slug}
            slug={blog.slug}
            title={blog.title}
            image={blog.image}
            category={blog.category}
            author={blog.author}
            date={blog.date}
          />
        ))}
      </div>

      {loading && <SkeletonLoader type="small" count={3} />}

      {/* Classic pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {/* Optional: message if no more blogs */}
      {!hasMore && <p style={{ textAlign: "center" }}>No more blogs</p>}
    </div>
  );
};

// ---------------- CategoryBlock (optimized) ----------------
const CategoryBlock: React.FC<{
  category: string;
  cards: any[];
  userRole?: string;
  onDelete?: (slug: string) => void;
}> = ({ category, cards, userRole, onDelete }) => {
  if (!cards || cards.length === 0) return null;

  const [featured, ...rest] = cards;
  const small = rest.slice(0, 3);

  return (
    <div className="category-block">
      <FeaturedBlog {...featured} userRole={userRole} onDelete={onDelete} />

      <div className="small-blogs-row">
        {small.map((b) => (
          <SmallBlogCard
            key={b.slug}
            {...b}
            userRole={userRole}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

// ---------------- Blogs Page ----------------
const Blogs: React.FC = () => {
  const [apiBlogs, setApiBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const [hideBlogs, setHideBlogs] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredBlogs(apiBlogs);
    } else {
      const filtered = apiBlogs.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [searchTerm, apiBlogs]);

  const mainCategories = [
    "Technology",
    "Sports",
    "Entertainment",
    "Politics",
    "Finance",
    "Lifestyle",
    "हिंदी",
  ];
  const moreCategories = ["Community", "Events"];

  const categoryIcons: Record<string, JSX.Element> = {
    Technology: <Monitor size={20} />,
    Sports: <Trophy size={20} />,
    Entertainment: <Clapperboard size={20} />,
    Politics: <Landmark size={20} />,
    Finance: <DollarSign size={20} />,
    Lifestyle: <Heart size={20} />,
    हिंदी: <Languages size={20} />,
  };

  const handleDelete = async (slug: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(
        `https://chirpwhirpserver-1.onrender.com//api/blogs/${slug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`, // if your API requires auth
          },
        }
      );

      if (res.ok) {
        setApiBlogs((prev) =>
          prev.filter((b) => b.slug !== slug && b._id !== slug)
        );
        alert("Blog deleted successfully!");
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Something went wrong!");
    }
  };

  // ---------------- Fetch all blogs once ----------------
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://chirpwhirpserver-1.onrender.com//api/blogs?limit=15"
        );
        const data = await res.json();
        console.log(res);
        console.log("hello");
        setApiBlogs(Array.isArray(data) ? data : data?.blogs || []);
      } catch (e) {
        console.error("Error fetching blogs:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------------- Get user role ----------------
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUserRole(parsed.role);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // ---------------- Helper functions ----------------
  const formatDate = (iso?: string) =>
    iso
      ? new Date(iso).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      : "";

  const contentToExcerpt = (contentStr?: string) => {
    try {
      if (!contentStr) return "";
      const nodes = JSON.parse(contentStr);
      const firstText =
        Array.isArray(nodes) && nodes.length > 0 && nodes[0].children
          ? nodes[0].children.map((c: any) => c.text || "").join(" ")
          : "";
      return firstText.slice(0, 160);
    } catch {
      return "";
    }
  };

  const toCard = (b: any) => {
    let img = blogImage;

    if (b?.mainImage) {
      if (b.mainImage.startsWith("data:image")) {
        img = b.mainImage;
      } else if (/^[A-Za-z0-9+/=]+$/.test(b.mainImage)) {
        img = `data:image/jpeg;base64,${b.mainImage}`;
      } else {
        img = `https://chirpwhirpserver-1.onrender.com//${String(
          b.mainImage
        ).replace(/\\/g, "/")}`;
      }
    }

    return {
      slug: b?.slug || b?._id || String(Math.random()),
      title: b?.title || "Untitled",
      image: img,
      category: b?.category || "General",
      author: b?.author || "Team BrightLayer",
      date: formatDate(b?.createdAt || b?.updatedAt),
      excerpt: contentToExcerpt(b?.content),
    };
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profilePhoto");
    setUser(null);
    setUserRole(null);
    setShowProfile(false);
  };

  // ---------------- Scroll effect ----------------

  // ---------------- Group blogs per category ----------------
  const blogsByCategory = mainCategories.reduce((acc, cat) => {
    acc[cat] = apiBlogs
      .filter((b) => b.category === cat)
      .slice(0, 4)
      .map(toCard);
    return acc;
  }, {} as Record<string, any[]>);

  // ---------------- Featured & latest ----------------
  const apiCards = apiBlogs.map(toCard);
  const featuredFromApi = apiCards[0];
  const latestFromApi = apiCards.slice(1, 4);

  const featuredToUse = featuredFromApi
    ? { slug: featuredFromApi.slug, ...featuredFromApi }
    : {};

  const latestToUse =
    latestFromApi.length > 0
      ? latestFromApi.map(({ slug, title, image, category, author, date }) => ({
          slug,
          title,
          image,
          category,
          author,
          date,
        }))
      : [{}, {}, {}];

  // ---------------- Language detection ----------------
  const currentLang: "hi" | "en" | undefined = apiBlogs.some(
    (b) => b?.language === "hi" || b?.category === "हिंदी"
  )
    ? "hi"
    : undefined;

  // ---------------- JSX ----------------
  return (
    <>
      <Helmet>
        <title>BrightLayer Blogs - Latest News & Insights</title>
        <meta
          name="description"
          content="Explore BrightLayer blogs across Technology, Sports, Politics, Entertainment, and more. Stay informed with insights and the latest stories."
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BrightLayer Blogs" />
        <meta
          property="og:description"
          content="BrightLayer brings you blogs across Technology, Politics, Sports, Lifestyle, and more."
        />
        <meta property="og:image" content={blogImage} />
        <meta property="og:url" content="https://thebrightlayer.com/blogs" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Routes>
        <Route
          path="/"
          element={
            <div
              className={`blogs-page ${
                !loading && apiBlogs.length > 0 ? "has-showcase" : ""
              }`}
            >
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

              {/* Showcase Carousel at top */}
              {!loading && apiBlogs.length > 0 && (
                <ShowcaseCarousel posts={apiBlogs.map(toCard)} />
              )}

              {/* Blogs Section */}
              <div
                className={`has-no-showcase blogs-section ${
                  hideBlogs ? "hidden" : ""
                }`}
              >
                {/* Featured blog */}
                {/* Featured blog */}
                {loading ? (
                  <SkeletonLoader type="featured" count={1} />
                ) : (
                  <FeaturedBlog
                    {...featuredToUse}
                    userRole={userRole || undefined}
                    onDelete={handleDelete}
                  />
                )}

                <div className="latest-blogs-row">
                  {loading ? (
                    <SkeletonLoader type="featured" count={3} />
                  ) : (
                    (searchTerm ? filteredBlogs : latestToUse).map((blog) => (
                      <FeaturedBlog
                        key={blog.slug}
                        {...blog}
                        userRole={userRole || undefined}
                        onDelete={handleDelete}
                      />
                    ))
                  )}
                </div>

                <div className="categories-four-pack">
                  {mainCategories.map((cat) =>
                    loading ? (
                      <SkeletonLoader type="category" count={4} key={cat} />
                    ) : (
                      <CategoryBlock
                        key={cat}
                        category={cat}
                        cards={blogsByCategory[cat]}
                        userRole={userRole || undefined}
                        onDelete={handleDelete}
                      />
                    )
                  )}
                </div>
              </div>

              {/* ✅ Show Create Blog button only for admin */}
              {userRole === "admin" && (
                <Link
                  to="/create-blog"
                  className="create-blog-btn"
                  title="Create New Blog"
                >
                  <Pencil size={32} />
                </Link>
              )}
              <CategoryFab
                categories={[
                  "Technology",
                  "Sports",
                  "Entertainment",
                  "Politics",
                  "Finance",
                  "Lifestyle",
                ]}
                categoryIcons={{
                  Technology: <Monitor size={20} />,
                  Sports: <Trophy size={20} />,
                  Entertainment: <Clapperboard size={20} />,
                  Politics: <Landmark size={20} />,
                  Finance: <DollarSign size={20} />,
                  Lifestyle: <Heart size={20} />,
                  हिंदी: <Languages size={20} />,
                }}
              />
            </div>
          }
        />

        <Route path="/category/:categoryName" element={<CategoryPage />} />
      </Routes>
    </>
  );
};

export default Blogs;
