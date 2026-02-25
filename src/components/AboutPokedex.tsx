import React, { useState } from 'react';
import styles from './AboutPokedex.module.css';

interface AboutPokedexProps {
  type?: 'fire' | 'water' | 'grass';
}

const faqs = [
  {
    question: "Q1 : Is AI Allowed?",
    answer:
      "No, use of AI tools (e.g., ChatGPT, Copilot, Gemini) is strictly prohibited during all rounds of Code UnCode. Any participant found using AI assistance will be disqualified immediately.",
  },
  {
    question: "Q2 : What programming languages are allowed?",
    answer:
      "Participants may use C, C++, Java, or Python. All submissions must be made through the official judge platform. No other languages are permitted.",
  },
  {
    question: "Q3 : Is it a team or individual event?",
    answer:
      "Code UnCode is a solo event. Each participant competes individually. Team entries are not accepted.",
  },
  {
    question: "Q4 : Who is eligible to participate?",
    answer:
      "The event is open to all currently enrolled college students (UG & PG). School students are not eligible. A valid college ID is required for registration.",
  },
  {
    question: "Q5 : How many regionals can I register for?",
    answer:
      "Each participant can register for a maximum of 2 Regional rounds. Regionals will be held offline at Somaiya, SPIT, and DJ Sanghvi from 19th-21st Feb.",
  },
  {
    question: "Q6 : What are the rounds?",
    answer:
      "Round 1 — Prelims (Online, 16th Feb). Round 2 — Regionals (Offline, 19-21 Feb at Somaiya, SPIT, DJ Sanghvi). Round 3 — Finals (23rd Feb at DJ Sanghvi, Mumbai).",
  },
  {
    question: "Q7 : Is there a registration fee?",
    answer:
      "Registration for the Prelims is free. A nominal fee may apply for Regional and Final rounds. Check the official website for updated fee details.",
  },
  {
    question: "Q8 : What topics will the problems cover?",
    answer:
      "Problems will span Data Structures, Algorithms, Dynamic Programming, Graph Theory, and Mathematical reasoning — ICPC-style competitive programming topics.",
  },
  {
    question: "Q9 : Will there be prizes?",
    answer:
      "Yes! The Finals feature exciting cash prizes and goodies for the top 3 performers, along with certificates for all regional finalists.",
  },
  {
    question: "Q10 : Where can I find updates and results?",
    answer:
      "All updates, results, and announcements will be posted on the official Code UnCode website and our Instagram page. Stay tuned!",
  },
];

const guidelines = [
  "► No mobile phones or external devices during rounds.",
  "► Participants must carry a valid college ID at all times.",
  "► Plagiarism or code sharing results in immediate disqualification.",
  "► All submissions must compile and run without errors.",
  "► Internet access is restricted to the official judge platform only.",
  "► Late submissions after the timer ends will NOT be evaluated.",
  "► Participants must be seated 10 min before the round begins.",
  "► Contact the coordinator immediately for any technical issues.",
  "► Decision of the judges is final and binding in all cases.",
  "► Respect all participants, volunteers, and coordinators.",
];

const funFacts = [
  "🔥 Charizard is NOT a Dragon-type Pokémon!",
  "💧 Vaporeon has 130 Base HP — highest of all Eevee evolutions.",
  "🌿 Bulbasaur is the only starter that is Grass/Poison dual type.",
  "⚡ Pikachu was not the first choice as Pokémon mascot — Clefairy was!",
  "🏆 There are 1025 Pokémon as of Generation IX.",
];

const titleColors: Record<string, string> = {
  fire: '#ffcc00',
  water: '#00ffff',
  grass: '#76ff03',
};

type ScreenMode = null | { type: 'faq'; index: number } | { type: 'guidelines' } | { type: 'fact'; text: string };

