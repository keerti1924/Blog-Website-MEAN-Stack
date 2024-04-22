import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,HeaderComponent,CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  
  auth = inject(AuthService);
  errorMessage: any;

  constructor(private router: Router,private fb: FormBuilder){
  }

  @ViewChild('signup') signup!: NgForm;
  checksignup() {
    this.auth.signupAuth(this.signup.value).subscribe({
      next: (value: any) => {
        console.log(value);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.log(error);
        if (error.status === 409) {
          this.errorMessage = "Email already exists";
        }
         else {
          this.errorMessage = "All fields are required.";
        }
      },
    });
    this.signup.reset();
  }
}

