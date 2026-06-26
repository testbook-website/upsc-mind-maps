import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const FACULTIES = [
  { name: "Ravi Sir", subject: "Economy & GS", img: "https://ui-avatars.com/api/?name=Ravi+Sir&background=3b82f6&color=fff&size=150" },
  { name: "Sriram Sir", subject: "Polity & Governance", img: "https://ui-avatars.com/api/?name=Sriram+Sir&background=10b981&color=fff&size=150" },
  { name: "Anirudh Sir", subject: "Geography", img: "https://ui-avatars.com/api/?name=Anirudh+Sir&background=8b5cf6&color=fff&size=150" },
  { name: "Dr. Shivin", subject: "Science & Tech", img: "https://ui-avatars.com/api/?name=Dr+Shivin&background=f59e0b&color=fff&size=150" },
  { name: "Sonpriya Ma'am", subject: "History", img: "https://ui-avatars.com/api/?name=Sonpriya+Ma'am&background=ec4899&color=fff&size=150" }
];

export default function Gallery({ mindmaps, activeSubject, searchTerm, masteredMindmaps }) {
  const [showRewardModal, setShowRewardModal] = useState(false);
  const masteryPercentage = Math.round((masteredMindmaps.length / mindmaps.length) * 100) || 0;

  useEffect(() => {
    if (sessionStorage.getItem('upsc_reward_shown')) return;
    const timer = setTimeout(() => {
      setShowRewardModal(true);
      sessionStorage.setItem('upsc_reward_shown', 'true');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const filtered = mindmaps.filter(m => {
    const matchesSubject = activeSubject === 'All' || m.subject === activeSubject;
    const matchesSearch = m.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div style={{ paddingBottom: 60, position: 'relative' }}>
      
      {/* GAMIFIED REWARD MODAL */}
      {showRewardModal && (
        <div className="modal-overlay" onClick={() => setShowRewardModal(false)}>
          <div className="gamified-modal" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setShowRewardModal(false)}
              style={{ position: 'absolute', top: 15, right: 15, background: 'rgba(255,255,255,0.2)', border: 'none', fontSize: 24, cursor: 'pointer', color: 'white', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              &times;
            </button>
            
            <div className="modal-header-bg">
              <div className="glowing-chest">🎁</div>
              <h2 style={{ fontSize: 28, color: '#fff', marginBottom: 5, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Daily Unlock!</h2>
              <p style={{ color: '#e2e8f0', fontSize: 15 }}>Claim your exclusive UPSC prep resources</p>
            </div>
            
            <div style={{ padding: 25, display: 'flex', flexDirection: 'column', gap: 15 }}>
              
              <a href="https://testbook.com/pdf-viewer?u=https://blogmedia.testbook.com/blog/wp-content/uploads/2023/02/agriculture-notes-for-upsc-6303a205.pdf" target="_blank" rel="noopener noreferrer" className="reward-ticket green-ticket">
                <div className="ticket-content">
                  <div className="ticket-day">DAY 2 REWARD</div>
                  <h3 className="ticket-title">Agriculture Notes</h3>
                  <p className="ticket-desc">High-yield PDF for Prelims</p>
                </div>
                <div className="ticket-action">
                  <span>Claim Now</span>
                  <div className="pulse-circle"></div>
                </div>
              </a>

              <a href="https://testbook.com/login?redirect_url=https%3A%2F%2Ftestbook.com%2Fias-preparation%2Fmodern-history-books-for-upsc&referrer=customChildPage-modern-history-books-for-upsc&referrerType=CustomChildPage&referrerPagePath=undefined" target="_blank" rel="noopener noreferrer" className="reward-ticket blue-ticket">
                <div className="ticket-content">
                  <div className="ticket-day">DAY 5 REWARD</div>
                  <h3 className="ticket-title">Modern History Books</h3>
                  <p className="ticket-desc">Exclusive Booklist</p>
                </div>
                <div className="ticket-action">
                  <span>Unlock</span>
                  <div className="pulse-circle"></div>
                </div>
              </a>

              <p style={{ textAlign: 'center', color: '#64748b', fontSize: 13, marginTop: 10 }}>
                Keep visiting daily to unlock more premium resources! 🚂✨
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section style={{ 
        padding: '60px 20px', 
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', color: '#1e293b', fontWeight: 800, marginBottom: 15 }}>
          Master UPSC with <span style={{ color: '#3b82f6' }}>Interactive Mindmaps</span>
        </h1>
        <p style={{ fontSize: 18, color: '#64748b', maxWidth: 600, margin: '0 auto 30px' }}>
          Visualize complex topics, download high-res revision charts, and accelerate your preparation with Testbook's expert-curated flowcharts.
        </p>

        {/* MASTERY PROGRESS BAR */}
        <div style={{ maxWidth: 500, margin: '0 auto', background: '#fff', padding: 20, borderRadius: 16, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>UPSC Mastery Progress</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>{masteredMindmaps.length}/{mindmaps.length} ({masteryPercentage}%)</span>
          </div>
          <div style={{ width: '100%', height: 10, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ width: `${masteryPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #34d399 0%, #10b981 100%)', borderRadius: 10, transition: 'width 1s ease-out' }}></div>
          </div>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 10, margin: '10px 0 0' }}>Keep reviewing and marking topics as Mastered to hit 100%!</p>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="gallery-container" style={{ marginTop: 10 }}>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 50, color: '#94a3b8' }}>
            <h3>No mindmaps found.</h3>
          </div>
        ) : (
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            initialSlide={1}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper"
            style={{ paddingBottom: 60 }}
          >
            {filtered.map(m => (
              <SwiperSlide key={m.id} style={{ width: 320, padding: '20px 0' }}>
                <MindmapCard data={m} isMastered={masteredMindmaps.includes(m.id)} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* FACULTY PROMO CAROUSEL */}
      <section style={{ maxWidth: 1200, margin: '40px auto', padding: '0 20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderRadius: 24, padding: '40px 20px', color: 'white', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          
          <div style={{ position: 'relative', zIndex: 10 }}>
            <span style={{ background: '#f59e0b', color: '#fff', padding: '6px 16px', borderRadius: 20, fontSize: 14, fontWeight: 'bold', display: 'inline-block', marginBottom: 15 }}>
              LIMITED TIME OFFER
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 10 }}>UPSC Coaching @ <span style={{ color: '#fcd34d' }}>₹1 / Day</span></h2>
            <p style={{ fontSize: 16, color: '#cbd5e1', marginBottom: 30, maxWidth: 500, margin: '0 auto 30px' }}>
              Learn from India's Top Super Teachers. Get access to Live Classes, Mock Tests, and Study Notes.
            </p>

            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Autoplay]}
              style={{ maxWidth: 900, margin: '0 auto 30px' }}
            >
              {FACULTIES.map((faculty, idx) => (
                <SwiperSlide key={idx}>
                  <div style={{ background: 'rgba(255,255,255,0.1)', padding: 15, borderRadius: 16, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <img src={faculty.img} alt={faculty.name} style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 10, border: '3px solid #3b82f6' }} />
                    <h4 style={{ margin: '0 0 5px', fontSize: 16 }}>{faculty.name}</h4>
                    <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>{faculty.subject}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <a href="https://testbook.com/upsc-prep-lab-coaching/super-teachers" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: '#3b82f6', color: 'white', padding: '14px 32px', borderRadius: 30, fontSize: 18, fontWeight: 'bold', textDecoration: 'none', transition: 'transform 0.2s', boxShadow: '0 10px 15px rgba(59,130,246,0.4)' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              Join Super Teachers Now &rarr;
            </a>
          </div>

          <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: '#3b82f6', filter: 'blur(100px)', opacity: 0.5, borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: -50, left: -50, width: 200, height: 200, background: '#8b5cf6', filter: 'blur(100px)', opacity: 0.5, borderRadius: '50%' }}></div>
        </div>
      </section>
    </div>
  );
}

function MindmapCard({ data, isMastered }) {
  return (
    <Link to={`/mindmap/${data.id}`} style={{ display: 'block', textDecoration: 'none' }}>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} className="glass" style={{
        borderRadius: 20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        {data.imageUrl && (
          <div style={{ height: 160, width: '100%', overflow: 'hidden', position: 'relative' }}>
            <img src={data.imageUrl} alt={data.topic} className="zoom-img" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
            {isMastered && (
              <div style={{ position: 'absolute', top: 10, right: 10, background: '#10b981', color: 'white', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 'bold', boxShadow: '0 4px 6px rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', gap: 4 }}>
                ✓ Mastered
              </div>
            )}
          </div>
        )}
        <div style={{ padding: 30, display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
              <span style={{ 
                background: '#eff6ff', color: '#2563eb', 
                padding: '6px 12px', borderRadius: 20, 
                fontSize: 12, fontWeight: 700, display: 'inline-block',
                border: '1px solid #bfdbfe'
              }}>
                {data.subject}
              </span>
              {!data.imageUrl && isMastered && (
                <span style={{ color: '#10b981', fontWeight: 'bold', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                  ✓ Mastered
                </span>
              )}
            </div>
            <h3 style={{ fontSize: 22, color: '#0f172a', marginBottom: 10, lineHeight: 1.3, fontWeight: 800 }}>{data.topic}</h3>
            <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5 }}>Interactive flowchart with {data.branches.length} main branches and detailed facts.</p>
          </div>
          
          <div style={{ marginTop: 20, color: '#3b82f6', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
            Explore Flowchart &rarr;
          </div>
        </div>
      </Tilt>
    </Link>
  );
}
