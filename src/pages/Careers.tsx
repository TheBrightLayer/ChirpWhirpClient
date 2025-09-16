import React, { useState, useEffect } from "react";
//import "../styles/ServicesPage.css";
import "../styles/Careers.css";
import logo from "../assets/BrightLayerLogo.png";
import bgVideo from "../assets/MD_Motion_001.mp4";
import serviceVideo from "../assets/3044681-uhd_3840_2160_24fps.mp4";
import "../styles/Card.css";
import emailjs from "emailjs-com";

import node from "../assets/node-icon.png";
import { Link } from "react-router-dom";
import reactLogo from "../assets/image-167-1.png";
import angularLogo from "../assets/Group-36806-1.png";

interface Service {
  topic: string;
  title: string;
  avatar: string;
  role: string;
  author: string;
  tags: string[];
}

interface Stat {
  value: number;
  label: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const TECHNOLOGIES = [
  { name: "Node.js", logo: node as string },
  { name: "React", logo: reactLogo as string },

  { name: "Angular", logo: angularLogo as string },
];

const services: Service[] = [
  {
    topic: "Enterprise",
    title:
      "Enterprise Software is something we've been a smart at. Providing great complatibility to our clients",
    avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=Enterprise",
    role: "Category",
    author: "Business Solutions",
    tags: ["Software", "Enterprise", "B2B"],
  },
  {
    topic: "Enterprise",
    title:
      "Enterprise Software is something we've been a smart at. Providing great complatibility to our clients",
    avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=SaaS",
    role: "Category",
    author: "Cloud Services",
    tags: ["SaaS", "Cloud", "Web"],
  },
  {
    topic: "Enterprise",
    title:
      "Enterprise Software is something we've been a smart at. Providing great complatibility to our clients",
    avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=Mobility",
    role: "Category",
    author: "Mobile Apps",
    tags: ["Mobility", "iOS", "Android"],
  },
  {
    topic: "Enterprise",
    title:
      "Enterprise Software is something we've been a smart at. Providing great complatibility to our clients",
    avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=UX",
    role: "Category",
    author: "Design Team",
    tags: ["UX", "Research", "Design"],
  },
];

const stats: Stat[] = [
  { value: 93, label: "Client Retention" },
  { value: 90, label: "Projects On-Time" },
  { value: 100, label: "Quality of service" },
  { value: 90, label: "Time to Market" },
  { value: 92, label: "Overall Costs" },
];

const faqs: FAQ[] = [
  {
    question: "What industries do you work with?",
    answer:
      "We have experience across healthcare, fintech, education, e-commerce, and more.",
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Yes, we provide ongoing maintenance and support.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary, but we focus on delivering high-quality solutions on time.",
  },
  {
    question: "Can you scale with our business?",
    answer:
      "Absolutely, we build scalable solutions designed to grow with your business needs.",
  },
];

const Careers = () => {
  const [scale, setScale] = useState(1);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    company: "", // ✅ added so "company" exists in the type
    email: "",
    phone: "",
    resume: "", // kept as in your original
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newScale = 1 + Math.min(scrollY / 1000, 0.5);
      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let start = performance.now();
    const duration = 6000; // slower animation

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setCounts(stats.map((stat) => Math.floor(stat.value * progress)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    emailjs
      .send(
        "service_0slomww", // from EmailJS dashboard
        "template_qv89fff", // from EmailJS dashboard
        formData,
        "QwUiRNVdw23fTWIrr" // EmailJS public key
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({
            name: "",
            company: "", // ✅ keep consistent on reset
            email: "",
            phone: "",
            resume: "", // kept since it's in the type
            message: "",
          });
        },
        (error) => {
          console.error(error);
          setStatus("Failed to send. Please try again later.");
        }
      );
  };

  // Handle form
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="service-hero">
        <video
          className="service-hero-video"
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
        <div className="service-hero-content">
          <div className="service-hero-heading">
            <h1>
              Join and Build <br />
              <span className="highlight-red">Future</span> <br />
              <span className="highlight-red">Together</span>
            </h1>
          </div>
          <div className="service-hero-description">
            <p>
              Discover opportunities to grow, innovate, and succeed with
              BrightLayer—where your ideas matter, your skills thrive, and
              teamwork creates success.
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

      {/* Video Section */}
      <section className="video-section">
        <div
          className="video-container"
          style={{ transform: `scale(${scale})` }} // ✅ fixed template string
        >
          <video autoPlay muted loop playsInline>
            <source src={serviceVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="partner">
        <h2>
          Join <span className="red">Us</span>
        </h2>
        <p>
          With over 14+ years of experience and 61k+ hours of development, we
          ensure delivering scalable and reliable IT solutions.
        </p>
      </section>

      <div className="contact-header">
        <div className="contact-title">
          <h1>
            Build your <span>Career</span> <span>Here.</span>
          </h1>
          <p>
            Be a part of our Team <span className="highlight">A Top-Rated</span>{" "}
            Mobile App Development Company.
          </p>
        </div>
      </div>

      <div className="contact-form-card">
        <h2>
          We would be <span>happy to hear</span> from you!
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Resume (link)"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Email ID*"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone no. (optional)"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-row full-width">
            <textarea
              name="message"
              placeholder="Message*"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit">SEND</button>
          </div>

          {status && <p className="status-message">{status}</p>}
        </form>
      </div>
      {/* ---- Technologies We Use (AFTER the form) ---- */}
      <section className="tech-section">
        <h2>
          <span>Technologies</span> We Use
        </h2>

        <ul className="tech-grid">
          {TECHNOLOGIES.map((t) => (
            <li key={t.name} className="tech-item">
              <img src={t.logo} alt={t.name} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Careers;
