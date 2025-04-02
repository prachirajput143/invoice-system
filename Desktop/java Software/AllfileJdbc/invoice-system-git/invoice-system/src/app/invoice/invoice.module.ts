import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceCreateComponent } from './create-invoice/create-invoice.component';

@NgModule({
  declarations: [InvoiceCreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InvoiceRoutingModule
  ]
})
export class InvoiceModule {}
