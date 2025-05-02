import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceListComponent } from './list-invoice/list-invoice.component';

const routes: Routes = [
  { path: 'create', component: CreateInvoiceComponent },
  {path :'list',component: InvoiceListComponent},
  {path:'edit',component: EditInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
