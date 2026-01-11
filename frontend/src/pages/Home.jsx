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
          transition={{ duration: 0.6 }}
        >
          <h1>
            AI-Powered <span>Metadata Generator</span> <br />
            for Creators & Stock Sellers
          </h1>

          <p>
            Generate platform-optimized titles, keywords, and descriptions
            for images & videos — faster, smarter, and cheaper.
          </p>

          <div className="hero-actions">
            <Link to="/metadata">
              <button className="btn primary">Get Started Free</button>
            </Link>

            <Link to="/pricing">
              <button className="btn secondary">View Pricing</button>
            </Link>
          </div>
        </motion.div>

        {/* RIGHT VISUALS (GRAPHICS & ANIMATION ONLY) */}
        <div className="hero-right">
          <motion.div
            className="ai-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Central AI Core */}
            <motion.div
              className="ai-core"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 20,
                ease: "linear",
              }}
            >
              🤖
            </motion.div>

            {/* Floating Business Concepts */}
            <motion.div
              className="float-card card-1"
              animate={{ y: [0, -18, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              📈 SEO Growth
            </motion.div>

            <motion.div
              className="float-card card-2"
              animate={{ y: [0, 14, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              🧠 AI Analysis
            </motion.div>

            <motion.div
              className="float-card card-3"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4.5 }}
            >
              🏷️ Smart Metadata
            </motion.div>

            <motion.div
              className="float-card card-4"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
            >
              ⚡ Fast Processing
            </motion.div>

            {/* Ambient Glow */}
            <div className="glow-orb orb-1"></div>
            <div className="glow-orb orb-2"></div>
            <div className="glow-orb orb-3"></div>
          </motion.div>
        </div>
      </section>

      {/* ================= PLATFORMS ================= */}
<section className="platforms">
  <div className="platforms-header">
    <h2>Built for the Platforms That Matter</h2>
    <p>
      MetaForge generates metadata tailored to each platform’s
      search algorithm and submission standards.
    </p>
  </div>

  <div className="platform-grid">
    <div className="platform-card">
      <h4>Shutterstock</h4>
      <p>Optimized keyword density & title structure</p>
    </div>

    <div className="platform-card">
      <h4>Adobe Stock</h4>
      <p>Clean descriptions with AI-ranked keywords</p>
    </div>

    <div className="platform-card">
      <h4>Freepik</h4>
      <p>Balanced metadata for visibility & approval</p>
    </div>

    <div className="platform-card">
      <h4>Vecteezy</h4>
      <p>SEO-ready titles and keyword prioritization</p>
    </div>

    <div className="platform-card">
      <h4>Depositphotos</h4>
      <p>Structured descriptions with smart tagging</p>
    </div>

    <div className="platform-card">
      <h4>YouTube & Shorts</h4>
      <p>High-impact titles, tags & descriptions</p>
    </div>

    <div className="platform-card">
      <h4>TikTok</h4>
      <p>Trend-aware keywords & discoverability boosts</p>
    </div>

    <div className="platform-card">
      <h4>Instagram</h4>
      <p>Hashtag-optimized captions & metadata</p>
    </div>
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
            <p>Control title, keywords & description using smart sliders</p>
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
          <button className="btn primary big">Get Started Free</button>
        </Link>
      </section>
    </main>
  );
}

export default Home;
