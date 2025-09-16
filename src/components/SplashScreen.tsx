// SplashScreen.tsx
import React from "react";
import logo from "../assets/chwp.png";
import "../styles/SplashScreen.css";

export default function SplashScreen() {
  return (
    <div className="splash-screen">
      <img src={logo} alt="BrightLayer" className="splash-logo" />
      {/* <h2>Loading BrightLayer...</h2> */}
    </div>
  );
}
