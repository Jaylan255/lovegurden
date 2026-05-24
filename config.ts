'use client';

import { Heart, Flower2, Flower, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function LoveLoader() {
  const flowerCount = 8;
  const sparkleCount = 6;
  const [sparkles, setSparkles] = useState<{ top: string; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const generatedSparkles = Array.from({ length: sparkleCount }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 1.5 + 0.5}s`,
      delay: `${Math.random() * 1}s`,
    }));
    setSparkles(generatedSparkles);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 animate-pulse" />
      
      <div className="relative flex flex-col items-center gap-12">
        <div className="relative h-40 w-40 flex items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_5s_linear_infinite]" />
          
          {/* Pulsing Main Heart */}
          <div className="relative z-10 animate-bounce">
             <Heart 
              size={80} 
              className="text-primary fill-primary shadow-[0_0_30px_rgba(var(--primary),0.4)]" 
            />
            <Sparkles className="absolute -top-4 -right-4 text-accent animate-pulse" />
          </div>
          
          {/* Orbiting Flowers */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Array.from({ length: flowerCount }).map((_, i) => (
              <div
                key={`flower-${i}`}
                className="absolute text-primary/30 animate-spin"
                style={{
                  transform: `rotate(${i * 45}deg) translateY(-85px)`,
                  animationDuration: '4s',
                  animationDelay: `${i * 0.2}s`
                }}
              >
                {i % 2 === 0 ? <Flower2 size={28} /> : <Flower size={26} />}
              </div>
            ))}
          </div>

          {/* Drifting Sparkles */}
          {sparkles.map((s, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute w-2 h-2 bg-accent rounded-full animate-ping"
              style={{
                top: s.top,
                left: s.left,
                animationDuration: s.duration,
                animationDelay: s.delay
              }}
            />
          ))}
        </div>
        
        <div className="flex flex-col items-center gap-4 relative z-10">
          <h2 className="text-4xl font-black gradient-text tracking-tighter drop-shadow-sm">
            LoveGarden
          </h2>
          <div className="flex gap-3">
            {[0, 1, 2].map((i) => (
              <div 
                key={`dot-${i}`}
                className="w-3 h-3 bg-primary rounded-full animate-bounce shadow-sm"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 text-center w-full px-4">
        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-muted-foreground/30 flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-muted-foreground/20" />
          Powered by Swamedia
          <span className="w-8 h-[1px] bg-muted-foreground/20" />
        </p>
      </div>
    </div>
  );
}
