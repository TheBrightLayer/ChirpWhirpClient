// src/components/Hero.tsx
import "../styles/Hero.css";
import bgVideo from "../assets/MD_Motion_001.mp4";
import logo from "../assets/BrightLayerLogo.png"; // <-- add your logo file
import { Link } from "react-router-dom";

export function Hero() {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <section className="hero">
      {/* Background video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={bgVideo}
      />

      {/* Dark overlay */}
      <div className="hero-overlay" />

      {/* Logo in top-left */}
      <div className="hero-logo">
        <Link to="/">
          <img src={logo} alt="BrightLayer Logo" className="logo" />
        </Link>
      </div>

      {/* Hero content */}
      <div className="hero-content">
        <div className="hero-heading">
          <h1>
            Web and Mobile App <br />
            <span className="highlight-red">Development</span> <br />
            <span className="highlight-red">Service</span>
          </h1>
        </div>

        <div className="hero-description">
          <p>
            Spark innovation and propel digital advancement with our outstanding
            Custom Web & Mobile App Development Services.
          </p>
          <button className="black-btn">
            <Link
              to="/contact"
              onClick={handleClick}
              className="getting-started-btn"
            >
              Getting Started
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
