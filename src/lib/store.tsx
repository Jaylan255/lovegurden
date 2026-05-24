'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AppTheme = 
  | 'default' | 'pink-blossom' | 'barbie-glow' | 'soft-purple' 
  | 'rose-garden' | 'dark-love' | 'royal-blue' 
  | 'midnight' | 'neon-love' | 'strawberry-milk';

export type AnimationType = 'hearts' | 'roses' | 'sparkles' | 'rain' | 'none';

export type AppLanguage = 'sw' | 'en' | 'sk' | 'ch' | 'ms' | 'hy' | 'fr' | 'es' | 'ar' | 'cn';

export interface AppSettings {
  soundEnabled: boolean;
  effectsEnabled: boolean;
  animationsEnabled: boolean;
  animationType: AnimationType;
  autoThemeSwitch: boolean;
}

interface AppContextType {
  theme: AppTheme;
  language: AppLanguage;
  settings: AppSettings;
  updateTheme: (newTheme: AppTheme) => void;
  updateLanguage: (newLang: AppLanguage) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  isLoaded: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>('default');
  const [language, setLanguage] = useState<AppLanguage>('sw');
  const [isLoaded, setIsLoaded] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    soundEnabled: true,
    effectsEnabled: true,
    animationsEnabled: true,
    animationType: 'hearts',
    autoThemeSwitch: false,
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('lovegurden_theme') as AppTheme;
    const savedLang = localStorage.getItem('lovegurden_lang') as AppLanguage;
    const savedSettings = localStorage.getItem('lovegurden_settings');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
    if (savedSettings) {
      try {
        setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
      } catch (e) {
        console.error("Failed to parse settings", e);
      }
    }
    
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const updateTheme = (newTheme: AppTheme) => {
    setTheme(newTheme);
    localStorage.setItem('lovegurden_theme', newTheme);
  };

  const updateLanguage = (newLang: AppLanguage) => {
    setLanguage(newLang);
    localStorage.setItem('lovegurden_lang', newLang);
  };

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('lovegurden_settings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ theme, language, settings, updateTheme, updateLanguage, updateSettings, isLoaded }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('lovegurden_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id];
      localStorage.setItem('lovegurden_favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    localStorage.setItem('lovegurden_favorites', JSON.stringify([]));
  };

  return { favorites, toggleFavorite, clearAllFavorites };
}

export function useLikes() {
  const [likes, setLikes] = useState<Record<string, number>>({});

  useEffect(() => {
    const saved = localStorage.getItem('lovegurden_likes');
    if (saved) {
      try {
        setLikes(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse likes", e);
      }
    }
  }, []);

  const toggleLike = (id: string) => {
    setLikes(prev => {
      const currentLikes = prev[id] || 0;
      const newLikes = { ...prev, [id]: currentLikes + 1 };
      localStorage.setItem('lovegurden_likes', JSON.stringify(newLikes));
      return newLikes;
    });
  };

  return { likes, toggleLike };
}