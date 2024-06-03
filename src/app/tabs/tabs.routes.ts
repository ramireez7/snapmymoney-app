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
        path: 'transactions/add',
        loadComponent: () =>
          import('../transactions/transaction-form/transaction-form.page').then(
            (m) => m.TransactionFormPage
          ),
      },
      {
        path: 'transactions/:id',
        loadComponent: () =>
          import(
            '../transactions/transaction-detail/transaction-detail.page'
          ).then((m) => m.TransactionDetailPage),
      },
      {
        path: 'targets',
        loadComponent: () =>
          import('../targets/targets.page').then((m) => m.TargetsPage),
      },
      {
        path: 'targets/add',
        loadComponent: () =>
          import('../targets/target-form/target-form.page').then(
            (m) => m.TargetFormPage
          ),
      },
      {
        path: 'targets/:id',
        loadComponent: () =>
          import(
            '../targets/target-detail/target-detail.page'
          ).then((m) => m.TargetDetailPage),
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
