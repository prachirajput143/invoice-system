// src/app/services/company-service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyUrlService } from './company-url';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient,private company:CompanyUrlService) {}
 

  getAllCompanies(page: number, size: number): Observable<any> {
    const url = (`${this.company.GET_ALL_COMPANYS}?page=${page}&size=${size}`);
    return this.http.get(url);

  }
}
