import React from 'react';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react'; // Using MessageCircle for Discord as a placeholder if Discord icon isn't directly available in standard Lucide set, or I can use an SVG. Actually Lucide has 'Disc' maybe? No, let's stick to standard names or SVGs if needed. Lucide doesn't have a Discord icon by default in all versions. I will use a simple SVG for Discord if needed, or just a generic icon. Wait, I can use `lucide-react` icons for now and maybe replace Discord with a custom SVG if `lucide-react` doesn't have it.
import styles from './Footer.module.css';

interface FooterProps {
    type?: 'fire' | 'water' | 'grass';
}

const Footer: React.FC<FooterProps> = ({ type = 'fire' }) => {
    const themeClass =
        type === 'water'
            ? styles.footerWater
            : type === 'grass'
                ? styles.footerGrass
                : styles.footerFire;

    const pokestopImage =
        type === 'fire'
            ? '/footer/pokestop_red.webp'
            : type === 'grass'
                ? '/footer/pokestop_green.webp'
                : '/footer/pokestop.webp';

    const starterGif =
        type === 'fire'
            ? '/footer/charizard.gif'
            : type === 'water'
                ? '/footer/blastoise.gif'
                : '/footer/venusaur.gif';

    const starterAlt =
        type === 'fire' ? 'Charizard' : type === 'water' ? 'Blastoise' : 'Venusaur';

    const contactGlowColor =
        type === 'fire'
            ? '#ff4500'
            : type === 'water'
                ? '#00bfff'
                : '#39ff14';

    return (
        <footer className={`${styles.footer} ${themeClass}`}>
            <div className={styles.contentWrapper}>

                {/* Left Section: Starter Pokémon & Socials */}
                <div className={styles.leftSection}>
                    <div className={styles.snorlaxContainer}>
                        <img src={starterGif} alt={starterAlt} className={styles.snorlax} />
                    </div>
                    <div className={styles.socials}>
                        <a href="https://www.linkedin.com/company/djs-codestars" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.linkedin}`}>
                            <Linkedin size={24} />
                        </a>
                        <a href="https://www.instagram.com/djsce_codestars" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.instagram}`}>
                            <Instagram size={24} />
                        </a>
                        <a href="https://discord.gg/Fh2wps5d" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.discord}`}>
                            {/* Actual Discord SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a67.55,67.55,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.1,46,96,53,91.08,65.69,84.69,65.69Z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Center Section: Contact Info */}
                <div className={styles.centerSection}>
                    <h2
                        className={styles.contactTitle}
                        style={{
                            textShadow: `0 0 10px ${contactGlowColor}, 0 0 20px ${contactGlowColor}, 0 0 30px ${contactGlowColor}`,
                        }}
                    >Contact Us</h2>
                    <a href="mailto:djscodestars@gmail.com" className={styles.email}>djscodestars@gmail.com</a>

                    <div className={styles.contactList}>
                        <div className={styles.contactItem}>
                            <span>Adith Shetty:</span>
                            <span>+91 89285 27980</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span>Aaryan Urunkar:</span>
                            <span>+91 79778 84919</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span>Aryan Badgujar:</span>
                            <span>+91 93722 51416</span>
                        </div>
                    </div>
                </div>

                {/* Right Section: PokeStop Map */}
                <div className={styles.rightSection}>
                    <div className={styles.pokestopContainer}>
                        <div className={styles.pokestopInner}>
                            <img src={pokestopImage} alt="Pokestop" className={styles.pokestopImg} />
                        </div>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.063469032517!2d72.834992775965!3d19.104276182106305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c676018b43%3A0x75f29a4205098f99!2sDwarkadas%20J.%20Sanghvi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1707905876356!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottomBar}>
                <div className={styles.copyright}>
                    © DJS Codestars, 2026
                </div>
                <div className={styles.attribution}>
                    Created with <span className={styles.heart}>❤</span> by CodeStars Tech Web
                </div>
                <a href="https://www.linkedin.com/in/anay-shah-5880aa264/" target="_blank" rel="noopener noreferrer" style={{ display: 'contents' }}>
                    <img src="/footer/pikachu.webp" alt="Pikachu" className={styles.pikachu} style={{ cursor: 'pointer' }} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
