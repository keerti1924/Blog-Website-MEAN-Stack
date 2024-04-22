import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.domain;
  errorMessage: string='';

  username: any;
  isAuthenticated: boolean = false;

  constructor(public router: Router,
    public http: HttpClient,
    @Inject(PLATFORM_ID) public platformId: Object) {}

  checkAuth() {
    return this.http.get(this.baseUrl + '/api/auth/check', {
      withCredentials: true,
    });
  }
  
  signupAuth(formData: any) {
    return this.http.post(this.baseUrl + '/api/auth/signup', formData);
  }

  loginAuth(formData: any) {
    return this.http.post(this.baseUrl + '/api/auth/signin', formData, {
        withCredentials: true,
      }).subscribe({
        next: (value) => {
          console.log(value);
          console.log(Object.values(value)[1]);

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('username', JSON.stringify(value));
          }
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
          if (error.status === 401) {
            this.errorMessage = "Email and Password are incorrect !!";
          }
           else {
            this.errorMessage = "All fields are required.";
          }
        },
      });
  }


  signOut() {
    return this.http.get(this.baseUrl + '/api/auth/signout', {
      withCredentials: true,
      }).subscribe({
        next: (value) => {
          console.log(value);
          localStorage.removeItem('username');

          const currentRoute = this.router.url;
          if (currentRoute === '/') {
            window.location.reload();
          } else {
            this.router.navigate(['/']).then(() => window.location.reload());
          }
        },
        error: (error) => console.log(error),
      });
  }
}
