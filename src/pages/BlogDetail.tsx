import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "../styles/BlogDetail.css";
import {
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa6";
import backgroundVideo from "../assets/M4.mp4";
import Header from "../components/Header";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Blog {
  _id: string;
  title: string;
  category: string;
  content: string;
  mainImage?: string;
  createdAt: string;
  slug: string;
  metaTitle: string;
  metaDesc: string;
}

const API_BASE =
  import.meta.env.VITE_API_URL || "https://chirpwhirpserver-1.onrender.com";

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs/${slug}`);
        const contentType = res.headers.get("content-type");

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON.");
        }

        const data = await res.json();
        setBlog(data);
      } catch (err: any) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/blogs?limit=6`);
        const data = await res.json();
        console.log("Recent blogs response:", data);

        if (Array.isArray(data)) {
          setRecentBlogs(data);
        } else if (Array.isArray(data.blogs)) {
          setRecentBlogs(data.blogs);
        } else if (Array.isArray(data.data)) {
          setRecentBlogs(data.data);
        } else {
          setRecentBlogs([]);
        }
      } catch (err) {
        console.error("Failed to fetch recent blogs:", err);
      }
    };

    fetchBlog();
    fetchRecentBlogs();
  }, [slug]);

  if (loading)
    return (
      <div className="loading">
        <div className="hourglass"></div>
        <p>Loading</p>
      </div>
    );

  if (error) return <p className="error">{error}</p>;
  if (!blog) return <p className="not-found">Blog not found.</p>;

  let parsedContent: any[] = [];
  try {
    parsedContent = blog.content ? JSON.parse(blog.content) : [];
  } catch (e) {
    parsedContent = [{ children: [{ text: blog.content }] }];
  }

  // ✅ Helpers for rendering Slate JSON
  const renderLeaf = (leaf: any, i: number) => {
    let el: React.ReactNode = leaf.text;
    if (leaf.bold) el = <strong key={i}>{el}</strong>;
    if (leaf.italic) el = <em key={i}>{el}</em>;
    if (leaf.underline) el = <u key={i}>{el}</u>;
    if (leaf.code) el = <code key={i}>{el}</code>;
    return el;
  };

  const renderNode = (node: any, i: number): React.ReactNode => {
    if (!node) return null;

    switch (node.type) {
      case "heading-one":
        return (
          <h1 key={i}>
            {node.children.map((c: any, j: number) => renderLeaf(c, j))}
          </h1>
        );
      case "heading-two":
        return (
          <h2 key={i}>
            {node.children.map((c: any, j: number) => renderLeaf(c, j))}
          </h2>
        );
      case "heading-three":
        return (
          <h3 key={i}>
            {node.children.map((c: any, j: number) => renderLeaf(c, j))}
          </h3>
        );
      case "bulleted-list":
        return (
          <ul key={i}>
            {node.children.map((n: any, j: number) => renderNode(n, j))}
          </ul>
        );
      case "numbered-list":
        return (
          <ol key={i}>
            {node.children.map((n: any, j: number) => renderNode(n, j))}
          </ol>
        );
      case "list-item":
        return (
          <li key={i}>
            {node.children.map((c: any, j: number) => renderLeaf(c, j))}
          </li>
        );
      case "block-quote":
        return (
          <blockquote key={i}>
            {node.children.map((c: any, j: number) => renderLeaf(c, j))}
          </blockquote>
        );
      case "link":
        return (
          <a
            key={i}
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0077cc", textDecoration: "underline" }}
          >
            {node.children.map((c: any, j: number) => renderLeaf(c, j))}
          </a>
        );
      case "image":
        return (
          <div key={i} className="blog-inline-image">
            <img
              src={node.url}
              alt={node.alt || "blog-image"}
              style={{
                maxWidth: "100%",
                margin: "1rem 0",
                borderRadius: "8px",
              }}
            />
          </div>
        );
      case "youtube":
        return (
          <div key={i} className="blog-video">
            <iframe
              width="100%"
              height="400"
              src={node.url.replace("watch?v=", "embed/")}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube video"
            ></iframe>
          </div>
        );
      case "twitter":
        return (
          <div key={i} className="blog-twitter">
            <blockquote className="twitter-tweet">
              <a href={node.url}></a>
            </blockquote>
            <script
              async
              src="https://platform.twitter.com/widgets.js"
            ></script>
          </div>
        );
      case "instagram":
        return (
          <div key={i} className="blog-instagram">
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={node.url}
              data-instgrm-version="14"
            ></blockquote>
            <script async src="//www.instagram.com/embed.js"></script>
          </div>
        );
      case "paragraph":
      default:
        return (
          <p key={i}>
            {node.children.map((c: any, j: number) => renderLeaf(c, j))}
          </p>
        );
    }
  };

  // ✅ Find "next blog" (skip current one)
  const currentIndex = recentBlogs.findIndex((b) => b.slug === blog.slug);
  const nextBlog =
    currentIndex >= 0 && currentIndex < recentBlogs.length - 1
      ? recentBlogs[currentIndex + 1]
      : recentBlogs[0]; // fallback to first blog if last one

  return (
    <div className="blog-detail">
      <Header />
      {/* Social share sidebar */}
      <div className="social-sidebar">
        <a
          href="https://www.facebook.com/profile.php?id=61579758901588"
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          <FaXTwitter />
        </a>
        <a
          href="https://www.instagram.com/thebrightlayerzz?igsh=MTdnY2Iza3V6Z2g2NA%3D%3D"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram />
        </a>
        <a href="https://web.whatsapp.com/" target="_blank" rel="noreferrer">
          <FaWhatsapp />
        </a>
      </div>

      {/* Main + Sidebar wrapper */}
      <div className="blog-main-wrapper">
        <video
          src={backgroundVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "auto" }}
        >
          Your browser does not support the video tag.
        </video>

        {/* Main Content */}
        <div className="blog-content">
          <Link to="/" className="back-link">
            ← Back
          </Link>

          <span
            className="category-badge"
            onClick={() => {
              navigate(`/category/${blog.category.toLowerCase()}`);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ cursor: "pointer" }}
          >
            {blog.category}
          </span>

          <h1 className="blog-title">{blog.title}</h1>

          {blog.mainImage &&
            (() => {
              let imgSrc: string;
              if (blog.mainImage.startsWith("data:image")) {
                imgSrc = blog.mainImage;
              } else if (/^[A-Za-z0-9+/=]+$/.test(blog.mainImage)) {
                imgSrc = `data:image/jpeg;base64,${blog.mainImage}`;
              } else {
                imgSrc = `https://chirpwhirpserver-1.onrender.com/${String(
                  blog.mainImage
                ).replace(/\\/g, "/")}`;
              }
              return (
                <div className="blog-image-wrapper">
                  <img src={imgSrc} alt="cover" className="blog-image" />
                </div>
              );
            })()}

          {/* ✅ Rich text body */}
          <div className="blog-body">
            {parsedContent.map((block, i) => renderNode(block, i))}
          </div>

          {/* ✅ Navigation Buttons */}
          <div className="blog-nav-buttons">
            <button
              className="up-next"
              onClick={() => {
                if (nextBlog) {
                  navigate(`/blogs/${nextBlog.slug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              UP NEXT
            </button>

            <Link to="/" className="see-all">
              SEE ALL <span className="arrow">↗</span>
            </Link>
          </div>
        </div>

        {/* Recent Blogs Slider */}
        <div className="recent-blogs-slider">
          <h3>Recent Blogs</h3>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={false}
            autoplay={{ delay: 800 }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
          >
            {recentBlogs
              .filter((item) => item.slug !== blog.slug)
              .slice(0, 6)
              .map((item) => {
                let imgSrc: string;
                if (item.mainImage?.startsWith("data:image")) {
                  imgSrc = item.mainImage;
                } else if (/^[A-Za-z0-9+/=]+$/.test(item.mainImage || "")) {
                  imgSrc = `data:image/jpeg;base64,${item.mainImage}`;
                } else {
                  imgSrc = `https://chirpwhirpserver-1.onrender.com/${String(
                    item.mainImage
                  ).replace(/\\/g, "/")}`;
                }
                return (
                  <SwiperSlide key={item.slug}>
                    <Link
                      to={`/blogs/${item.slug}`}
                      className="recent-blog-card"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      {imgSrc && (
                        <div className="recent-blog-image-wrapper">
                          <img
                            src={imgSrc}
                            alt={item.title}
                            className="recent-blog-image"
                          />
                          <div className="recent-blog-title-overlay">
                            <h4>{item.title}</h4>
                          </div>
                        </div>
                      )}
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
