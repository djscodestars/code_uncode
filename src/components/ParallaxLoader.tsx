"use client";

import { useEffect, useState, useRef } from "react";
import styles from "./ParallaxLoader.module.css";

interface ParallaxLoaderProps {
    type: "fire" | "water" | "grass";
    onReady: () => void;
}

function preloadImage(src: string): Promise<void> {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // resolve even on error — don't block forever
        img.src = src;
    });
}

const THEME_CONFIG = {
    fire: {
        folder: "parallax/parallax_fire",
        images: ["red-bg.png", "red-bg1.png", "ho-oh.png", "moltres.png", "mountains.png", "trees.png", "foreground-layer.png", "uncode-logo.png"],
        title: "LOADING MOUNT EMBER",
        sub: "Fire Region · Kanto",
        accent: "#ff6600",
        glow: "rgba(255, 102, 0, 0.8)",
        cssClass: styles.loaderFire,
    },
    water: {
        folder: "parallax/parallax_water",
        images: ["water-bg.png", "water-bg1.png", "lugia.png", "kyogre.png", "sun.png", "water-layer.png", "foreground-layer.png", "uncode-logoblue.png"],
        title: "LOADING ORANGE ISLANDS",
        sub: "Water Region · Johto",
        accent: "#00ccff",
        glow: "rgba(0, 200, 255, 0.8)",
        cssClass: styles.loaderWater,
    },
    grass: {
        folder: "parallax/parallax_grass",
        images: ["grassbg.png", "grassbg1.png", "ho-oh.png", "moltres.png", "mountains.png", "trees.png", "foreground-layer.png", "uncodelogo-green.svg"],
        title: "LOADING VIRIDIAN FOREST",
        sub: "Grass Region · Pallet",
        accent: "#76ff03",
        glow: "rgba(100, 255, 0, 0.8)",
        cssClass: styles.loaderGrass,
    },
};

export default function ParallaxLoader({ type, onReady }: ParallaxLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [hiding, setHiding] = useState(false);
    const onReadyRef = useRef(onReady);
    onReadyRef.current = onReady;

    const config = THEME_CONFIG[type];

    useEffect(() => {
        let loaded = 0;
        const total = config.images.length;

        const promises = config.images.map((img) => {
            const src = `/${config.folder}/${img}`;
            return preloadImage(src).then(() => {
                loaded++;
                setProgress(Math.round((loaded / total) * 100));
            });
        });

        Promise.all(promises).then(() => {
            // Small delay so user sees 100% for a moment
            setTimeout(() => {
                setHiding(true);
                setTimeout(() => onReadyRef.current(), 600);
            }, 300);
        });
    }, [config]);

    return (
        <div
            className={`${styles.loaderOverlay} ${config.cssClass} ${hiding ? styles.hidden : ""}`}
            style={{
                "--loader-accent": config.accent,
                "--loader-glow": config.glow,
            } as React.CSSProperties}
        >
            {/* Pokéball */}
            <div className={styles.pokeball}>
                <div className={styles.pokeballTop} />
                <div className={styles.pokeballBand} />
                <div className={styles.pokeballBottom} />
                <div className={styles.pokeballCenter} />
            </div>

            {/* Title block — slightly lower via margin-top */}
            <div className={styles.titleBlock}>
                <p className={styles.loaderTitle}>
                    {config.title.split("").map((char, i) => (
                        <span
                            key={i}
                            className={styles.titleChar}
                            style={{ animationDelay: `${i * 0.04}s` }}
                        >
                            {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </p>
                <p className={styles.loaderSub}>{config.sub}</p>
            </div>

            {/* Progress bar */}
            <div className={styles.progressWrap}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>

            {/* Bouncing dots */}
            <div className={styles.dots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
            </div>
        </div>
    );
}
