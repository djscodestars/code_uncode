"use client";

import { useRef, useLayoutEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import fireStyles from "./Parallax.module.css";
import waterStyles from "./ParallaxWater.module.css";
import grassStyles from "./ParallaxGrass.module.css";
import MusicPlayer from "./MusicPlayer";

interface ParallaxProps {
  type: "fire" | "water" | "grass";
}

export default function Parallax({ type }: ParallaxProps) {
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
      background: type === "fire" ? "red-bg.png" : type === "water" ? "water-bg.png" : "grassbg.png",
      mask: type === "fire" ? "red-bg1.png" : type === "water" ? "water-bg1.png" : "grassbg1.png",
      bird1: type === "fire" ? "ho-oh.png" : type === "water" ? "lugia.png" : "ho-oh.png",
      bird2: type === "fire" ? "moltres.png" : type === "water" ? "kyogre.png" : "moltres.png",
      mountains: type === "fire" ? "mountains.png" : type === "water" ? "sun.png" : "mountains.png",
      trees: type === "fire" ? "trees.png" : type === "water" ? "water-layer.png" : "trees.png",
      foreground: "foreground-layer.png",
      logo: type === "fire" ? "uncode-logo.png" : type === "water" ? "uncode-logoblue.png" : "uncodelogo-green.svg",
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
  const mask = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parallaxOuterRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 0.5, // Reduced for snappier response with Lenis
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // 1. Bird Movements
      tl.to(hoOh.current, { x: "-110vw", ease: "none" }, 0)
        .to(hoOh.current, { y: "-50vh", scale: 4, rotate: -15, ease: "power2.out" }, 0);

      tl.to(moltres.current, { x: "150vw", ease: "none" }, 0);
      tl.to(moltres.current, {
        keyframes: [
          { y: "-80vh", scale: 3.5, rotate: 15, ease: "power2.out" },
          { y: "-40vh", scale: 3.5, rotate: 15, ease: "power2.in" }
        ]
      }, 0);

      // 2. Reveal Logic - Mountains, Trees, and Foreground
      tl.to(mountains.current, { y: "-25%", ease: "none" }, 0);
      tl.to(trees.current, { y: "-45%", ease: "none" }, 0);
      tl.to(foreground.current, { y: "-65%", ease: "none" }, 0);

      // 3. Mask Movement - Syncing with the foreground rise
      // Ensure the mask reaches y: 0 by the end of the scroll to cover background
      tl.to(mask.current, { y: "-80vh", ease: "none" }, 0);

    }, parallaxOuterRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.wrapper}>
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
          <img className={styles.heroLogo} src={`/${images.folder}/${images.logo}`} alt="Logo" />
          <h2 className={styles.heroSubtitle}>India&apos;s Premier ICPC-Style Competition</h2>
          <p className={styles.heroDescription}>
            With 1,600+ participants from 370+ institutes in 2025, Code UnCode 2026 is going pan-India!
            Regional qualifiers across major cities will lead to an electrifying grand finale in Mumbai.
          </p>
        </div>

        <img ref={hoOh} src={`/${images.folder}/${images.bird1}`} className={styles.hoOh} alt={type === "fire" ? "Ho-Oh" : type === "water" ? "Lugia" : "Rayquaza"} />
        <img ref={moltres} src={`/${images.folder}/${images.bird2}`} className={styles.moltres} alt={type === "fire" ? "Moltres" : type === "water" ? "Kyogre" : "Celebi"} />


        <div
          ref={mask}
          className={styles.fireMaskLayer}
          style={{ backgroundImage: `url(/${images.folder}/${images.mask})` }}
        >
          <div className={styles.marqueeContainer}>
            <h3 className={styles.marqueeTitle}>Our Hosting Partners</h3>
            <div className={styles.marqueeContent}>
              {[...Array(6)].map((_, index) => (
                <div key={index} className={styles.marqueeTrack}>
                  <img src="/logos/csispit.png" alt="CSI SPIT" className={styles.partnerLogo} />
                  <img src="/logos/codestars.png" alt="CodeStars" className={styles.partnerLogo} />
                  <img src="/logos/sdc.png" alt="SDC" className={styles.partnerLogo} />
                  <img src="/logos/ieeespit.png" alt="IEEE SPIT" className={styles.partnerLogo} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={foreground} className={`${styles.layer} ${styles.foregroundLayer}`}>
          <img src={`/${images.folder}/${images.foreground}`} alt="foreground" />
        </div>
      </div>

    </div>
  );
}