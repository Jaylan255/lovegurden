'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, BookOpen, Home, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAppStore } from '@/lib/store';
import { TRANSLATIONS } from '@/lib/data';

export function BottomNav() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const { language } = useAppStore();
  
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/texts', label: 'Texts', icon: Heart },
    { href: '/stories', label: 'Stories', icon: BookOpen },
    { href: '/favorites', label: 'Profile', icon: User },
  ];

  const handleNavClick = () => {
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 800);
  };

  return (
    <>
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-1.5 z-[100] overflow-hidden">
          <div className="h-full bg-primary animate-pulse w-full transition-all duration-500" />
        </div>
      )}

      <nav className="fixed bottom-8 inset-x-0 z-[60] flex items-center justify-center gap-4 px-6 pointer-events-none">
        <div className="flex items-center justify-center gap-2 glass p-2 rounded-[2.5rem] border-white/40 shadow-2xl pointer-events-auto overflow-x-auto no-scrollbar max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  "flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-[2rem] transition-all duration-500 relative flex-shrink-0",
                  isActive 
                    ? "bg-primary text-white scale-110 -translate-y-2 shadow-xl" 
                    : "text-muted-foreground hover:bg-white/40 active:scale-95"
                )}
              >
                <Icon 
                  className={cn(
                    "w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300", 
                    isActive ? "scale-110 fill-white" : "scale-100"
                  )} 
                />
                <span className={cn(
                  "text-[7px] sm:text-[8px] font-black uppercase tracking-tighter mt-1 transition-opacity",
                  isActive ? "opacity-100" : "opacity-60"
                )}>
                  {item.label}
                </span>
                
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full animate-ping" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
