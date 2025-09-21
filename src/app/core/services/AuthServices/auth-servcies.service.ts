import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import RouteUrl from '../../../RouteUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthServciesService {

  constructor(private _httpClient: HttpClient) { }

  LoginUser(user: object): Observable<any> {
    return this._httpClient.post(`${RouteUrl}/api/auth/Login`, user, {
      withCredentials: true
    });
  }
  

  RegisterUser(user: object): Observable<any> {
    const registrationData = {
      ...user,
      domainUrl: window.location.origin
    };

    return this._httpClient.post(`${RouteUrl}/api/auth/Register`, registrationData);
  }



  confirmEmail(token: string, userId: string): Observable<any> {

    const params = new HttpParams()
      .set('UserId', userId)
      .set('Token', token);

    return this._httpClient.post(`${RouteUrl}/api/Auth/ConfirmEmail?UserId=${userId}&Token=${token}`,null);
  }

  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post(
      `${RouteUrl}/api/auth/ForgotPassword`,
      JSON.stringify(email), // 👈 لازم تعمله stringify
      { headers: { 'Content-Type': 'application/json' } } // 👈 تتأكد من الـ header
    );
  }

  resetPassword(token: string, userId: string, newPassword: string, confirmPassword: string): Observable<any> {
    const requestData = {
      token: token,
      userId: userId,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    return this._httpClient.post(`${RouteUrl}/api/auth/ForgotPasswordConfermation`, requestData);
  }

  logout(): Observable<any> {
    return this._httpClient.post(`${RouteUrl}/api/auth/Logout`, {}, {
      withCredentials: true
    });
  }

  getAllUsers(): Observable<any> {
    return this._httpClient.get(`${RouteUrl}/api/auth/GetAllUsersAsync`, {
      withCredentials: true
    });
  }

  checkAuth(): Observable<boolean> {
    return this._httpClient.get<{ isAuthenticated: boolean }>(`${RouteUrl}/api/auth/CheckAuth`, {
      withCredentials: true
    }).pipe(
      map(response => {
        this.isAuthenticatedSubject.next(response.isAuthenticated);
        return response.isAuthenticated;
      }),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  checkAdmin(): Observable<boolean> {
    return this._httpClient.get<{ isAuthenticated: boolean }>(`${RouteUrl}/api/auth/CheckAdmin`, {
      withCredentials: true
    }).pipe(
      map(response => {
        return response.isAuthenticated;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Method to update authentication state (called by AuthStateService)
  updateAuthState(isAuth: boolean): void {
    this.isAuthenticatedSubject.next(isAuth);
  }

  // Getter للـ value الحالي
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }


}
