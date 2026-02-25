import React from "react";
import styles from "./PrizesSection.module.css";

interface PrizeItem {
  title: string;
  description: string;
  imagePath: string;
}

const prizes: PrizeItem[] = [
  {
    title: "1st Place",
    description: "Grand champion trophy + premium rewards.",
    imagePath: "/prizes/1st.png",
  },
  {
    title: "2nd Place",
    description: "Runner-up trophy + special perks.",
    imagePath: "/prizes/2nd.png",
  },
  {
    title: "3rd Place",
    description: "Top-three trophy + recognition.",
    imagePath: "/prizes/3rd.png",
  },
];

interface PrizesSectionProps {
  type?: 'fire' | 'water' | 'grass';
}

const PrizesSection: React.FC<PrizesSectionProps> = ({ type = 'fire' }) => {
  const getThemeColors = () => {
    switch (type) {
      case 'water': return '#00ffff';
      case 'grass': return '#76ff03';
      case 'fire': default: return '#ffcc00';
    }
  };
  const themeColor = getThemeColors();

  return (
    <section className={styles.prizesSection}>
      <div className={styles.sectionInner}>
        <h2 className={styles.title} style={{ color: themeColor }}>Prizes</h2>
        <p className={styles.subtitle}>Trophies worthy of legendary competitors.</p>

        <div className={styles.trophyRow}>
          {prizes.map((prize) => (
            <div key={prize.title} className={styles.trophyItem}>
              <article className={styles.trophyCard}>
                <div className={styles.imageWrap}>
                  <img src={prize.imagePath} alt={prize.title} className={styles.trophyImage} />
                </div>
              </article>
              <p className={styles.trophyLabel} style={{ color: themeColor }}>{prize.title.split(" ")[0]}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PrizesSection;
