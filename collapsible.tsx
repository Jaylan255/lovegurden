'use client';

import { Quote as QuoteIcon, Copy, Share2, Heart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Quote } from '@/lib/data';
import { toast } from '@/hooks/use-toast';
import { useAppStore } from '@/lib/store';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function QuoteCard({ quote }: { quote: Quote }) {
  const { language } = useAppStore();
  
  // Safe localization fallback
  const currentText = quote.text[language] || quote.text['en'] || quote.text['sw'] || '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${currentText} - ${quote.author}`);
    toast({ title: "Quote Copied!" });
  };

  const shareWhatsApp = () => {
    const text = encodeURIComponent(`"${currentText}" - ${quote.author}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const downloadQuote = () => {
    const content = `"${currentText}"\n\n— ${quote.author}\n\nShared via LoveGarden`;
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `quote_${quote.id || 'lovegarden'}.txt`;
    document.body.appendChild(element);
    element.click();
    toast({ title: "Downloaded!", description: "Quote saved to your device." });
  };

  return (
    <div className="glass group relative overflow-hidden rounded-[2.5rem] min-h-[400px] flex flex-col transition-all duration-500 hover:shadow-2xl border-white/30">
      {/* Background Image if exists */}
      {quote.imageUrl && (
        <div className="absolute inset-0 z-0">
          <Image 
            src={quote.imageUrl} 
            alt="Quote background" 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            data-ai-hint="romantic scenery"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-all duration-500" />
        </div>
      )}

      <div className="relative z-10 p-8 flex flex-col h-full flex-1">
        <div className="mb-6 flex justify-between items-start">
           <span className={cn(
             "px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase",
             quote.imageUrl ? "bg-white/20 text-white backdrop-blur-md" : "bg-accent/10 text-accent"
           )}>
            {quote.category}
          </span>
          <QuoteIcon className={cn("w-8 h-8 opacity-20", quote.imageUrl ? "text-white" : "text-primary")} />
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <p className={cn(
            "text-3xl font-black leading-tight mb-6 drop-shadow-lg",
            quote.imageUrl ? "text-white text-center" : "text-foreground"
          )}>
            "{currentText}"
          </p>
          <div className={cn(
            "w-12 h-1 bg-primary rounded-full mb-6",
            quote.imageUrl ? "mx-auto bg-white/40" : ""
          )} />
        </div>
        
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
          <span className={cn(
            "font-black text-sm tracking-tighter uppercase",
            quote.imageUrl ? "text-white/80" : "text-muted-foreground"
          )}>— {quote.author}</span>
          
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={downloadQuote}
              className={cn("rounded-xl", quote.imageUrl ? "text-white hover:bg-white/20" : "")}
              title="Download"
            >
              <Download className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={copyToClipboard}
              className={cn("rounded-xl", quote.imageUrl ? "text-white hover:bg-white/20" : "")}
              title="Copy"
            >
              <Copy className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={shareWhatsApp}
              className={cn("rounded-xl", quote.imageUrl ? "text-white hover:bg-white/20" : "")}
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={cn("rounded-xl", quote.imageUrl ? "text-white hover:bg-white/20" : "text-primary")}
            >
              <Heart className="w-5 h-5 group-hover:fill-current" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}