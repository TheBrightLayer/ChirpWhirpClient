import React, { useState } from "react";
import "../styles/Contact.css"; // ✅ Import CSS file

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  subscribe: boolean;
};

export default function Contact(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    subscribe: true,
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  function validate(): boolean {
    const e: Partial<FormState> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.subject.trim()) e.subject = "Please add a subject.";
    if (!form.message.trim()) e.message = "Please write a message.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    setServerMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      const json = await res.json();
      setStatus("success");
      setServerMessage(json?.message ?? "Thanks — we received your message.");
      setForm({ name: "", email: "", subject: "", message: "", subscribe: true });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setServerMessage(err?.message ?? "Something went wrong. Try again later.");
    }
  }

  return (
    <main className="contact-container">
      <section className="contact-wrapper">
        <header className="contact-header">
          <h1>Contact ChirpWhirp</h1>
          <p>
            We'd love to hear from you — tips, story ideas, partnership enquiries, or feedback about the site.
            Use the form or the contact options below and we'll get back to you as soon as we can.
          </p>
        </header>

        <div className="contact-grid">
          {/* Left column */}
          <aside className="contact-info">
            <div className="contact-card">
              <h3>General enquiries</h3>
              <p>For editorial tips, corrections and story ideas.</p>
              <div>
                <p>Email</p>
                <a href="mailto:editor@chirpwhirp.com">editor@chirpwhirp.com</a>
                <p>Phone</p>
                <a href="tel:+911234567890">+91 12345 67890</a>
              </div>
            </div>

            <div className="contact-card">
              <h3>Partnerships & advertising</h3>
              <p>Looking to advertise or partner with ChirpWhirp?</p>
              <div>
                <p>Email</p>
                <a href="mailto:ads@chirpwhirp.com">ads@chirpwhirp.com</a>
              </div>
            </div>

            <div className="contact-card">
              <h3>Follow us</h3>
              <p>Stay in touch on social media.</p>
              <div className="social-links">
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
                <a href="#">YouTube</a>
              </div>
            </div>

            <div className="contact-card">
              <h3>Office</h3>
              <p>ChirpWhirp Media Pvt. Ltd.<br />New Delhi, India</p>
            </div>
          </aside>

          {/* Right column */}
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Name
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </label>

                <label>
                  Email
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@domain.com"
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </label>
              </div>

              <label>
                Subject
                <input
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="What is this about?"
                />
                {errors.subject && <span className="error">{errors.subject}</span>}
              </label>

              <label>
                Message
                <textarea
                  rows={7}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us everything — the more detail the better."
                />
                {errors.message && <span className="error">{errors.message}</span>}
              </label>

              <div className="form-footer">
                <label>
                  <input
                    type="checkbox"
                    checked={form.subscribe}
                    onChange={(e) => setForm({ ...form, subscribe: e.target.checked })}
                  />
                  Subscribe to newsletter
                </label>
                <span className="hint">We aim to reply within 3 business days.</span>
              </div>

              <div className="form-actions">
                <button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>

                {status === "success" && serverMessage && (
                  <div className="success">{serverMessage}</div>
                )}
                {status === "error" && serverMessage && (
                  <div className="error">{serverMessage}</div>
                )}
              </div>
            </form>

            <div className="form-extra">
              <iframe
                title="office-location"
                src="https://www.google.com/maps?q=New+Delhi&output=embed"
              />
              <div className="contact-card">
                <h4>Office hours</h4>
                <p>Mon — Fri: 10:00 — 18:00 IST</p>
                <p>Press and newsroom queries are prioritised.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="privacy-note">
          By submitting you agree to our <a href="/privacy">privacy policy</a>.
        </div>
      </section>
    </main>
  );
}
