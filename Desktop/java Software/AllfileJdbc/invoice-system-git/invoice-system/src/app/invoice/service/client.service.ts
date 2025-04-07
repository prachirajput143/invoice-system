import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientUrlService } from '../url-service/client-url.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(private http: HttpClient, private clientUrl: ClientUrlService) {}

  getAllClients(page: number = 0, size: number = 10): Observable<any> {
    const url = `${this.clientUrl.GET_ALL_CLIENTS}?page=${page}&size=${size}`;
    return this.http.get(url);
  }
}
