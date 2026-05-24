
'use client';

import { useEffect, useState, useRef } from 'react';
import { AICupid } from '@/components/ai/AICupid';
import { TextCard } from '@/components/content/TextCard';
import { QuoteCard } from '@/components/content/QuoteCard';
import { LOVE_TEXTS, QUOTES, TRANSLATIONS, Category } from '@/lib/data';
import { 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Star, 
  Heart, 
  BookOpen, 
  Quote as QuoteIcon, 
  Wand2, 
  Flower2, 
  Menu, 
  User, 
  Settings, 
  MessageCircle, 
  ShieldCheck, 
  AlertTriangle,
  Home as HomeIcon
} from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';

const categories: Category[] = [
  'Romantic', 'Funny', 'Sad', 'Flirty', 'Emotional', 'Breakup', 'Deep Thinking',
  'Good morning messages', 'Good night messages', 'Valentine messages',
  'Crush quotes', 'Cute love messages', 'Deep love messages'
];

export default function Home() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  
  const trendingTexts = LOVE_TEXTS.slice(0, 3);
  const featuredQuote = QUOTES[0];

  const quickActions = [
    { href: '#ai-cupid', label: 'AI Magic', icon: Wand2, color: 'text-amber-500', bg: 'bg-amber-100' },
    { href: '/texts', label: 'Love Texts', icon: Heart, color: 'text-primary', bg: 'bg-primary/10' },
    { href: '/stories', label: 'Stories', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-100' },
    { href: '/quotes', label: 'Quotes', icon: QuoteIcon, color: 'text-accent', bg: 'bg-accent/10' },
  ];

  // Side Menu Links
  const menuLinks = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/texts', label: 'Texts', icon: Heart },
    { href: '/stories', label: 'Stories', icon: BookOpen },
    { href: '/favorites', label: 'Profile', icon: User },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: 'https://wa.me/255748472076', label: 'Contact Us', icon: MessageCircle, external: true },
    { href: '/privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { href: '/disclaimer', label: 'Disclaimer', icon: AlertTriangle },
  ];

  useEffect(() => {
    const scrollContainer = categoryScrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: 200, behavior: 'smooth' });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const scrollToAiCupid = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.currentTarget.hash === '#ai-cupid') {
      e.preventDefault();
      const element = document.getElementById('ai-cupid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="space-y-8 pb-32">
      {/* Top Bar Header */}
      <div className="flex justify-between items-center px-4 pt-4 sticky top-0 z-[60] bg-background/60 backdrop-blur-xl -mx-4 py-4 border-b border-white/10">
        {/* Left: Hamburger Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-3 glass rounded-2xl hover:bg-white/60 transition-all border-white/40 shadow-lg group active:scale-95">
              <Menu className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="rounded-r-[2.5rem] glass border-r-white/40 w-[300px] p-0 overflow-hidden z-[100]">
            <div className="flex flex-col h-full bg-gradient-to-b from-primary/5 to-accent/5">
              <SheetHeader className="p-8 border-b border-white/20">
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white fill-current" />
                  </div>
                  <span className="text-2xl font-black gradient-text tracking-tighter">LoveGurden</span>
                </SheetTitle>
              </SheetHeader>
              
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {menuLinks.map((link) => (
                  <Link 
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/60 transition-all group border border-transparent hover:border-white/40 hover:shadow-sm"
                  >
                    <div className="p-2.5 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                      <link.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="p-8 border-t border-white/20 opacity-50">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Bustani ya Upendo</p>
                <p className="text-[8px] mt-1">© 2024 LoveGurden • V1.0</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Right: Small Logo */}
        <div className="flex items-center gap-1">
          <Link href="/" className="relative inline-block px-3 active:scale-95 transition-transform">
            <Flower2 className="absolute -top-1.5 -left-1 text-primary/40 w-3 h-3 animate-pulse" />
            <h1 className="text-xl font-black tracking-tighter gradient-text font-serif">
              LoveGurden
            </h1>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="space-y-10 relative z-10">
        {/* Auto-scrolling Categories */}
        <div 
          ref={categoryScrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar snap-x scroll-smooth px-4 max-w-4xl mx-auto py-2"
        >
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              className="snap-center flex-shrink-0 px-6 py-2 rounded-2xl glass border-primary/10 text-xs font-bold whitespace-nowrap text-muted-foreground hover:text-primary transition-colors cursor-default shadow-sm"
            >
              {cat}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-5 overflow-x-auto pb-10 pt-4 no-scrollbar snap-x scroll-smooth px-4 max-w-5xl mx-auto justify-start lg:justify-center">
          {quickActions.map((action) => (
            <Link 
              key={action.label}
              href={action.href}
              onClick={action.href.startsWith('#') ? scrollToAiCupid : undefined}
              className="snap-start flex-shrink-0 group relative overflow-hidden glass rounded-[2.5rem] p-1 border-white/40 hover:scale-105 transition-all duration-300 shadow-2xl min-w-[180px] active:scale-95"
            >
              <div className="p-8 flex flex-col items-center gap-4">
                <div className={cn("p-5 rounded-3xl shadow-lg transition-transform group-hover:rotate-6", action.bg)}>
                  <action.icon className={cn("w-8 h-8", action.color)} />
                </div>
                <div className="text-center space-y-1">
                  <span className="font-black text-sm tracking-tight block uppercase">{action.label}</span>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Explore</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 opacity-5 pointer-events-none">
                <action.icon size={80} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Cupid Section */}
      <section id="ai-cupid" className="scroll-mt-24 relative z-10">
        <AICupid />
      </section>

      {/* Trending Section */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Flame className="text-primary w-6 h-6 fill-current" />
            </div>
            <h2 className="text-3xl font-black tracking-tight">{t.trending}</h2>
          </div>
          <Link href="/texts" className="text-primary font-bold hover:underline flex items-center gap-1 active:scale-95 transition-transform">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {trendingTexts.map(text => (
            <TextCard key={text.id} text={text} />
          ))}
        </div>
      </section>

      {/* Daily Quote Section */}
      <section className="py-12 relative z-10">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="p-2 bg-accent/10 rounded-xl">
            <Star className="text-accent w-6 h-6 fill-current" />
          </div>
          <h2 className="text-3xl font-black tracking-tight">{t.vibe_day}</h2>
        </div>
        <div className="max-w-4xl mx-auto px-2">
           {featuredQuote && <QuoteCard quote={featuredQuote} />}
        </div>
      </section>
      
      {/* Footer Branding */}
      <footer className="text-center py-20 border-t border-white/10 opacity-60">
        <p className="font-bold tracking-widest uppercase text-[10px]">© 2024 LoveGurden • Swamedia Inc</p>
      </footer>
    </div>
  );
}
