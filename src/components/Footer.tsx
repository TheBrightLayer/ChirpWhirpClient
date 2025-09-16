import React from "react";
import "../styles/Footer.css";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import bgVideo from "../assets/M0.5.mp4";

const Footer = () => {
  return (
    <div className="footer-container">
      {/* Background video */}
      {/* <video className="footer-video" autoPlay loop muted playsInline>
        <source src={bgVideo} type="video/mp4" />
      </video> */}

          <video className="footer-video" autoPlay loop muted playsInline>
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

      {/* Overlay for dark tint */}
      <div className="footer-overlay"></div>

      {/* Footer content */}
      <footer className="footer">
        <div className="footer-section">
          <h4 className="footer-heading">GET IN TOUCH</h4>
          <a href="mailto:contact@ChirpWhirp.com" className="footer-link">
            contact@ChirpWhirp.com
          </a>
          <a href="tel:+916204520112" className="footer-link">
            +91 (0) 620 452 0112
          </a>
        </div>

        <hr className="footer-divider" />

        <div className="footer-section">
          <h4 className="footer-heading">FIND US</h4>
          <p className="footer-text">
          ChirpWhirp Worldwide,<br />
            4 Roger Street, London WC1N 2JX
          </p>
          <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="footer-link">
            GOOGLE MAPS
          </a>
        </div>

        <hr className="footer-divider" />

        <div className="footer-section">
          <h4 className="footer-heading">FOLLOW US</h4>
          <div className="footer-socials">
            <a href="#" className="footer-link">INSTAGRAM</a>
            <a href="#" className="footer-link">X</a>
            <a href="#" className="footer-link">LINKEDIN</a>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-section">
          <h4 className="footer-heading">DISCOVER</h4>
          <a href="#" className="footer-link">SUSTAINABILITY</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
