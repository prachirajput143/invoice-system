import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { provideRouter,Routes,withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import{ routes } from './app.routes';

import { provideRouter, withComponentInputBinding } from '@angular/router';




export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), // ✅ Fix Route Injection
    provideHttpClient(),
    provideClientHydration(withEventReplay())
  ]

  
};
