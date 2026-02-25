"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, Play, Pause, Music } from 'lucide-react';

interface MusicPlayerProps {
    type: "fire" | "water" | "grass";
    onReset?: () => void;
}

const songs = [
    { name: "Default Theme", artist: "Kanto Region" },
    { name: "Battle Theme", artist: "Trainer Battle" },
    { name: "Victory Road", artist: "Elite Four" },
];

const songFiles = [
    "/music/default.mp3",
    "/music/opt1.mp3",
    "/music/opt2.mp3",
];

export default function MusicPlayer({ type, onReset }: MusicPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Color logic based on theme
    const getThemeColors = () => {
        switch (type) {
            case "water":
                return {
                    glass: "bg-cyan-900/60",
                    border: "border-cyan-500/30",
                    text: "text-cyan-100",
                    subtext: "text-cyan-300",
                    iconBg: "bg-cyan-500/20",
                    progress: "bg-cyan-400"
                };
            case "grass":
                return {
                    glass: "bg-emerald-900/60",
                    border: "border-emerald-500/30",
                    text: "text-emerald-100",
                    subtext: "text-emerald-300",
                    iconBg: "bg-emerald-500/20",
                    progress: "bg-emerald-400"
                };
            case "fire":
            default:
                return {
                    glass: "bg-red-900/60",
                    border: "border-red-500/30",
                    text: "text-red-100",
                    subtext: "text-red-300",
                    iconBg: "bg-red-500/20",
                    progress: "bg-red-400"
                };
        }
    };

    const colors = getThemeColors();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            if (isPlaying && !isMuted) {
                audioRef.current.play().catch(e => console.log("Autoplay prevented:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, isMuted, currentSongIndex]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const toggleMute = () => setIsMuted(!isMuted);

    const nextSong = () => {
        setCurrentSongIndex((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
    };

    return (
        <div className="fixed bottom-6 right-6 md:top-8 md:left-8 md:bottom-auto z-50 font-sans max-w-[calc(100vw-3rem)] flex flex-col md:flex-row items-end md:items-start gap-3">
            {/* Starter Reset Button (Only visible on Desktop/Tablet if space permits, or stack on mobile) */}
            <button
                onClick={onReset}
                className={`
                    hidden md:flex items-center px-4 py-2
                    ${colors.glass} backdrop-blur-md
                    border ${colors.border} rounded-full
                    shadow-xl
                    text-xs font-bold tracking-wider uppercase ${colors.text}
                    transition-all duration-300 hover:scale-105 hover:bg-white/10
                `}
            >
                Choose Your Starter Again
            </button>

            <div className={`
                flex items-center gap-3 pl-3 pr-4 py-2
                ${colors.glass} backdrop-blur-md
                border ${colors.border} rounded-full
                shadow-xl
                transition-all duration-300 hover:scale-105
            `}>

                {/* Icon Box */}
                <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${colors.iconBg} backdrop-blur-sm
                    shrink-0
                `}>
                    <Music size={18} className="text-white" />
                </div>

                {/* Song Info */}
                <div className="flex flex-col mr-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${colors.text} truncate max-w-[100px] md:max-w-[140px]`}>
                        {songs[currentSongIndex].name}
                    </span>
                    <span className={`text-[10px] ${colors.subtext} font-medium tracking-wide truncate max-w-[100px]`}>
                        {songs[currentSongIndex].artist}
                    </span>
                </div>

                {/* Vertical Divider */}
                <div className={`h-6 w-px ${colors.border}`} />

                {/* Controls Group */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleMute}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    >
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>

                    <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                    >
                        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                    </button>

                    <button
                        onClick={nextSong}
                        className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
                    >
                        <SkipForward size={16} fill="currentColor" />
                    </button>
                </div>

            </div>

            <audio
                ref={audioRef}
                src={songFiles[currentSongIndex]}
                loop
                muted={isMuted}
            />
        </div>
    );
}
