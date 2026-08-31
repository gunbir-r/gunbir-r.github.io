import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { usePortfolioTheme, PortfolioThemeProvider } from './components/theme/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';

const AppInner: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname]);

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App: React.FC = () => (
  <PortfolioThemeProvider>
    <AppInner />
  </PortfolioThemeProvider>
);

export default App;
