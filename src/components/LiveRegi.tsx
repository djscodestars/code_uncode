"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LiveRegi.module.css";

// ─── Constants ────────────────────────────────────────────────────────────────
const POLL_INTERVAL_MS = 5 * 60 * 1000;
const EVENT_DATE = new Date("2026-03-20T00:00:00+05:30");

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function fetchRegisCount(): Promise<number | null> {
    try {
        const response = await fetch("/api/scraper");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        return data.count ?? null;
    } catch (error) {
        console.error("Error fetching registration count:", error);
        return null;
    }
}

function getTimeLeft() {
    const now = new Date();
    const diff = EVENT_DATE.getTime() - now.getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

// ─── Types ────────────────────────────────────────────────────────────────────
interface PokemonData { id: number; name: string; image: string; }
interface Props { type: "fire" | "water" | "grass"; }

// ─── Theme maps ───────────────────────────────────────────────────────────────
const THEME_CARD_CLASS: Record<string, string> = {
    fire: styles.cardFire,
    water: styles.cardWater,
    grass: styles.cardGrass,
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LiveRegi({ type }: Props) {

    const themeCard = THEME_CARD_CLASS[type] ?? "";

    // ── Col 1: Live Registrations ──────────────────────────────────────────────
    const [regisCount, setRegisCount] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCount = async () => {
            setLoading(true);
            const count = await fetchRegisCount();
            setRegisCount(count);
            setLoading(false);
        };
        fetchCount();
        const id = setInterval(fetchCount, POLL_INTERVAL_MS);
        return () => clearInterval(id);
    }, []);

    // ── Col 2: Countdown ───────────────────────────────────────────────────────
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    useEffect(() => {
        const tick = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(tick);
    }, []);

    // ── Col 3: Pokemon Quiz ────────────────────────────────────────────────────
    const [questions, setQuestions] = useState<number[]>([]);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [pokemon, setPokemon] = useState<PokemonData | null>(null);
    const [userInput, setUserInput] = useState("");
    const [isRevealed, setIsRevealed] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => { startNewGame(); }, []);

    const startNewGame = () => {
        const ids = Array.from({ length: 5 }, () => Math.floor(Math.random() * 151) + 1);
        setQuestions(ids);
        setScore(0);
        setCurrentIdx(0);
        setGameOver(false);
        fetchPokemon(ids[0]);
    };

    const fetchPokemon = async (id: number) => {
        setUserInput("");
        setIsRevealed(false);
        setImageLoaded(false);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        setPokemon({
            id: data.id,
            name: data.name,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isRevealed || !pokemon) return;
        const actual = pokemon.name.toLowerCase().replace(/-/g, " ");
        const input = userInput.toLowerCase().trim();
        if (input === actual) setScore(s => s + 1);
        setIsRevealed(true);
        setTimeout(() => {
            if (currentIdx < 4) {
                const next = currentIdx + 1;
                setCurrentIdx(next);
                fetchPokemon(questions[next]);
            } else {
                setGameOver(true);
            }
        }, 1500);
    };

    const isCorrect =
        isRevealed &&
        pokemon &&
        userInput.toLowerCase().trim() === pokemon.name.toLowerCase().replace(/-/g, " ");

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <section>
            <h2 className={styles.sectionTitle}>— Live Arena —</h2>

            <div className={styles.columnsGrid}>

                {/* ══════════════════ COLUMN 1: LIVE REGISTRATIONS ══════════════════ */}
                <div className={`${styles.card} ${styles.regisCard} ${themeCard}`}>
                    {/* Pokédex-style header */}
                    <div className={styles.regisIconRow}>
                        <span className={styles.blueLight} />
                        <span className={styles.regisCardTitle}>Pokédex Entry</span>
                    </div>

                    {/* Screen border + glass */}
                    <div className={styles.regisScreenBorder}>
                        <div className={styles.regisScreen}>
                            <span className={styles.regisLabel}>Live Registrations</span>
                            <motion.span
                                key={loading ? "loading" : regisCount}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                className={styles.regisCount}
                            >
                                {loading
                                    ? <span className={styles.regisLoading}>—</span>
                                    : regisCount !== null
                                        ? regisCount.toLocaleString()
                                        : "N/A"}
                            </motion.span>
                        </div>

                        <div className={styles.regisFooter}>
                            <span className={styles.regisFooterDot} />
                            <div className={styles.speakerGrill} />
                        </div>
                    </div>

                    <p className={styles.regisSubtext}>Auto-refreshes every 5 min</p>
                </div>

                {/* ══════════════════ COLUMN 2: COUNTDOWN ══════════════════ */}
                <div className={`${styles.card} ${styles.countdownCard} ${themeCard}`}>
                    <div className={styles.countdownHeader}>
                        <span className={styles.pokeballDivider}>⚫</span>
                        <p className={styles.countdownTitle}>Time Until</p>
                        <p className={styles.countdownEventName}>CodeUncode Finals</p>
                        <p className={styles.countdownDate}>20 March 2026</p>
                    </div>

                    {/* ── Single unified countdown box ── */}
                    <div className={styles.countdownBox}>
                        {/* Numbers row */}
                        <div className={styles.countdownRow}>
                            {[
                                { value: timeLeft.days, label: "DD" },
                                { sep: true },
                                { value: timeLeft.hours, label: "HH" },
                                { sep: true },
                                { value: timeLeft.minutes, label: "MM" },
                                { sep: true },
                                { value: timeLeft.seconds, label: "SS" },
                            ].map((item, i) =>
                                "sep" in item ? (
                                    <span key={`sep-${i}`} className={styles.countdownSep}>:</span>
                                ) : (
                                    <div key={item.label} className={styles.countdownChunk}>
                                        <AnimatePresence mode="popLayout">
                                            <motion.span
                                                key={item.value}
                                                initial={{ y: -12, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 12, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className={styles.countdownNumber}
                                            >
                                                {pad(item.value!)}
                                            </motion.span>
                                        </AnimatePresence>
                                        <span className={styles.countdownUnitLabel}>{item.label}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div className={styles.countdownLive}>
                        <span className={styles.liveDot} />
                        Live Countdown
                    </div>
                </div>

                {/* ══════════════════ COLUMN 3: POKEMON QUIZ ══════════════════ */}
                <div className={`${styles.card} ${styles.quizCard} ${themeCard}`}>
                    <div className={styles.quizInner}>
                        {/* Header */}
                        <div className={styles.quizHeader}>
                            <span className={styles.quizProgress}>
                                Question {currentIdx + 1} / 5
                            </span>
                            <div className={styles.quizScoreBadge}>
                                <span className={styles.quizScoreNum}>{score}</span>
                                <span className={styles.quizScoreLabel}>pts</span>
                            </div>
                        </div>

                        {/* Pokémon image — initial has brightness(0) so it is ALWAYS blacked on load */}
                        <div className={styles.quizPokemonWrap}>
                            <AnimatePresence mode="wait">
                                {pokemon && (
                                    <motion.img
                                        key={pokemon.id}
                                        initial={{ opacity: 0, scale: 0.75, filter: "brightness(0)" }}
                                        animate={{
                                            opacity: imageLoaded ? 1 : 0,
                                            scale: 1,
                                            filter: isRevealed
                                                ? "brightness(1) drop-shadow(0 0 18px rgba(255,204,0,0.5))"
                                                : "brightness(0)",
                                        }}
                                        exit={{ opacity: 0, scale: 0.75, filter: "brightness(0)" }}
                                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                        src={pokemon.image}
                                        onLoad={() => setImageLoaded(true)}
                                        className={styles.quizPokemonImg}
                                        alt="Who's that Pokémon?"
                                    />
                                )}
                            </AnimatePresence>

                            <span className={styles.quizPokemonGlow} />
                            <span className={styles.quizRingAnim} />

                            {!imageLoaded && (
                                <div className={styles.quizSpinner}>
                                    <div className={styles.spinner} />
                                </div>
                            )}
                        </div>

                        {/* Reveal name */}
                        <div className={`${styles.quizRevealName} ${isRevealed
                                ? isCorrect ? styles.quizRevealCorrect : styles.quizRevealWrong
                                : ""
                            }`}>
                            {isRevealed && pokemon
                                ? pokemon.name.replace(/-/g, " ")
                                : "\u00A0"}
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSubmit} className={styles.quizForm}>
                            <div className={styles.quizInputWrap}>
                                <span className={styles.quizGlow} />
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={e => setUserInput(e.target.value)}
                                    disabled={isRevealed}
                                    placeholder={isRevealed ? "" : "WHO'S THAT POKÉMON?"}
                                    autoComplete="off"
                                    className={`${styles.quizInput} ${isRevealed
                                            ? isCorrect ? styles.correct : styles.wrong
                                            : ""
                                        }`}
                                />
                                {isRevealed && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={styles.quizStatusIcon}
                                    >
                                        {isCorrect ? "✓" : "✗"}
                                    </motion.span>
                                )}
                            </div>

                            {!isRevealed && !gameOver && (
                                <p className={styles.quizHint}>Press Enter to Submit</p>
                            )}
                        </form>

                        {/* Game Over Overlay */}
                        <AnimatePresence>
                            {gameOver && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={styles.gameOverOverlay}
                                >
                                    <motion.h3
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className={styles.gameOverTitle}
                                    >
                                        Result
                                    </motion.h3>

                                    <motion.div
                                        initial={{ scale: 0.7, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className={styles.gameOverScore}
                                    >
                                        <span className={styles.gameOverScoreNum}>{score}</span>
                                        <span className={styles.gameOverScoreOf}>/5</span>
                                    </motion.div>

                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        onClick={startNewGame}
                                        className={styles.gameOverBtn}
                                    >
                                        Play Again
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </section>
    );
}