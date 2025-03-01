import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Import AngularFire compat modules:
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        projectId: "all-in-one-24dec",
        appId: "1:409979618069:web:43c6cd6a8f645705cfdf1c",
        storageBucket: "all-in-one-24dec.firebasestorage.app",
        apiKey: "AIzaSyBbj0s_7tKNgHkyaGpp3yy5PaTeN6m_uHg",
        authDomain: "all-in-one-24dec.firebaseapp.com",
        messagingSenderId: "409979618069"
      }),
      AngularFirestoreModule
    )
  ]
};
