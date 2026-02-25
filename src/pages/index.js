"use client";

import { useState, useEffect } from 'react';
import Parallax from '@/components/Parallax.tsx';
import PokemonLoader from '@/components/PokemonLoader.tsx';
import AboutPokedex from '@/components/AboutPokedex.tsx';
import AboutCodeUncode from '@/components/AboutCodeUncode.tsx';
import Timeline from '@/components/Timeline.tsx';
import PrizesSection from '@/components/PrizesSection.tsx';
import LiveRegi from '@/components/LiveRegi.tsx';
import ProfessorOakIntro from '@/components/ProfessorOakIntro.tsx';
import MusicPlayer from '@/components/MusicPlayer.tsx';
import Footer from '@/components/Footer.tsx';

function Home() {
  const [showIntro, setShowIntro] = useState(true); // Force intro to always show initially
  const [selectedType, setSelectedType] = useState(null);

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

  return (
    <>
      {!selectedType && <PokemonLoader onSelect={handleTypeSelect} />}
      {selectedType && (
        <>
          <MusicPlayer type={selectedType} onReset={() => setSelectedType(null)} />
          <Parallax type={selectedType} />
          {/* Continuous overlay wrapper for all sections after hero */}
          <div style={{ position: 'relative', marginTop: '-1px' }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 15vh, rgba(0, 0, 0, 0.6) 30vh, rgba(0, 0, 0, 0.6) 100%)',
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

              <div style={{ marginTop: '80px' }}>
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