"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Timeline.module.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  position: 'left' | 'right';
}

interface TimelineProps {
  type?: 'fire' | 'water' | 'grass';
}

const Timeline: React.FC<TimelineProps> = ({ type = 'fire' }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressLineRef = useRef<SVGPathElement>(null);
  const ashRef = useRef<SVGImageElement>(null);

  // Theme colors
  const getThemeColors = () => {
    switch (type) {
      case 'water':
        return { hex: '#3b82f6', rgb: '59, 130, 246' };
      case 'grass':
        return { hex: '#22c55e', rgb: '34, 197, 94' };
      case 'fire':
      default:
        return { hex: '#ff4444', rgb: '255, 68, 68' };
    }
  };

  const { hex: themeColor, rgb: themeRgb } = getThemeColors();

  // Timeline events data
  const events: TimelineEvent[] = [
    {
      id: 1,
      date: '15th February (Saturday)',
      title: 'REGISTRATION BEGINS',
      description: 'Start of Registrations for Code Uncode 2026 on Unstop',
      position: 'right'
    },
    {
      id: 2,
      date: '16th February (Sunday)',
      title: 'PRELIMS',
      description: 'Online | 5:05 PM - 7:05 PM. The first hurdle in your journey to become a champion.',
      position: 'left'
    },
    {
      id: 3,
      date: '18th February (Tuesday)',
      title: 'REGIONALS SHORTLISTING',
      description: 'Calls for Regionals will be announced based on rank and preference across colleges',
      position: 'right'
    },
    {
      id: 4,
      date: '19th February (Wednesday)',
      title: 'REGIONAL - COEP',
      description: 'First Regional Round at COEP.',
      position: 'left'
    },
    {
      id: 5,
      date: '20th February (Thursday)',
      title: 'REGIONAL - SPIT',
      description: 'Second Regional Round at Sardar Patel Institute of Technology.',
      position: 'right'
    },
    {
      id: 6,
      date: '21th February (Friday)',
      title: 'REGIONAL - DJ Sanghvi',
      description: 'Third Regional Round at Dwarkadas J. Sanghvi College of Engineering.',
      position: 'left'
    },
    {
      id: 7,
      date: '22th February (Saturday)',
      title: 'Shortlisting for the Finals',
      description: 'Top 30 participants from regionals compete.',
      position: 'right'
    },
    {
      id: 8,
      date: '23rd February (Sunday)',
      title: 'FINALS',
      description: 'The Ultimate Showdown at Dwarkadas J. Sanghvi College of Engineering. Top 30 participants from regionals compete.',
      position: 'left'
    }
  ];

  useLayoutEffect(() => {
    if (!timelineRef.current || !progressLineRef.current || !pathRef.current) return;

    const ctx = gsap.context(() => {
      // Get the total length of the path
      const pathLength = pathRef.current!.getTotalLength();

      // Set initial state of progress line
      gsap.set(progressLineRef.current, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      // Animate the progress line based on scroll
      gsap.to(progressLineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Move the Ash image along the path
            if (ashRef.current && pathRef.current) {
              const point = pathRef.current.getPointAtLength(pathLength * progress);
              gsap.set(ashRef.current, {
                x: point.x - 80, // center relative to width="160"
                y: point.y - 80,
              });
            }
          }
        }
      });

      // Animate event cards on scroll
      const isMobile = window.innerWidth <= 768;
      events.forEach((event, index) => {
        const card = document.querySelector(`[data-event-id="${event.id}"]`);
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isMobile ? 30 : (event.position === 'left' ? -100 : 100),
              scale: 0.8
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 1,
              }
            }
          );
        }
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className={styles.timelineSection}
      ref={timelineRef}
      style={{
        '--theme-color': themeColor,
        '--theme-rgb': themeRgb
      } as React.CSSProperties}
    >
      <div className={styles.timelineContainer}>
        <h2 className={styles.sectionTitle}>THE JOURNEY</h2>
        <p className={styles.sectionSubtitle}>7 Days • 7 Challenges • 1 Ultimate Goal</p>

        <div className={styles.timelineWrapper}>
          {/* SVG Path */}
          <svg className={styles.timelineSvg} viewBox="0 0 100 2000" preserveAspectRatio="xMidYMid meet">
            <defs>
              {/* Glow filter for the path */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Animated glow for progress line */}
              <filter id="progressGlow">
                <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base curved path */}
            <path
              ref={pathRef}
              d="M 50 0 
                 Q -100 250, 50 500
                 Q 200 750, 50 1000
                 Q -100 1250, 50 1500
                 Q 200 1750, 50 2000"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="8"
              filter="url(#glow)"
            />

            {/* Animated progress line */}
            <path
              ref={progressLineRef}
              d="M 50 0 
                 Q -100 250, 50 500
                 Q 200 750, 50 1000
                 Q -100 1250, 50 1500
                 Q 200 1750, 50 2000"
              fill="none"
              stroke="var(--theme-color)"
              strokeWidth="6"
              filter="url(#progressGlow)"
              className={styles.progressLine}
            />

            {/* Ash moving image */}
            <image
              ref={ashRef}
              href={type === 'water' ? '/timeline/ash_on_whale.png' : '/timeline/ash.png'}
              width="160"
              height="160"
              style={{ filter: 'drop-shadow(0px 0px 5px rgba(255,255,255,0.5))' }}
            />
          </svg>

          {/* Timeline Events */}
          <div className={styles.eventsContainer}>
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`${styles.eventRow} ${styles[event.position]}`}
                style={{ top: `${(index + 0.5) * (100 / events.length)}%` }}
              >
                {/* Event Card */}
                <div
                  className={styles.eventCard}
                  data-event-id={event.id}
                >
                  <div className={styles.cardDate}>{event.date}</div>
                  <h3 className={styles.cardTitle}>{event.title}</h3>
                  <p className={styles.cardDescription}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
