'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export function InteractiveEffects() {
  const { settings } = useAppStore();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!settings.effectsEnabled) return;

    const handleClick = (e: MouseEvent) => {
      const emojis = ['❤️', '💖', '✨', '🌹', '🌸', '💋'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      
      const newParticle: Particle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        emoji: randomEmoji,
      };

      setParticles((prev) => [...prev, newParticle]);

      // Sound effect
      if (settings.soundEnabled) {
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
        audio.volume = 0.2;
        audio.play().catch(() => {});
      }

      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [settings]);

  return (
    <>
      {particles.map((p) => (
        <span
          key={p.id}
          className="click-heart"
          style={{ left: p.x, top: p.y }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  );
}
