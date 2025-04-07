import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'invoice', 
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) 
  } 
];
