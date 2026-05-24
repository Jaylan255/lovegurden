'use client';

import { Heart, Copy, Download, Share2, Send, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoveText } from '@/lib/data';
import { useFavorites, useLikes, useAppStore } from '@/lib/store';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function TextCard({ text }: { text: LoveText }) {
  const { language } = useAppStore();
  const { favorites, toggleFavorite } = useFavorites();
  const { likes, toggleLike } = useLikes();
  
  const isFavorite = favorites.includes(text.id);
  const currentLikes = (text.likes || 0) + (likes[text.id] || 0);

  // Fallback to English if the current language translation isn't available
  const content = text.content[language] || text.content['en'] || text.content['sw'];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast({ title: "Copied!", description: "Text copied to clipboard." });
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(content)}`, '_blank');
  };

  const downloadTxt = () => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "love_text.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="glass group rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] border-white/20">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase">
          {text.category}
        </span>
        <button 
          onClick={() => toggleFavorite(text.id)}
          className={cn("p-2 rounded-full transition-colors", isFavorite ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted")}
        >
          <Bookmark className={cn("w-5 h-5", isFavorite && "fill-current")} />
        </button>
      </div>
      
      <p className="text-lg leading-relaxed text-foreground/90 font-medium mb-8">
        "{content}"
      </p>

      <div className="flex flex-wrap items-center justify-between pt-4 border-t border-white/10 gap-2">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => toggleLike(text.id)}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors group/like"
          >
            <Heart className="w-5 h-5 group-hover/like:fill-current" />
            <span className="text-sm">{currentLikes}</span>
          </button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy">
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={downloadTxt} title="Download">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={shareWhatsApp} title="Share WhatsApp">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="secondary" size="sm" className="ml-2 gap-2 rounded-full px-4" onClick={shareWhatsApp}>
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">To Crush</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
