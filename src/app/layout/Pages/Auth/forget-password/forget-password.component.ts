import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServciesService } from '../../../../core/services/AuthServices/auth-servcies.service';

@Component({
  selector: 'app-forget-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  email = '';
  isLoading = false;
  isEmailSent = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthServciesService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.email || !this.isValidEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isEmailSent = true;
        this.successMessage = 'Password reset instructions have been sent to your email address.';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to send reset email. Please try again.';
      }
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
