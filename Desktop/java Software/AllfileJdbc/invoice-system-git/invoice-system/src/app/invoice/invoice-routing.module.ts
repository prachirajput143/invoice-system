import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { PdfPreviewModalComponent } from './pdf-preview-modal/pdf-preview-modal.component';

const routes: Routes = [
  { path: 'create', component: CreateInvoiceComponent },
  {path :'path',component: PdfPreviewModalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule {}
