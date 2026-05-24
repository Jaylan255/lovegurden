'use client';

import { useAppStore, AppTheme, AnimationType, AppLanguage } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { TRANSLATIONS } from '@/lib/data';
import { WORLD_LANGUAGES, TRIBAL_LANGUAGES } from '@/lib/languages-data';
import { 
  Sparkles, Volume2, MousePointer2, Zap, Heart, Ghost, 
  Palette, Flower2, CloudRain, Star, Flame, Languages, 
  ChevronRight, ArrowLeft, Settings2, Search, Globe, Check
} from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type SettingsView = 'main' | 'language' | 'themes' | 'animations' | 'interactions';

const themes: { id: AppTheme; name: string; icon: string; color: string; category: 'Female' | 'Male' | 'Dark' }[] = [
  { id: 'default', name: 'Standard Love', icon: '💝', color: 'bg-primary', category: 'Female' },
  { id: 'pink-blossom', name: 'Pink Blossom', icon: '🌸', color: 'bg-pink-400', category: 'Female' },
  { id: 'barbie-glow', name: 'Barbie Glow', icon: '💖', color: 'bg-pink-600', category: 'Female' },
  { id: 'soft-purple', name: 'Purple Dream', icon: '💜', color: 'bg-purple-400', category: 'Female' },
  { id: 'rose-garden', name: 'Rose Garden', icon: '🌹', color: 'bg-red-500', category: 'Female' },
  { id: 'strawberry-milk', name: 'Strawberry', icon: '🍓', color: 'bg-red-200', category: 'Female' },
  { id: 'royal-blue', name: 'Royal Blue', icon: '💙', color: 'bg-blue-600', category: 'Male' },
  { id: 'dark-love', name: 'Dark Love', icon: '🖤', color: 'bg-black', category: 'Dark' },
  { id: 'midnight', name: 'Midnight', icon: '🌑', color: 'bg-slate-900', category: 'Dark' },
  { id: 'neon-love', name: 'Neon Cyber', icon: '⚡', color: 'bg-cyan-500', category: 'Dark' },
];

const animationTypes: { id: AnimationType; name: string; icon: any }[] = [
  { id: 'hearts', name: 'Floating Hearts', icon: Heart },
  { id: 'roses', name: 'Falling Roses', icon: Flower2 },
  { id: 'sparkles', name: 'Sparkles', icon: Star },
  { id: 'rain', name: 'Heart Rain', icon: CloudRain },
  { id: 'none', name: 'None', icon: Ghost },
];

export default function SettingsPage() {
  const { theme, language, updateTheme, updateLanguage, settings, updateSettings } = useAppStore();
  const [activeView, setActiveView] = useState<SettingsView>('main');
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const t = TRANSLATIONS[language] || TRANSLATIONS['sw'];

  const handleBack = () => setActiveView('main');

  const menuItems = [
    { id: 'language' as SettingsView, title: t.lang, icon: Languages, color: 'text-blue-500', bg: 'bg-blue-100' },
    { id: 'themes' as SettingsView, title: t.theme, icon: Palette, color: 'text-primary', bg: 'bg-primary/10' },
    { id: 'animations' as SettingsView, title: t.animation, icon: Sparkles, color: 'text-orange-500', bg: 'bg-orange-100' },
    { id: 'interactions' as SettingsView, title: t.interaction, icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-100' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 pb-40 px-4">
      <div className="text-center space-y-2 mb-10">
        <div className="inline-flex p-3 rounded-2xl glass border-primary/20 mb-4">
          <Settings2 className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-black gradient-text">{t.settings_title}</h1>
        <p className="text-muted-foreground font-medium italic">Your garden, your rules 🌸</p>
      </div>

      {activeView === 'main' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className="glass p-8 rounded-[2.5rem] border-white/40 flex items-center justify-between group hover:scale-[1.02] transition-all duration-300 shadow-xl"
            >
              <div className="flex items-center gap-6">
                <div className={cn("p-5 rounded-2xl shadow-inner transition-transform group-hover:rotate-12", item.bg)}>
                  <item.icon className={cn("w-8 h-8", item.color)} />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">Customize your {item.title.toLowerCase()}</p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </button>
          ))}
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <Button 
            variant="ghost" 
            onClick={handleBack} 
            className="mb-8 rounded-full h-12 px-6 gap-2 hover:bg-white/20"
          >
            <ArrowLeft size={18} /> Back to Menu
          </Button>

          {activeView === 'language' && <LanguageSubPage language={language} updateLanguage={updateLanguage} t={t} />}
          {activeView === 'themes' && <ThemesSubPage theme={theme} updateTheme={updateTheme} t={t} />}
          {activeView === 'animations' && <AnimationsSubPage settings={settings} updateSettings={updateSettings} t={t} />}
          {activeView === 'interactions' && <InteractionsSubPage settings={settings} updateSettings={updateSettings} t={t} />}
        </div>
      )}
    </div>
  );
}

