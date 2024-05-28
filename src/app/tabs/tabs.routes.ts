import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const tabsRoutes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'transactions',
        loadComponent: () =>
          import('../transactions/transactions.page').then(
            (m) => m.TransactionsPage
          ),
      },
      {
        path: 'targets',
        loadComponent: () =>
          import('../targets/targets.page').then((m) => m.TargetsPage),
      },
      {
        path: 'targets/add',
        loadComponent: () =>
          import('../targets/target-form/target-form.page').then((m) => m.TargetFormPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
