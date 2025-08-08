import { Routes } from '@angular/router';
import { Summary } from './components/summary/summary';
import { Home } from './components/home/home';
import { Profile } from './components/profile/profile';
import { authGuard } from './guard/auth-guard';
//import { API } from './api/api.js';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'summary', component: Summary, canActivate: [authGuard] },
    { path: 'profile/:nom', component: Profile, canActivate: [authGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
  //  { path: 'api', component: API },
];
