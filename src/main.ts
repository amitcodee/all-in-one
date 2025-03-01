// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "all-in-one-24dec",
        appId: "1:409979618069:web:43c6cd6a8f645705cfdf1c",
        storageBucket: "all-in-one-24dec.firebasestorage.app",
        apiKey: "AIzaSyBbj0s_7tKNgHkyaGpp3yy5PaTeN6m_uHg",
        authDomain: "all-in-one-24dec.firebaseapp.com",
        messagingSenderId: "409979618069"
      })
    ),
    provideFirestore(() => getFirestore())
  ]
});
