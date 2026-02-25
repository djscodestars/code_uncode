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
            ? '/footer/pokestop_red.png'
            : type === 'grass'
                ? '/footer/pokestop_green.png'
                : '/footer/pokestop.png';

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
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Linkedin size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            <Instagram size={24} />
                        </a>
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                            {/* Discord SVG since Lucide might not have it */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gamepad-2"><line x1="6" x2="10" y1="12" y2="12" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="15" x2="15.01" y1="13" y2="13" /><line x1="18" x2="18.01" y1="11" y2="11" /><rect width="20" height="12" x="2" y="6" rx="2" /></svg>
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
                            <span>+91 6767676767</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span>Sachin:</span>
                            <span>+91 6767676767</span>
                        </div>
                        <div className={styles.contactItem}>
                            <span>Yash Patel:</span>
                            <span>+91 6969696969</span>
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
                    Created with <span className={styles.heart}>❤</span> by CodeStars Tech
                </div>
                <img src="/footer/pikachu.png" alt="Pikachu" className={styles.pikachu} />
            </div>
        </footer>
    );
};

export default Footer;
