import React, { useState } from 'react';

export default function PasswordScreen({ onAuthenticate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '7730') {
      onAuthenticate();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
      setPassword('');
    }
  };

  return (
    <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fdfbf7', padding: 20 }}>
      <div className="glass" style={{ background: 'white', padding: '50px 40px', borderRadius: 24, boxShadow: '0 20px 40px rgba(0,0,0,0.08)', textAlign: 'center', maxWidth: 400, width: '100%', border: '1px solid #e2e8f0' }}>
        <img src="/logo.png" alt="Testbook" style={{ height: 40, marginBottom: 20 }} crossOrigin="anonymous" />
        <h2 style={{ fontSize: 24, color: '#1e293b', marginBottom: 10, fontWeight: 800 }}>UPSC Mindmaps Lab</h2>
        <p style={{ color: '#64748b', marginBottom: 30, fontSize: 15 }}>Please enter the access code to view the premium flowcharts.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              padding: '14px 20px', borderRadius: 12, border: `2px solid ${error ? '#ef4444' : '#cbd5e1'}`, 
              fontSize: 16, outline: 'none', background: '#f8fafc', transition: 'border-color 0.2s',
              textAlign: 'center', letterSpacing: 4
            }}
            autoFocus
          />
          {error && <p style={{ color: '#ef4444', fontSize: 13, margin: '-5px 0 0 0', fontWeight: 'bold' }}>Incorrect Password</p>}
          
          <button type="submit" style={{ background: '#3b82f6', color: 'white', padding: '14px', borderRadius: 12, border: 'none', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(59,130,246,0.3)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = '#2563eb'} onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}>
            Unlock Access
          </button>
        </form>
      </div>
    </div>
  );
}
