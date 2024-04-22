import { Component, ViewChild, inject } from '@angular/core';
import { NewsletterService } from './newsletter.service';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent{
  news = inject(NewsletterService);
  @ViewChild('newsletter') create!: NgForm;
  errorMessage: any;
  successMessage:any;

  constructor() { }

  subscribeForm() {
    const email = (document.getElementById('email') as HTMLInputElement).value;
    this.news.newsletter(email).subscribe({
      next: (value: any) => { 
        console.log(value);
        this.successMessage = "Subscription Successfull !!";
      },
      error: (error) => {
        console.log(error);
        if (error.status === 400) {
          this.errorMessage = "This Email is already Subscribed !!";
        }else {
          this.errorMessage = "All fields are required.";
        }
      },
    });
  }
}
