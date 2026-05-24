'use client';

import { useState } from 'react';
import { useAuth, useFirestore, useUser, errorEmitter, FirestorePermissionError } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Loader2, Plus, LogIn, LogOut, ShieldCheck, Heart, Quote, BookOpen } from 'lucide-react';

export default function AdminPage() {
  const auth = useAuth();
  const db = useFirestore();
  const { user, loading: userLoading } = useUser();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Login Failed' });
    }
  };

  const handleLogout = () => signOut(auth);

  if (userLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-6">
        <div className="p-6 glass rounded-[3rem] space-y-6">
          <ShieldCheck size={64} className="mx-auto text-primary" />
          <h1 className="text-3xl font-black">Admin Access</h1>
          <p className="text-muted-foreground">Please sign in to manage your garden.</p>
          <Button onClick={handleLogin} className="w-full h-14 rounded-2xl gap-2 text-lg font-bold">
            <LogIn size={20} /> Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8">
      <div className="flex items-center justify-between glass p-6 rounded-3xl border-white/40">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
            <img src={user.photoURL || ''} alt="Admin" />
          </div>
          <div>
            <h1 className="font-black text-xl">{user.displayName}</h1>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
        <Button variant="ghost" onClick={handleLogout} className="rounded-full gap-2">
          <LogOut size={18} /> Logout
        </Button>
      </div>

      <Tabs defaultValue="texts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 h-14 rounded-2xl p-1 bg-white/20 backdrop-blur-md">
          <TabsTrigger value="texts" className="rounded-xl font-bold">Texts</TabsTrigger>
          <TabsTrigger value="quotes" className="rounded-xl font-bold">Quotes</TabsTrigger>
          <TabsTrigger value="stories" className="rounded-xl font-bold">Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="texts">
          <AddTextForm db={db} />
        </TabsContent>
        <TabsContent value="quotes">
          <AddQuoteForm db={db} />
        </TabsContent>
        <TabsContent value="stories">
          <AddStoryForm db={db} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AddTextForm({ db }: { db: any }) {
  const [form, setForm] = useState({ en: '', sw: '', category: 'Romantic' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      content: { en: form.en, sw: form.sw },
      category: form.category,
      likes: 0,
      createdAt: serverTimestamp()
    };
    
    addDoc(collection(db, 'loveTexts'), data)
      .then(() => {
        setForm({ en: '', sw: '', category: 'Romantic' });
        toast({ title: "Text Added!" });
        setLoading(false);
      })
      .catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'loveTexts',
          operation: 'create',
          requestResourceData: data
        }));
        setLoading(false);
      });
  };

  return (
    <Card className="glass rounded-[2.5rem] border-white/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Heart className="text-primary" /> Add New Love Text</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>English Content</Label>
            <Textarea value={form.en} onChange={e => setForm({...form, en: e.target.value})} placeholder="English text..." required />
          </div>
          <div className="space-y-2">
            <Label>Kiswahili Content</Label>
            <Textarea value={form.sw} onChange={e => setForm({...form, sw: e.target.value})} placeholder="Maandishi ya Kiswahili..." required />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <Input value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. Romantic, Funny..." required />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-black">
            {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Add Text
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function AddQuoteForm({ db }: { db: any }) {
  const [form, setForm] = useState({ en: '', sw: '', author: '', category: 'Love quotes', imageUrl: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      text: { en: form.en, sw: form.sw },
      author: form.author,
      category: form.category,
      imageUrl: form.imageUrl,
      createdAt: serverTimestamp()
    };

    addDoc(collection(db, 'quotes'), data)
      .then(() => {
        setForm({ en: '', sw: '', author: '', category: 'Love quotes', imageUrl: '' });
        toast({ title: "Quote Added!" });
        setLoading(false);
      })
      .catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'quotes',
          operation: 'create',
          requestResourceData: data
        }));
        setLoading(false);
      });
  };

  return (
    <Card className="glass rounded-[2.5rem] border-white/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Quote className="text-accent" /> Add New Quote</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>English Text</Label>
            <Textarea value={form.en} onChange={e => setForm({...form, en: e.target.value})} placeholder="Quote in English..." required />
          </div>
          <div className="space-y-2">
            <Label>Kiswahili Text</Label>
            <Textarea value={form.sw} onChange={e => setForm({...form, sw: e.target.value})} placeholder="Nukuu ya Kiswahili..." required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Author</Label>
              <Input value={form.author} onChange={e => setForm({...form, author: e.target.value})} placeholder="Author name" required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input value={form.category} onChange={e => setForm({...form, category: e.target.value})} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Image URL (Optional)</Label>
            <Input value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} placeholder="https://..." />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-black bg-accent">
            {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Add Quote
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function AddStoryForm({ db }: { db: any }) {
  const [form, setForm] = useState({ enTitle: '', swTitle: '', author: '', enExcerpt: '', swExcerpt: '', enContent: '', swContent: '', category: 'Romantic', readingTime: '5 min' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      title: { en: form.enTitle, sw: form.swTitle },
      excerpt: { en: form.enExcerpt, sw: form.swExcerpt },
      content: { en: form.enContent, sw: form.swContent },
      author: form.author,
      category: form.category,
      readingTime: form.readingTime,
      createdAt: serverTimestamp()
    };

    addDoc(collection(db, 'stories'), data)
      .then(() => {
        setForm({ enTitle: '', swTitle: '', author: '', enExcerpt: '', swExcerpt: '', enContent: '', swContent: '', category: 'Romantic', readingTime: '5 min' });
        toast({ title: "Story Added!" });
        setLoading(false);
      })
      .catch(async (err) => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'stories',
          operation: 'create',
          requestResourceData: data
        }));
        setLoading(false);
      });
  };

  return (
    <Card className="glass rounded-[2.5rem] border-white/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BookOpen className="text-primary" /> Add New Story</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>English Title</Label>
              <Input value={form.enTitle} onChange={e => setForm({...form, enTitle: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Kiswahili Title</Label>
              <Input value={form.swTitle} onChange={e => setForm({...form, swTitle: e.target.value})} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Author</Label>
              <Input value={form.author} onChange={e => setForm({...form, author: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <Label>Reading Time</Label>
              <Input value={form.readingTime} onChange={e => setForm({...form, readingTime: e.target.value})} placeholder="e.g. 5 min" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label>English Excerpt</Label>
            <Textarea value={form.enExcerpt} onChange={e => setForm({...form, enExcerpt: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label>English Full Content</Label>
            <Textarea className="min-h-[200px]" value={form.enContent} onChange={e => setForm({...form, enContent: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label>Kiswahili Excerpt</Label>
            <Textarea value={form.swExcerpt} onChange={e => setForm({...form, swExcerpt: e.target.value})} required />
          </div>
          <div className="space-y-2">
            <Label>Kiswahili Full Content</Label>
            <Textarea className="min-h-[200px]" value={form.swContent} onChange={e => setForm({...form, swContent: e.target.value})} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-black">
            {loading ? <Loader2 className="animate-spin" /> : <Plus size={20} />} Add Story
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
