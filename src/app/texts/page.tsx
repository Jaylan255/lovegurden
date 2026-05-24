'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { TextCard } from '@/components/content/TextCard';
import { Search, SlidersHorizontal, Loader2, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/lib/store';
import { LOVE_TEXTS } from '@/lib/data';

const categories = [
  'Romantic', 'Funny', 'Sad', 'Flirty', 'Emotional', 'Breakup', 'Deep Thinking',
  'Good morning messages', 'Good night messages', 'Valentine messages',
  'Crush quotes', 'Cute love messages', 'Deep love messages'
];

export default function TextsPage() {
  const { language } = useAppStore();
  const db = useFirestore();
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');
  const [search, setSearch] = useState('');

  const textsQuery = useMemoFirebase(() => {
    return query(collection(db, 'loveTexts'), orderBy('createdAt', 'desc'), limit(100));
  }, [db]);

  const { data: dbTexts, loading } = useCollection(textsQuery);

  // Combine Firebase data with Static data
  const allTexts = [...(dbTexts || []), ...LOVE_TEXTS];

  const filteredTexts = allTexts.filter(text => {
    const matchesCategory = activeCategory === 'All' || text.category === activeCategory;
    const contentStr = text.content?.[language] || text.content?.['en'] || text.content?.['sw'] || '';
    const matchesSearch = contentStr.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <button className="h-14 px-8 glass rounded-2xl flex items-center gap-2 hover:bg-white/60 transition-all font-bold shadow-lg">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Refine</span>
          </button>
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
