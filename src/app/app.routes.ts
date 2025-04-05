import { Routes } from '@angular/router';

import { AppLayoutComponent } from '@layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from '@layouts/auth-layout/auth-layout.component';
import { SettingsLayoutComponent } from '@layouts/settings-layout/settings-layout.component';
import { NotFoundComponent } from '@shared/pages/not-found.component';
import { UnauthorizedComponent } from '@shared/pages/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@features/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'settings',
        component: SettingsLayoutComponent,
        loadChildren: () => import('@features/settings/settings.routes'),
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@features/auth/auth.routes'),
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
  { path: '**', redirectTo: '/not-found' },
];
