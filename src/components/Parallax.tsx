"use client";

import { useRef, useLayoutEffect, useMemo, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import fireStyles from "./Parallax.module.css";
import waterStyles from "./ParallaxWater.module.css";
import grassStyles from "./ParallaxGrass.module.css";
import MusicPlayer from "./MusicPlayer";
import ParallaxLoader from "./ParallaxLoader";

interface ParallaxProps {
  type: "fire" | "water" | "grass";
}

export default function Parallax({ type }: ParallaxProps) {
  const [isReady, setIsReady] = useState(false);

  // Merge styles based on type
  const styles = useMemo(() => {
    if (type === "water") {
      return { ...fireStyles, ...waterStyles };
    }
    if (type === "grass") {
      return { ...fireStyles, ...grassStyles };
    }
    return fireStyles;
  }, [type]);

  // Image mapping based on type
  const images = useMemo(() => {
    let folder = "parallax/parallax_fire";
    if (type === "water") folder = "parallax/parallax_water";
    if (type === "grass") folder = "parallax/parallax_grass";

    return {
      background: type === "fire" ? "red-bg.webp" : type === "water" ? "water-bg.webp" : "grassbg.webp",
      mask: type === "fire" ? "red-bg1.webp" : type === "water" ? "water-bg2.webp" : "grassbg1.webp",
      bird1: type === "fire" ? "ho-oh.webp" : type === "water" ? "lugia.webp" : "ho-oh.webp",
      bird2: type === "fire" ? "moltres.webp" : type === "water" ? "kyogre.webp" : "moltres.webp",
      mountains: type === "fire" ? "mountains.webp" : type === "water" ? "sun.webp" : "mountains.webp",
      trees: type === "fire" ? "trees.webp" : type === "water" ? "water-layer.webp" : "trees.webp",
      foreground: "foreground-layer.webp",
      logo: type === "fire" ? "uncode-red.png" : type === "water" ? "uncode-blue.png" : "uncode-green.png",
      folder,
    };
  }, [type]);
  const parallaxOuterRef = useRef<HTMLDivElement>(null);
  const mountains = useRef<HTMLDivElement>(null);
  const trees = useRef<HTMLDivElement>(null);
  const foreground = useRef<HTMLDivElement>(null);
  const hoOh = useRef<HTMLImageElement>(null);
  const moltres = useRef<HTMLImageElement>(null);
  const textContent = useRef<HTMLDivElement>(null);
  // mask ref removed — no longer using a separate mask layer

  useLayoutEffect(() => {
    if (!isReady) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxOuterRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Bird Movements
      tl.to(hoOh.current, { x: "-110vw", ease: "none" }, 0)
        .to(hoOh.current, { y: "-50vh", scale: 4, rotate: -15, ease: "power1.out" }, 0);

      tl.to(moltres.current, { x: "100vw", ease: "none" }, 0);
      tl.to(moltres.current, {
        keyframes: [
          { y: "-80vh", scale: 3.5, rotate: 15, ease: "power1.out" },

        ]
      }, 0);

      // 2. Reveal Logic - Mountains, Trees, and Foreground
      tl.to(mountains.current, { y: "-25%", ease: "none" }, 0);
      tl.to(trees.current, { y: "-45%", ease: "none" }, 0);
      const foregroundY = type === "fire" ? "-100vh" : type === "water" ? "-80vh" : "-115vh";
      tl.to(foreground.current, { y: foregroundY, ease: "none" }, 0);
      tl.to(textContent.current, {
        opacity: 0,
        y: "-30px",
        ease: "power1.in",
        duration: 0.3,
      }, 0);

    }, parallaxOuterRef);

    return () => ctx.revert();
  }, [type, isReady]);

  // Reset isReady when type changes so the old timeline reverts and waits for new images
  useEffect(() => {
    setIsReady(false);
    // Attempt smooth scroll reset to top
    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, [type]);

  useEffect(() => {
    if (!isReady) return;

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(rafId);
  }, [isReady]);

  return (
    <>
      <ParallaxLoader type={type} onReady={() => setIsReady(true)} />
      <div
        className={styles.wrapper}
        style={{
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <div
          ref={parallaxOuterRef}
          className={styles.parallaxContainer}
        >
          <div ref={mountains} className={`${styles.layer} ${styles.mountainLayer || ""}`}>
            <img src={`/${images.folder}/${images.mountains}`} alt="mountains" />
          </div>
          <div ref={trees} className={`${styles.layer} ${styles.treeLayer}`}>
            <img src={`/${images.folder}/${images.trees}`} alt="trees" />
          </div>

          <div ref={textContent} className={styles.copy}>
            <div className={styles.titleSponsorWrapper} style={{ 
              "--sponsor-margin-bottom": "-5px", 
              "--quantiphi-width": "clamp(160px, 22vw, 290px)",
              "--quantiphi-glow-spread": "15px",
              "--quantiphi-margin-bottom": "0px",
              "--presents-font-size": "1rem",
              "--presents-letter-spacing": "3px",
              "--presents-color": "#ffffff"
             } as React.CSSProperties}>
              <img src="/logos/quantiphi.png" alt="Quantiphi" className={styles.quantiphiLogo} />
              <div className={styles.presentsText}>PRESENTS</div>
            </div>
            <img className={styles.heroLogo} src={`/${images.folder}/${images.logo}`} alt="Logo" />
            <h2 className={styles.heroSubtitle}>India&apos;s Premier ICPC-Style Competition</h2>
            <p className={styles.heroDescription}>
              With 1,600+ participants from 370+ institutes in 2025, Code UnCode 2026 is going even bigger!
              Regional qualifiers across multiple colleges will lead to an electrifying grand finale in Mumbai.
            </p>
          </div>

          <img ref={hoOh} src={`/${images.folder}/${images.bird1}`} className={styles.hoOh} alt={type === "fire" ? "Ho-Oh" : type === "water" ? "Lugia" : "Rayquaza"} />
          <img ref={moltres} src={`/${images.folder}/${images.bird2}`} className={styles.moltres} alt={type === "fire" ? "Moltres" : type === "water" ? "Kyogre" : "Celebi"} />


          {/* Foreground: big combined image (beach + water scene) with partners overlaid at the bottom */}
          <div ref={foreground} className={`${styles.layer} ${styles.foregroundLayer}`}>
            <img src={`/${images.folder}/${images.foreground}`} alt="foreground" />
            {/* Hosting partners sit in the bottom water section of the foreground image */}
            <div className={styles.marqueeContainer}>
              <h3 className={styles.marqueeTitle}>Our Hosting Partners</h3>
              <div className={styles.marqueeContent}>
                <div className={styles.marqueeGroup}>
                  <img src="/logos/ramanujan.webp" alt="Ramanujan" className={styles.partnerLogo} />
                  <img src="/logos/codestars.webp" alt="CodeStars" className={styles.partnerLogo} />
                  <img src="/logos/sdc.webp" alt="SDC" className={styles.partnerLogo} />
                  <img src="/logos/ieeespit.webp" alt="IEEE Spit" className={styles.partnerLogo} />
                </div>
                <div className={styles.marqueeGroup} aria-hidden="true">
                  <img src="/logos/ramanujan.webp" alt="Ramanujan" className={styles.partnerLogo} />
                  <img src="/logos/codestars.webp" alt="CodeStars" className={styles.partnerLogo} />
                  <img src="/logos/sdc.webp" alt="SDC" className={styles.partnerLogo} />
                  <img src="/logos/ieeespit.webp" alt="IEEE Spit" className={styles.partnerLogo} />
                </div>
              </div>

              <div className={styles.staticPartnersContent}>
                <img src="/logos/ramanujan.webp" alt="Ramanujan" className={styles.partnerLogo} />
                <img src="/logos/codestars.webp" alt="CodeStars" className={styles.partnerLogo} />
                <img src="/logos/sdc.webp" alt="SDC" className={styles.partnerLogo} />
                <img src="/logos/ieeespit.webp" alt="IEEE Spit" className={styles.partnerLogo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}