import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServciesService } from '../../../../core/services/AuthServices/auth-servcies.service';

@Component({
  selector: 'app-confirm-email',
  imports: [CommonModule],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit {
  isLoading = false;
  isConfirmed = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthServciesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.confirmEmail();
  }

  confirmEmail() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Get token and email from query parameters
    this.route.queryParams.subscribe(params => {
      const token = params['Token'];
      const UserId = params['UserId'];

      if (!token || !UserId) {
        this.errorMessage = 'Invalid confirmation link. Missing token or UserId.';
        this.isLoading = false;
        return;
      }

      this.authService.confirmEmail(token, UserId).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.isConfirmed = true;
          this.successMessage = 'Email confirmed successfully! Redirecting to login...';
          
          // Redirect to login page after 3 seconds
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = error.error?.message || 'Failed to confirm email. Please try again.';
        }
      });
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
