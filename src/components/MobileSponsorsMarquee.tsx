import styles from './MobileSponsorsMarquee.module.css';

interface MobileSponsorsMarqueeProps {
  type: 'fire' | 'water' | 'grass';
}

export default function MobileSponsorsMarquee({ type }: MobileSponsorsMarqueeProps) {
  const titleColor =
    type === 'water' ? '#00ffff' : type === 'grass' ? '#76ff03' : '#ffcc00';

  const logos = [
    { src: '/logos/ramanujan.webp', alt: 'Ramanujan' },
    { src: '/logos/codestars.webp', alt: 'CodeStars' },
    { src: '/logos/sdc.webp', alt: 'SDC' },
  ];

  return (
    <section className={styles.section}>
      <h3 className={styles.title} style={{ color: titleColor }}>Our Hosting Partners</h3>
      <div className={styles.staticContainer}>
        <img src="/logos/ramanujan.webp" alt="Ramanujan" className={styles.logoSide} />
        <img src="/logos/codestars.webp" alt="CodeStars" className={styles.logoCenter} />
        <img src="/logos/sdc.webp" alt="SDC" className={styles.logoSide} />
      </div>
    </section>
  );
}