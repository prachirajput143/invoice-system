import { Routes } from '@angular/router';

export const routes: Routes = [

    { path: '', redirectTo: 'product', pathMatch: 'full' },
  
    { path: 'product', loadChildren: () => import('./productmodule/product.module').then(m => m.ProductModule) },
    { path: 'service', loadChildren: () => import('./productmodule/service.module').then(m => m.ServiceModule) },
    { path: 'standard', loadChildren: () => import('./productmodule/standard.module').then(m => m.StandardModule) },
    { path: 'recurring', loadChildren: () => import('./productmodule/recurring.module').then(m => m.RecurringModule) },
    { path: 'proforma', loadChildren: () => import('./productmodule/proforma.module').then(m => m.ProformaModule) },
  
    { path: '**', redirectTo: 'product' }
  ];
  

  { 
    path: 'dashboard', 
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  { 
    path: 'invoice', 
    loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) 
  } 
];

