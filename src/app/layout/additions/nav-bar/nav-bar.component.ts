import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductCardComponent } from "../product-card/product-card.component";
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthServciesService } from '../../../core/services/AuthServices/auth-servcies.service';
import { AuthStateService } from '../../../core/services/AuthServices/auth-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggingOut = false;
  isAuthenticated = false;
  isAdmin = false;
  isLoading = true;
  private authSubscription?: Subscription;
  private loadingSubscription?: Subscription;

  constructor(
    private authService: AuthServciesService,
    private authStateService: AuthStateService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to authentication state changes
    this.authSubscription = this.authStateService.isAuthenticated$.subscribe(
      isAuth => {
        this.isAuthenticated = isAuth;
        // Check admin status when authentication state changes
        if (isAuth) {
          this.checkAdminStatus();
        } else {
          this.isAdmin = false;
        }
      }
    );

    this.checkauth()

    // Subscribe to loading state changes
    this.loadingSubscription = this.authStateService.isLoading$.subscribe(
      loading => {
        this.isLoading = loading;
      }
    );
  }

  checkauth() {
    this.authSubscription = this.authService.checkAuth().subscribe({
      next: (response) => {
        this.isAuthenticated = response;
        // Check admin status after authentication check
        if (response) {
          this.checkAdminStatus();
        } else {
          this.isAdmin = false;
        }
      }
    })
  }

  checkAdminStatus() {
    this.authService.checkAdmin().subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      },
      error: (error) => {
        console.error('Error checking admin status:', error);
        this.isAdmin = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  logout() {
    this.isLoggingOut = true;
    
    this.authService.logout().subscribe({
      next: (response) => {
        this.isLoggingOut = false;
        // Clear any local storage or session data
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        sessionStorage.clear();
        
        // Update authentication state
        this.authStateService.logout();
        
        // Redirect to login page
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isLoggingOut = false;
        console.error('Logout error:', error);
        
        // Even if logout fails on server, clear local data and redirect
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
        sessionStorage.clear();
        
        // Update authentication state
        this.authStateService.logout();
        
        this.router.navigate(['/login']);
      }
    });
  }
}
