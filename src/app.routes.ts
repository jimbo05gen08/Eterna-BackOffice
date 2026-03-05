import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';

export const appRoutes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', component: Dashboard },
      { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
      { path: 'documentation', component: Documentation },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
      {
        path: 'company-management',
        children: [
          {
            path: 'company',
            loadComponent: () => import('./app/pages/company-management/company/company.component')
          },
          {
            path: 'company-services',
            loadComponent: () => import('./app/pages/company-management/company-services/company-services')
          }
        ]
      },
      {
        path: 'streaming-management',
        children: [
          {
            path: 'services',
            loadComponent: () => import('./app/pages/streaming-management/service-list/service-list.component')
          },
          {
            path: 'modules',
            loadComponent: () => import('./app/pages/streaming-management/modules/modules.component')
          }
        ]
      },
      {
        path: 'funeral-halls-management',
        children: [
          {
            path: 'services',
            loadComponent: () => import('./app/pages/funeral-halls-management/service-list/funeral-hall-service-list.component')
          },
          {
            path: 'funeral-halls',
            loadComponent: () => import('./app/pages/funeral-halls-management/funeral-halls/funeral-halls.component')
          }
        ]
      },
      {
        path: 'account-management',
        children: [
          {
            path: 'murals-list',
            loadComponent: () => import('./app/pages/account-management/mural-list/mural-list.component')
          },
          {
            path: 'accounts',
            loadComponent: () => import('./app/pages/account-management/accounts/accounts.component')
          },
          {
            path: 'digital-heir',
            loadComponent: () => import('./app/pages/account-management/digital-heir/digital-heir.component')
          }
        ]
      }
    ]
  },
  { path: 'landing', component: Landing },
  { path: 'notfound', component: Notfound },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' }
];
