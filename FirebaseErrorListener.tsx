
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function KeyboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center animate-pulse">
        <p className="text-xl font-bold text-muted-foreground">Redirecting to Love Hub...</p>
      </div>
    </div>
  );
}
