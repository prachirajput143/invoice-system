import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', redirectTo: 'product', pathMatch: 'full' }, // ✅ correct

  { path: 'product', loadChildren: () => import('./productmodule/product.module').then(m => m.ProductModule) },
  { path: 'service', loadChildren: () => import('./productmodule/service.module').then(m => m.ServiceModule) },
  { path: 'standard', loadChildren: () => import('./productmodule/standard.module').then(m => m.StandardModule) },
  { path: 'recurring', loadChildren: () => import('./productmodule/recurring.module').then(m => m.RecurringModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  //  { path: 'invoice', loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) },

  {
    path: 'Company',
    loadChildren: () => import("./company-registration/company-registration.module")
      .then(m => m.companyregistration)
  }
];
