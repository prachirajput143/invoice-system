import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
//import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CreateInvoiceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,
    FormsModule,
 //   HttpClientModule
  ]
})
export class InvoiceModule {}
