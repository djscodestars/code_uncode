
import React from 'react';
import Link from 'next/link';
import CircularGallery from './CircularGallery';
import styles from './AboutCodeUncode.module.css';

interface AboutCodeUncodeProps {
    type: 'fire' | 'water' | 'grass';
}

const AboutCodeUncode: React.FC<AboutCodeUncodeProps> = ({ type }) => {
    const getThemeClass = () => {
        switch (type) {
            case 'fire':
                return styles.titleFire;
            case 'water':
                return styles.titleWater;
            case 'grass':
                return styles.titleGrass;
            default:
                return styles.titleFire;
        }
    };

    const getThemeColor = () => {
        switch (type) {
            case 'fire':
                return '#ffcc00';
            case 'water':
                return '#00ffff';
            case 'grass':
                return '#76ff03';
            default:
                return '#ffcc00';
        }
    }

    const galleryItems = [
        { image: '/gallery/finals_awards-min.jpg', text: 'Finals Awards' },
        { image: '/gallery/finals_dhyanesh_speech-min.jpg', text: 'Keynote Speech' },
        { image: '/gallery/finals_feli-min.jpg', text: 'Felicitation' },
        { image: '/gallery/finals_hall-min.jpg', text: 'The Team' },
        { image: '/gallery/finals_lab1-min.jpg', text: 'Coding Lab' },
        { image: '/gallery/regionals_awards-min.jpg', text: 'Awards' },
        { image: '/gallery/regionals_winners-min.jpg', text: 'Regional Winners' },
    ];

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} ${getThemeClass()}`}>ABOUT CODE UNCODE 2025</h1>
            <p className={styles.description}>
                Code UnCode is India&apos;s Premier ICPC-Style Competition involving multiple rounds of intense algorithmic challenges.<br />
                Join thousands of participants in a battle of logic and precision to claim the championship in a battle of navigating through time and space complexities.
            </p>

            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <span className={styles.metricValue} style={{ color: getThemeColor() }}>1600+</span>
                    <span className={styles.metricLabel}>Participants</span>
                </div>
                <div className={styles.metricCard}>
                    <span className={styles.metricValue} style={{ color: getThemeColor() }}>370+</span>
                    <span className={styles.metricLabel}>Institutes</span>
                </div>
                <div className={styles.metricCard}>
                    <span className={styles.metricValue} style={{ color: getThemeColor() }}>₹200K</span>
                    <span className={styles.metricLabel}>Prize Pool 2025</span>
                </div>
            </div>

            <div className={styles.galleryContainer}>
                <div className={styles.legendLeft}>
                    <img src="/footer/dialga.png" alt="Dialga" className={styles.legendImage} />
                </div>
                <CircularGallery items={galleryItems} bend={3} textColor={getThemeColor()} borderRadius={0.05} font={`bold 72px 'Courier New', Courier, monospace`} />
                <div className={styles.legendRight}>
                    <img src="/footer/palkia.png" alt="Palkia" className={styles.legendImage} />
                </div>
            </div>
        </div>
    );
};

export default AboutCodeUncode;
