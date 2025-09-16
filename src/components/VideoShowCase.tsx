import { useEffect, useState } from "react";
import "../styles/VideoShowcase.css";
import homeVideo from "../assets/Itobuz-Home-Vid.mp4";

export function VideoShowcase() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Adjust this formula to control zoom speed
      const newScale = 1 + Math.min(scrollY / 1000, 0.5);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="video-section">
      <div className="video-container" style={{ transform: `scale(${scale})` }}>
        <video autoPlay muted loop playsInline>
          <source src={homeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
