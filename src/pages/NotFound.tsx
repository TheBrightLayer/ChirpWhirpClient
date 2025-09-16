import React from "react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const NotFound: React.FC = () => {
  return (
    <PageTransition className="post">
      <h1>404</h1>
      <p>We couldn’t find that page.</p>
      <Link to="/blog" className="btn">
        ← Back to blog
      </Link>
    </PageTransition>
  );
};

export default NotFound;
