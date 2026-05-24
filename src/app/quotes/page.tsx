'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { QuoteCard } from '@/components/content/QuoteCard';
import { Sparkles, Loader2, Star } from 'lucide-react';
import { QUOTES } from '@/lib/data';

export default function QuotesPage() {
  const db = useFirestore();
  const quotesQuery = useMemoFirebase(() => {
    return query(collection(db, 'quotes'), orderBy('createdAt', 'desc'), limit(50));
  }, [db]);

  const { data: dbQuotes, loading } = useCollection(quotesQuery);

  // Combine dynamic and static quotes
  const allQuotes = [...(dbQuotes || []), ...QUOTES];

  return (
    <div className="space-y-12 py-8 px-4 pb-40 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl glass border-primary/20 mb-2">
          <Star className="w-8 h-8 text-accent" />
        </div>
        <h1 className="text-5xl font-black gradient-text">Wisdom Deck</h1>
        <p className="text-muted-foreground font-medium">Inspirational quotes about love, life and friendship.</p>
      </div>

      {loading && !dbQuotes ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allQuotes.map((quote, idx) => (
            <QuoteCard key={quote.id || `static-q-${idx}`} quote={quote as any} />
          ))}
        </div>
      )}

      <section className="glass rounded-[2.5rem] p-12 text-center space-y-6 mt-20 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 text-primary/5 pointer-events-none">
          <Sparkles size={200} />
        </div>
        <div className="p-4 bg-accent/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto relative z-10">
          <Sparkles className="text-accent w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black relative z-10">Daily Inspiration</h2>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto italic relative z-10">
          "The greatest thing you'll ever learn is just to love and be loved in return."
        </p>
        <p className="text-muted-foreground font-black uppercase tracking-widest text-xs relative z-10">— Eden Ahbez</p>
      </section>
    </div>
  );
}
