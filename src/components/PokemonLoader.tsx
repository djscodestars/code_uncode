"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PokemonLoader.module.css';

interface PokemonLoaderProps {
  onSelect: (type: "fire" | "water" | "grass") => void;
  initialStage?: 'intro' | 'selection';
}

export default function PokemonLoader({ onSelect, initialStage = 'intro' }: PokemonLoaderProps) {
  const [stage, setStage] = useState<'intro' | 'selection'>(initialStage);
  const [currentMessageIdx, setCurrentMessageIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const messages = [
    "Hello, there ! My name is Professor Oak\nWelcome to Code Uncode 2026!!!",
    "Before we begin, please choose a companion to set your journey's theme."
  ];

  const currentMessage = messages[currentMessageIdx] ?? '';

  useEffect(() => {
    if (stage !== 'intro') return;
    setDisplayedText('');
    setIsTypingComplete(false);
  }, [currentMessageIdx, stage]);

  // Typewriter effect
  useEffect(() => {
    if (stage !== 'intro' || !currentMessage) return;

    if (displayedText.length < currentMessage.length) {
      const timer = setTimeout(() => {
        const nextLength = displayedText.length + 1;
        setDisplayedText(currentMessage.slice(0, nextLength));
      }, 50);

      return () => clearTimeout(timer);
    }

    setIsTypingComplete(true);
  }, [stage, currentMessage, displayedText]);

  // Auto-advance to next message
  useEffect(() => {
    if (!isTypingComplete || stage !== 'intro') return;

    const timer = setTimeout(() => {
      if (currentMessageIdx < messages.length - 1) {
        setCurrentMessageIdx(prev => prev + 1);
      } else {
        // Move to stage 2 after last message
        setStage('selection');
      }
    }, 2000); // 2 second delay

    return () => clearTimeout(timer);
  }, [isTypingComplete, currentMessageIdx, stage]);

  const handleStarterSelect = (type: "fire" | "water" | "grass") => {
    // Trigger fade out animation then call parent handler
    setTimeout(() => {
      onSelect(type);
    }, 300);
  };

  return (
    <div className={styles.loaderContainer}>
      <AnimatePresence mode="wait">
        {stage === 'intro' ? (
          <motion.div
            key="intro"
            className={styles.introStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background */}
            <div className={styles.introBackground}>
              <img src="/loader/background.png" alt="Intro Background" className={styles.bgImage} />
            </div>

            {/* Pokedex-style container */}
            <div className={styles.pokedexContainer}>
              {/* Red top border accent */}
              <div className={styles.pokedexTop} />

              {/* Professor Oak and Platform */}
              <div className={styles.professorSection}>
                <img src="/loader/professoroak.png" alt="Professor Oak" className={styles.professorOak} />
                <div className={styles.platform}>
                  <img src="/loader/standing.png" alt="Platform" className={styles.standing} />
                </div>
              </div>

              {/* Text Box - Glass Morphism */}
              <motion.div
                className={styles.textBox}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className={styles.textContent}>
                  <p className={styles.message}>{displayedText}</p>
                  {!isTypingComplete && <span className={styles.cursor}>▮</span>}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="selection"
            className={styles.selectionStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background */}
            <div className={styles.selectionBackground} />

            <motion.div
              className={styles.selectionPanel}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
            >
              <div className={styles.selectionLayout}>
                <div className={styles.cardsContainer}>
                  <motion.button
                    className={`${styles.starterCard} ${styles.fireCard}`}
                    onClick={() => handleStarterSelect('fire')}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.25 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.cardBackground}>
                      <img src="/loading/red.png" alt="Fire Background" />
                    </div>
                    <div className={styles.pokemonImage}>
                      <img src="/loader/redpokemon.png" alt="Charmander" />
                    </div>
                  </motion.button>

                  <motion.button
                    className={`${styles.starterCard} ${styles.waterCard}`}
                    onClick={() => handleStarterSelect('water')}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.32 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.cardBackground}>
                      <img src="/loading/blue.jpg" alt="Water Background" />
                    </div>
                    <div className={styles.pokemonImage}>
                      <img src="/loader/bluepokemon.png" alt="Squirtle" />
                    </div>
                  </motion.button>

                  <motion.button
                    className={`${styles.starterCard} ${styles.grassCard}`}
                    onClick={() => handleStarterSelect('grass')}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45, delay: 0.39 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.cardBackground}>
                      <img src="/loading/green.png" alt="Grass Background" />
                    </div>
                    <div className={styles.pokemonImage}>
                      <img src="/loader/greenpokemon.png" alt="Bulbasaur" />
                    </div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
