import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
const Home = React.lazy(() => import("./components/Home"));
const Contact = React.lazy(() => import("./components/Contact"));
const Blog = React.lazy(() => import("./components/Blog"));
const Projects = React.lazy(() => import("./components/Projects"));
// Reuse existing Skills component for the former Resume route
const Resume = React.lazy(() => import("./components/Skills"));

// Theme toggle removed - app uses default styles

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // use logical/block positioning via scrollIntoView to avoid top ↔ inset-block-start lint issues
    document.documentElement.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [pathname]);
  return null;
}

// Simple fade transition wrapper keyed by pathname
function RouteFade({ children }) {
  const { pathname } = useLocation();
  const [display, setDisplay] = useState(children);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    setFade(false);
    const out = setTimeout(() => {
      setDisplay(children);
      setFade(true);
    }, 120); // fade out duration
    return () => clearTimeout(out);
  }, [pathname, children]);
  return (
    <div className={"transition-opacity duration-300 " + (fade ? "opacity-100" : "opacity-0")}>{display}</div>
  );
}

// Theme toggle removed
// Top Navbar removed; using internal Tabs inside each page card
function InnerApp() {
  return (
  <div className="min-h-screen bg-[#111111] text-white transition-colors">
      <ScrollToTop />
      <main className="pb-12">
        <React.Suspense fallback={<div className="p-10 text-center text-body">Loading...</div>}>
          <Routes>
            <Route path="/" element={<RouteFade><Home /></RouteFade>} />
            <Route path="/skills" element={<RouteFade><Resume /></RouteFade>} />
            <Route path="/projects" element={<RouteFade><Projects /></RouteFade>} />
            {/* Legacy redirect */}
            <Route path="/portfolio" element={<Navigate to="/projects" replace />} />
            <Route path="/blog" element={<RouteFade><Blog /></RouteFade>} />
            <Route path="/contact" element={<RouteFade><Contact /></RouteFade>} />
          </Routes>
        </React.Suspense>
      </main>
  {/* Footer removed as requested */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <InnerApp />
    </Router>
  );
}
export default App;