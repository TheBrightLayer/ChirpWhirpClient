import React from "react";
import "../styles/Blogs.css"; // make sure keyframes exist

type SkeletonLoaderProps = {
  type?: "featured" | "small" | "category";
  count?: number;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  type = "small",
  count = 3,
}) => {
  const getHeight = () => {
    switch (type) {
      case "featured":
        return "400px";
      case "small":
        return "400px";
      case "category":
        return "300px";
      default:
        return "400px";
    }
  };

  return (
    <div
      className={`skeleton-loader ${type === "small" ? "small-blogs-row" : ""}`}
      style={{
        display: "flex",
        gap: "20px",
        marginTop:"40px",
        flexWrap: "wrap",
      }}
    >
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="skeleton-card"
            style={{
              width: type === "featured" ? "100%" : "100%",
              height: getHeight(),
              borderRadius: "8px",
              background:
                "linear-gradient(90deg, #1a1a1a 25%, #333333 37%, #1a1a1a 63%)",
              backgroundSize: "400% 100%",
              animation: "skeleton-loading-dark 1.4s ease infinite",
            }}
          />
        ))}
    </div>
  );
};

export default SkeletonLoader;
