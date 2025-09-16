import React from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaRss,
  FaTelegramPlane,
  FaLinkedinIn,
  FaSpotify,
  FaPodcast,
  FaWhatsapp,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";

import "../styles/BlogsFooter.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li>About Us</li>
            <li>Accessibility</li>
            <li>NL Explained</li>
            <li>Meet the team</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Services</li>
          </ul>
        </div>

        {/* Subscription Section */}
        <div className="footer-column">
          <h3>Subscription</h3>
          <ul>
            <li>Subscribe</li>
            <li>Account Details</li>
            <li>NL Legal Fund</li>
            <li>Subscriber FAQ</li>
            <li>Paywall Stories</li>
            <li>Podcast Letters</li>
            <li>Student Subscription</li>
          </ul>
        </div>

        {/* Noteworthy Section */}
        <div className="footer-column">
          <h3>Noteworthy</h3>
          <ul>
            <li>न्यूज़लॉन्ड्री हिन्दी</li>
            <li>Media Biascope</li>
            <li>Newsletters</li>
            <li>NL Store</li>
            <li>NL Interviews</li>
            <li>The Media Rumble</li>
            <li>Books</li>
          </ul>
        </div>

        {/* Follow Section */}
        <div className="footer-column">
          <h3>Follow</h3>
          <div className="footer-icons">
            <FaFacebookF />

            <FaYoutube />
            <FaInstagram />
            <FaRss />
            <FaPodcast />
            <FaTelegramPlane />
            <FaLinkedinIn />
            <FaSpotify />
            <FaWhatsapp />
          </div>
        </div>

        {/* App Download Section */}
        <div className="footer-column">
          <h3>
            Download the
            <br />
            Newslaundry app
          </h3>
          <div className="footer-icons">
            <FaApple />
            <FaGooglePlay />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Newslaundry Media Private Limited. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
