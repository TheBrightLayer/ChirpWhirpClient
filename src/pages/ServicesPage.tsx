import React, { useState, useEffect } from "react";
import "../styles/ServicesPage.css";
import logo from "../assets/BrightLayerLogo.png";
import bgVideo from "../assets/MD_Motion_001.mp4";
import serviceVideo from "../assets/servicesVideo.mp4";
import "../styles/Card.css";
import { Link } from "react-router-dom";

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

const ServicesPage = () => {
  const [scale, setScale] = useState(1);
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
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

  useEffect(() => {
    let start = performance.now();

    const duration = 6000; // animation duration in ms

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="services-page">
      {/* Hero Section */}

      <section className="service-hero">
        {/* Background video */}
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
              Web and Mobile <br /> Solutions <br />
              <span className="highlight-red">For Every</span> <br />
              <span className="highlight-red">Business</span>
            </h1>
          </div>

          <div className="service-hero-description">
            <p>
              We craft seamless experiences and deliver scalable solutions
              through our expertise in building modern, efficient, and
              user-friendly digital platforms
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

      <section className="video-section">
        <div
          className="video-container"
          style={{ transform: `scale(${scale})` }}
        >
          <video autoPlay muted loop playsInline>
            <source src={serviceVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      {/* IT Partner Section */}
      <section className="partner">
        <h2>
          Let Us Be Your <span className="red">IT Partner</span>{" "}
        </h2>
        <p>
          With over 14+ years of experience and 61k+ hours of development, we
          ensure delivering scalable and reliable IT solutions.
        </p>

        <div className="stats">
          {stats.map((stat, i) => (
            <div key={i}>
              <h3>{counts[i]}%</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Intro */}
      <section className="partner">
        <h2>
          Our <span className="red">Custom Application</span> Development
          Services
        </h2>
        <p>
          We specialize in providing full-cycle development services across
          Android, iOS, and Web platforms. Our team ensures efficiency,
          reliability, and scalability.
        </p>
        {/* Card List */}
        <section className="card-list">
          {services.map((service, index) => (
            <article className="card" key={index}>
              <header className="card-header">
                <p>{service.topic}</p>
                <h2>{service.title}</h2>
              </header>

              <div className="card-author">
                <a className="author-avatar" href="#">
                  <img src={service.avatar} alt={service.author} />
                </a>
                <svg className="half-circle" viewBox="0 0 106 57">
                  <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                </svg>
                <div className="author-name">
                  <div className="author-name-prefix">{service.role}</div>
                  {service.author}
                </div>
              </div>

              <div className="tags">
                {service.tags.map((tag, tIndex) => (
                  <a href="#" key={tIndex}>
                    {tag}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>
          Contact <span className="red">Us</span>
        </h2>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message"></textarea>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </section>

      <section className="faq">
        <h2>
          Frequently Asked <span className="red">Questions</span>
        </h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: activeIndex === index ? "200px" : "0",
                  opacity: activeIndex === index ? 1 : 0,
                }}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
