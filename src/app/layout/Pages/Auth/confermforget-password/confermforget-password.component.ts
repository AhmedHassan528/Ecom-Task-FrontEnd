import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthServciesService } from '../../../../core/services/AuthServices/auth-servcies.service';

@Component({
  selector: 'app-confermforget-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './confermforget-password.component.html',
  styleUrl: './confermforget-password.component.scss'
})
export class ConfermforgetPAsswordComponent implements OnInit {
  newPassword = '';
  confirmPassword = '';
  isLoading = false;
  isPasswordReset = false;
  errorMessage = '';
  successMessage = '';
  token = '';
  userId = '';

  constructor(
    private authService: AuthServciesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Extract token and userId from URL parameters
    this.route.queryParams.subscribe(params => {
      this.token = params['Token'];
      this.userId = params['UserId'];

      if (!this.token || !this.userId) {
        this.errorMessage = 'Invalid reset link. Missing token or user ID.';
      }
    });
  }

  onSubmit() {
    // Validate passwords
    if (!this.newPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all password fields.';
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    if (this.newPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    if (!this.token || !this.userId) {
      this.errorMessage = 'Invalid reset link. Please request a new password reset.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.resetPassword(this.token, this.userId, this.newPassword, this.confirmPassword).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isPasswordReset = true;
        this.successMessage = 'Password has been reset successfully! Redirecting to login...';
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Failed to reset password. Please try again.';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  requestNewReset() {
    this.router.navigate(['/forgetPassword']);
  }
}
