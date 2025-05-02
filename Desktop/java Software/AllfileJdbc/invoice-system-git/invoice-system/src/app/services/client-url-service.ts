  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root'
  })
  export class ClientUrlService {
    
    private baseUrl: string = 'http://localhost:2061/invoice-service-local/client';

    get signup(): string {
      return `${this.baseUrl}/signup`;
    }

    get login() : string{
      return `${this.baseUrl}/login`;
    }
    get findById(): string {
      return `${this.baseUrl}/findById`; 
    }
    findAllClients = `${this.baseUrl}/findAllClients`; // 👈 Yeh line add karo
  countClients = `${this.baseUrl}/count`;  

  deleteClient = `${this.baseUrl}/softDeleteById`;
  searchClientByKeyword: string = `${this.baseUrl}/search` ;
  public GET_ALL_CLIENTS = `${this.baseUrl}/findAllClients`;
  updateClient = `${this.baseUrl}/update`;
  
  }