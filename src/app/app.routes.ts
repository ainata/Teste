import { Routes } from '@angular/router';
import { LayoutsComponent } from './layouts/layouts.component';
import { AuthGuard } from './auth/guard/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },
  {
    path: '',
    // canActivate: [NoAuthGuard],
    // canActivateChild: [NoAuthGuard],
    component: LayoutsComponent,
    data: {
        layout: 'empty'
    },
    children: [
        {path: 'sign-in', loadComponent: () => import('./auth/sign-in/sign-in.component').then((c) => c.SignInComponent)},
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutsComponent,
    data: {
        layout: 'classy'
    },
    children: [
        { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.component').then((c) => c.DashboardComponent)},
        { path: 'products/list', loadComponent: () => import('./product/list/list.component').then((c) => c.ListComponent)},
        { path: 'products/add', loadComponent: () => import('./product/add/add.component').then((c) => c.AddComponent)},
        { path: 'products/details/:id', loadComponent: () => import('./product/details/details.component').then((c) => c.DetailsComponent)},
    ]
  }
];
