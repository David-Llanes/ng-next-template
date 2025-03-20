import { Routes } from '@angular/router';

import { NotFoundComponent, UnauthorizedComponent } from '@shared/pages';
import {
  AppLayoutComponent,
  AuthLayoutComponent,
  SettingsLayoutComponent,
} from './layouts';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
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
