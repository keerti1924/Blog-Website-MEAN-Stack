import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule,CommonModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent{
  contact = inject(ContactService);
  router = inject(Router);


  constructor() { }
  @ViewChild('contactForm') contactForm!: NgForm;
  errorMessage: any;
  successMessage:any;

  submitContactForm() {
    const formData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message
    };

    this.contact.createContact(formData).subscribe({
      next: (value: any) => { 
        console.log(value);
        this.router.navigate(['/contact']);
        this.successMessage = "Thanks for Contacting Us !!";
      },
      error: (error) => {
        console.log(error);
        if (error.status === 400) {
          this.errorMessage = "Email already exists";
        }else {
          this.errorMessage = "All fields are required.";
        }
      },
    });
    this.contactForm.reset();
  }
}
