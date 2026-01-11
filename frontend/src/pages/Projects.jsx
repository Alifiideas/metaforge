import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Projects.css";

function Projects() {
  const projects = [
    {
      title: "AI Metadata Generator",
      description:
        "Generate SEO-optimized titles, keywords, and optional descriptions for multiple stock and social platforms.",
      route: "/metadata",
      badge: "CORE",
    },
    {
      title: "Duplicate Image Detector",
      description:
        "Detect and manage duplicate images using AI-powered image hashing. Delete selected or all duplicates easily.",
      route: "/duplicate-detector",
      badge: "TOOLS",
    },
    {
      title: "Image Converter",
      description:
        "Convert images between JPG, PNG, WEBP, TIFF, BMP, and HEIC formats with high quality.",
      route: "/image-converter",
      badge: "TOOLS",
    },
    {
      title: "Image Upscaler",
      description:
        "Upscale images up to 6× using AI while preserving sharpness and details.",
      route: "/upscaler",
      badge: "PRO",
    },
    {
      title: "Background Remover",
      description:
        "Remove image backgrounds instantly with AI precision. Perfect for stock images and product photos.",
      route: "/background-remover",
      badge: "PRO",
    },
  ];

  return (
    <motion.section
      className="page projects"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <h1>Projects & Tools</h1>
        <p className="subtitle">
          Explore MetaForge’s AI-powered tools designed for creators,
          contributors, and digital professionals.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card"
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <span className={`badge ${project.badge.toLowerCase()}`}>
                {project.badge}
              </span>

              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <Link to={project.route}>
                <button>Open Tool</button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Projects;
