import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CashFlowService {
    private BASE_URL = 'http://localhost:2061/invoice-service-local';

  constructor(private http: HttpClient) {}

  getCashFlowData(): Observable<any> {
    return this.http.get<any>(this.BASE_URL);
  }
}
