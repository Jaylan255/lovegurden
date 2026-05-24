
'use client';

import React, { useMemo } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from './config';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const firebase = useMemo(() => {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    const db = getFirestore(app);
    const auth = getAuth(app);
    return { app, db, auth };
  }, []);

  return (
    <FirebaseProvider app={firebase.app} db={firebase.db} auth={firebase.auth}>
      {children}
    </FirebaseProvider>
  );
}
