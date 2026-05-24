'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Quote, BookOpen, User, Search, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/texts', label: 'Love Texts', icon: Heart },
  { href: '/quotes', label: 'Quotes', icon: Quote },
  { href: '/stories', label: 'Stories', icon: BookOpen },
  { href: '/favorites', label: 'Saved', icon: User },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 inset-x-4 z-50 h-16 flex items-center justify-between px-6 glass rounded-2xl max-w-5xl mx-auto border-white/40 shadow-2xl">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <Heart className="text-white w-6 h-6 fill-current" />
        </div>
        <span className="text-xl font-bold gradient-text hidden sm:block">Lovegurden</span>
      </Link>

      <div className="flex items-center gap-1 sm:gap-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300",
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "fill-current")} />
              <span className="hidden md:block text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-muted rounded-full transition-colors">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </nav>
  );
}