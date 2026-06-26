import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import MindmapViewer from './components/MindmapViewer';
import PasswordScreen from './components/PasswordScreen';
import OnboardingTour from './components/OnboardingTour';
import SplashIntro from './components/SplashIntro';
import { mindmaps } from './data/mindmaps';

function App() {
  const [activeSubject, setActiveSubject] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [masteredMindmaps, setMasteredMindmaps] = useState(() => {
    const saved = localStorage.getItem('upsc_mastered_mindmaps');
    return saved ? JSON.parse(saved) : [];
  });
  const [isTestMode, setIsTestMode] = useState(() => {
    return localStorage.getItem('upsc_test_mode') === 'true';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('upsc_auth') === 'true';
  });
  const [hasSeenTour, setHasSeenTour] = useState(() => {
    return localStorage.getItem('upsc_tour_seen') === 'true';
  });
  const [showSplash, setShowSplash] = useState(() => {
    return sessionStorage.getItem('upsc_splash_seen') !== 'true';
  });
  const location = useLocation();

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('upsc_splash_seen', 'true');
  };

  const finishTour = () => {
    setHasSeenTour(true);
    localStorage.setItem('upsc_tour_seen', 'true');
  };

  useEffect(() => {
    localStorage.setItem('upsc_mastered_mindmaps', JSON.stringify(masteredMindmaps));
  }, [masteredMindmaps]);

  useEffect(() => {
    localStorage.setItem('upsc_test_mode', isTestMode);
  }, [isTestMode]);

  const toggleMastery = (id) => {
    setMasteredMindmaps(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('upsc_auth', 'true');
  };

  if (!isAuthenticated) {
    return <PasswordScreen onAuthenticate={handleAuthenticate} />;
  }

  if (showSplash) {
    return <SplashIntro onComplete={handleSplashComplete} />;
  }

  // Extract unique subjects
  const subjects = ['All', ...new Set(mindmaps.map(m => m.subject))];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar 
        subjects={subjects} 
        activeSubject={activeSubject} 
        setActiveSubject={setActiveSubject}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      <main style={{ flex: 1, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
                <Gallery mindmaps={mindmaps} activeSubject={activeSubject} searchTerm={searchTerm} masteredMindmaps={masteredMindmaps} />
              </motion.div>
            } />
            <Route path="/mindmap/:id" element={
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.4, ease: "easeOut" }} style={{ position: 'absolute', inset: 0 }}>
                <MindmapRoute masteredMindmaps={masteredMindmaps} toggleMastery={toggleMastery} isTestMode={isTestMode} setIsTestMode={setIsTestMode} />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      {isAuthenticated && !hasSeenTour && (
        <OnboardingTour onFinish={finishTour} />
      )}
    </div>
  );
}

function MindmapRoute({ masteredMindmaps, toggleMastery, isTestMode, setIsTestMode }) {
  const { id } = useParams();
  const data = mindmaps.find(m => m.id === id);

  if (!data) {
    return <div style={{ padding: 50, textAlign: 'center' }}><h2>Mindmap not found.</h2></div>;
  }

  return <MindmapViewer data={data} isMastered={masteredMindmaps.includes(id)} toggleMastery={() => toggleMastery(id)} isTestMode={isTestMode} setIsTestMode={setIsTestMode} />;
}

export default App;
