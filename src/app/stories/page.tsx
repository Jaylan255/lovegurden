'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Share2, 
  Heart, 
  Wand2, 
  Loader2, 
  Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { generateStory, type GenerateStoryOutput } from '@/ai/flows/generate-story-flow';
import { toast } from '@/hooks/use-toast';
import { STORIES } from '@/lib/data';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

export default function StoriesPage() {
  const { language } = useAppStore();
  const db = useFirestore();
  const [prompt, setPrompt] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStory, setAiStory] = useState<GenerateStoryOutput | null>(null);

  const storiesQuery = useMemoFirebase(() => {
    return query(collection(db, 'stories'), orderBy('createdAt', 'desc'), limit(50));
  }, [db]);

  const { data: dbStories, loading: storiesLoading } = useCollection(storiesQuery);

  // Combine dynamic and static stories
  const allStories = [...(dbStories || []), ...STORIES];

  const handleGenerateStory = async () => {
    if (!prompt) return;
    setAiLoading(true);
    try {
      const result = await generateStory({ prompt, language });
      setAiStory(result);
      toast({ title: "Story created!" });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error weaving story' });
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-12 py-8 max-w-5xl mx-auto px-4 pb-40">
      {/* AI Story Weaver Section */}
      <section className="relative overflow-hidden glass rounded-[3rem] p-8 md:p-12 mb-16 border-white/40 shadow-2xl bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="absolute top-0 right-0 p-8 text-primary/10 pointer-events-none">
          <BookOpen size={250} className="fill-current" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 bg-primary/20 rounded-[1.5rem] shadow-inner">
              <Wand2 className="text-primary w-10 h-10" />
            </div>
            <div>
              <h2 className="text-4xl font-black gradient-text">Create story with AI</h2>
              <p className="text-muted-foreground font-medium italic">Describe a vibe, and let AI weave a story for you.</p>
            </div>
          </div>

          <div className="space-y-6 max-w-2xl">
            <Textarea 
              placeholder="E.g., 'A romantic mystery set in Mwanza between two strangers...'"
              className="rounded-[2rem] border-primary/20 bg-background/50 backdrop-blur-md min-h-[120px] text-lg p-6 focus:ring-primary shadow-inner"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <Button 
              onClick={handleGenerateStory} 
              disabled={aiLoading || !prompt} 
              className="w-full sm:w-auto rounded-2xl h-14 px-10 text-xl font-black shadow-2xl bg-primary active-spring"
            >
              {aiLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Sparkles className="mr-2 h-6 w-6" />}
              start create
            </Button>
          </div>

          {aiStory && (
            <div className="mt-12 p-8 glass rounded-[2.5rem] border-primary/30 animate-in fade-in zoom-in duration-500 shadow-2xl bg-white/40">
              <h3 className="text-3xl font-black text-primary mb-8">{aiStory.title}</h3>
              <Accordion type="single" collapsible className="space-y-4">
                {aiStory.chapters.map((chapter) => (
                  <AccordionItem key={chapter.chapterNumber} value={`chapter-${chapter.chapterNumber}`} className="border-none bg-background/40 rounded-3xl px-6">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-4">
                        <span className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black">{chapter.chapterNumber}</span>
                        <span className="text-xl font-bold">{chapter.chapterTitle}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8 pt-2 text-muted-foreground leading-relaxed text-lg whitespace-pre-wrap italic">
                      {chapter.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </section>

      <div className="text-center space-y-4">
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
