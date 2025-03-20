import { Routes } from '@angular/router';

export default [
  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full',
  },
  {
    path: 'general',
    loadComponent: () =>
      import('@features/settings/general/general.component').then(
        m => m.GeneralComponent
      ),
  },
] as Routes;
