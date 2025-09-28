import React, { useEffect } from "react";
import { useLocation } from "@docusaurus/router";

// Add background animation to docs
function DocsBackground() {
  return (
    <div className="docs-background-animation">
      <div className="floating-circle circle-1"></div>
      <div className="floating-circle circle-2"></div>
      <div className="floating-circle circle-3"></div>
    </div>
  );
}

// Scroll to top on route change
function DocsScrollTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

// Enhanced Docs Layout
export default function DocsLayout({ children }) {
  return (
    <>
      <DocsBackground />
      <DocsScrollTop />
      {children}
    </>
  );
}
