'use client';

import { useFavorites, useAppStore } from '@/lib/store';
import { LOVE_TEXTS, TRANSLATIONS } from '@/lib/data';
import { TextCard } from '@/components/content/TextCard';
import { Heart, User, Trash2, Quote, Settings, Sparkles, ChevronRight, Bookmark, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';

export default function ProfilePage() {
  const { favorites, clearAllFavorites } = useFavorites();
  const { language } = useAppStore();
  
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];
  
  const savedTexts = LOVE_TEXTS.filter(item => favorites.includes(item.id));
  const hasItems = savedTexts.length > 0;

  const quickLinks = [
    { href: '/quotes', label: 'Wisdom Deck', icon: Quote, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { href: '/settings', label: 'Settings', icon: Settings, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  ];

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto pb-40 px-4">
      {/* Header Profile Section */}
      <div className="flex flex-col items-center text-center gap-6 glass p-10 rounded-[3rem] border-white/40 relative overflow-hidden shadow-2xl">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 p-4 text-primary/5 opacity-10 pointer-events-none">
          <User size={200} fill="currentColor" />
        </div>
        
        <div className="relative">
          <div className="w-28 h-28 bg-gradient-to-br from-primary via-accent to-primary rounded-full p-1 shadow-2xl animate-pulse">
            <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
              <User size={48} className="text-primary" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-accent text-white p-2 rounded-xl shadow-lg">
            <Sparkles size={16} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black gradient-text tracking-tighter">Profile Hub</h1>
          <p className="text-muted-foreground font-medium italic">Your personalized garden of love.</p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-2">
          <div className="px-6 py-2 rounded-2xl glass border-primary/10 flex items-center gap-2">
            <Bookmark size={16} className="text-primary" />
            <span className="font-bold">{favorites.length} Saved</span>
          </div>
          <div className="px-6 py-2 rounded-2xl glass border-primary/10 flex items-center gap-2">
            <BarChart2 size={16} className="text-accent" />
            <span className="font-bold">Active Member</span>
          </div>
        </div>
      </div>

      {/* Hub Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {quickLinks.map((link) => (
          <Link 
            key={link.href} 
            href={link.href}
            className="glass group p-8 rounded-[2.5rem] border-white/40 flex items-center justify-between hover:scale-[1.05] transition-all duration-300 shadow-xl"
          >
            <div className="flex items-center gap-6">
              <div className={cn("p-5 rounded-2xl shadow-inner", link.bg)}>
                <link.icon className={cn("w-7 h-7", link.color)} />
              </div>
              <div>
                <span className="font-black text-xl tracking-tight block">{link.label}</span>
                <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Personalize</span>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>

      {/* Saved Texts Section */}
      <div className="space-y-8 pt-8">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-3xl font-black flex items-center gap-3">
            <Bookmark className="text-primary w-8 h-8" />
            My Saved Vibes
          </h2>
          {hasItems && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-destructive hover:bg-destructive/10 gap-2 rounded-full font-bold">
                  <Trash2 size={18} /> Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[2.5rem] glass">
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl font-black">Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground font-medium">
                    This will remove all your saved messages from the Profile Hub. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-2xl h-12">Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearAllFavorites} className="rounded-2xl h-12 bg-destructive text-white hover:bg-destructive/90">
                    Yes, Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        {hasItems ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedTexts.map(text => (
              <TextCard key={text.id} text={text} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass rounded-[3rem] border-dashed border-2 border-primary/20 space-y-6">
            <div className="relative inline-block">
              <Heart size={64} className="mx-auto text-primary/20 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Sparkles size={24} className="text-accent opacity-40" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-black text-muted-foreground/60 italic">Your garden is empty.</p>
              <p className="text-sm text-muted-foreground font-medium">Start exploring and save your favorite vibes here!</p>
            </div>
            <Button asChild className="mt-8 rounded-2xl h-14 px-10 shadow-2xl bg-primary text-lg font-black hover:scale-105 transition-transform">
               <Link href="/texts">Explore Vibes</Link>
            </Button>
          </div>
        )}
      </div>
      
      {/* Footer Branding */}
      <footer className="text-center py-20 opacity-40">
        <p className="font-bold tracking-widest uppercase text-[10px]">Your personal romantic retreat • LoveGurden</p>
      </footer>
    </div>
  );
}