const Pokedex: React.FC<AboutPokedexProps> = ({ type = 'fire' }) => {
  const titleColor = titleColors[type] ?? '#ffcc00';

  const stats = [
    { label: 'EVENT TYPE', value: 'SOLO' },
    { label: 'ROUNDS', value: '3' },
    { label: 'FINALS', value: 'MUMBAI' },
  ];

  const [screenMode, setScreenMode] = useState<ScreenMode>(null);
  const [isBlue, setIsBlue] = useState(false);
  const [brightness, setBrightness] = useState(1); // 1 = normal, 0.5 = dim, 1.5 = bright

  // Derive activeIndex for FAQ highlighting compatibility
  const activeIndex = screenMode?.type === 'faq' ? screenMode.index : null;

  const handleButtonClick = (index: number) => {
    setScreenMode(prev =>
      prev?.type === 'faq' && prev.index === index ? null : { type: 'faq', index }
    );
  };

  const handleRedPill = () => {
    setScreenMode(null);
    setIsBlue(false);
  };

  const handleBluePill = () => {
    setIsBlue(prev => !prev);
  };

  const handleGuidelines = () => {
    setScreenMode(prev => prev?.type === 'guidelines' ? null : { type: 'guidelines' });
  };

  const handleBlackCircle = () => {
    setBrightness(prev => prev === 1 ? 0.55 : prev === 0.55 ? 1.45 : 1);
  };

  const handleYellowBtn = () => {
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setScreenMode({ type: 'fact', text: fact });
  };

  const handleDPadUp = () => {
    if (screenMode?.type === 'faq') {
      setScreenMode({ type: 'faq', index: Math.max(0, screenMode.index - 1) });
    } else {
      setScreenMode({ type: 'faq', index: 0 });
    }
  };

  const handleDPadDown = () => {
    if (screenMode?.type === 'faq') {
      setScreenMode({ type: 'faq', index: Math.min(faqs.length - 1, screenMode.index + 1) });
    } else {
      setScreenMode({ type: 'faq', index: 0 });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '10vh', marginBottom: '10vh' }}>
      <h2
        style={{
          color: titleColor,
          fontSize: 'clamp(1.5rem, 5vw, 4.5rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          textShadow: '4px 4px 0px #000000',
          marginBottom: '7vh',
          textAlign: 'center',
          transition: 'color 0.4s ease',
          padding: '0 1rem',
          wordBreak: 'break-word',
          lineHeight: 1.3,
        }}
      >
        GUIDELINES/FAQs
      </h2>

      <section className={styles.pokedexWrapper}>
        {/* LEFT PANEL */}
        <div
          className={`${styles.panel} ${styles.leftPanel}`}
          style={isBlue ? { background: '#5bc8e8', boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.3), 0 10px 25px rgba(91,200,232,0.4)' } : {}}
        >
          <div className={styles.topLights}>
            <div className={styles.bigBlueLight}>
              <div className={styles.innerReflection} />
            </div>
            <div className={`${styles.smallLight} ${styles.red}`} />
            <div className={`${styles.smallLight} ${styles.yellow}`} />
            <div className={`${styles.smallLight} ${styles.green}`} />
          </div>

          {/* MAIN SCREEN (Left side) */}
          <div className={styles.screenBorder}>
            <div
              className={styles.screenGlass}
              style={{ filter: `brightness(${brightness})` }}
            >
              {screenMode === null ? (
                /* Dark teal gradient placeholder */
                <div style={{
                  width: '100%', height: '100%',
                  background: 'radial-gradient(ellipse at 40% 40%, #1a5c55 0%, #0d3d38 40%, #061e1c 100%)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}>
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Courier New', Courier, monospace", fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Select a question</span>
                </div>
              ) : screenMode.type === 'guidelines' ? (
                /* GUIDELINES mode */
                <div style={{
                  width: '100%', height: '100%', background: '#001a00',
                  padding: '14px', boxSizing: 'border-box', overflowY: 'auto',
                }}>
                  <p style={{ color: '#39ff14', fontFamily: "'Courier New', Courier, monospace", fontSize: '13px', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>== COMPETITION GUIDELINES ==</p>
                  {guidelines.map((g, i) => (
                    <p key={i} style={{ color: '#00ff41', fontFamily: "'Courier New', Courier, monospace", fontSize: '11.5px', lineHeight: '1.7', margin: '0 0 4px 0' }}>{g}</p>
                  ))}
                </div>
              ) : screenMode.type === 'fact' ? (
                /* FUN FACT mode */
                <div style={{
                  width: '100%', height: '100%', background: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '18px', boxSizing: 'border-box',
                }}>
                  <p style={{ color: '#ffe066', fontFamily: "'Courier New', Courier, monospace", fontSize: '14px', lineHeight: '1.7', textAlign: 'center', margin: 0 }}>{screenMode.text}</p>
                </div>
              ) : (
                /* FAQ ANSWER mode */
                <div style={{
                  width: '100%', height: '100%', background: '#000',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start',
                  padding: '14px', boxSizing: 'border-box', overflowY: 'auto',
                }}>
                  <p style={{ color: '#00ff41', fontFamily: "'Courier New', Courier, monospace", fontSize: '13px', lineHeight: '1.7', textAlign: 'left', margin: 0 }}>
                    <strong style={{ fontSize: '14px', display: 'block', marginBottom: '10px', color: '#7fff00' }}>
                      {faqs[screenMode.index].question}
                    </strong>
                    {faqs[screenMode.index].answer}
                  </p>
                </div>
              )}
            </div>
            <div className={styles.screenFooter}>
              <div className={styles.redButtonSmall} />
              <div className={styles.speakerGrill} />
            </div>
          </div>

          {/* CONTROLS ROW */}
          <div className={styles.controlsRow}>
            {/* Black circle: cycles screen brightness (dim / normal / bright) */}
            <div
              className={styles.blackCircleBtn}
              onClick={handleBlackCircle}
              title="Cycle brightness"
              style={{ cursor: 'pointer' }}
            />
            <div className={styles.pillBtns}>
              {/* RED pill: reset screen */}
              <div
                className={`${styles.pill} ${styles.red}`}
                onClick={handleRedPill}
                title="Reset screen"
                style={{ cursor: 'pointer' }}
              />
              {/* BLUE pill: toggle blue body */}
              <div
                className={`${styles.pill} ${styles.blue}`}
                onClick={handleBluePill}
                title="Toggle blue mode"
                style={{ cursor: 'pointer', boxShadow: isBlue ? '0 0 10px 3px #00bfff' : undefined }}
              />
            </div>
            {/* D-PAD: navigate FAQs up/down */}
            <div className={styles.dPadPlus} title="Navigate FAQs">
              <div className={styles.dPadH} />
              <div className={styles.dPadV} />
              {/* Hit zones for up/down */}
              <div
                onClick={handleDPadUp}
                style={{ position: 'absolute', top: 0, left: '33%', width: '34%', height: '33%', cursor: 'pointer', zIndex: 10 }}
              />
              <div
                onClick={handleDPadDown}
                style={{ position: 'absolute', bottom: 0, left: '33%', width: '34%', height: '33%', cursor: 'pointer', zIndex: 10 }}
              />
            </div>
          </div>

          {/* GREEN BAR — click to show guidelines ON main screen */}
          <div
            className={`${styles.greenScreenLeft} ${screenMode?.type === 'guidelines' ? styles.greenBarActive : ''}`}
            onClick={handleGuidelines}
            style={{ cursor: 'pointer' }}
          >
            <span className={styles.greenBarText}>📋 Guidelines</span>
            <span className={styles.greenBarHint}>{screenMode?.type === 'guidelines' ? '▼ showing' : 'tap to view ▶'}</span>
          </div>

          {/* mobile modal removed — guidelines now display on main screen */}
        </div>

        <div
          className={styles.hinge}
          style={isBlue ? { background: 'linear-gradient(to right, #2980b9 0%, #5bc8e8 50%, #2980b9 100%)' } : {}}
        />

        {/* RIGHT PANEL */}
        <div
          className={`${styles.panel} ${styles.rightPanel}`}
          style={isBlue ? { background: '#5bc8e8' } : {}}
        >
          {/* TOP BLACK/GREEN SCREEN */}
          <div className={styles.infoDisplay}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statLine}>
                <span className={styles.label}>{stat.label}:</span>
                <span className={styles.value}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* THE BLUE GRID BUTTONS — numbered 1–10 */}
          <div className={styles.blueGrid}>
            {faqs.map((_, i) => (
              <div
                key={i}
                className={`${styles.blueKey} ${activeIndex === i ? styles.blueKeyActive : ''}`}
                onClick={() => handleButtonClick(i)}
                style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    transition: 'background 0.15s',
                  }}
                >
                  {`Q${i + 1}`}
                </span>
              </div>
            ))}
          </div>

          {/* BOTTOM CONTROLS — yellow glow button on right = fun fact */}
          <div className={styles.bottomControlsRight}>
            <div className={styles.rightPanelBtns}>
              {/* Two grey pill buttons */}
              <div className={styles.greyPillGroup}>
                <div className={styles.greyPill} />
                <div className={styles.greyPill} />
              </div>
              {/* Yellow glowing button: show random Pokémon fun fact */}
              <div
                className={styles.yellowGlowBtn}
                onClick={handleYellowBtn}
                title="Pokémon Fun Fact!"
                style={{ cursor: 'pointer' }}
              />
            </div>

            {/* FAQ INDEX */}
            <div className={styles.descBox}>
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  onClick={() => handleButtonClick(i)}
                  className={styles.faqRow}
                  style={{
                    color: activeIndex === i ? '#7fff00' : '#00ff41',
                    fontWeight: activeIndex === i ? 'bold' : 'normal',
                  }}
                >
                  {faq.question}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pokedex;