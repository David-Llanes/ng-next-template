import { EnvironmentProviders } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from 'src/styles/prime-ng/my-theme';

export function provideAppPrimeNg(): EnvironmentProviders {
  return providePrimeNG({
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: '.my-app-dark',
        cssLayer: {
          name: 'primeng',
          order: 'theme, base, primeng',
        },
      },
    },
  });
}
