import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { NgChartsModule } from 'ng2-charts';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceListComponent } from './list-invoice/list-invoice.component';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CreateInvoiceComponent,InvoiceListComponent,EditInvoiceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,
    FormsModule,
    NgChartsModule
 //   HttpClientModule
  ]
})
export class InvoiceModule {}
