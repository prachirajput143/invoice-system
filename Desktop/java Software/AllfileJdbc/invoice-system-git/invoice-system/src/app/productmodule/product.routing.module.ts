import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsignupComponent } from "./productsignup/productsignup.component";
import { ProductFindallinvoiceComponent } from "./product-findallinvoice/product-findallinvoice.component";
import { ProductFindByIdComponent } from "./product-find-by-id/product-find-by-id.component";
import { ProductUpdateInvoiceComponent } from "./update-invoice/update-invoice.component";
import { ServiceSignupComponent } from "./service-signup/service-signup.component";

const routes: Routes = [
  { path: 'product-signup', component: ProductsignupComponent }, // Create Invoice Page
  { path: 'product-findbyid', component: ProductFindByIdComponent }, // Find Invoice Page
  { path: 'product-findall', component: ProductFindallinvoiceComponent } ,
  { path: 'product-update', component: ProductUpdateInvoiceComponent }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
  constructor() {
    console.log("Product Routing Module Loaded");
  }
}
