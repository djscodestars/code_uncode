"use client";

import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Timeline.module.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  position: 'left' | 'right';
  date?: string;
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
      description: 'Code Uncode 2026 Registration begins on Unstop',
      position: 'left'
    },
    {
      id: 2,
      date: '20 March',
      title: 'PRELIMS',
      description: 'Online Round with all participants pan-India',
      position: 'right'
    },
    {
      id: 3,
      title: 'REGIONALS SHORTLISTING',
      description: 'Shortlisting for the Regionals based on Preferences and Ranks',
      position: 'left'
    },
    {
      id: 4,
      date: '28 March',
      title: 'REGIONAL - COEP',
      description: 'First Regional Round at COEP, Pune',
      position: 'right'
    },
    {
      id: 5,
      date: '30 March',
      title: 'REGIONAL - SPIT',
      description: 'Second Regional Round at SPIT, Andheri (Mumbai)',
      position: 'left'
    },
    {
      id: 6,
      date: '1 April',
      title: 'REGIONAL - DJ Sanghvi',
      description: 'Third Regional Round held at DJ Sanghvi, Mumbai',
      position: 'right'
    },
    {
      id: 7,
      title: 'FINALS SHORTLISTING',
      description: 'Top 30 participants from each Regional Compete for the Championship',
      position: 'left'
    },
    {
      id: 8,
      date: '12 April',
      title: 'FINALS',
      description: 'The Ultimate Showdown at DJ Sanghvi, Mumbai',
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

    let ctx: gsap.Context | null = null;
    let setupTimeout: number | null = null;
    let rafId = 0;

    const initializeTimeline = () => {
      ctx = gsap.context(() => {
        const pathLength = pathRef.current!.getTotalLength();
        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        if (!Number.isFinite(pathLength) || pathLength <= 0) return;

        gsap.set(progressLineRef.current, {
          strokeDasharray: pathLength,
          strokeDashoffset: pathLength,
        });

        const setWalkerAtProgress = (progress: number) => {
          if (!ashRef.current || !pathRef.current) return;

          const clampedProgress = Math.min(1, Math.max(0, progress));
          const point = pathRef.current.getPointAtLength(pathLength * clampedProgress);

          gsap.set(ashRef.current, {
            attr: {
              x: point.x - 55,
              y: point.y - 55,
            },
            opacity: 1,
          });
        };

        setWalkerAtProgress(0);

        gsap.to(progressLineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top 20%',
            end: 'bottom 80%',
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!isMobile) {
                setWalkerAtProgress(self.progress);
              }
            }
          }
        });

        events.forEach((event) => {
          const card = timelineRef.current?.querySelector(`[data-event-id="${event.id}"]`);
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
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                }
              }
            );
          }
        });
      }, timelineRef);

      ScrollTrigger.refresh();
    };

    rafId = requestAnimationFrame(() => {
      setupTimeout = window.setTimeout(initializeTimeline, 120);
    });

    return () => {
      if (setupTimeout !== null) window.clearTimeout(setupTimeout);
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [type]);

  useEffect(() => {
    const refreshTriggers = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refreshTriggers, 0);
    const t2 = window.setTimeout(refreshTriggers, 250);
    const t3 = window.setTimeout(refreshTriggers, 900);

    window.addEventListener('load', refreshTriggers);
    window.addEventListener('resize', refreshTriggers);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener('load', refreshTriggers);
      window.removeEventListener('resize', refreshTriggers);
    };
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
              href={type === 'water' ? '/timeline/ash_on_whale.webp' : '/timeline/ash.webp'}
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
                className={`${styles.eventRow} ${styles[event.position]} ${event.invisible ? styles.mobileInvisibleRow : ''}`}
                style={{ top: `${(index + 0.5) * (100 / events.length)}%` }}
              >
                <div className={`${styles.checkpoint} ${styles.active} ${event.invisible ? styles.mobileHideCheckpoint : ''}`}></div>
                {/* Event Card */}
                <div
                  className={styles.eventCard}
                  data-event-id={event.id}
                  style={{ visibility: event.invisible ? 'hidden' : 'visible' }}
                >
                  <div className={styles.cardConnector}></div>
                  {event.date && <p className={styles.cardDate}>{event.date}</p>}
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
