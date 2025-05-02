import { NgModule } from "@angular/core";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { CommonModule } from "@angular/common";
import { CompanyRegistrationComponent } from "./comany-registration/company-registration.component";
import { companyregistrationrouting } from "./company-registration.routing";
import { CompanyLoginComponent } from "./company-login/company-login.component";
import { HttpClientModule, provideHttpClient,withFetch} from '@angular/common/http';
import { CompanyService } from "../services/company-service";
import { CompanyUrlService } from "../services/company-url-service";
import { ClientSignupComponent } from "./client-signup/client-signup.component";
import { ClientLoginComponent } from "./client-login/client-login.component";
import { ClientRegistrationService } from "../services/client-service";
import { ClientUrlService } from "../services/client-url-service";
import { FindClientComponent } from "./find-client/find-client.component";
import { FindCompanyComponent } from "./find-company/find-company.component";
import { FindAllCompanyComponent } from "./findall-company/findall-company.component";
import { FindAllClientComponent } from "./findall-client/findall-client.component";
import { UpdateClientComponent } from "./update-client/update-client.component";
import { UpdateCompanyComponent } from "./update-company/update-company.component";


@NgModule({
    declarations:[CompanyLoginComponent,CompanyRegistrationComponent,ClientSignupComponent,ClientLoginComponent,FindClientComponent,FindCompanyComponent,FindAllCompanyComponent,FindAllClientComponent,UpdateClientComponent,UpdateCompanyComponent],
    providers:
    [
        provideHttpClient(withFetch()),CompanyService,CompanyUrlService,ClientRegistrationService,ClientUrlService

    ],
    imports:[
        ReactiveFormsModule,
        companyregistrationrouting,
        CommonModule,
        FormsModule,
        HttpClientModule
        
        


    ]
})
export class companyregistration{
 constructor(){
    console.log("object is created");
    
 }
}