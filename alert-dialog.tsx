'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Download, 
  Share2, 
  Play, 
  Image as ImageIcon, 
  Video, 
  RefreshCw, 
  Smartphone,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  ExternalLink,
  ShieldAlert,
  Zap,
  Search,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

interface StatusFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  blob: Blob;
  date: number;
}

export default function StatusSaverPage() {
  const [statuses, setStatuses] = useState<StatusFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [isIframe, setIsIframe] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [directoryHandle, setDirectoryHandle] = useState<any>(null);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  const openWhatsApp = () => {
    window.open('whatsapp://', '_blank');
    toast({ 
      title: "WhatsApp Opened", 
      description: "Tazama status kwanza kule, kisha urudi hapa kuzisave." 
    });
  };

  const scanDirectory = useCallback(async (handle: any) => {
    setIsScanning(true);
    const foundStatuses: StatusFile[] = [];
    
    // Function to recursively find files in directories
    async function deepScan(dirHandle: any) {
      try {
        for await (const entry of dirHandle.values()) {
          if (entry.kind === 'file') {
            const file = await entry.getFile();
            
            // Better detection logic: check MIME type OR file extension
            const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp)$/i.test(file.name);
            const isVideo = file.type.startsWith('video/') || /\.(mp4|3gp|mkv|mov)$/i.test(file.name);
            
            if (isImage || isVideo) {
              const type = isVideo ? 'video' : 'image';
              foundStatuses.push({
                id: `${dirHandle.name}_${entry.name}`,
                name: entry.name,
                type: type as 'image' | 'video',
                url: URL.createObjectURL(file),
                blob: file,
                date: file.lastModified
              });
            }
          } else if (entry.kind === 'directory') {
            // Recursively scan subfolders (like .Statuses)
            await deepScan(entry);
          }
        }
      } catch (e) {
        console.error("Error scanning directory entry:", e);
      }
    }

    try {
      await deepScan(handle);
      const sorted = foundStatuses.sort((a, b) => b.date - a.date);
      setStatuses(sorted);
      if (sorted.length === 0) {
        toast({ title: "No statuses found", description: "Hakikisha umechagua folder sahihi (WhatsApp Media)." });
      } else {
        toast({ title: "Success!", description: `Zimepatikana statuses ${sorted.length}.` });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Scan Error", description: "Imeshindikana kusoma statuses mpya." });
    } finally {
      setIsScanning(false);
    }
  }, []);

  const activateAutomaticDetection = async () => {
    if (isIframe) {
      toast({
        variant: "destructive",
        title: "Security Restriction",
        description: "Tafadhali fungua app kwenye Tab mpya (Open Live View) ili kuwezesha Automatic Sync."
      });
      return;
    }

    try {
      if ('showDirectoryPicker' in window) {
        toast({ 
          title: "Setup Required", 
          description: "Tafadhali bonyeza 'Allow' na uchague folder la WhatsApp Media." 
        });
        
        const handle = await (window as any).showDirectoryPicker();
        setDirectoryHandle(handle);
        await scanDirectory(handle);
        setHasPermission(true);
      } else {
        toast({ 
          variant: "destructive", 
          title: "Browser Not Supported", 
          description: "Tafadhali tumia Chrome au Edge kwenye Android." 
        });
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        toast({ 
          variant: "destructive", 
          title: "Detection Failed", 
          description: "Inabidi uthibitishe folder la WhatsApp ili app iweze kusoma picha." 
        });
      }
    }
  };

  const handleRefresh = () => {
    if (directoryHandle) {
      scanDirectory(directoryHandle);
    } else {
      activateAutomaticDetection();
    }
  };

  const downloadStatus = (status: StatusFile) => {
    const a = document.createElement('a');
    a.href = status.url;
    a.download = `LoveGarden_${status.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast({ title: "Saved!", description: "Imehifadhiwa kwenye Gallery." });
  };

  const shareStatus = async (status: StatusFile) => {
    try {
      const file = new File([status.blob], status.name, { type: status.blob.type });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'Shared via LoveGarden' });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent("Check this status on LoveGarden!")}`, '_blank');
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Share Failed" });
    }
  };

  const filteredStatuses = statuses.filter(s => 
    s.type === (activeTab === 'images' ? 'image' : 'video') &&
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!hasPermission) {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center p-6 space-y-8 animate-in fade-in duration-1000">
        <div className="relative">
          <div className="w-32 h-32 bg-[#25D366]/10 rounded-[3rem] flex items-center justify-center rotate-12">
            <Smartphone size={56} className="text-[#25D366] -rotate-12" />
          </div>
          <Zap className="absolute -top-2 -right-2 text-[#25D366] fill-current animate-pulse" />
        </div>

        <div className="text-center space-y-3 max-w-sm">
          <h1 className="text-4xl font-black gradient-text tracking-tighter">Automatic Detector</h1>
          <p className="text-muted-foreground font-medium text-sm leading-relaxed">
            Mfumo wetu unatafuta picha na video za WhatsApp automatic. Fuata hatua hizi:
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <Button 
            onClick={openWhatsApp}
            className="w-full h-16 rounded-2xl gap-3 text-lg font-black shadow-xl active-spring bg-[#25D366] hover:bg-[#128C7E] text-white"
          >
            <MessageCircle size={24} />
            1. Fungua WhatsApp (Tazama Status)
          </Button>

          <Card className="glass rounded-[2.5rem] p-8 space-y-6 border-white/40 shadow-2xl relative overflow-hidden">
            <div className="space-y-4">
              <Button 
                onClick={activateAutomaticDetection} 
                className="w-full h-16 rounded-2xl gap-3 text-lg font-black shadow-xl active-spring bg-primary"
              >
                <FolderOpen size={24} />
                2. Connect WhatsApp Media
              </Button>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <p className="text-[10px] text-amber-700 font-bold flex items-start gap-2 leading-relaxed text-left">
                  <AlertCircle size={14} className="flex-shrink-0" />
                  <span>KUMBUKA: Ukibonyeza, chagua folder la <strong>WhatsApp</strong> &gt; <strong>Media</strong>. App itatafuta statuses humo automatic.</span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-40 max-w-6xl mx-auto">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 glass p-8 rounded-[2.5rem] border-white/40 shadow-xl relative overflow-hidden bg-white/60">
        <div className="absolute top-0 right-0 p-4 text-primary/5 opacity-10 pointer-events-none">
          <Smartphone size={150} />
        </div>
        
        <div className="flex items-center gap-5 relative z-10">
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 text-primary">
              <ArrowLeft size={24} />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black gradient-text tracking-tighter">Status Library</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Connected & Scanning</p>
            </div>
          </div>
        </div>
        
        <div className="flex w-full md:w-auto gap-3 relative z-10">
           <Button 
            onClick={openWhatsApp}
            variant="outline"
            className="h-12 rounded-2xl glass border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/5 gap-2 px-6"
           >
             <ExternalLink size={18} /> Watch More
           </Button>
           <Button variant="outline" size="icon" className="h-12 w-12 rounded-2xl glass border-white/40 hover:bg-primary/5" onClick={handleRefresh}>
             <RefreshCw size={20} className={isScanning ? "animate-spin" : ""} />
           </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 h-16 rounded-[2rem] p-1.5 bg-white/30 backdrop-blur-xl border border-white/40 shadow-lg">
          <TabsTrigger value="images" className="rounded-2xl font-black data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
            <ImageIcon size={18} /> Photos <span className="text-[10px] opacity-60">({statuses.filter(s => s.type === 'image').length})</span>
          </TabsTrigger>
          <TabsTrigger value="videos" className="rounded-2xl font-black data-[state=active]:bg-primary data-[state=active]:text-white transition-all gap-2">
            <Video size={18} /> Videos <span className="text-[10px] opacity-60">({statuses.filter(s => s.type === 'video').length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="animate-in slide-in-from-bottom-6 duration-700">
          <div className="flex justify-between items-center mb-6 px-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground">Found {filteredStatuses.length} files</h2>
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
              <Input 
                  placeholder="Search..." 
                  className="pl-8 h-9 rounded-xl glass text-xs" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isScanning ? (
            <div className="py-32 text-center space-y-4">
              <Loader2 className="animate-spin text-primary h-12 w-12 mx-auto" />
              <p className="font-black text-muted-foreground uppercase tracking-widest">Scanning folder...</p>
            </div>
          ) : filteredStatuses.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredStatuses.map((status) => (
                <div key={status.id} className="group relative glass rounded-[2.5rem] overflow-hidden border-white/40 shadow-lg hover:scale-[1.03] transition-all duration-500 aspect-[9/16]">
                  {status.type === 'image' ? (
                    <img src={status.url} alt="Status" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="relative w-full h-full bg-black/10">
                      <video src={status.url} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white group-hover:scale-125 transition-transform">
                          <Play size={32} fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <div className="space-y-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => downloadStatus(status)}
                          className="flex-1 rounded-xl h-11 bg-white text-primary font-black text-xs gap-2 hover:bg-primary hover:text-white"
                        >
                          <Download size={14} /> SAVE
                        </Button>
                        <Button 
                          onClick={() => shareStatus(status)}
                          className="rounded-xl h-11 w-11 bg-primary text-white hover:scale-110 transition-transform"
                        >
                          <Share2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center space-y-6 glass rounded-[3rem] border-dashed border-2 border-primary/20 bg-white/40">
              <div className="relative inline-block">
                <RefreshCw size={64} className="mx-auto text-muted-foreground/20 animate-spin-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Smartphone size={24} className="text-primary opacity-40" />
                </div>
              </div>
              <div className="space-y-2 px-6">
                <p className="text-2xl font-black text-muted-foreground/60 italic">No Media Found</p>
                <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto leading-relaxed">
                  Tazama status mpya kwenye WhatsApp kisha urudi hapa na ubonyeze Refresh.
                </p>
                <Button 
                  onClick={handleRefresh}
                  variant="link"
                  className="text-primary font-black mt-2"
                >
                  Jaribu Kuscan Upya
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
