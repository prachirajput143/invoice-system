import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { PdfPreviewModalComponent } from './pdf-preview-modal/pdf-preview-modal.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';

const routes: Routes = [
  { path: 'create', component: CreateInvoiceComponent },
  {path :'path',component: PdfPreviewModalComponent},
  {path :'list',component: ListInvoiceComponent},
  {path:'edit',component: EditInvoiceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
