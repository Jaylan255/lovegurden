export type Category = 
  | 'Break up quotes' | 'Broken heart quotes' | 'Christmas love message' 
  | 'Crush quotes' | 'Cute love messages' | 'Deep love messages' 
  | 'Flirty text messages' | 'Good morning messages' | 'Good night messages' 
  | 'Heart touch messages' | 'I love you messages' | 'I miss you messages' 
  | 'Kiss messages' | 'Long love messages' | 'Love message for husband' 
  | 'Love message for wife' | 'Love messages' | 'Love messages for boyfriend' 
  | 'Love message for girlfriend' | 'Love message for her' | 'Love message for him' 
  | 'Love quotes' | 'New year messages' | 'Romantic birthday wish' 
  | 'Romantic messages' | 'Romantic love messages' | 'Sad love quotes' 
  | 'Short love messages' | 'Valentine messages' | 'Romantic' | 'Funny' | 'Sad' | 'Flirty' | 'Emotional' | 'Breakup' | 'Deep Thinking'
  | 'Good morning messages' | 'Good night messages' | 'Valentine messages';

export interface LoveText {
  id: string;
  content: Record<string, string>;
  category: string;
  likes: number;
}

export interface Quote {
  id: string;
  text: Record<string, string>;
  author: string;
  category: string;
  imageUrl?: string;
}

export interface Story {
  id: string;
  title: Record<string, string>;
  author: string;
  excerpt: Record<string, string>;
  content: Record<string, string>;
  category: string;
  readingTime: string;
}

export const TRANSLATIONS: Record<string, any> = {
  sw: {
    home: "Nyumbani",
    texts: "Jumbe",
    stories: "Hadithi",
    profile: "Profile",
    settings: "Mipangilio",
    explore_texts: "Gundua Jumbe",
    read_stories: "Soma Hadithi",
    trending: "Zinazovuma",
    vibe_day: "Vibe la Leo",
    love_hub: "Profile Hub",
    settings_title: "Mipangilio",
    lang: "Lugha",
    theme: "Mandhari",
    animation: "Picha Jidadi",
    interaction: "Miguso",
  },
  en: {
    home: "Home",
    texts: "Texts",
    stories: "Stories",
    profile: "Profile",
    settings: "Settings",
    explore_texts: "Explore Texts",
    read_stories: "Read Stories",
    trending: "Trending",
    vibe_day: "Vibe of the Day",
    love_hub: "Profile Hub",
    settings_title: "Settings",
    lang: "Language",
    theme: "Theme",
    animation: "Animation",
    interaction: "Interaction",
  },
};

