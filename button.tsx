'use client';

import { useState, useMemo } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { TextCard } from '@/components/content/TextCard';
import { Search, SlidersHorizontal, Loader2, Sparkles, X, Check, ArrowDownWideNarrow, CalendarDays } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { LOVE_TEXTS } from '@/lib/data';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  'Romantic', 'Funny', 'Sad', 'Flirty', 'Emotional', 'Breakup', 'Deep Thinking',
  'Good morning messages', 'Good night messages', 'Valentine messages',
  'Crush quotes', 'Cute love messages', 'Deep love messages'
];

type SortOption = 'newest' | 'popular';

export default function TextsPage() {
  const { language } = useAppStore();
  const db = useFirestore();
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const textsQuery = useMemoFirebase(() => {
    return query(collection(db, 'loveTexts'), orderBy('createdAt', 'desc'), limit(100));
  }, [db]);

  const { data: dbTexts, loading } = useCollection(textsQuery);

  // Combine Firebase data with Static data
  const allTexts = useMemo(() => {
    const combined = [...(dbTexts || []), ...LOVE_TEXTS];
    
    // Sort logic
    if (sortBy === 'popular') {
      return combined.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }
    // Default newest (static ones don't have createdAt so they stay at bottom or stay as they are)
    return combined;
  }, [dbTexts, sortBy]);

  const filteredTexts = useMemo(() => {
    return allTexts.filter(text => {
      const matchesCategory = activeCategory === 'All' || text.category === activeCategory;
      const contentStr = text.content?.[language] || text.content?.['en'] || text.content?.['sw'] || '';
      const matchesSearch = contentStr.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allTexts, activeCategory, search, language]);

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 pb-40">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex p-3 rounded-2xl glass border-primary/20 mb-2">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-black gradient-text">Vibe Library</h1>
        <p className="text-muted-foreground font-medium">Explore thousands of ways to express your heart 🌸</p>
      </div>

      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl py-6 -mx-4 px-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search for words of love..." 
              className="pl-12 h-14 rounded-2xl glass border-white/40 focus:ring-primary shadow-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="h-14 px-8 glass rounded-2xl flex items-center justify-center gap-2 hover:bg-white/60 transition-all font-bold shadow-lg active-spring min-w-[140px]">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <span>Refine</span>
              </button>
            </SheetTrigger>
            <SheetContent className="rounded-l-[2.5rem] glass border-l-white/40 w-full sm:max-w-md p-0">
              <div className="flex flex-col h-full">
                <SheetHeader className="p-8 border-b border-white/20">
                  <SheetTitle className="text-2xl font-black flex items-center gap-2">
                    <SlidersHorizontal className="text-primary" /> Refine Search
                  </SheetTitle>
                </SheetHeader>
                
                <div className="flex-1 overflow-y-auto p-8 space-y-10">
                  {/* Sort Section */}
                  <div className="space-y-4">
                    <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Order By</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <button 
                        onClick={() => setSortBy('newest')}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl transition-all border-2",
                          sortBy === 'newest' ? "bg-primary/5 border-primary" : "bg-white/40 border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <CalendarDays className={cn("w-5 h-5", sortBy === 'newest' ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("font-bold", sortBy === 'newest' ? "text-primary" : "text-foreground")}>Newest Arrivals</span>
                        </div>
                        {sortBy === 'newest' && <Check className="w-5 h-5 text-primary" />}
                      </button>

                      <button 
                        onClick={() => setSortBy('popular')}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-2xl transition-all border-2",
                          sortBy === 'popular' ? "bg-primary/5 border-primary" : "bg-white/40 border-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <ArrowDownWideNarrow className={cn("w-5 h-5", sortBy === 'popular' ? "text-primary" : "text-muted-foreground")} />
                          <span className={cn("font-bold", sortBy === 'popular' ? "text-primary" : "text-foreground")}>Most Popular</span>
                        </div>
                        {sortBy === 'popular' && <Check className="w-5 h-5 text-primary" />}
                      </button>
                    </div>
                  </div>

                  {/* Categories Section */}
                  <div className="space-y-4">
                    <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveCategory('All')}
                        className={cn(
                          "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                          activeCategory === 'All' ? "bg-primary text-white" : "glass text-muted-foreground"
                        )}
                      >
                        All Vibes
                      </button>
                      {categories.map(cat => (
                        <button
                          key={cat}
                          onClick={() => setActiveCategory(cat)}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                            activeCategory === cat ? "bg-primary text-white" : "glass text-muted-foreground"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 border-t border-white/20">
                  <SheetClose asChild>
                    <Button className="w-full h-14 rounded-2xl font-black text-lg bg-primary">
                      Apply Filters
                    </Button>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveCategory('All')}
            className={`whitespace-nowrap px-8 py-3 rounded-full font-bold transition-all shadow-md ${
              activeCategory === 'All' 
                ? 'bg-primary text-white scale-105 shadow-primary/30' 
                : 'glass text-muted-foreground hover:bg-white/60'
            }`}
          >
            All Vibes
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-8 py-3 rounded-full font-bold transition-all shadow-md ${
                activeCategory === cat 
                  ? 'bg-primary text-white scale-105 shadow-primary/30' 
                  : 'glass text-muted-foreground hover:bg-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading && !dbTexts ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTexts.length > 0 ? (
            filteredTexts.map((text, idx) => (
              <TextCard key={text.id || `static-${idx}`} text={text as any} />
            ))
          ) : (
            <div className="col-span-full text-center py-32 glass rounded-[3rem] border-dashed border-2 border-primary/20">
              <p className="text-2xl font-bold text-muted-foreground">No matches found for this vibe.</p>
              <p className="text-muted-foreground mt-2">Try searching something else or browse all categories.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
