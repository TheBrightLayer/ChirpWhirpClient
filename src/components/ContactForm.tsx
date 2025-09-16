import React, { useState } from "react";
import "../styles/ContactForm.css";

export function ContactForm() {
  const [status, setStatus] = useState<
    "IDLE" | "LOADING" | "SUCCESS" | "ERROR"
  >("IDLE");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("LOADING");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      setStatus("ERROR");
    }
  };

  return (
    <section className="contact-container">
      <div className="contact-header">
        <div className="contact-title">
          <h1>
            Let’s <span>Talk</span>
          </h1>
          <p>
            Fill out the form below and{" "}
            <span className="highlight">we’ll get back to you</span> soon.
          </p>
        </div>
      </div>

      <div className="contact-form-card">
        <h2>
          Send us a <span>Message</span>
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-row full-width">
            <input type="text" name="name" placeholder="Your Name" required />
          </div>

          <div className="form-row full-width">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>

          <div className="form-row full-width">
            <textarea
              name="message"
              rows={5}
              placeholder="Your Message"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={status === "LOADING"}>
              {status === "LOADING" ? "Sending..." : "Send Message"}
            </button>
          </div>

          {status === "SUCCESS" && (
            <p className="success">✅ Thanks! We’ll be in touch.</p>
          )}
          {status === "ERROR" && (
            <p className="error">❌ Oops! Something went wrong.</p>
          )}
        </form>
      </div>
    </section>
  );
}
