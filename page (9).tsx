'use client';

import { useState } from 'react';
import { 
  Heart, 
  Flame, 
  Gamepad2, 
  Calculator, 
  RefreshCw, 
  ArrowLeft, 
  Sparkles, 
  Trophy,
  Zap,
  Dices,
  MessageCircle,
  HelpCircle,
  Music,
  Smile,
  Ghost,
  Film,
  Wind,
  Moon,
  MapPin,
  Gift,
  Target,
  Glasses,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/lib/store';

export default function GamesPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12 pb-40">
      <div className="flex items-center justify-between">
        <Link href="/favorites">
          <Button variant="ghost" className="rounded-full gap-2 hover:bg-white/20">
            <ArrowLeft size={18} /> Back to Hub
          </Button>
        </Link>
        <div className="flex items-center gap-2 px-4 py-2 glass rounded-2xl border-accent/20">
          <Trophy size={16} className="text-yellow-500" />
          <span className="text-xs font-black uppercase tracking-widest">Master Player</span>
        </div>
      </div>

      <div className="text-center space-y-4">
        <div className="inline-flex p-4 bg-accent/10 rounded-[2rem] text-accent animate-bounce">
          <Gamepad2 size={48} />
        </div>
        <h1 className="text-5xl font-black gradient-text tracking-tighter">Love Games Hub</h1>
        <p className="text-muted-foreground font-medium max-w-md mx-auto italic">
          Fun & interactive games to strengthen your bond. No AI, just pure love!
        </p>
      </div>

      <Tabs defaultValue="mini-games" className="space-y-10">
        <TabsList className="grid w-full grid-cols-5 h-16 rounded-[2rem] p-1.5 bg-white/30 backdrop-blur-xl shadow-lg border border-white/40 overflow-x-auto no-scrollbar">
          <TabsTrigger value="mini-games" className="rounded-2xl font-black data-[state=active]:bg-primary data-[state=active]:text-white transition-all text-[10px] sm:text-xs">
            Mini Games
          </TabsTrigger>
          <TabsTrigger value="truth-dare" className="rounded-2xl font-black data-[state=active]:bg-blue-500 data-[state=active]:text-white transition-all text-[10px] sm:text-xs">
            Truth/Dare
          </TabsTrigger>
          <TabsTrigger value="would-you" className="rounded-2xl font-black data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all text-[10px] sm:text-xs">
            Would You
          </TabsTrigger>
          <TabsTrigger value="tools" className="rounded-2xl font-black data-[state=active]:bg-accent data-[state=active]:text-white transition-all text-[10px] sm:text-xs">
            Tools
          </TabsTrigger>
          <TabsTrigger value="challenges" className="rounded-2xl font-black data-[state=active]:bg-purple-500 data-[state=active]:text-white transition-all text-[10px] sm:text-xs">
            Challenges
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mini-games" className="space-y-8">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             <KissingMeter />
             <LoveFortune />
             <NicknameGenerator />
             <MoviePicker />
             <GoalSpinner />
             <HeartCatcher />
             <SongDedicator />
             <VirtualHug />
             <CrushSecret />
             <DatePlanner />
           </div>
        </TabsContent>

        <TabsContent value="truth-dare">
          <TruthOrDare />
        </TabsContent>

        <TabsContent value="would-you">
          <WouldYouRather />
        </TabsContent>

        <TabsContent value="tools" className="space-y-8">
          <LoveCalculator />
          <FlamesGame />
        </TabsContent>

        <TabsContent value="challenges">
          <DailyChallenges />
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* --- HELPER DATA FOR LOCAL GAMES --- */
const LOCAL_DATA = {
  nicknames: ['Malaika', 'Asali', 'Habibi', 'Sugar', 'Cupcake', 'Angel', 'Queen', 'King', 'Sunshine', 'Sweetie'],
  fortunes: [
    'Safari ya furaha inakuja kwenu hivi karibuni.',
    'Leo ni siku nzuri ya kutoa zawadi ndogo.',
    'Upendo wenu utazidi kuwa na nguvu kila kukicha.',
    'Kuna mshangao mkubwa unakuja leo!',
    'Moyo wako utatulia kwa amani leo.'
  ],
  movies: [
    'Titanic (1997): Hadithi ya kweli ya upendo wa milele.',
    'The Notebook (2004): Mapenzi yasiyofutika na muda.',
    'La La Land (2016): Ndoto na upendo kwenye muziki.',
    'About Time (2013): Kila sekunde ya upendo ina thamani.',
    'Siri ya Mtungi: Hadithi nzuri ya nyumbani.'
  ],
  goals: [
    'Kusafiri pamoja mwisho wa mwaka.',
    'Kujenga nyumba ya ndoto zetu.',
    'Kuwa na familia yenye furaha na amani.',
    'Kuanzisha biashara ya pamoja.',
    'Kusaidiana kufikia ndoto za kimasomo.'
  ],
  songs: [
    'Malaika - Miriam Makeba',
    'All of Me - John Legend',
    'Perfect - Ed Sheeran',
    'Baby - Diamond Platnumz',
    'Zuchu - Sukari'
  ],
  dates: [
    'Chakula cha jioni kwenye mwanga wa mshumaa.',
    'Kutazama jua likizama pwani.',
    'Movie night tukiwa tumetulia nyumbani.',
    'Kupika chakula kipya pamoja jikoni.',
    'Kwenda matembezi ya miguu jioni.'
  ],
  truth: [
    'Siri gani hujawahi kumwambia mpenzi wako?',
    'Ulijua lini kuwa unampenda?',
    'Kitu gani kinakuvutia zaidi kwake?',
    'Mara ya mwisho kulia ilikuwa lini na kwanini?'
  ],
  dare: [
    'Mtumie mpenzi wako ujumbe wa "I love you" sasa hivi.',
    'Mpigie mpenzi wako simu na umwimbie wimbo fupi.',
    'Mtumie picha yako ya sasa (Selfie) akiwa hajaitegemea.',
    'Mwambie mpenzi wako sifa 3 unazozipenda kwake sasa hivi.'
  ]
};

/* --- MINI GAMES COMPONENTS --- */

function KissingMeter() {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const measure = () => {
    setLoading(true);
    setScore(null);
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 41) + 60);
      setLoading(false);
    }, 1000);
  };

  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-primary">
        <Wind size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Kissing Meter</CardTitle>
      </div>
      <div className="h-20 flex items-center justify-center overflow-hidden">
        {loading ? (
          <Loader2 className="animate-spin text-primary" />
        ) : score ? (
          <div className="animate-in zoom-in text-center px-2">
            <span className="text-3xl font-black text-primary">{score}%</span>
            <p className="text-[10px] font-bold text-muted-foreground mt-1">Excellent Vibe!</p>
          </div>
        ) : (
          <Heart size={24} className="text-primary opacity-20" />
        )}
      </div>
      <Button onClick={measure} disabled={loading} className="w-full h-10 rounded-xl bg-primary shadow-lg font-black text-xs">
        Measure
      </Button>
    </Card>
  );
}

