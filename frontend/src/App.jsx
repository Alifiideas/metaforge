import "./App.css";

function App() {
  return (
    <div className="app">
      {/* HERO */}
      <section className="hero">
        <nav className="navbar">
          <h2 className="logo">MetaForge</h2>
          <div className="nav-actions">
            <button className="btn ghost">View Pricing</button>
            <button className="btn primary">Get Started Free</button>
          </div>
        </nav>

        <div className="hero-content">
          <h1>
            AI-Powered Metadata Generator
            <br />
            for Creators & Stock Sellers
          </h1>
          <p>
            Generate platform-optimized titles, keywords, and descriptions
            for images & videos — faster, smarter, and cheaper.
          </p>

          <div className="hero-buttons">
            <button className="btn primary large">Get Started Free</button>
            <button className="btn ghost large">View Pricing</button>
          </div>

          {/* NEW: Hero Visual Placeholder */}
          <div className="hero-visual">
            <div className="visual-card">AI Metadata</div>
            <div className="visual-card">SEO Keywords</div>
            <div className="visual-card">CSV Export</div>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="platforms">
        <h3>Optimized for Major Platforms</h3>
        <div className="platform-grid">
          {[
            "Shutterstock",
            "Adobe Stock",
            "Freepik",
            "Vecteezy",
            "Depositphotos",
            "YouTube",
            "TikTok",
            "Instagram",
          ].map((p) => (
            <div key={p} className="platform-card">
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <h2>How MetaForge Works</h2>
        <div className="steps">
          <Step
            number="1"
            title="Upload"
            desc="Upload images or videos in bulk"
          />
          <Step
            number="2"
            title="Customize"
            desc="Control titles, keywords & descriptions using smart sliders"
          />
          <Step
            number="3"
            title="Export"
            desc="Download ready-to-use CSV files"
          />
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="features">
        <h2>Why Choose MetaForge</h2>
        <div className="feature-grid">
          <Feature title="Platform-Specific SEO Optimization" />
          <Feature title="Min / Max Metadata Sliders" />
          <Feature title="Description ON / OFF Toggle" />
          <Feature title="Bulk Processing & CSV Merge" />
          <Feature title="Priority Queue for Paid Plans" />
        </div>
      </section>

      {/* AI TOOLS */}
      <section className="tools">
        <h2>More Than Metadata — AI Tools Suite</h2>
        <div className="tool-grid">
          <Tool
            title="Duplicate Image Detector"
            desc="Detect and remove duplicate images before uploading"
          />
          <Tool
            title="Image Converter"
            desc="Convert JPG, PNG, WebP & more instantly"
          />
          <Tool
            title="Image Upscaler (6×)"
            desc="Enhance resolution without quality loss"
          />
          <Tool
            title="Background Remover"
            desc="AI-powered background removal in seconds"
          />
        </div>
      </section>

      {/* TRUST / SPEED VISUAL SECTION (NEW) */}
      <section className="trust">
        <div className="trust-grid">
          <TrustCard title="⚡ Fast Processing" />
          <TrustCard title="🔒 Secure Files" />
          <TrustCard title="📦 Bulk Ready" />
          <TrustCard title="🧠 AI Optimized" />
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Start Creating Metadata in Seconds</h2>
        <p>No credit card required</p>
        <button className="btn primary large">Get Started Free</button>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} MetaForge. All rights reserved.
      </footer>
    </div>
  );
}

/* COMPONENTS */

const Feature = ({ title }) => (
  <div className="feature-card">
    <h4>{title}</h4>
  </div>
);

const Tool = ({ title, desc }) => (
  <div className="tool-card">
    <h4>{title}</h4>
    <p>{desc}</p>
    <span className="tool-label">Powered by MetaForge AI</span>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div className="step">
    <span>{number}</span>
    <h4>{title}</h4>
    <p>{desc}</p>
  </div>
);

const TrustCard = ({ title }) => (
  <div className="trust-card">
    <h4>{title}</h4>
  </div>
);

export default App;



