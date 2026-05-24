'use client';

import { useState } from 'react';
import { Sparkles, Send, Loader2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateLoveText } from '@/ai/flows/generate-love-text';
import { toast } from '@/hooks/use-toast';
import { useAppStore } from '@/lib/store';

const aiMoods = [
  'Romantic', 'Flirty', 'Funny', 'Emotional', 'Deep Thinking', 
  'Good Morning', 'Good Night', 'Breakup', 'Valentine', 'Birthday'
];

export function AICupid() {
  const { language } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [mood, setMood] = useState('Romantic');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      // Pass the current app language to the AI flow
      const { generatedText } = await generateLoveText({ prompt, mood, language });
      setResult(generatedText);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to generate text. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden glass rounded-[3rem] p-8 md:p-12 mb-16 border-white/40 shadow-2xl">
      <div className="absolute top-0 right-0 p-8 text-primary/10 pointer-events-none">
        <Heart size={300} className="fill-current" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-primary/20 rounded-[1.5rem] shadow-inner">
            <Sparkles className="text-primary w-10 h-10" />
          </div>
          <div>
            <h2 className="text-4xl font-black">AI Cupid</h2>
            <p className="text-muted-foreground font-medium">Create custom magic in your preferred language.</p>
          </div>
        </div>

        <div className="space-y-6">
          <Textarea 
            placeholder="E.g., 'A deep morning message for my wife who loves coffee and sunshine'"
            className="rounded-[2rem] border-primary/20 bg-background/50 backdrop-blur-md min-h-[150px] text-xl p-8 focus:ring-primary shadow-inner transition-all"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger className="w-full sm:w-[250px] h-14 rounded-2xl border-primary/20 glass font-bold">
                <SelectValue placeholder="Select Vibe" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                {aiMoods.map(m => (
                  <SelectItem key={m} value={m} className="font-medium">{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              onClick={handleGenerate} 
              disabled={loading || !prompt} 
              className="flex-1 rounded-2xl h-14 text-xl font-black shadow-2xl shadow-primary/30 hover:scale-[1.05] transition-all bg-primary"
            >
              {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-6 w-6" />}
              Make Magic
            </Button>
          </div>
        </div>

        {result && (
          <div className="mt-12 p-8 bg-white/60 dark:bg-black/60 rounded-[2.5rem] border border-primary/30 animate-in fade-in zoom-in duration-500 shadow-2xl">
            <p className="text-2xl font-bold leading-relaxed italic text-foreground/90">"{result}"</p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Button className="rounded-xl h-12 px-6 font-bold" onClick={() => {
                 navigator.clipboard.writeText(result);
                 toast({ title: "Copied!", description: "Message is ready to send." });
              }}>Copy Vibe</Button>
              <Button variant="secondary" className="rounded-xl h-12 px-6 font-bold" onClick={() => {
                window.open(`https://wa.me/?text=${encodeURIComponent(result)}`, '_blank');
              }}>Share WhatsApp</Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
