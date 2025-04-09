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
import { ServiceRoutingModule } from "./service.routing.module";
import { ServiceFindbyidComponent } from "./service-findbyid/service-findbyid.component";
import { UrlService } from "../services/service-url";
import { ServiceFindallComponent } from "../service-findall/service-findall.component";


@NgModule({
  declarations: [
    ServiceSignupComponent,
    ServiceFindbyidComponent,
    ServiceFindallComponent

  ],
  imports: [
    CommonModule,
    FormsModule,  // ✅ Ensure FormsModule is imported
    ReactiveFormsModule, // ✅ Ensure ReactiveFormsModule is imported
    HttpClientModule,
    ServiceRoutingModule
    
  ],
  providers: [ProductInvoiceService, UrlService],
})
export class ServiceModule {
  constructor() {
    console.log("Service Module Loaded");
  }
}
