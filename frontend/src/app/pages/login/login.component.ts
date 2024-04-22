import { Component, ViewChild  } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { CommonModule} from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule,HeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(public auth: AuthService) {}

  @ViewChild('login') login!: NgForm;
  checklogin() {
    this.auth.loginAuth(this.login.value);
    this.login.reset();
  }
  signout() {
    this.auth.signOut();
  }
}
