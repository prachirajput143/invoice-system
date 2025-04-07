import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CompanyUrlService } from '../url-service/company-url.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient, private companyUrl: CompanyUrlService) {}

  getAllCompanies(page: number = 0, size: number = 10): Observable<any> {
    const url = `${this.companyUrl.GET_ALL_COMPANIES}?page=${page}&size=${size}`;
    return this.http.get(url);
  }
}
