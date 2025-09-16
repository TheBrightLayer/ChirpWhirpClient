import React, { useState } from "react";
import Modal from "./Modal";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<null | string>(null);

  const projects = [
    {
      title: "Project One",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Project Two",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Project Three",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <section id="portfolio">
      <h2>Portfolio</h2>
      <div className="service-list">
        {projects.map((proj, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() => setSelectedProject(proj.image)}
            style={{ cursor: "pointer" }}
          >
            <img src={proj.image} alt={proj.title} />
            <h3>{proj.title}</h3>
          </div>
        ))}
      </div>

      {selectedProject && (
        <Modal onClose={() => setSelectedProject(null)}>
          <img src={selectedProject} alt="Project" />
        </Modal>
      )}
    </section>
  );
};

export default Portfolio;
