//import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback:
        "Great experience working with the team! They delivered on time and exceeded expectations.",
    },
    {
      name: "Jane Smith",
      feedback:
        "Professional and creative. Our website now looks amazing and functions perfectly.",
    },
    {
      name: "Alex Johnson",
      feedback:
        "Highly recommend their services. Communication was smooth and the results were excellent.",
    },
  ];

  return (
    <section id="testimonials">
      <h2>Testimonials</h2>
      <div className="service-list">
        {testimonials.map((t, index) => (
          <div key={index} className="service-card">
            <p className="testimonial-text">"{t.feedback}"</p>
            <h4>- {t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
