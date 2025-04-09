import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsignupComponent } from "./productsignup/productsignup.component";
import { ProductFindallinvoiceComponent } from "./product-findallinvoice/product-findallinvoice.component";
import { ProductFindByIdComponent } from "./product-find-by-id/product-find-by-id.component";
import { ProductUpdateInvoiceComponent } from "./update-invoice/update-invoice.component";
import { ServiceSignupComponent } from "./service-signup/service-signup.component";
import { ServiceFindbyidComponent } from "./service-findbyid/service-findbyid.component";
import { ServiceFindallComponent } from "../service-findall/service-findall.component";
import { RecurringSignupComponent } from "./recurring-signup/recurring-signup.component";
import { RecurringFindbyidComponent } from "./recurring-findbyid/recurring-findbyid.component";
import { RecurringFindallComponent } from "./recurring-findall/recurring-findall.component";

const routes: Routes = [
  
  { path: 'recurring-signup', component: RecurringSignupComponent },
  { path: 'recurring-findbyid', component: RecurringFindbyidComponent },
  { path: 'recurring-findall', component: RecurringFindallComponent },


  
// Find Invoice Page
  // Find Invoice Page


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringRoutingModule {
  constructor() {
    console.log("Service Routing Module Loaded");
  }
}
