import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ================= LAYOUTS ================= */
import Navbar from "./components/Navbar";
import Layout from "./components/layout/Layout";

/* ================= PUBLIC PAGES ================= */
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";

/* ================= DASHBOARD PAGES ================= */
import Metadata from "./pages/Metadata";
import DuplicateDetector from "./pages/DuplicateDetector";

import "./App.css";

/* ================= PUBLIC LAYOUT ================= */

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

function App() {
  const tokens = 50;
  const plan = "Free";

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC SITE ================= */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/about"
          element={
            <PublicLayout>
              <About />
            </PublicLayout>
          }
        />

        <Route
          path="/projects"
          element={
            <PublicLayout>
              <Projects />
            </PublicLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <PublicLayout>
              <Contact />
            </PublicLayout>
          }
        />

        <Route
          path="/pricing"
          element={
            <PublicLayout>
              <Pricing />
            </PublicLayout>
          }
        />

        {/* ================= DASHBOARD ================= */}
        <Route
          path="/"
          element={<Layout tokens={tokens} plan={plan} />}
        >
          <Route path="metadata" element={<Metadata />} />
          <Route
            path="duplicate-detector"
            element={<DuplicateDetector />}
          />
        </Route>

        {/* ================= 404 ================= */}
        <Route
          path="*"
          element={
            <main
              style={{
                padding: "100px",
                textAlign: "center",
                color: "#cfd3ff",
              }}
            >
              <h1>404</h1>
              <p>Page not found</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
