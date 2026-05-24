'use client';

import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-12">
      <Link href="/">
        <Button variant="ghost" className="rounded-full gap-2 mb-8">
          <ArrowLeft size={18} /> Back to Garden
        </Button>
      </Link>

      <div className="glass rounded-[3rem] p-12 space-y-8 border-white/40">
        <div className="flex items-center gap-6">
          <div className="p-5 rounded-3xl bg-primary/10 text-primary">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-5xl font-black gradient-text">Privacy Policy</h1>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground font-medium">
          <p className="text-xl italic">Last updated: May 2024</p>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-foreground">1. Information We Collect</h2>
            <p>At LoveGarden, we respect your privacy. We do not store your personal information on our servers. Your favorites, likes, and settings are stored locally on your device.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-foreground">2. Usage Data</h2>
            <p>We use AI Cupid to generate personalized messages. The prompts you enter are processed by our AI to create the magic, but we do not store these conversations once your session ends.</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black text-foreground">3. Your Consent</h2>
            <p>By using LoveGarden, you consent to our privacy policy and the local storage of your preferences on your device.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