const generateTexts = (): LoveText[] => {
  const categories: string[] = [
    'Romantic', 'Funny', 'Sad', 'Flirty', 'Emotional', 'Breakup', 'Deep Thinking',
    'Good morning messages', 'Good night messages', 'Valentine messages'
  ];

  const texts: LoveText[] = [];
  categories.forEach(cat => {
    const baseSw = {
      'Romantic': "Upendo wako ni hazina yangu ya kipekee, sitachoka kukupenda daima.",
      'Funny': "Wewe ni kama WiFi, bila wewe maisha yangu hayana 'connection' kabisa.",
      'Sad': "Kukukosa ni kama kuishi kwenye giza nene pasipo mwanga wa mwezi wala nyota.",
      'Flirty': "Tabasamu lako ni sababu kuu ya mimi kuchelewa kulala kila siku nikiwaza uzuri wako.",
      'Emotional': "Kila pigo la moyo wangu linataja jina lako kwa heshima, unyenyekevu na upendo mkuu.",
      'Breakup': "Maumivu ya kukuacha ni kama donda lisilopona, lakini lazima nisonge mbele kwa amani.",
      'Deep Thinking': "Upendo ni safari ya kipekee ya roho mbili zinazotafuta amani katika dunia yenye fujo nyingi.",
      'Good morning messages': "Amka mpenzi wangu, jua limetoka kukukumbusha jinsi unavyong'aa maishani mwangu.",
      'Good night messages': "Lala salama malaika wangu, ndoto zako zijae maua mazuri na upendo wetu uliotukuka.",
      'Valentine messages': "Wewe ni Valentine wangu wa kila siku, kila saa, na kila dakika ya maisha yangu."
    }[cat] || "Upendo wako ni kila kitu kwangu.";

    const baseEn = {
      'Romantic': "Your love is my unique treasure, I will never tire of loving you forever.",
      'Funny': "You're like WiFi, without you my life has absolutely no connection.",
      'Sad': "Missing you is like living in thick darkness without moonlight or stars.",
      'Flirty': "Your smile is the main reason I stay up late every night thinking of your beauty.",
      'Emotional': "Every beat of my heart whispers your name with respect, humility and great love.",
      'Breakup': "The pain of leaving you is a wound that won't heal, but I must move on in peace.",
      'Deep Thinking': "Love is a unique journey of two souls seeking peace in a chaotic world.",
      'Good morning messages': "Wake up my love, the sun is out to remind you how you shine in my life.",
      'Good night messages': "Sleep well my angel, may your dreams be filled with beautiful flowers and our exalted love.",
      'Valentine messages': "You are my Valentine every day, every hour, and every minute of my life."
    }[cat] || "Your love is everything to me.";

    for (let i = 0; i < 50; i++) {
      texts.push({
        id: `static-text-${cat.toLowerCase().replace(/\s+/g, '-')}-${i}`,
        category: cat,
        likes: Math.floor(Math.random() * 5000) + 100,
        content: {
          sw: `${baseSw} (#${i + 1})`,
          en: `${baseEn} (#${i + 1})`,
          sk: `Ukunilonda kwako kuli bujinza wane o ku kwingi. (#${i + 1})`,
        }
      });
    }
  });

  return texts;
};

export const LOVE_TEXTS = generateTexts();

export const QUOTES: Quote[] = [
  { 
    id: 'static-q1', 
    text: {
      sw: "Upendo wa kweli hauna mwisho wa furaha, kwasababu upendo wa kweli hauishi.",
      en: "True love stories never have endings.",
      sk: "Ukunilonda kwa kwingi kutili bukimalo."
    }, 
    author: "Richard Bach", 
    category: 'Love quotes',
    imageUrl: "https://picsum.photos/seed/q1/800/600"
  },
  { 
    id: 'static-q2', 
    text: {
      sw: "Kupenda na kupendwa ni kuhisi jua kutoka pande zote mbili.",
      en: "To love and be loved is to feel the sun from both sides.",
      sk: "Ukunilonda na kulondwa kuli kwinywa kuli libali lyo kwingi."
    }, 
    author: "David Viscott", 
    category: 'Love quotes',
    imageUrl: "https://picsum.photos/seed/q2/800/600"
  },
  { 
    id: 'static-q3', 
    text: {
      sw: "Moyo unataka kile unachotaka. Hakuna mantiki kwa mambo hayo.",
      en: "The heart wants what it wants. There's no logic to these things.",
      sk: "Moyo ukulonda kintu ukulonda."
    }, 
    author: "Woody Allen", 
    category: 'Love quotes',
    imageUrl: "https://picsum.photos/seed/q3/800/600"
  }
];

export const STORIES: Story[] = [
  {
    id: 'static-s1',
    title: {
      sw: "Upendo wa Kichuo",
      en: "University Love",
      sk: "Ukunilonda wa Chuo"
    },
    author: "Mzee wa Mapenzi",
    excerpt: {
      sw: "Maisha ya chuo yaliwapa kila kitu, lakini je, yaliwapa upendo wa kudumu?",
      en: "College life gave them everything, but did it give them lasting love?",
      sk: "Bulogi bwa chuo bukwanila kila kintu, aliyo nung'uno?"
    },
    content: {
      sw: "Zulfa na Kevo walikutana katika maktaba ya chuo...",
      en: "Zulfa and Kevo met at the university library...",
      sk: "Zulfa and Kevo bakatingana mu maktaba ya chuo..."
    },
    category: 'Romantic',
    readingTime: '5 min'
  }
];
