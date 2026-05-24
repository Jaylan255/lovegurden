'use client';

import { useAppStore } from '@/lib/store';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  left: string;
  duration: string;
  delay: string;
  size: string;
  emoji: string;
}

export function ThemeAnimations() {
  const { theme, settings } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    setMounted(true);
    
    if (!settings.animationsEnabled || settings.animationType === 'none') {
      setElements([]);
      return;
    }

    const getEmoji = () => {
      switch (settings.animationType) {
        case 'roses': return '🌹';
        case 'sparkles': return '✨';
        case 'rain': return theme === 'dark-love' ? '💧' : '❤️';
        case 'hearts':
        default: return '❤️';
      }
    };

    const count = settings.animationType === 'rain' ? 30 : 15;

    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: settings.animationType === 'rain' ? `${Math.random() * 2 + 2}s` : `${Math.random() * 10 + 5}s`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 20 + 10}px`,
      emoji: getEmoji()
    }));
    
    setElements(newElements);
  }, [settings.animationsEnabled, settings.animationType, theme]);

  if (!mounted || !settings.animationsEnabled || settings.animationType === 'none') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute animate-heart-float"
          style={{
            left: el.left,
            animationDuration: el.duration,
            animationDelay: el.delay,
            fontSize: el.size,
            opacity: 0.3
          }}
        >
          {el.emoji}
        </div>
      ))}
    </div>
  );
}
