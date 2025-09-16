import React, { useEffect, useState } from "react";
import "../styles/AnimatedNews.css";

const words = ["News"];

const AnimatedNews: React.FC = () => {
  const [visibleWords, setVisibleWords] = useState<string[]>([]);

  useEffect(() => {
    words.forEach((word, i) => {
      setTimeout(() => {
        setVisibleWords((prev) => {
          if (!prev.includes(word)) {
            return [...prev, word];
          }
          return prev;
        });
      }, i * 1000);
    });
  }, []);

  return (
    <h1 className="animated-news">
      {visibleWords.map((word, i) => (
        <span key={i} className="word">
          {word}&nbsp;
        </span>
      ))}
    </h1>
  );
};

export default AnimatedNews;
