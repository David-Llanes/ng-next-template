import { Routes } from '@angular/router';
import { HomeComponent } from '@features/home.component';

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
      // PRUEBA (START) //
      { path: 'admin/laboratory/analyses', component: HomeComponent },
      { path: 'admin/laboratory/profiles', component: HomeComponent },
      { path: 'patient/patient-records', component: HomeComponent },
      { path: 'patient/medical-notes', component: HomeComponent },
      { path: 'patient/clinical-history', component: HomeComponent },
      { path: 'hemodialysis/patient/sessions', component: HomeComponent },
      { path: 'hemodialysis/patient/laboratories', component: HomeComponent },
      { path: 'hemodialysis/configuration', component: HomeComponent },
      { path: 'hemodialysis/configuration/laboratory', component: HomeComponent },
      { path: 'catalogs', component: HomeComponent },
      { path: 'catalogs/administration-routes', component: HomeComponent },
      { path: 'catalogs/allergies', component: HomeComponent },
      { path: 'catalogs/bacteria', component: HomeComponent },
      { path: 'catalogs/blood-types', component: HomeComponent },
      { path: 'catalogs/data-types', component: HomeComponent },
      { path: 'catalogs/diagnoses', component: HomeComponent },
      { path: 'catalogs/educational-attainments', component: HomeComponent },
      { path: 'catalogs/genders', component: HomeComponent },
      { path: 'catalogs/insurance-provider-types', component: HomeComponent },
      { path: 'catalogs/insurance-providers', component: HomeComponent },
      { path: 'catalogs/kinships', component: HomeComponent },
      { path: 'catalogs/loincs', component: HomeComponent },
      { path: 'catalogs/magnitudes', component: HomeComponent },
      { path: 'catalogs/marital-statuses', component: HomeComponent },
      { path: 'catalogs/measurement-units', component: HomeComponent },
      { path: 'catalogs/occupations', component: HomeComponent },
      { path: 'catalogs/procedure-types', component: HomeComponent },
      { path: 'catalogs/procedures', component: HomeComponent },
      { path: 'catalogs/religions', component: HomeComponent },
      { path: 'catalogs/symptom-types', component: HomeComponent },
      { path: 'catalogs/symptoms', component: HomeComponent },
      { path: 'organization', component: HomeComponent },
      { path: 'organization/wizard', component: HomeComponent },
      { path: 'organization/configuration', component: HomeComponent },
      // PRUEBA (END) //
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
