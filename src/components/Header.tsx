import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import "../styles/Header.css";
import myVideo from "../assets/M0.5.mp4";
import myLogo from "../assets/chwpsvg.svg"; // ✅ Your SVG logo file

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        {/* ✅ SVG Logo */}
        <Link to="/" className="logo">
          <img src={myLogo} alt="NEWSBROS Logo" />
        </Link>

        {/* <button className={`icon-btn ${scrolled ? "big" : ""}`} onClick={() => setIsOpen(true)}>
          +
        </button> */}

        <button
          className={`icon-btn ${isOpen ? "rotated" : ""}`}
          onClick={() => setIsOpen(true)}
        >
          +
        </button>
      </div>

      {/* Fullscreen Modal */}
      {isOpen && (
        <div className="modal">
          <video className="modal-video" autoPlay loop muted playsInline>
            <source src={myVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="modal-overlay">
            {/* Centered Links */}
            <div className="modal-links">
              <Link to="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
               <Link to="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Our People
              </Link>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Our Work
              </Link>
              <Link to="/" onClick={() => setIsOpen(false)}>
                Latest
              </Link>
             

              {/* ✅ Open login modal instead of routing */}
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <div className="footer-left">
                <p>FOLLOW US</p>
                <div className="social-links">
                  <a href="#">Instagram</a>
                  <a href="#">X</a>
                  <a href="#">LinkedIn</a>
                </div>
              </div>
              <div className="footer-right">
                <p>DISCOVER</p>
                <button
                  className="modal-link login-btn"
                  onClick={() => {
                    setIsOpen(false);
                    setShowLoginModal(true);
                  }}
                >
                  Login
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button className="modal-close" onClick={() => setIsOpen(false)}>
              ×
            </button>
          </div>
        </div>
      )}

      {/* ✅ Login modal */}
      {showLoginModal && (
        <LoginForm
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

export default Header;
