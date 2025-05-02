import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';

const routes: Routes = [
  { path: 'create', component: CreateInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
