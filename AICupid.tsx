import type {Metadata} from 'next';
import './globals.css';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/lib/store';
import { AppUIWrapper } from '@/components/layout/AppProvider';
import { FirebaseClientProvider } from '@/firebase';

export const metadata: Metadata = {
  title: 'LoveGarden | Modern Love Vibes Hub',
  description: 'Your one-stop destination for love texts, romantic stories, and inspirational quotes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">
        <FirebaseClientProvider>
          <AppProvider>
            <AppUIWrapper>
              <main className="container mx-auto px-4 pt-8 pb-40 relative z-10">
                {children}
              </main>
              <BottomNav />
              <Toaster />
            </AppUIWrapper>
          </AppProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
