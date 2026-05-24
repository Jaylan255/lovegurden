'use client';

import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Share2, 
  Heart, 
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { STORIES } from '@/lib/data';

export default function StoriesPage() {
  const { language } = useAppStore();
  const db = useFirestore();

  const storiesQuery = useMemoFirebase(() => {
    return query(collection(db, 'stories'), orderBy('createdAt', 'desc'), limit(50));
  }, [db]);

  const { data: dbStories, loading: storiesLoading } = useCollection(storiesQuery);

  const allStories = [...(dbStories || []), ...STORIES];

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto px-4 pb-40">
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl glass border-primary/20 mb-2">
          <BookOpen className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-5xl font-black gradient-text">Library Classics</h1>
        <p className="text-muted-foreground font-medium">Escape into worlds of passion and drama.</p>
      </div>

      {storiesLoading && !dbStories ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-10 h-10" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allStories.map((story, idx) => {
            const title = story.title[language] || story.title['en'] || story.title['sw'] || '';
            const excerpt = story.excerpt[language] || story.excerpt['en'] || story.excerpt['sw'] || '';
            return (
              <div key={story.id || `static-s-${idx}`} className="glass group overflow-hidden rounded-[2.5rem] flex flex-col border-white/30 transition-all duration-500 hover:shadow-2xl">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                  <BookOpen className="w-16 h-16 text-primary opacity-40" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-md text-xs font-bold uppercase tracking-wider">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 space-y-4 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{story.readingTime} read</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">By {story.author}</span>
                  </div>
                  <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{title}</h2>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">{excerpt}</p>
                  <div className="pt-4 flex items-center justify-between">
                    <Button asChild variant="ghost" className="p-0 h-auto text-primary font-bold gap-2">
                      <Link href={`/stories/${story.id}`}>Read full story <ChevronRight size={18} /></Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon"><Heart size={20} /></Button>
                      <Button variant="ghost" size="icon"><Share2 size={20} /></Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
