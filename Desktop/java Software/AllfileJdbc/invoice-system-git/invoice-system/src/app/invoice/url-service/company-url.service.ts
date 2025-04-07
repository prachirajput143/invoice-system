import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyUrlService {
  private baseUrl = 'http://localhost:2061/invoice-service-local/';

  public readonly GET_ALL_COMPANIES = `${this.baseUrl}company/findAll`;
  
}
