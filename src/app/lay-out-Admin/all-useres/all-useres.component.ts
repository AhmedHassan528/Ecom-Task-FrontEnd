import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServciesService } from '../../core/services/AuthServices/auth-servcies.service';

@Component({
  selector: 'app-all-useres',
  imports: [CommonModule],
  templateUrl: './all-useres.component.html',
  styleUrl: './all-useres.component.scss'
})
export class AllUseresComponent implements OnInit {
  users: any[] = [];
  loading: boolean = false;
  error: string = '';
  successMessage: string = '';

  constructor(private authService: AuthServciesService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = '';
    this.successMessage = '';
    
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load users. Please try again.';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  refreshUsers(): void {
    this.loadUsers();
  }
}