function LoveFortune() {
  const [fortune, setFortune] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getFortune = () => {
    setLoading(true);
    setTimeout(() => {
      setFortune(LOCAL_DATA.fortunes[Math.floor(Math.random() * LOCAL_DATA.fortunes.length)]);
      setLoading(false);
    }, 800);
  };

  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-accent">
        <Sparkles size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Fortune</CardTitle>
      </div>
      <div className="h-20 flex items-center justify-center italic text-[11px] font-medium px-4 leading-tight overflow-hidden">
        {loading ? <Loader2 className="animate-spin text-accent" /> : fortune || "Get your love prediction..."}
      </div>
      <Button onClick={getFortune} disabled={loading} className="w-full h-10 rounded-xl bg-accent shadow-lg font-black text-xs">
        Ask Cupid
      </Button>
    </Card>
  );
}

function NicknameGenerator() {
  const [name, setName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setName(LOCAL_DATA.nicknames[Math.floor(Math.random() * LOCAL_DATA.nicknames.length)]);
      setLoading(false);
    }, 800);
  };

  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-purple-500">
        <Smile size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Pet Names</CardTitle>
      </div>
      <div className="h-20 flex items-center justify-center">
        {loading ? <Loader2 className="animate-spin text-purple-500" /> : <span className="text-lg font-black text-purple-600 px-2">{name || "???"}</span>}
      </div>
      <Button onClick={generate} disabled={loading} className="w-full h-10 rounded-xl bg-purple-500 shadow-lg font-black text-xs">Generate</Button>
    </Card>
  );
}

