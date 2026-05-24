'use client';

import { useEffect, useRef } from 'react';
import { TextCard } from '@/components/content/TextCard';
import { QuoteCard } from '@/components/content/QuoteCard';
import { LOVE_TEXTS, QUOTES, TRANSLATIONS, Category } from '@/lib/data';
import { 
  ArrowRight, 
  Flame, 
  Star, 
  Heart, 
  BookOpen, 
  Quote as QuoteIcon, 
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
  const actionsScrollRef = useRef<HTMLDivElement>(null);
  
  const trendingTexts = LOVE_TEXTS.slice(0, 3);
  const featuredQuote = QUOTES[0];

  const quickActions = [
    { href: '/texts', label: 'Love Texts', icon: Heart, color: 'text-primary', bg: 'bg-primary/10' },
    { href: '/stories', label: 'Stories', icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-100' },
    { href: '/quotes', label: 'Quotes', icon: QuoteIcon, color: 'text-accent', bg: 'bg-accent/10' },
  ];

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
    const handleAutoScroll = (ref: React.RefObject<HTMLDivElement>) => {
      const container = ref.current;
      if (!container) return;

      const interval = setInterval(() => {
        const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 10;
        if (isAtEnd) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 200, behavior: 'smooth' });
        }
      }, 3000);

      return interval;
    };

    const catInterval = handleAutoScroll(categoryScrollRef);
    const actInterval = handleAutoScroll(actionsScrollRef);

    return () => {
      if (catInterval) clearInterval(catInterval);
      if (actInterval) clearInterval(actInterval);
    };
  }, []);

  return (
    <div className="space-y-8 pb-32">
      <div className="flex justify-between items-center px-4 pt-4 sticky top-0 z-[60] bg-background/60 backdrop-blur-xl -mx-4 py-4 border-b border-white/10">
        <Sheet>
          <SheetTrigger asChild>
            <button className="p-3 glass rounded-2xl hover:bg-white/60 transition-all border-white/40 shadow-lg group active-spring">
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
                  <span className="text-2xl font-black gradient-text tracking-tighter text-left">LoveGarden</span>
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

              <div className="p-8 border-t border-white/20 opacity-50 text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Bustani ya Upendo</p>
                <p className="text-[8px] mt-1">© 2024 LoveGarden • V1.0</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center gap-1">
          <Link href="/" className="relative inline-block px-3 active-spring transition-transform">
            <Flower2 className="absolute -top-1.5 -left-1 text-primary/40 w-3 h-3 animate-pulse" />
            <h1 className="text-xl font-black tracking-tighter gradient-text font-serif">
              LoveGarden
            </h1>
          </Link>
        </div>
      </div>

      <section className="space-y-10 relative z-10">
        <div 
          ref={categoryScrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar snap-x scroll-smooth px-4 max-w-4xl mx-auto py-2"
        >
          {categories.map((cat, idx) => (
            <Link 
              key={idx}
              href={`/texts?category=${encodeURIComponent(cat)}`}
              className="snap-center flex-shrink-0 px-6 py-3 rounded-2xl glass border border-primary/20 text-xs font-black whitespace-nowrap text-muted-foreground hover:text-primary hover:border-primary/40 hover:scale-110 transition-all active-spring shadow-sm bg-white/50"
            >
              {cat}
            </Link>
          ))}
        </div>

        <div 
          ref={actionsScrollRef}
          className="flex gap-5 overflow-x-auto pb-10 pt-4 no-scrollbar snap-x scroll-smooth px-4 max-w-5xl mx-auto justify-start lg:justify-center"
        >
          {quickActions.map((action) => (
            <Link 
              key={action.label}
              href={action.href}
              className="snap-center flex-shrink-0 group relative overflow-hidden glass rounded-[2.5rem] p-1 border-white/60 hover:scale-105 transition-all duration-500 shadow-2xl min-w-[200px] active-spring"
            >
              <div className="p-8 flex flex-col items-center gap-4 relative z-10">
                <div className={cn("p-6 rounded-[2rem] shadow-xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110", action.bg)}>
                  <action.icon className={cn("w-10 h-10", action.color)} />
                </div>
                <div className="text-center space-y-1">
                  <span className="font-black text-sm tracking-widest block uppercase gradient-text">{action.label}</span>
                  <div className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <span>Gundua</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none transition-transform duration-700 group-hover:scale-150 group-hover:-rotate-12">
                <action.icon size={120} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl shadow-inner">
              <Flame className="text-primary w-6 h-6 fill-current" />
            </div>
            <h2 className="text-3xl font-black tracking-tight drop-shadow-sm">{t.trending}</h2>
          </div>
          <Link href="/texts" className="text-primary font-black hover:underline flex items-center gap-1 active-spring transition-transform text-sm uppercase tracking-widest">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingTexts.map(text => (
            <TextCard key={text.id} text={text} />
          ))}
        </div>
      </section>

      <section className="py-12 relative z-10 px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="p-3 bg-accent/10 rounded-2xl shadow-inner">
            <Star className="text-accent w-6 h-6 fill-current" />
          </div>
          <h2 className="text-3xl font-black tracking-tight drop-shadow-sm">{t.vibe_day}</h2>
        </div>
        <div className="max-w-4xl mx-auto">
           {featuredQuote && <QuoteCard quote={featuredQuote} />}
        </div>
      </section>

      <footer className="text-center py-20 border-t border-white/10 opacity-60">
        <p className="font-bold tracking-[0.3em] uppercase text-[10px]">© 2024 LoveGarden • Swamedia Inc</p>
      </footer>
    </div>
  );
}
