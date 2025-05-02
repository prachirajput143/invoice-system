import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientUrlService } from './client-url-service';

@Injectable({
  providedIn: 'root'
})
export class ClientRegistrationService {

  constructor(private http: HttpClient, private apiUrl: ClientUrlService) {}

  // Register a new client
  registerClient(clientData: any): Observable<any> {
    return this.http.post(this.apiUrl.signup, clientData);
  }

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl.login, { username, password });
  }

  // Get client details by ID
  getClientById(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl.findById}?id=${clientId}`);
  }

  // Get all clients with pagination
  findAllClients(page: number, size: number): Observable<any> {
    return this.http.get(`${this.apiUrl.findAllClients}`, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });

    
  }
 
  
// Count all clients
countAllClients(): Observable<number> {
  return this.http.get<number>(`${this.apiUrl.countClients}/client/count`);
}
updateClient(client: any): Observable<any> {
  return this.http.put(this.apiUrl.updateClient, client);
}

deleteClient(id: number): Observable<any> {
  const url = `${this.apiUrl.deleteClient}?clientid=${id}`;
  return this.http.delete(url);
}
searchClientsByKeyword(keyword: string): Observable<any> {
  return this.http.get(`${this.apiUrl.searchClientByKeyword}?keyword=${keyword}`);
}
  
  
  
  
  
  
}
