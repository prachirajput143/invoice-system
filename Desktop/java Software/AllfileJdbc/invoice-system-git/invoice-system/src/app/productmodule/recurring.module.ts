import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { RecurringSignupComponent } from "./recurring-signup/recurring-signup.component";
import { StandardRoutingModule } from "./standard.routing.module";
import { RecurringRoutingModule } from "./recurring.routing.module";
import { RecurringFindbyidComponent } from "./recurring-findbyid/recurring-findbyid.component";
import { RecurringFindallComponent } from "./recurring-findall/recurring-findall.component";


@NgModule({
  declarations: [
    RecurringSignupComponent,
    RecurringFindbyidComponent,
    RecurringFindallComponent
 
    
   
  ],
  imports: [
    CommonModule,
    FormsModule,  // ✅ Ensure FormsModule is imported
    ReactiveFormsModule, // ✅ Ensure ReactiveFormsModule is imported
    HttpClientModule,
    RecurringRoutingModule
    
    
  ],
  providers: [],
})
export class RecurringModule {
  constructor() {
    console.log("recurring Module Loaded");
  }
}
