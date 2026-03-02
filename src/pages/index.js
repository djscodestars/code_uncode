import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import PokemonLoader from '@/components/PokemonLoader.tsx';

// Lazy-loaded: only imported once starter is selected (reduces initial bundle + memory)
const Parallax = dynamic(() => import('@/components/Parallax.tsx'), { ssr: false });
const AboutCodeUncode = dynamic(() => import('@/components/AboutCodeUncode.tsx'), { ssr: false });
const Timeline = dynamic(() => import('@/components/Timeline.tsx'), { ssr: false });
const AboutPokedex = dynamic(() => import('@/components/AboutPokedex.tsx'), { ssr: false });
const PrizesSection = dynamic(() => import('@/components/PrizesSection.tsx'), { ssr: false });
const SponsorsSection = dynamic(() => import('@/components/SponsorsSection.tsx'), { ssr: false });
const LiveRegi = dynamic(() => import('@/components/LiveRegi.tsx'), { ssr: false });
const MusicPlayer = dynamic(() => import('@/components/MusicPlayer.tsx'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer.tsx'), { ssr: false });
const MobileSponsorsMarquee = dynamic(() => import('@/components/MobileSponsorsMarquee.tsx'), { ssr: false });

// Read isMobile synchronously so first render is already correct — no flash
function getIsMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

function Home() {
  const [selectedType, setSelectedType] = useState(null);
  const [skipToSelection, setSkipToSelection] = useState(false);
  // Initialise from real window width immediately — no false→true flip on mount
  const [isMobile, setIsMobile] = useState(getIsMobile);

  // Background image mapping based on type
  const getBackgroundImage = useCallback(() => {
    if (selectedType === 'fire') return '/parallax/parallax_fire/red-bg.webp';
    if (selectedType === 'water') return '/parallax/parallax_water/water-bg.webp';
    if (selectedType === 'grass') return '/parallax/parallax_grass/grassbg.webp';
    return '';
  }, [selectedType]);

  const getMobileLandingImage = useCallback(() => {
    if (selectedType === 'fire') return '/mobile_landing_red.webp';
    if (selectedType === 'water') return '/mobile_landing_blue.webp';
    if (selectedType === 'grass') return '/mobile_landing_green.webp';
    return '/mobile_landing_red.webp';
  }, [selectedType]);

  // Apply global background to body
  useEffect(() => {
    if (selectedType) {
      document.body.style.backgroundImage = `url(${getBackgroundImage()})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundRepeat = 'no-repeat';
    }
    return () => { document.body.style.backgroundImage = ''; };
  }, [selectedType, getBackgroundImage]);

  // Use ResizeObserver for efficient resize detection (fires once per frame, not per pixel)
  useEffect(() => {
    let rafId;
    const ro = new ResizeObserver(() => {
      // Debounce via rAF — avoids thrashing during drag-resize
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setIsMobile(window.innerWidth < 768));
    });
    ro.observe(document.documentElement);
    return () => { ro.disconnect(); cancelAnimationFrame(rafId); };
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
              top: isMobile ? '2px' : '18px',
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

          {/* Sticky Register Button at Bottom */}
          <a
            href="https://unstop.com/p/code-uncode-2026-shri-vile-parle-kelavani-mandals-dwarkadas-j-sanghvi-college-of-engineering-djsce-mumbai-1651390"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'fixed',
              bottom: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              display: 'block',
              width: '60px',
              height: '60px',
              padding: '0',
              overflow: 'hidden',
              borderRadius: '60px',
              border: '3px solid white',
              textDecoration: 'none',
              boxShadow: `0 8px 32px ${selectedType === 'fire' ? 'rgba(255, 69, 0, 0.4)' :
                selectedType === 'water' ? 'rgba(0, 191, 255, 0.4)' :
                  'rgba(50, 205, 50, 0.4)'
                }`,
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.width = '160px';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1.08)';
              e.currentTarget.style.boxShadow = `0 12px 40px ${selectedType === 'fire' ? 'rgba(255, 69, 0, 0.6)' :
                selectedType === 'water' ? 'rgba(0, 191, 255, 0.6)' :
                  'rgba(50, 205, 50, 0.6)'
                }`;
              const unstopImg = e.currentTarget.querySelector('#unstop-img');
              if (unstopImg) unstopImg.style.opacity = '1';
              const unImg = e.currentTarget.querySelector('#un-img');
              if (unImg) unImg.style.opacity = '0';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.width = '60px';
              e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
              e.currentTarget.style.boxShadow = `0 8px 32px ${selectedType === 'fire' ? 'rgba(255, 69, 0, 0.4)' :
                selectedType === 'water' ? 'rgba(0, 191, 255, 0.4)' :
                  'rgba(50, 205, 50, 0.4)'
                }`;
              const unstopImg = e.currentTarget.querySelector('#unstop-img');
              if (unstopImg) unstopImg.style.opacity = '0';
              const unImg = e.currentTarget.querySelector('#un-img');
              if (unImg) unImg.style.opacity = '1';
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img id="unstop-img" src="/unstop.png" alt="Unstop" style={{ position: 'absolute', width: '160px', height: '100%', objectFit: 'cover', opacity: 0, transition: 'opacity 0.4s ease' }} />
              <img id="un-img" src="/un.png" alt="Un" style={{ position: 'absolute', width: '60px', height: '100%', objectFit: 'cover', opacity: 1, transition: 'opacity 0.4s ease' }} />
            </div>
          </a>

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
              <SponsorsSection type={selectedType} />
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