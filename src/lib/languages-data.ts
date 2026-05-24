export interface WorldLanguage {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const WORLD_LANGUAGES: WorldLanguage[] = [
  { id: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', region: 'Americas/Europe' },
  { id: 'sw', name: 'Kiswahili', nativeName: 'Kiswahili', flag: '🇹🇿', region: 'East Africa' },
  { id: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', region: 'Europe/Africa' },
  { id: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', region: 'Europe/Latin America' },
  { id: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', region: 'Middle East' },
  { id: 'cn', name: 'Chinese', nativeName: '中文', flag: '🇨🇳', region: 'Asia' },
  { id: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', region: 'Europe' },
  { id: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', region: 'Europe' },
  { id: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', region: 'Europe/South America' },
  { id: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', region: 'Europe/Asia' },
  { id: 'jp', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', region: 'Asia' },
  { id: 'kr', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', region: 'Asia' },
  { id: 'in', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', region: 'Asia' },
  { id: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', region: 'Eurasia' },
  { id: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', region: 'Europe' },
  { id: 'za', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', region: 'Southern Africa' },
  { id: 'ng', name: 'Yoruba', nativeName: 'Èdè Yorùbá', flag: '🇳🇬', region: 'West Africa' },
  { id: 'et', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', region: 'East Africa' },
];

export const TRIBAL_LANGUAGES = [
  { id: 'sk', name: 'Kisukuma', label: 'SK', region: 'Mwanza/Shinyanga' },
  { id: 'ch', name: 'Kichaga', label: 'CH', region: 'Kilimanjaro' },
  { id: 'ms', name: 'Kimasai', label: 'MS', region: 'Arusha/Manyara' },
  { id: 'hy', name: 'Kihaya', label: 'HY', region: 'Kagera' },
  { id: 'ny', name: 'Kinyakyusa', label: 'NY', region: 'Mbeya' },
  { id: 'he', name: 'Kihehe', label: 'HE', region: 'Iringa' },
];
