import { RouterModule, Routes } from "@angular/router";
import { CompanyRegistrationComponent } from "./comany-registration/company-registration.component";
import { NgModule } from "@angular/core";
import { CompanyLoginComponent } from "./company-login/company-login.component";
import { ClientSignupComponent } from "./client-signup/client-signup.component";
import { ClientLoginComponent } from "./client-login/client-login.component";
import { FindClientComponent } from "./find-client/find-client.component";
import { FindCompanyComponent } from "./find-company/find-company.component";
import { FindAllCompanyComponent } from "./findall-company/findall-company.component";
import { FindAllClientComponent } from "./findall-client/findall-client.component";
import { UpdateClientComponent } from "./update-client/update-client.component";
import { UpdateCompanyComponent } from "./update-company/update-company.component";




export const routes : Routes=[
    {
        path:"signup",
        component:CompanyRegistrationComponent
    },
    {
        path:"login",
        component:CompanyLoginComponent
    },
    {
        path:"find",
        component:FindCompanyComponent
    },
    {
        path:"findall",
        component:FindAllCompanyComponent
    },
    {
        path:"update",
        component:UpdateCompanyComponent
    },

    
    {
        path:"client-signup",
        component:ClientSignupComponent
    },
    {
        path:"client-login",
        component:ClientLoginComponent
    },
    
    {
        path:"client-find",
        component:FindClientComponent
    },
    {
        path:"client-update",
        component:UpdateClientComponent
    },
    {
        path:"client-findall",
        component:FindAllClientComponent
    },
  
  
];
@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})

export class companyregistrationrouting{
    constructor(){
        console.log("object is created");
        
    }

}