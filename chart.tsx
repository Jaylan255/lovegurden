'use client';

import { useState } from 'react';
import { Sparkles, Send, Loader2, Heart, Copy, Share2, MessageCircle, X } from 'lucide-react';
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
    setResult('');
    try {
      const { generatedText } = await generateLoveText({ prompt, mood, language });
      setResult(generatedText);
    } catch (error: any) {
      console.error("AI Generation failed:", error);
      const isQuotaError = error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED');
      
      toast({ 
        variant: 'destructive', 
        title: isQuotaError ? 'AI Cupid is Resting' : 'Connection Busy', 
        description: isQuotaError 
          ? 'Tafadhali subiri sekunde 10 (Quota limit). Jaribu tena punde!' 
          : 'Samahani, jaribu tena punde kidogo.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-full glass p-8 md:p-10 border-none shadow-none bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col">
      <div className="absolute top-0 right-0 p-8 text-primary/5 pointer-events-none">
        <Heart size={300} className="fill-current" />
      </div>

      <div className="relative z-10 space-y-8 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/20 rounded-[1.5rem] shadow-inner">
            <Sparkles className="text-primary w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-black gradient-text">AI Cupid</h2>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-widest">Create magic instantly</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Textarea 
              placeholder="E.g., 'A deep morning message for my wife who loves coffee and sunshine'"
              className="rounded-[2rem] border-primary/20 bg-white/60 backdrop-blur-md min-h-[160px] text-lg p-6 focus:ring-primary shadow-inner transition-all resize-none"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            {prompt && (
              <button 
                onClick={() => setPrompt('')}
                className="absolute top-4 right-4 p-1 hover:bg-primary/10 rounded-full transition-colors"
              >
                <X size={16} className="text-muted-foreground" />
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={mood} onValueChange={setMood}>
              <SelectTrigger className="w-full sm:w-[200px] h-14 rounded-2xl border-primary/20 glass font-bold">
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
              className="flex-1 rounded-2xl h-14 text-lg font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all bg-primary active-spring"
            >
              {loading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : <Send className="mr-2 h-6 w-6" />}
              Make Magic
            </Button>
          </div>
        </div>

        {result && (
          <div className="p-8 bg-white/90 dark:bg-black/90 rounded-[2.5rem] border border-primary/30 animate-in fade-in zoom-in duration-500 shadow-2xl group">
            <p className="text-xl font-bold leading-relaxed italic text-foreground/90 text-center">
              "{result}"
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Button 
                variant="outline"
                className="rounded-2xl h-12 px-6 font-bold gap-2 border-primary/20 hover:bg-primary/10" 
                onClick={() => {
                   navigator.clipboard.writeText(result);
                   toast({ title: "Copied!", description: "Message is ready to send." });
                }}
              >
                <Copy size={18} /> Copy Vibe
              </Button>
              <Button 
                className="rounded-2xl h-12 px-6 font-bold gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white" 
                onClick={() => {
                  window.open(`https://wa.me/?text=${encodeURIComponent(result)}`, '_blank');
                }}
              >
                <MessageCircle size={18} /> Share WhatsApp
              </Button>
            </div>
          </div>
        )}
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-pulse">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-sm font-black text-primary uppercase tracking-widest">Cupid is thinking...</p>
          </div>
        )}
      </div>
    </div>
  );
}
