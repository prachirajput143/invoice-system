import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusinessTypesUrlService } from './business-type-url-service';

export interface BusinessType {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessTypesService {

   // ✅ Change this if your backend path is different

  constructor(private http: HttpClient,private businessTypesUrlService: BusinessTypesUrlService) { }

  getAllBusinessTypes(): Observable<BusinessType[]> {
    return this.http.get<BusinessType[]>(this.businessTypesUrlService.getAll);
  }
}
