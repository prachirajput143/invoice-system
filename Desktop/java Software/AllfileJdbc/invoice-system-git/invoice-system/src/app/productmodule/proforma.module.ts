import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { ProformaSignupComponent } from "./proforma-signup/proforma-signup.component";
import { ProformaRoutingModule } from "./proforma.routing.module";
import { ProformaFindbyidComponent } from "./proforma-findbyid/proforma-findbyid.component";
import { ProformaFindallComponent } from "./proforma-findall/proforma-findall.component";


@NgModule({
  declarations: [
    ProformaSignupComponent,
    ProformaFindbyidComponent,
    ProformaFindallComponent
  
  
  ],
  imports: [
    CommonModule,
    FormsModule,  // ✅ Ensure FormsModule is imported
    ReactiveFormsModule, // ✅ Ensure ReactiveFormsModule is imported
    HttpClientModule,
    ProformaRoutingModule
    
  ],
  providers: [],
})
export class ProformaModule {
  constructor() {
    console.log("Proforma Module Loaded");
  }
}
