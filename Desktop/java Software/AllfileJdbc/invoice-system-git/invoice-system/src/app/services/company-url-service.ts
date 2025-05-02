import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyUrlService {
  private readonly BASE_URL = 'http://localhost:2061/invoice-service-local/company';

  getSignupUrl(): string {
    return `${this.BASE_URL}/signup`;
  }

  getRegisterUrl(): string {
    return `${this.BASE_URL}/register`;
  }

  getLoginUrl(): string {
    return `${this.BASE_URL}/login`;
  }

  updateCompanyUrl = `${this.BASE_URL}/update`;


  getAllBusinessTypesUrl(): string {
    return 'http://localhost:2061/invoice-service-local/api/business-types';
  }
}
