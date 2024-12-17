import { Component } from '@angular/core';
import { LoginFormService } from '../login-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: false,

  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  loginData = {
    email: '',
    password: '',
  };

  isLoading: boolean = false;
  errorMessages: string = '';

  constructor(private loginService: LoginFormService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessages = '';

    this.loginService.login(this.loginData).subscribe(
      (response) => {
        this.isLoading = false;
        console.log('Login Succesful', response);
        this.router.navigate(['/servants']);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessages = error.error.message;
      }
    );
  }
}
