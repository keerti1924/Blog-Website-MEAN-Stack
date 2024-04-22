import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  router = inject(Router);
  apiUrl = environment.domain; // Update the API URL according to your backend
  http = inject(HttpClient);
 

  constructor() { }

  newsletter(email: string) {
    return this.http
      .post<any>(`${this.apiUrl}/api/newsletter`, { email });
  }
}
