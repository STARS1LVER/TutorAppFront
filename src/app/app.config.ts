
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
      providers: [
            provideZoneChangeDetection({ eventCoalescing: true }),
            provideRouter(routes, withViewTransitions({
                  skipInitialTransition: true,
            })),
            provideHttpClient(),
            provideAnimations()
      ]
};