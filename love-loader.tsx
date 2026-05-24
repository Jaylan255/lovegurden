'use client';

import { useAppStore } from '@/lib/store';
import { InteractiveEffects } from '@/components/effects/InteractiveEffects';
import { ThemeAnimations } from '@/components/effects/ThemeAnimations';
import { LoveLoader } from '@/components/ui/love-loader';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export function AppUIWrapper({ children }: { children: React.ReactNode }) {
  const { theme, isLoaded } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setIsPageLoading(true);
      // Faster page transition feedback
      const timer = setTimeout(() => setIsPageLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, mounted]);

  if (!mounted || !isLoaded) {
    return <LoveLoader />;
  }

  return (
    <div 
      data-theme={theme} 
      className="gradient-bg transition-colors duration-300 min-h-screen relative overflow-x-hidden"
    >
      {/* Top Progress Bar */}
      {isPageLoading && (
        <div className="fixed top-0 left-0 right-0 z-[10000] h-1 bg-primary/10">
          <div className="h-full bg-gradient-to-r from-primary via-accent to-primary w-full origin-left" 
               style={{ animation: 'shimmer 0.6s ease-in-out infinite' }} />
        </div>
      )}
      
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: scaleX(0); opacity: 0; }
          50% { transform: scaleX(0.7); opacity: 1; }
          100% { transform: scaleX(1); opacity: 0; }
        }
      `}</style>

      <ThemeAnimations />
      <InteractiveEffects />
      
      <div className={`transition-opacity duration-300 ${isPageLoading ? 'opacity-80' : 'opacity-100'}`}>
        {children}
      </div>
    </div>
  );
}
