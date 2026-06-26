import React, { useEffect, useRef, useState } from 'react';
import { Share2, Bookmark, CheckCircle2, BrainCircuit } from 'lucide-react';
import * as htmlToImage from 'html-to-image';

export default function MindmapViewer({ data, isMastered, toggleMastery, isTestMode, setIsTestMode }) {
  const viewportRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  
  const [expandedNodes, setExpandedNodes] = useState({});
  const [revealedFacts, setRevealedFacts] = useState({});

  const toggleFact = (branchId, factIndex, e) => {
    e.stopPropagation();
    const factKey = `${branchId}-${factIndex}`;
    setRevealedFacts(prev => ({ ...prev, [factKey]: true }));
  };

  const toggleNode = (nodeId, e) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const xs = (e.clientX - position.x) / scale;
      const ys = (e.clientY - position.y) / scale;
      const delta = e.deltaY > 0 ? -1 : 1;
      let newScale = scale * (delta > 0 ? 1.1 : 0.9);
      newScale = Math.min(Math.max(0.3, newScale), 3);
      
      setScale(newScale);
      setPosition({
        x: e.clientX - xs * newScale,
        y: e.clientY - ys * newScale
      });
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [scale, position]);

  const handlePointerDown = (e) => {
    setIsPanning(true);
    startPos.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handlePointerMove = (e) => {
    if (!isPanning) return;
    setPosition({ x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y });
  };

  const handlePointerUp = () => setIsPanning(false);

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const downloadPNG = async () => {
    const originalScale = scale;
    const originalPos = { ...position };
    
    // Temporarily reset view so html-to-image captures everything perfectly
    resetZoom();
    
    // Allow DOM to update
    await new Promise(r => setTimeout(r, 200));
    
    const controls = document.getElementById('controls-overlay');
    const readBtn = document.getElementById('read-article-btn');
    
    if (controls) controls.style.display = 'none';
    if (readBtn) readBtn.style.display = 'none';
    
    try {
      const dataUrl = await htmlToImage.toPng(document.body, { 
        backgroundColor: '#fdfbf7',
        pixelRatio: 2,
        // No filter needed since we are not ignoring the UI overlay anymore,
        // and using a local logo image completely avoids the CORS [object Event] error!
      });
      const link = document.createElement('a');
      link.download = `${data.topic}_UPSC_Mindmap.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Error generating PNG: " + err);
    } finally {
      if (controls) controls.style.display = 'flex';
      if (readBtn) readBtn.style.display = 'flex';
      setScale(originalScale);
      setPosition(originalPos);
    }
  };

  const renderBranch = (branch, parentId, level) => {
    const branchId = `${parentId}-${branch.title}`;
    const isExpanded = !!expandedNodes[branchId];
    const hasChildren = branch.children && branch.children.length > 0;

    return (
      <li key={branchId}>
        <div 
          className="node" 
          style={{ '--node-color': branch.color || 'var(--primary)', cursor: hasChildren ? 'pointer' : 'default' }}
          onClick={(e) => hasChildren && toggleNode(branchId, e)}
        >
          <h3>{branch.title}</h3>
          
          {branch.facts && branch.facts.map((fact, k) => {
            const factKey = `${branchId}-${k}`;
            const isBlurred = isTestMode && !revealedFacts[factKey];
            return (
              <p 
                key={k} 
                onClick={(e) => isBlurred ? toggleFact(branchId, k, e) : null}
                className={isBlurred ? 'flashcard-blur' : ''}
                title={isBlurred ? "Click to reveal fact" : ""}
              >
                {fact}
              </p>
            );
          })}

          {hasChildren && !isExpanded && (
            <div style={{ marginTop: 8, fontSize: 13, color: '#f59e0b', fontWeight: 'bold' }}>
              <span className="animated-hand">👆</span> Click to Expand
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <ul>
            {branch.children.map(child => renderBranch({ ...child, color: branch.color }, branchId, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 65px)', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
      {/* UI OVERLAY */}
      <div id="ui-overlay" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
        <div className="glass" style={{ position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)', padding: '10px 20px', borderRadius: 8, textAlign: 'center' }}>
          <h1 style={{ fontSize: 20, fontWeight: 700 }}>{data.topic}</h1>
          <p style={{ fontSize: 12, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: 1 }}>{data.subject}</p>
        </div>

        <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 10, pointerEvents: 'auto' }}>
          <button 
            onClick={() => setIsTestMode(!isTestMode)}
            style={{ 
              background: isTestMode ? '#8b5cf6' : 'white', 
              color: isTestMode ? 'white' : '#64748b', 
              padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 'bold', 
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
            }}
          >
            <BrainCircuit size={16} /> 
            {isTestMode ? 'Test Mode: ON' : 'Test Mode: OFF'}
          </button>
          
          <div style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            UPSC PREPLAB
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <span style={{ fontSize: 14, color: 'var(--text-light)', fontWeight: 500 }}>testbook.com/upsc-prep-lab-coaching</span>
        </div>

        <div id="controls-overlay" className="glass" style={{ position: 'absolute', bottom: 20, right: 20, padding: '10px 15px', borderRadius: 8, display: 'flex', gap: 10, pointerEvents: 'auto' }}>
          <button onClick={toggleMastery} style={{ background: isMastered ? '#10b981' : '#f1f5f9', color: isMastered ? 'white' : '#475569', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}>
            <CheckCircle2 size={16} /> {isMastered ? 'Mastered' : 'Mark Mastered'}
          </button>
          <div style={{ width: 1, background: '#cbd5e1', margin: '0 5px' }}></div>
          <button onClick={() => alert('Mindmap link copied to clipboard!')} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Share2 size={16} /> Share
          </button>
          <button onClick={() => alert('Mindmap saved to your bookmarks!')} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Bookmark size={16} /> Save
          </button>
          <button onClick={resetZoom} style={{ background: '#f1f5f9', color: '#475569', border: 'none', padding: '8px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
            Reset View
          </button>
          <button onClick={downloadPNG} style={{ background: '#22c55e', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600 }}>
            Download PNG
          </button>
        </div>

        <a
          id="read-article-btn"
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white', padding: '12px 24px', borderRadius: 30,
            fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 8,
            boxShadow: '0 10px 15px rgba(0,0,0,0.2)', pointerEvents: 'auto'
          }}
        >
          Read Article Transaction
          <svg className="bounce-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>

      {/* VIEWPORT */}
      <div 
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{ width: '100%', height: '100%', cursor: isPanning ? 'grabbing' : 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div 
          className="tree"
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`, transformOrigin: 'center', transition: isPanning ? 'none' : 'transform 0.1s' }}
        >
          <ul>
            <li>
              <div 
                className="node root-node" 
                style={{ cursor: 'pointer', padding: 0, overflow: 'hidden' }}
                onClick={(e) => toggleNode('root', e)}
              >
                {data.imageUrl && (
                  <div style={{ height: 140, width: '100%', borderBottom: '3px solid #cbd5e1' }}>
                    <img src={data.imageUrl} alt={data.topic} style={{ width: '100%', height: '100%', objectFit: 'cover' }} crossOrigin="anonymous" />
                  </div>
                )}
                <div style={{ padding: '16px 24px' }}>
                  <h2>{data.root}</h2>
                  {!expandedNodes['root'] && (
                    <div style={{ marginTop: 8, fontSize: 13, color: '#3b82f6', fontWeight: 'bold' }}>
                      <span className="animated-hand">👆</span> Click to Start Flowchart
                    </div>
                  )}
                </div>
              </div>
              
              {expandedNodes['root'] && (
                <ul>
                  {data.branches.map(branch => renderBranch(branch, 'root', 1))}
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
