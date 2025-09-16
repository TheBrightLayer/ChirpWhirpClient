import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid  } from "lucide-react";
import "../styles/CategoryFab.css"
interface Props {
  categories: string[];
  categoryIcons?: Record<string, JSX.Element>;
  categoryColors?: Record<string, string>;
}



const CategoryFab: React.FC<Props> = ({
  categories,
  categoryIcons = {},
  categoryColors = {},
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (cat: string) => {
    navigate(`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`);
    setOpen(false);
  };

  // Close if clicked outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={containerRef} className="gmail-fab-container">
      {/* stacked category buttons */}
      <div className={`gmail-fab-actions ${open ? "open" : ""}`}>
        {categories.map((cat, idx) => (
          <button
            key={cat}
            className="gmail-fab-action"
            style={{ backgroundColor: categoryColors[cat] || "#333" }}
            onClick={() => handleCategoryClick(cat)}
          >
            {categoryIcons[cat] || cat[0]}
            <span className="gmail-fab-action-label">{cat}</span>
          </button>
        ))}
      </div>

      {/* main fab */}
      <button
        className={`gmail-fab-main ${open ? "open" : ""}`}
        onClick={() => setOpen((s) => !s)}
      >
        <LayoutGrid  size={28} />
      </button>
    </div>
  );
};

export default CategoryFab;
