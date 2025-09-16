import "../styles/Services.css";
//import "../styles/Card.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/BrightLayerLogo.png";
interface Service {
  topic: string;
  title: string;
  avatar: string;
  role: string;
  author: string;
  tags: string[];
}

export function Services() {
  const [scale, setScale] = useState(0.8); // start zoomed-out

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Formula: starts at 0.8 and approaches 1 as you scroll
      const newScale = Math.min(0.8 + scrollY / 500, 1);

      setScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const services: Service[] = [
    {
      topic: "Enterprise",
      title:
        "We specialize in building powerful enterprise software, ensuring seamless compatibility",
      avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=Enterprise",
      role: "Category",
      author: "Business Solutions",
      tags: ["Software", "Enterprise", "B2B"],
    },
    {
      topic: "Cloud",
      title:
        "Our SaaS and cloud-based services help organizations scale efficiently ",
      avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=SaaS",
      role: "Category",
      author: "Cloud Services",
      tags: ["SaaS", "Cloud", "Web"],
    },
    {
      topic: "Mobility",
      title:
        "From iOS to Android, we craft mobile applications designed for performance ",
      avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=Mobility",
      role: "Category",
      author: "Mobile Apps",
      tags: ["Mobility", "iOS", "Android"],
    },
    {
      topic: "Design",
      title: "Our design team creates intuitive and engaging user experiences",
      avatar: "https://api.dicebear.com/6.x/identicon/svg?seed=UX",
      role: "Category",
      author: "Design Team",
      tags: ["UX", "Research", "Design"],
    },
  ];

  return (
    <div>
      <div className="hero-logo">
        <Link to="/">
          <img src={logo} alt="BrightLayer Logo" className="logo" />
        </Link>
      </div>

      <section
        className="services-sectionx"
        style={{
          transform: `scale(${scale})`,
          transition: "transform 0.3s ease-out",
          transformOrigin: "center top", // grows from top-center
        }}
      >
        {/* Heading */}
        <h2>
          Services <span className="red">We Offer</span>
        </h2>

        {/* Description */}
        <p>
          Welcome to TheBrightLayer, where we specialize in empowering
          businesses to excel in the digital landscape. Our comprehensive
          services include custom website and{" "}
          <a href="#mobile-app">mobile app development</a>, as well as{" "}
          <a href="#software-solutions">tailored software solutions</a>.
        </p>
        <p>
          We guarantee to achieve and surpass your business objectives. Our goal
          is to deliver results that not only meet your needs but also add
          significant value to your business.
        </p>

        {/* Card List */}
        <section className="card-list">
          {services.map((service, index) => (
            <article className="card" key={index}>
              <header className="card-header">
                <p>{service.topic}</p>
                <h4>{service.title}</h4>
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

        {/* CTA */}
        <div className="cta-row">
          <div className="cta-box">
            <h3>Didn’t find what you are looking for?</h3>
            <button className="outline-btn">
              <Link to="/contact" className="getting-started-btn">
                Connect With Us
              </Link>
            </button>
          </div>
          <div className="cta-box">
            <h3>Ready to start your Project?</h3>
            <button className="filled-btn">
              <Link
                to="/contact"
                onClick={handleClick}
                className="getting-started-btn"
              >
                Let's Chat
              </Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
