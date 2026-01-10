import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home">
      {/* ================= HERO ================= */}
      <section className="hero">
        {/* LEFT CONTENT */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1>
            AI-Powered <span>Metadata Generator</span>
            <br />
            for Creators & Stock Sellers
          </h1>

          <p>
            Generate platform-optimized titles, keywords, and descriptions
            for images & videos — faster, smarter, and cheaper.
          </p>

          <div className="hero-actions">
            <Link to="/metadata">
              <button className="btn primary">
                Get Started Free
              </button>
            </Link>

            <Link to="/pricing">
              <button className="btn secondary">
                View Pricing
              </button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT VISUALS */}
        <div className="hero-right">
          {/* Upload Card */}
          <motion.div
            className="hero-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div
              className="upload-icon"
              aria-hidden="true"
            >
              ⬆️
            </div>

            <h3>Upload Your Files</h3>
            <p>Images & Videos supported</p>

            <button
              className="btn upload"
              type="button"
            >
              Choose Files
            </button>

            <small>
              Unlimited metadata • CSV export • Secure processing
            </small>
          </motion.div>

          {/* Animated Metadata Visual */}
          <div className="hero-visual">
            <div className="metadata-card card-1">
              <h4>Title</h4>
              <p>Modern business meeting</p>
            </div>

            <div className="metadata-card card-2">
              <h4>Keywords</h4>
              <span>business</span>
              <span>teamwork</span>
              <span>office</span>
            </div>

            <div className="metadata-card card-3">
              <h4>Description</h4>
              <p>
                Professional team collaborating in a modern office environment.
              </p>
            </div>

            <div className="glow-orb orb-1" />
            <div className="glow-orb orb-2" />
          </div>
        </div>
      </section>

      {/* ================= PLATFORMS ================= */}
      <section className="platforms">
        <h2>Optimized for Major Platforms</h2>

        <div className="platform-grid">
          <span>Shutterstock</span>
          <span>Adobe Stock</span>
          <span>Freepik</span>
          <span>Vecteezy</span>
          <span>Depositphotos</span>
          <span>YouTube</span>
          <span>TikTok</span>
          <span>Instagram</span>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-it-works">
        <h2>How MetaForge Works</h2>

        <div className="steps">
          <div className="step">
            <h3>1. Upload</h3>
            <p>Upload images or videos in bulk</p>
          </div>

          <div className="step">
            <h3>2. Customize</h3>
            <p>
              Control title, keywords & description using smart sliders
            </p>
          </div>

          <div className="step">
            <h3>3. Export</h3>
            <p>Download ready-to-use CSV files</p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features">
        <h2>Why Choose MetaForge</h2>

        <ul>
          <li>🎯 Platform-specific SEO optimization</li>
          <li>🎚️ Min/Max metadata sliders</li>
          <li>🧠 Description ON/OFF toggle</li>
          <li>📦 Bulk processing & CSV merge</li>
          <li>⚡ Priority queue for paid plans</li>
        </ul>
      </section>

      {/* ================= TOOLS ================= */}
      <section className="tools">
        <h2>AI Tools Included</h2>

        <div className="tools-grid">
          <div className="tool">Background Remover</div>
          <div className="tool">Image Upscaler (6×)</div>
          <div className="tool">Duplicate Image Detector</div>
          <div className="tool">File Converter</div>
          <div className="tool">Voice Generator</div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="cta">
        <h2>Start Creating Metadata in Seconds</h2>
        <p>No credit card required</p>

        <Link to="/metadata">
          <button className="btn primary big">
            Get Started Free
          </button>
        </Link>
      </section>
    </main>
  );
}

export default Home;


