import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';

export default [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
] as Routes;
