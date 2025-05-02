import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessTypesUrlService {

  private baseUrl = 'http://localhost:2061/invoice-service-local';

  get getAll(): string {
    return `${this.baseUrl}/businesstypes`;
   
  }
}
