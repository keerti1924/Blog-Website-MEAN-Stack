import { Component, OnInit, PLATFORM_ID, Inject, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { SearchComponent } from '../../pages/search/search.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,SearchComponent],
  templateUrl: './header.component.html',
  
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  auth = inject(AuthService);
  baseUrl='http://localhost:4200';

  constructor(@Inject(PLATFORM_ID) private platformId: any,private router: Router) { }

  ngOnInit(): void {
    this.auth.checkAuth().subscribe({
      next: value => {
        console.log(value);
        this.auth.isAuthenticated = Object.values(value)[0];
        if (isPlatformBrowser(this.platformId)) {
          this.auth.username = Object.values(
            JSON.parse(localStorage.getItem('username') as string))[1];
        }
      },
      error: (error) => {
        console.log({error:error.message});
      },
    });
  }
  logOut() {
    this.auth.signOut();
  }
}
