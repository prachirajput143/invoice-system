import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseUrl = 'http://localhost:2061/invoice-service-local';

  constructor(private http: HttpClient) {}

  // ✅ Get all business types
  getAllBusinessTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/businesstypes`);
  }

  // ✅ Register a company
  registerCompany(companyData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/company/register`, companyData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  searchCompanies(keyword: string) {
    return this.http.get(`${this.baseUrl}/company/search?keyword=${keyword}`);
  }
  
  // ✅ Get all clients
  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/client/findAllClients?page=0&size=100`);
  }
  getCompanyByKeyword(keyword: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/company/search?keyword=${keyword}`);
  }
  
  // ✅ Company login
  loginCompany(loginData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/company/login`, loginData, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  getCompanyById(companyId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/company/findById?id=${companyId}`);
  }
  findAllCompanies(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/company/findAll`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  restoreCompany(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/company/restoreById?id=${id}`, {});
  }
  
  getDeletedCompanies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/company/findAllDeleted`);
  }
  
  countAllCompanies(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/company/count`);
  }
  updateCompany(company: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/company/update`, company);  
  }
  
  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/company/softDeleteById`, {
      params: {
        id: id.toString() 
      }
    });
  }
}  