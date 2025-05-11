import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { provideAppDependencies, provideAppPrimeNg } from '@core/config/providers';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // ANGULAR PROVIDERS
    provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      })
    ),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    // APPLICATION PROVIDERS
    provideAppDependencies(),
    provideAppPrimeNg(),
  ],
};
