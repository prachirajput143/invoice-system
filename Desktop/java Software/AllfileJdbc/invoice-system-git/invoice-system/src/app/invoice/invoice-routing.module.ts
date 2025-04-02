import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceCreateComponent } from './create-invoice/create-invoice.component';

const routes: Routes = [
  { path: 'create', component: InvoiceCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
