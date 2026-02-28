"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Timeline.module.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  position: 'left' | 'right';
  invisible?: boolean;
}

interface TimelineProps {
  type?: 'fire' | 'water' | 'grass';
}

const Timeline: React.FC<TimelineProps> = ({ type = 'fire' }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const progressLineRef = useRef<SVGPathElement>(null);
  const ashRef = useRef<SVGImageElement>(null);

  // Theme colors
  const getThemeColors = () => {
    switch (type) {
      case 'water':
        return { hex: '#1d4ed8', rgb: '29, 78, 216' }; // Darker blue
      case 'grass':
        return { hex: '#15803d', rgb: '21, 128, 61' }; // Darker green
      case 'fire':
      default:
        return { hex: '#b91c1c', rgb: '185, 28, 28' }; // Darker red
    }
  };

  const { hex: themeColor, rgb: themeRgb } = getThemeColors();

  // Timeline events data
  const events: TimelineEvent[] = [
    {
      id: 1,
      title: 'REGISTRATION BEGINS',
      description: 'Code Uncode 2026 Registration on Unstop',
      position: 'left'
    },
    {
      id: 2,
      title: 'PRELIMS',
      description: 'Online Round with all participants pan-India',
      position: 'right'
    },
    {
      id: 3,
      title: 'REGIONALS SHORTLISTING',
      description: 'Announcements across colleges',
      position: 'left'
    },
    {
      id: 4,
      title: 'REGIONAL - COEP',
      description: 'First Regional Round',
      position: 'right'
    },
    {
      id: 5,
      title: 'REGIONAL - SPIT',
      description: 'Second Regional Round',
      position: 'left'
    },
    {
      id: 6,
      title: 'REGIONAL - DJ Sanghvi',
      description: 'Third Regional Round',
      position: 'right'
    },
    {
      id: 7,
      title: 'Shortlisting for the Finals',
      description: 'Top 30 participants compete',
      position: 'left'
    },
    {
      id: 8,
      title: 'FINALS',
      description: 'The Ultimate Showdown at DJ Sanghvi',
      position: 'right'
    },
    {
      id: 9,
      title: '',
      description: '',
      position: 'left',
      invisible: true
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
          trigger: wrapperRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Move the Ash image along the path
            if (ashRef.current && pathRef.current) {
              const point = pathRef.current.getPointAtLength(pathLength * progress);
              gsap.set(ashRef.current, {
                x: point.x - 40, // center relative to width="80"
                y: point.y - 40,
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
                start: 'top 180%', // Starts much earlier when scrolling down
                end: 'top 80%',
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
      className={`${styles.timelineSection} ${type === 'grass' ? styles.grassBackground : ''} ${type === 'water' ? styles.waterBackground : ''} ${type === 'fire' ? styles.fireBackground : ''}`}
      ref={timelineRef}
      style={{
        '--theme-color': themeColor,
        '--theme-rgb': themeRgb
      } as React.CSSProperties}
    >
      <div className={styles.timelineContainer}>
        <h2 className={styles.sectionTitle}>THE JOURNEY</h2>
        <p className={styles.sectionSubtitle}>The Path to your Victory</p>

        <div className={styles.timelineWrapper} ref={wrapperRef}>
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
              width="110"
              height="110"
              style={{ filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.5))' }}
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
                <div className={`${styles.checkpoint} ${styles.active}`}></div>
                {/* Event Card */}
                <div
                  className={styles.eventCard}
                  data-event-id={event.id}
                  style={{ visibility: event.invisible ? 'hidden' : 'visible' }}
                >
                  <div className={styles.cardConnector}></div>
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
