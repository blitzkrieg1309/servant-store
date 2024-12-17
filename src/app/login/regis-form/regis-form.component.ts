import { Component } from '@angular/core';
import { RegisFormService } from '../regis-form.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-regis-form',
  standalone: false,

  templateUrl: './regis-form.component.html',
  styleUrl: './regis-form.component.css',
})
export class RegisFormComponent {
  registerData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  errorMessage: string = '';
  isLoading = false;
  successMessage = '';

  constructor(private regisService: RegisFormService, private router: Router) {}

  onSubmit() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match';
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Panggil service register
    this.regisService
      .register({
        username: this.registerData.username,
        email: this.registerData.email,
        password: this.registerData.password,
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = response.message;
          console.log('Registration successful', response);

          // Redirect ke halaman login setelah registrasi sukses
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error.message || 'Registration failed';
        },
      });
  }
}
