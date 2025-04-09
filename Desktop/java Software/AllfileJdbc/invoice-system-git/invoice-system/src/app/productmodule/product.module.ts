import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { ProductsignupComponent } from "./productsignup/productsignup.component";
import { ProductFindallinvoiceComponent } from "./product-findallinvoice/product-findallinvoice.component";
import { ProductFindByIdComponent } from "./product-find-by-id/product-find-by-id.component";
import { ProductRoutingModule } from "./product.routing.module";
import { ProductInvoiceService } from "../services/product-service";
import { ApiUrlService } from "../services/product-url-service";
import { ProductUpdateInvoiceComponent } from "./update-invoice/update-invoice.component";
import { ServiceSignupComponent } from "./service-signup/service-signup.component";


@NgModule({
  declarations: [
    ProductsignupComponent,
    ProductFindallinvoiceComponent,
    ProductFindByIdComponent,
    ProductUpdateInvoiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  // ✅ Ensure FormsModule is imported
    ReactiveFormsModule, // ✅ Ensure ReactiveFormsModule is imported
    HttpClientModule,
    ProductRoutingModule,
    
  ],
  providers: [],
})
export class ProductModule {
  constructor() {
    console.log("Product Module Loaded");
  }
}
