import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientUrlService {
    private baseUrl = 'http://localhost:2061/invoice-service-local/';  

    public readonly GET_ALL_CLIENTS = `${this.baseUrl}client/findAll`; 
    
}
