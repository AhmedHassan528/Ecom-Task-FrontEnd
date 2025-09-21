import { Component, OnDestroy } from '@angular/core';
import { AuthServciesService } from '../../../../core/services/AuthServices/auth-servcies.service';
import { AuthStateService } from '../../../../core/services/AuthServices/auth-state.service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnDestroy {
  isLoading = false;
  isRegistrationSuccess = false;
  errorMessage = '';
  successMessage = '';
  fieldErrors: { [key: string]: string } = {};
  private authSubscription?: Subscription;

  constructor(
    private _authService: AuthServciesService, 
    private _authStateService: AuthStateService,
    private _Router: Router
  ) { }

  registerForm: FormGroup = new FormGroup({
    UserName: new FormControl(null, [
      Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(20),
      Validators.pattern(/^[a-zA-Z0-9_]+$/)
    ]),
    FirstName: new FormControl(null, [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]+$/)
    ]),
    LastName: new FormControl(null, [
      Validators.required, 
      Validators.minLength(2), 
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]+$/)
    ]),
    PhoneNumber: new FormControl(null, [
      Validators.required, 
      Validators.pattern(/^[0-9]{10,11}$/)
    ]),
    Email: new FormControl(null, [
      Validators.required, 
      Validators.email
    ]),
    Password: new FormControl(null, [
      Validators.required, 
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    rePassword: new FormControl(null, [Validators.required]),
  }, this.confirmPass);

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  registerSubmit() {
    if (this.registerForm.invalid) {
      this.markFormGroupTouched();
      this.setFieldErrors();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.fieldErrors = {};

    this.authSubscription = this._authService.RegisterUser(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isRegistrationSuccess = true;
        this.successMessage = 'Registration successful! Please check your email to verify your account.';
        console.log('Registration successful:', res);
        
        // Redirect to login page after 3 seconds
        setTimeout(() => {
          this._Router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.handleRegistrationError(err);
        console.error('Registration error:', err);
      }
    });
  }

  private handleRegistrationError(error: any) {
    if (error.error && error.error.errors) {
      // Handle validation errors from backend
      this.fieldErrors = {};
      Object.keys(error.error.errors).forEach(key => {
        this.fieldErrors[key] = error.error.errors[key][0];
      });
    } else if (error.error && error.error.message) {
      // Handle general error message
      this.errorMessage = error.error.message;
    } else {
      // Handle network or other errors
      this.errorMessage = 'Registration failed. Please check your connection and try again.';
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  private setFieldErrors() {
    this.fieldErrors = {};
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control?.invalid && control?.touched) {
        this.fieldErrors[key] = this.getFieldErrorMessage(key, control);
      }
    });
  }

  getFieldErrorMessage(fieldName: string, control: AbstractControl): string {
    if (control?.errors?.['required']) {
      return `${this.getFieldDisplayName(fieldName)} is required`;
    }
    if (control?.errors?.['minlength']) {
      return `${this.getFieldDisplayName(fieldName)} must be at least ${control.errors['minlength'].requiredLength} characters`;
    }
    if (control?.errors?.['maxlength']) {
      return `${this.getFieldDisplayName(fieldName)} must not exceed ${control.errors['maxlength'].requiredLength} characters`;
    }
    if (control?.errors?.['email']) {
      return 'Please enter a valid email address';
    }
    if (control?.errors?.['pattern']) {
      return this.getPatternErrorMessage(fieldName);
    }
    if (control?.errors?.['mismatch']) {
      return 'Passwords do not match';
    }
    return 'Invalid input';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      'UserName': 'Username',
      'FirstName': 'First name',
      'LastName': 'Last name',
      'PhoneNumber': 'Phone number',
      'Email': 'Email',
      'Password': 'Password',
      'rePassword': 'Confirm password'
    };
    return displayNames[fieldName] || fieldName;
  }

  private getPatternErrorMessage(fieldName: string): string {
    const patternMessages: { [key: string]: string } = {
      'UserName': 'Username can only contain letters, numbers, and underscores',
      'FirstName': 'First name can only contain letters and spaces',
      'LastName': 'Last name can only contain letters and spaces',
      'PhoneNumber': 'Please enter a valid 10-11 digit phone number',
      'Password': 'Password must be at least 8 characters with uppercase, lowercase, number, and special character'
    };
    return patternMessages[fieldName] || 'Invalid format';
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.registerForm.get(fieldName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isFieldValid(fieldName: string): boolean {
    const control = this.registerForm.get(fieldName);
    return !!(control && control.valid && (control.dirty || control.touched));
  }

  getFieldError(fieldName: string): string {
    return this.fieldErrors[fieldName] || '';
  }

  confirmPass(g: AbstractControl) {
    if (g.get('Password')?.value == g.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  goToLogin() {
    this._Router.navigate(['/login']);
  }
}

