import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsignupComponent } from "./productsignup/productsignup.component";
import { ProductFindallinvoiceComponent } from "./product-findallinvoice/product-findallinvoice.component";
import { ProductFindByIdComponent } from "./product-find-by-id/product-find-by-id.component";
import { ProductUpdateInvoiceComponent } from "./update-invoice/update-invoice.component";
import { ServiceSignupComponent } from "./service-signup/service-signup.component";
import { ServiceFindbyidComponent } from "./service-findbyid/service-findbyid.component";
import { ServiceFindallComponent } from "../service-findall/service-findall.component";
import { StandardSignupComponent } from "./standard-signup/standard-signup.component";
import { StandardFindbyidComponent } from "./standard-findbyid/standard-findbyid.component";
import { StandardFindallComponent } from "./standard-findall/standard-findall.component";

const routes: Routes = [
  
  { path: 'standardsignup', component: StandardSignupComponent },
  { path: 'standardfindbyid', component: StandardFindbyidComponent },
  { path: 'standardfindall', component: StandardFindallComponent }





  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRoutingModule {
  constructor() {
    console.log("Standard Routing Module Loaded");
  }
}
