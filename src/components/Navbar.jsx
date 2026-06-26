import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

export default function Navbar({ subjects, activeSubject, setActiveSubject, searchTerm, setSearchTerm }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isGallery = location.pathname === '/';

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 50, borderBottom: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.9)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '30px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, textDecoration: 'none', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#1e293b', whiteSpace: 'nowrap' }}>
            Mindmaps by
          </span>
          <img src="/logo.png" alt="Testbook" style={{ height: 30, transform: 'translateY(2px)' }} crossOrigin="anonymous" />
        </Link>

        {/* Desktop Nav */}
        {isGallery && (
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flex: 1, minWidth: 0, justifyContent: 'flex-end' }} className="desktop-nav">
            <div id="tour-nav" style={{ display: 'flex', gap: 15, overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none', paddingBottom: '4px' }}>
              {subjects.map(sub => (
                <button 
                  key={sub}
                  onClick={() => setActiveSubject(sub)}
                  style={{
                    background: activeSubject === sub ? '#3b82f6' : 'transparent',
                    color: activeSubject === sub ? 'white' : '#64748b',
                    border: 'none', padding: '6px 12px', borderRadius: 20, fontWeight: 600,
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>

            <div id="tour-search" style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Search topics..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px 16px 8px 36px', borderRadius: 20, border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc' }}
              />
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 10 }} />
            </div>
          </div>
        )}

        {/* Mobile menu toggle */}
        {isGallery && (
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ background: 'none', border: 'none', display: 'none', cursor: 'pointer' }}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}

        {/* Back button if not in gallery */}
        {!isGallery && (
          <Link to="/" style={{ color: '#3b82f6', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
            ← Back to Gallery
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isGallery && (
        <div style={{ padding: 20, background: 'white', borderBottom: '1px solid #e2e8f0' }}>
           <input 
              type="text" 
              placeholder="Search topics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px 16px', borderRadius: 8, border: '1px solid #cbd5e1', marginBottom: 15 }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {subjects.map(sub => (
                <button 
                  key={sub}
                  onClick={() => { setActiveSubject(sub); setIsMobileMenuOpen(false); }}
                  style={{
                    background: activeSubject === sub ? '#f1f5f9' : 'transparent',
                    color: activeSubject === sub ? '#3b82f6' : '#64748b',
                    border: 'none', padding: '10px', borderRadius: 8, fontWeight: 600,
                    textAlign: 'left', cursor: 'pointer'
                  }}
                >
                  {sub}
                </button>
              ))}
            </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