function LanguageSubPage({ language, updateLanguage, t }: { language: AppLanguage, updateLanguage: (l: any) => void, t: any }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWorldLanguages = useMemo(() => {
    return WORLD_LANGUAGES.filter(lang => 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lang.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredTribalLanguages = useMemo(() => {
    return TRIBAL_LANGUAGES.filter(lang => 
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lang.region.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const currentLangData = useMemo(() => {
    return WORLD_LANGUAGES.find(l => l.id === language) || 
           (TRIBAL_LANGUAGES.find(l => l.id === language) as any);
  }, [language]);

  return (
    <div className="space-y-10 pb-10">
      <div className="space-y-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search language or country..." 
            className="pl-12 h-14 rounded-2xl glass border-white/40 shadow-xl focus:ring-primary text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {currentLangData && (
          <div className="p-6 glass rounded-3xl border-primary/30 flex items-center justify-between animate-in zoom-in duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-3xl">
                {currentLangData.flag || '📍'}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">Active Now</p>
                <h3 className="text-xl font-black">{currentLangData.name}</h3>
              </div>
            </div>
            <div className="p-2 bg-primary rounded-full text-white">
              <Check size={20} />
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-3 px-2">
            <Globe className="text-blue-500 w-5 h-5" />
            Global Languages
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x scroll-smooth">
            {filteredWorldLanguages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => updateLanguage(lang.id)}
                className={cn(
                  "snap-start flex-shrink-0 w-48 p-6 rounded-[2.5rem] glass transition-all duration-300 flex flex-col items-center gap-3 border-2",
                  language === lang.id ? "border-primary scale-105 shadow-2xl bg-white/80" : "border-transparent opacity-80 hover:opacity-100 hover:bg-white/40"
                )}
              >
                <span className="text-5xl mb-2 drop-shadow-md">{lang.flag}</span>
                <div className="text-center">
                  <span className="text-sm font-black block truncate">{lang.nativeName}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block truncate mt-1">{lang.region}</span>
                </div>
                {language === lang.id && <div className="mt-2 w-2 h-2 bg-primary rounded-full animate-ping" />}
              </button>
            ))}
            {filteredWorldLanguages.length === 0 && (
               <div className="w-full text-center py-10 text-muted-foreground font-medium italic">
                 No global languages found...
               </div>
            )}
          </div>
        </div>
      </div>

      {(language === 'sw' || filteredTribalLanguages.length > 0) && (
        <div className="space-y-6">
          <h2 className="text-xl font-black flex items-center gap-3 px-2">
            <Sparkles className="text-primary w-5 h-5" />
            Lugha za Makabila (TZ)
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-6 pt-2 no-scrollbar snap-x scroll-smooth">
            {filteredTribalLanguages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => updateLanguage(lang.id)}
                className={cn(
                  "snap-start flex-shrink-0 w-44 p-6 rounded-[2rem] glass transition-all duration-300 flex flex-col items-center gap-3 border-2",
                  language === lang.id ? "border-primary scale-105 shadow-2xl bg-white/80" : "border-transparent opacity-80 hover:opacity-100 hover:bg-white/40"
                )}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-2xl font-black text-primary">
                  {lang.label}
                </div>
                <div className="text-center">
                  <span className="text-sm font-black block">{lang.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mt-1">{lang.region}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ThemesSubPage({ theme, updateTheme, t }: { theme: AppTheme, updateTheme: (t: AppTheme) => void, t: any }) {
  return (
    <div className="space-y-12">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Flame className="text-pink-500" /> Female Aesthetic
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {themes.filter(tItem => tItem.category === 'Female').map((tItem) => (
            <ThemeButton key={tItem.id} theme={tItem} activeTheme={theme} onClick={updateTheme} />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Zap className="text-blue-500" /> Male & Dark Aesthetic
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {themes.filter(tItem => tItem.category !== 'Female').map((tItem) => (
            <ThemeButton key={tItem.id} theme={tItem} activeTheme={theme} onClick={updateTheme} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimationsSubPage({ settings, updateSettings, t }: { settings: any, updateSettings: any, t: any }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <Sparkles className="text-orange-500" /> Animation Style
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {animationTypes.map((anim) => (
          <button
            key={anim.id}
            onClick={() => updateSettings({ animationType: anim.id, animationsEnabled: anim.id !== 'none' })}
            className={cn(
              "p-8 rounded-[2.5rem] glass transition-all duration-300 flex items-center justify-between border-2",
              settings.animationType === anim.id ? "border-primary scale-105 shadow-2xl bg-white/60" : "border-transparent opacity-80"
            )}
          >
            <div className="flex items-center gap-6">
               <div className={cn("p-4 rounded-2xl bg-background shadow-inner", settings.animationType === anim.id ? "text-primary" : "text-muted-foreground")}>
                 <anim.icon className="w-8 h-8" />
               </div>
               <span className="text-lg font-bold">{anim.name}</span>
            </div>
            {settings.animationType === anim.id && <Star className="text-primary fill-primary w-5 h-5" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function InteractionsSubPage({ settings, updateSettings, t }: { settings: any, updateSettings: any, t: any }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold flex items-center gap-3">
        <Zap className="text-yellow-500" /> Interaction Effects
      </h2>
      <Card className="glass p-10 space-y-10 rounded-[3rem] border-white/40 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <Volume2 className="text-primary w-8 h-8" />
            </div>
            <div>
              <Label className="text-xl font-bold">Sound Effects</Label>
              <p className="text-sm text-muted-foreground">Soft romantic tones on click</p>
            </div>
          </div>
          <Switch 
            className="scale-125"
            checked={settings.soundEnabled} 
            onCheckedChange={(val) => updateSettings({ soundEnabled: val })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-accent/10 rounded-2xl">
              <MousePointer2 className="text-accent w-8 h-8" />
            </div>
            <div>
              <Label className="text-xl font-bold">Heart Popups</Label>
              <p className="text-sm text-muted-foreground">Floating emojis where you click</p>
            </div>
          </div>
          <Switch 
            className="scale-125"
            checked={settings.effectsEnabled} 
            onCheckedChange={(val) => updateSettings({ effectsEnabled: val })}
          />
        </div>
      </Card>
    </div>
  );
}

function ThemeButton({ theme, activeTheme, onClick }: { theme: any, activeTheme: AppTheme, onClick: (id: AppTheme) => void }) {
  const isActive = activeTheme === theme.id;
  return (
    <button
      onClick={() => onClick(theme.id)}
      className={cn(
        "p-6 rounded-[2.5rem] glass transition-all duration-300 flex flex-col items-center gap-4 border-2 group",
        isActive ? "border-primary scale-105 shadow-2xl bg-white/60" : "border-transparent opacity-80"
      )}
    >
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl transition-transform group-hover:scale-110", 
        theme.color
      )}>
        {theme.icon}
      </div>
      <div className="text-center">
        <span className="text-[10px] font-black uppercase tracking-widest block mb-1">{theme.name}</span>
        {isActive && <div className="h-1 w-8 bg-primary mx-auto rounded-full" />}
      </div>
    </button>
  );
}
