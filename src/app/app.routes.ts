import { Routes } from '@angular/router';
import { loginActivateGuard } from './guards/login-activate.guard';
import { logoutActivateGuard } from './guards/logout-activate.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.tabsRoutes),
    canActivate: [loginActivateGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.authRoutes),
    canActivate: [logoutActivateGuard],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/tabs/home',
  },
  // Otras rutas
  { path: 'temp-route', redirectTo: '', pathMatch: 'full' }, // Ruta temporal
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.page').then((m) => m.TabsPage),
  },
];