function MoviePicker() {
  const [movieInfo, setMovieInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pick = () => {
    setLoading(true);
    setTimeout(() => {
      setMovieInfo(LOCAL_DATA.movies[Math.floor(Math.random() * LOCAL_DATA.movies.length)]);
      setLoading(false);
    }, 800);
  };

  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-red-500">
        <Film size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Cinema</CardTitle>
      </div>
      <div className="h-20 flex flex-col items-center justify-center px-2">
        {loading ? <Loader2 className="animate-spin text-red-500" /> : movieInfo ? (
          <p className="text-[10px] font-bold text-center leading-tight">{movieInfo}</p>
        ) : (
          <span className="text-[11px] font-medium text-muted-foreground italic">Find a movie...</span>
        )}
      </div>
      <Button onClick={pick} disabled={loading} className="w-full h-10 rounded-xl bg-red-500 shadow-lg font-black text-xs">Suggest</Button>
    </Card>
  );
}

function GoalSpinner() {
  const [goal, setGoal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const spin = () => {
    setLoading(true);
    setTimeout(() => {
      setGoal(LOCAL_DATA.goals[Math.floor(Math.random() * LOCAL_DATA.goals.length)]);
      setLoading(false);
    }, 800);
  };

  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-green-500">
        <Target size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Goal</CardTitle>
      </div>
      <div className="h-20 flex items-center justify-center px-4 overflow-hidden">
        {loading ? <Loader2 className="animate-spin text-green-500" /> : <span className="text-[11px] font-bold text-center">{goal || "Let's plan..."}</span>}
      </div>
      <Button onClick={spin} disabled={loading} className="w-full h-10 rounded-xl bg-green-500 shadow-lg font-black text-xs">Spin</Button>
    </Card>
  );
}

function HeartCatcher() {
  const [score, setScore] = useState(0);
  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-pink-500">
        <Zap size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Heart Tap</CardTitle>
      </div>
      <div className="h-20 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-pink-500">{score}</span>
        <p className="text-[9px] font-bold text-muted-foreground uppercase">Captured</p>
      </div>
      <Button onClick={() => setScore(s => s + 1)} className="w-full h-10 rounded-xl bg-pink-500 shadow-lg font-black text-xs">TAP! ❤️</Button>
    </Card>
  );
}

function SongDedicator() {
  const [song, setSong] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getSong = () => {
    setLoading(true);
    setTimeout(() => {
      setSong(LOCAL_DATA.songs[Math.floor(Math.random() * LOCAL_DATA.songs.length)]);
      setLoading(false);
    }, 800);
  };

  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-indigo-500">
        <Music size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Song Picker</CardTitle>
      </div>
      <div className="h-20 flex items-center justify-center text-[11px] font-bold text-indigo-600 italic px-4 text-center overflow-hidden">
        {loading ? <Loader2 className="animate-spin text-indigo-500" /> : song || "Send a song..."}
      </div>
      <Button onClick={getSong} disabled={loading} className="w-full h-10 rounded-xl bg-indigo-500 shadow-lg font-black text-xs">Pick Song</Button>
    </Card>
  );
}

function VirtualHug() {
  const [hugging, setHugging] = useState(false);
  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-orange-500">
        <Heart size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Hug Sender</CardTitle>
      </div>
      <div className="h-20 flex items-center justify-center">
        {hugging ? <div className="animate-bounce text-4xl">🫂❤️</div> : <div className="text-3xl opacity-20">🫂</div>}
      </div>
      <Button 
        onClick={() => {
          setHugging(true);
          setTimeout(() => setHugging(false), 2000);
          toast({ title: "Hug Sent!" });
        }} 
        className="w-full h-10 rounded-xl bg-orange-500 shadow-lg font-black text-xs"
      >
        Send Hug
      </Button>
    </Card>
  );
}

function CrushSecret() {
  const [initials, setInitials] = useState('');
  const [revealed, setRevealed] = useState(false);

  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-slate-500">
        <Ghost size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Match Check</CardTitle>
      </div>
      <div className="h-20 flex flex-col items-center justify-center gap-2">
        {revealed ? (
          <div className="animate-in slide-in-from-top-2">
            <span className="text-md font-black text-slate-700">Match: {initials}!</span>
          </div>
        ) : (
          <Input 
            placeholder="Initials J.D" 
            value={initials} 
            onChange={e => setInitials(e.target.value)}
            className="h-8 rounded-xl glass text-center font-bold text-xs"
          />
        )}
      </div>
      <Button onClick={() => setRevealed(!revealed)} className="w-full h-10 rounded-xl bg-slate-600 text-white font-black text-xs">
        {revealed ? 'Reset' : 'Check'}
      </Button>
    </Card>
  );
}

