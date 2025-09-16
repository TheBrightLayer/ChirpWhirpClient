import React from "react";
import { Link } from "react-router-dom";
import { Mail, Search, Settings, User, Pencil } from "lucide-react";

interface BlogsNavbarProps {
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  userRole?: string;
  user?: any;
  onLogout: () => void;
  setShowLoginModal: (v: boolean) => void;
  setShowProfileModal: (v: boolean) => void;
  setShowSettings: (v: boolean) => void;
}

const BlogsNavbar: React.FC<BlogsNavbarProps> = ({
  searchOpen,
  setSearchOpen,
  searchTerm,
  setSearchTerm,
  userRole,
  user,
  onLogout,
  setShowLoginModal,
  setShowProfileModal,
  setShowSettings,
}) => (
  <div className="navbar">
    <Link to="/blogs">
      <img src="/logo.png" alt="Logo" className="logo" />
    </Link>
    {searchOpen && (
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search blogs..."
      />
    )}
    <div className="navbar-right">
      <button
        onClick={() =>
          (window.location.href = "mailto:contact@thebrightlayer.com")
        }
      >
        <Mail />
      </button>
      <button onClick={() => setSearchOpen(!searchOpen)}>
        <Search />
      </button>
      <button onClick={() => setShowSettings(true)}>
        <Settings />
      </button>
      <button className="subscribe-btn">Subscribe</button>
      {!user ? (
        <button onClick={() => setShowLoginModal(true)}>
          <User />
        </button>
      ) : (
        <img
          src={
            localStorage.getItem("profilePhoto") ||
            "https://www.w3schools.com/w3images/avatar2.png"
          }
          onClick={() => setShowProfileModal(true)}
          className="nav-profile"
        />
      )}
      {userRole === "admin" && (
        <Link to="/create-blog">
          <Pencil />
        </Link>
      )}
    </div>
  </div>
);

export default BlogsNavbar;
