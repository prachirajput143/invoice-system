import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsignupComponent } from "./productsignup/productsignup.component";
import { ProductFindallinvoiceComponent } from "./product-findallinvoice/product-findallinvoice.component";
import { ProductFindByIdComponent } from "./product-find-by-id/product-find-by-id.component";
import { ServiceSignupComponent } from "./service-signup/service-signup.component";
import { ServiceFindbyidComponent } from "./service-findbyid/service-findbyid.component";
import { ServiceFindallComponent } from "../service-findall/service-findall.component";
import { RecurringSignupComponent } from "./recurring-signup/recurring-signup.component";
import { RecurringFindbyidComponent } from "./recurring-findbyid/recurring-findbyid.component";
import { RecurringFindallComponent } from "./recurring-findall/recurring-findall.component";
import { ProformaSignupComponent } from "./proforma-signup/proforma-signup.component";
import { ProformaFindbyidComponent } from "./proforma-findbyid/proforma-findbyid.component";
import { ProformaFindallComponent } from "./proforma-findall/proforma-findall.component";

const routes: Routes = [
  
  { path: 'proforma-signup', component: ProformaSignupComponent },
   { path: 'proforma-findbyid', component: ProformaFindbyidComponent},
   { path: 'proforma-findall', component: ProformaFindallComponent }

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProformaRoutingModule {
  constructor() {
    console.log("Proforma Routing Module Loaded");
  }
}