function DatePlanner() {
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getPlan = () => {
    setLoading(true);
    setTimeout(() => {
      setPlan(LOCAL_DATA.dates[Math.floor(Math.random() * LOCAL_DATA.dates.length)]);
      setLoading(false);
    }, 800);
  };

  return (
    <Card className="glass rounded-[2rem] p-6 text-center space-y-4 hover:scale-105 transition-transform">
      <div className="flex items-center justify-center gap-2 text-teal-500">
        <MapPin size={20} />
        <CardTitle className="text-lg font-black uppercase tracking-tight">Date Plan</CardTitle>
      </div>
      <div className="h-20 flex items-center justify-center px-4 overflow-hidden">
        {loading ? <Loader2 className="animate-spin text-teal-500" /> : <span className="text-[11px] font-bold text-center italic">{plan || "Plan a date..."}</span>}
      </div>
      <Button onClick={getPlan} disabled={loading} className="w-full h-10 rounded-xl bg-teal-500 shadow-lg font-black text-xs">Plan</Button>
    </Card>
  );
}

/* --- GAME LOGIC FOR TABS --- */

function TruthOrDare() {
  const [current, setCurrent] = useState<{ type: 'Truth' | 'Dare', content: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const getRandom = (type: 'Truth' | 'Dare') => {
    setLoading(true);
    setTimeout(() => {
      const pool = type === 'Truth' ? LOCAL_DATA.truth : LOCAL_DATA.dare;
      setCurrent({ type, content: pool[Math.floor(Math.random() * pool.length)] });
      setLoading(false);
    }, 600);
  };

  return (
    <Card className="glass rounded-[3rem] border-white/40 shadow-2xl p-8 space-y-8 animate-in zoom-in duration-500">
      <div className="text-center space-y-2">
        <CardTitle className="text-3xl font-black flex items-center justify-center gap-2">
          <HelpCircle className="text-primary" /> Truth or Dare
        </CardTitle>
      </div>

      <div className="min-h-[150px] flex items-center justify-center p-8 border-2 border-dashed border-primary/20 rounded-[2.5rem] bg-primary/5">
        {loading ? (
          <Loader2 className="animate-spin text-primary w-12 h-12" />
        ) : current ? (
          <div className="text-center space-y-3 animate-in fade-in">
             <span className={cn(
               "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
               current.type === 'Truth' ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600"
             )}>{current.type}</span>
             <p className="text-xl font-bold italic leading-relaxed">"{current.content}"</p>
          </div>
        ) : (
          <p className="text-muted-foreground italic">Choose your fate...</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button onClick={() => getRandom('Truth')} disabled={loading} className="h-16 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-black text-lg">
          Truth
        </Button>
        <Button onClick={() => getRandom('Dare')} disabled={loading} className="h-16 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black text-lg">
          Dare
        </Button>
      </div>
    </Card>
  );
}

function WouldYouRather() {
  const scenarios = [
    'Safari ya milimani au Baharini?',
    'Kupika pamoja au kuagiza chakula?',
    'Mpendwa wako awe na akili sana au mcheshi sana?',
    'Kuishi kwenye jiji kubwa au kijijini kwa amani?',
    'Kuwa na uwezo wa kusoma mawazo au kuruka?',
  ];
  const [current, setCurrent] = useState<string | null>(null);

  const next = () => {
    setCurrent(scenarios[Math.floor(Math.random() * scenarios.length)]);
  };

  return (
    <Card className="glass rounded-[3rem] border-white/40 shadow-2xl p-8 space-y-8">
      <div className="text-center space-y-2">
        <CardTitle className="text-3xl font-black flex items-center justify-center gap-2">
          <Dices className="text-green-500" /> Would You Rather
        </CardTitle>
      </div>
      <div className="min-h-[180px] flex items-center justify-center p-8 border-2 border-dashed border-green-200 rounded-[2.5rem] bg-green-50/50">
        {current ? (
          <p className="text-xl font-bold text-green-700 leading-relaxed italic animate-in zoom-in">"{current}"</p>
        ) : (
          <p className="text-muted-foreground opacity-50 italic">Ready for a dilemma?</p>
        )}
      </div>
      <Button onClick={next} className="w-full h-16 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-lg shadow-xl">
        Next Dilemma
      </Button>
    </Card>
  );
}

function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = () => {
    if (!name1 || !name2) return;
    setLoading(true);
    setTimeout(() => {
      setResult(Math.floor(Math.random() * 41) + 60);
      setLoading(false);
    }, 1500);
  };

  return (
    <Card className="glass rounded-[3rem] border-white/40 shadow-2xl p-8 space-y-8">
      <div className="text-center space-y-2">
        <CardTitle className="text-3xl font-black">Love Meter</CardTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input placeholder="Your Name" value={name1} onChange={e => setName1(e.target.value)} className="h-14 rounded-2xl glass text-center font-bold" />
        <Input placeholder="Partner's Name" value={name2} onChange={e => setName2(e.target.value)} className="h-14 rounded-2xl glass text-center font-bold" />
      </div>
      <Button onClick={calculate} disabled={loading} className="w-full h-16 rounded-2xl bg-primary text-xl font-black shadow-xl">
        {loading ? <RefreshCw className="animate-spin" /> : 'Calculate'}
      </Button>
      {result !== null && (
        <div className="text-center animate-in zoom-in">
          <span className="text-5xl font-black text-primary">{result}%</span>
          <p className="text-sm font-bold mt-2">Perfect Connection!</p>
        </div>
      )}
    </Card>
  );
}

function FlamesGame() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<{char: string, label: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateFlames = () => {
    if (!name1 || !name2) return;
    setLoading(true);
    setTimeout(() => {
      const flames = [
        { char: 'F', label: 'Friends' },
        { char: 'L', label: 'Lovers' },
        { char: 'A', label: 'Affection' },
        { char: 'M', label: 'Marriage' },
        { char: 'E', label: 'Enemies' },
        { char: 'S', label: 'Siblings' }
      ];
      setResult(flames[Math.floor(Math.random() * flames.length)]);
      setLoading(false);
    }, 1200);
  };

  return (
    <Card className="glass rounded-[3rem] border-white/40 shadow-2xl p-8 space-y-8">
      <div className="text-center space-y-2">
        <CardTitle className="text-3xl font-black flex items-center justify-center gap-2">
          <Flame className="text-accent" /> FLAMES Prediction
        </CardTitle>
      </div>
      <div className="space-y-4">
        <Input placeholder="Your Name" className="h-14 rounded-2xl glass text-center font-bold" value={name1} onChange={(e) => setName1(e.target.value)} />
        <Input placeholder="Crush Name" className="h-14 rounded-2xl glass text-center font-bold" value={name2} onChange={(e) => setName2(e.target.value)} />
      </div>
      <Button onClick={calculateFlames} disabled={loading} className="w-full h-16 rounded-2xl bg-accent text-white font-black text-lg">
        Predict Future
      </Button>
      {result && (
        <div className="text-center p-8 bg-accent/10 rounded-[2.5rem] animate-in zoom-in">
           <span className="text-6xl font-black text-accent block mb-2">{result.char}</span>
           <span className="text-2xl font-black uppercase tracking-[0.3em]">{result.label}</span>
        </div>
      )}
    </Card>
  );
}

function DailyChallenges() {
  const [challenge, setChallenge] = useState<string | null>(null);
  const challenges = [
    'Mtumie mpenzi wako ujumbe wa asubuhi wenye hisia.',
    'Pikeni chakula pamoja leo jioni.',
    'Mwambie mpenzi wako kitu kimoja kipya unachokipenda kwake.',
    'Kumbatiana kwa sekunde 20 bila kusema chochote.',
    'Panga safari ndogo ya matembezi mwisho wa wiki.',
  ];

  const getNewChallenge = () => {
    setChallenge(challenges[Math.floor(Math.random() * challenges.length)]);
  };

  return (
    <Card className="glass rounded-[3rem] border-white/40 shadow-2xl p-8 space-y-8 text-center">
      <div className="space-y-2">
        <CardTitle className="text-3xl font-black">Daily Challenge</CardTitle>
      </div>
      <div className="min-h-[150px] flex items-center justify-center p-8 border-2 border-dashed border-purple-300 rounded-[2.5rem] bg-purple-50/50">
        {challenge ? (
          <p className="text-xl font-bold text-purple-700 leading-relaxed italic animate-in fade-in">"{challenge}"</p>
        ) : (
          <p className="text-muted-foreground opacity-50 italic">Pick your mission!</p>
        )}
      </div>
      <Button onClick={getNewChallenge} className="w-full h-16 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-lg shadow-xl">
        Give Me a Task
      </Button>
    </Card>
  );
}
