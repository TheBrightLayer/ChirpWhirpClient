import React, { useEffect, useState } from "react";
import "../styles/Loader.css";

const captions = [
  // Professional & Trustworthy
  "Your daily dose of insights, reviews & stories.",
  "Stay informed. Stay ahead.",
  "Trusted news, honest reviews.",

  // Engaging & Catchy
  "Because every click deserves clarity.",
  "Read smarter, not harder.",
  "Where stories meet perspective.",

  // Modern & Minimal
  "News. Reviews. Done right.",
  "Fresh takes. Bold insights.",
  "Simple, smart, reliable.",
];

interface LoaderProps {
  type?: "spinner" | "progress"; // choose loader style
}

const Loader: React.FC<LoaderProps> = ({ type = "spinner" }) => {
  const [caption, setCaption] = useState(captions[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const captionInterval = setInterval(() => {
      const randomCaption =
        captions[Math.floor(Math.random() * captions.length)];
      setCaption(randomCaption);
    }, 2500);

    return () => clearInterval(captionInterval);
  }, []);

  useEffect(() => {
    if (type === "progress") {
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
      }, 200);
      return () => clearInterval(progressInterval);
    }
  }, [type]);

  return (
    <div className="loader-container">
      {type === "spinner" ? (
        <div className="spinner"></div>
      ) : (
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      <p className="loader-caption">{caption}</p>
    </div>
  );
};

export default Loader;
