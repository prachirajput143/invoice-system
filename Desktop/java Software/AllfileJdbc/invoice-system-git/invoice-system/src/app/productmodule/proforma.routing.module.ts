import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProformaSignupComponent } from "./proforma-signup/proforma-signup.component";
import { ProformaFindbyidComponent } from "./proforma-findbyid/proforma-findbyid.component";
import { ProformaFindallComponent } from "./proforma-findall/proforma-findall.component";

const routes: Routes = [
  
  { path:'proforma-signup', component: ProformaSignupComponent },
  { path: 'proforma-findbyid', component: ProformaFindbyidComponent },
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
