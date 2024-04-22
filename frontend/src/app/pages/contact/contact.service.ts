import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = environment.domain; // Update the API URL according to your backend
  http = inject(HttpClient);
  

  constructor() { }

  
  createContact(formData:any) {
    return this.http.post<any>(`${this.apiUrl}/api/contact`,formData);
  }

}
