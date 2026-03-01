"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PokemonLoader from '@/components/PokemonLoader.tsx';
import AboutPokedex from '@/components/AboutPokedex.tsx';
import AboutCodeUncode from '@/components/AboutCodeUncode.tsx';
import Timeline from '@/components/Timeline.tsx';
import PrizesSection from '@/components/PrizesSection.tsx';
import LiveRegi from '@/components/LiveRegi.tsx';

import MusicPlayer from '@/components/MusicPlayer.tsx';
import Footer from '@/components/Footer.tsx';
import MobileSponsorsMarquee from '@/components/MobileSponsorsMarquee.tsx';

const Parallax = dynamic(() => import('@/components/Parallax.tsx'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100dvh',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #06080f 0%, #0b1020 100%)',
      }}
    />
  ),
});

function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [selectedType, setSelectedType] = useState(null);
  const [skipToSelection, setSkipToSelection] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Background image mapping based on type
  const getBackgroundImage = () => {
    if (selectedType === 'fire') return '/parallax/parallax_fire/red-bg.png';
    if (selectedType === 'water') return '/parallax/parallax_water/water-bg.png';
    if (selectedType === 'grass') return '/parallax/parallax_grass/grassbg.png';
    return '';
  };

  const getMobileLandingImage = () => {
    if (selectedType === 'fire') return '/mobile_landing_red.png';
    if (selectedType === 'water') return '/mobile_landing_blue.png';
    return '/mobile_landing_red.png';
  };

  // Apply global background to body
  useEffect(() => {
    if (selectedType) {
      document.body.style.backgroundImage = `url(${getBackgroundImage()})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundRepeat = 'no-repeat';
    }

    return () => {
      document.body.style.backgroundImage = '';
    };
  }, [selectedType]);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <>
      {!selectedType && <PokemonLoader onSelect={(type) => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        setSelectedType(type);
        setSkipToSelection(false);
      }} initialStage={skipToSelection ? 'selection' : 'intro'} />}
      {selectedType && (
        <>
          {/* Sticky Back to Starter Selection Button */}
          <button
            onClick={() => { setSkipToSelection(true); setSelectedType(null); }}
            style={{
              position: 'fixed',
              top: '18px',
              right: '20px',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              background: 'rgba(15, 15, 25, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: `1.5px solid ${selectedType === 'fire' ? 'rgba(255, 100, 50, 0.6)' :
                selectedType === 'water' ? 'rgba(60, 160, 255, 0.6)' :
                  'rgba(80, 200, 100, 0.6)'
                }`,
              borderRadius: '50px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'Inter, Outfit, sans-serif',
              letterSpacing: '0.4px',
              cursor: 'pointer',
              boxShadow: `0 4px 20px rgba(0,0,0,0.35), 0 0 12px ${selectedType === 'fire' ? 'rgba(255, 100, 50, 0.2)' :
                selectedType === 'water' ? 'rgba(60, 160, 255, 0.2)' :
                  'rgba(80, 200, 100, 0.2)'
                }`,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(30, 30, 45, 0.92)';
              e.currentTarget.style.transform = 'scale(1.04)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(15, 15, 25, 0.75)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span style={{ fontSize: '15px' }}>←</span>
            <span>Starter Selection</span>
          </button>

          <MusicPlayer type={selectedType} onReset={() => setSelectedType(null)} />
          {isMobile ? (
            <>
              <div style={{ width: '100%', lineHeight: 0, overflow: 'hidden' }}>
                <img
                  src={getMobileLandingImage()}
                  alt={`Code UnCode ${selectedType} mobile landing`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
              <MobileSponsorsMarquee type={selectedType} />
            </>
          ) : (
            <Parallax type={selectedType} />
          )}
          {/* Continuous overlay wrapper for all sections after hero */}
          <div style={{ position: 'relative', marginTop: '-1px' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: isMobile
                  ? 'linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.45) 20vh, rgba(0, 0, 0, 0.65) 100%)'
                  : 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 15vh, rgba(0, 0, 0, 0.6) 30vh, rgba(0, 0, 0, 0.6) 100%)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <AboutCodeUncode type={selectedType} />
              <Timeline type={selectedType} />
              <AboutPokedex type={selectedType} />
              <PrizesSection type={selectedType} />
              <LiveRegi type={selectedType} />

              <div style={{ marginTop: '160px' }}>
                <Footer type={selectedType} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Home;