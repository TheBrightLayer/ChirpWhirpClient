import React from "react";
import "../styles/About.css";
import logo from "../assets/BrightLayerLogo.png";
// import iconAdFree from "../assets/icon-adfree.png";
// import iconTransparency from "../assets/icon-transparency.png";
// import iconCommunity from "../assets/icon-community.png";
import team1 from "../assets/team1.png";
import team2 from "../assets/team1.png";
import team3 from "../assets/team1.png";
import team4 from "../assets/team1.png";
import bgVideo from "../assets/M0.5.mp4";
const About = () => {
  return (
    <div className="about-page">
             {/* <video className="footer-video" autoPlay loop muted playsInline>
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
      {/* Intro Section */}
      <section className="about-hero">
        {/* <img src={logo} alt="ChirpWhirp Logo" className="about-logo" /> */}
        <h1> </h1>
        <p className="intro">
          ChirpWhirp is an independent digital news platform committed to
          fearless journalism. We believe in delivering news that matters —
          stories that spark conversations, challenge power, and amplify diverse
          voices. Our readers are not just spectators but active participants in
          shaping the narrative.
        </p>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <h2></h2>
        <div className="values-grid">
          <div className="value-item">
            {/* <img src={} alt="Ad-Free" className="icon" /> */}
            <h3>Clickbait Free Journalism</h3>
            <p>
              We are not driven by ads or clickbait. Our only focus is to bring
              you meaningful, credible, and impactful stories.
            </p>
          </div>
          <div className="value-item">
            {/* <img src={} alt="Transparency" className="icon" /> */}
            <h3>Transparency</h3>
            <p>
              We hold ourselves accountable. Our reporting process and funding
              are open to scrutiny — because trust is built on honesty.
            </p>
          </div>
          <div className="value-item">
            {/* <img src={} alt="Community" className="icon" /> */}
            <h3>Community First</h3>
            <p>
              ChirpWhirp thrives on its readers. We encourage participation,
              dialogue, and contributions from our community.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <h2></h2>
        <p>
          At ChirpWhirp, we aim to challenge noise with nuance. In an era of
          misinformation and corporate-driven narratives, we stand for
          independence, accuracy, and fearless reporting. Our mission is to
          create a space where truth speaks louder than propaganda.
        </p>
      </section>

      {/* Team Section */}
      {/* <section className="team-section">
        <h2>Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src={team1} alt="Team Member 1" className="profile" />
            <h4>Jane Doe</h4>
            <p className="role">Editor-in-Chief</p>
          </div>
          <div className="team-member">
            <img src={team2} alt="Team Member 2" className="profile" />
            <h4>John Smith</h4>
            <p className="role">Senior Political Analyst</p>
          </div>
          <div className="team-member">
            <img src={team3} alt="Team Member 3" className="profile" />
            <h4>Aisha Khan</h4>
            <p className="role">Culture & Society Reporter</p>
          </div>
          <div className="team-member">
            <img src={team4} alt="Team Member 4" className="profile" />
            <h4>Ravi Patel</h4>
            <p className="role">Community Manager</p>
          </div>
        </div>
      </section> */}

      {/* Reader Call-to-Action */}
      <section className="cta-section">
        <h2>Be Part of the Story</h2>
        <p>
          Independent journalism needs independent readers. Join ChirpWhirp in
          redefining the news — no noise, no compromise, just fearless stories.
        </p>
        <a href="/subscribe" className="cta-button">
          Subscribe & Support
        </a>
      </section>
    </div>
  );
};

export default About;
