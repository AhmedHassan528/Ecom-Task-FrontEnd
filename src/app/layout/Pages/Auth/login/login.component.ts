import { Component, OnDestroy } from '@angular/core';
import { AuthServciesService } from '../../../../core/services/AuthServices/auth-servcies.service';
import { AuthStateService } from '../../../../core/services/AuthServices/auth-state.service';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  LoginForm: FormGroup;
  isLoading = false;
  isLoginSuccess = false;
  errorMessage = '';
  successMessage = '';
  private authSubscription?: Subscription;

  constructor(
    private _authService: AuthServciesService,
    private _authStateService: AuthStateService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.LoginForm = this._formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  LoginSubmit() {
    if (this.LoginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this._authService.LoginUser(this.LoginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isLoginSuccess = true;
        this.successMessage = 'Login successful! Redirecting to home...';
        
        // Store user data if needed
        if (res.token) {
          localStorage.setItem('userToken', res.token);
        }
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
        }

        // Update authentication state
        this._authStateService.login();

        console.log('Login successful:', res);

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          this._router.navigate(['/products']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials and try again.';
        console.error('Login error:', error);
      }
    });
  }

  private markFormGroupTouched() {
    Object.keys(this.LoginForm.controls).forEach(key => {
      const control = this.LoginForm.get(key);
      control?.markAsTouched();
    });
  }

  goToSignUp() {
    this._router.navigate(['/signup']);
  }
}

