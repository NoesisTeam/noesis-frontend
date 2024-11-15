import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseModel, SignupResponse } from '../data/models';
import { productionEnvironment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId = 'userId';
  private authToken = 'authToken';

  constructor(private http: HttpClient) {}

  login(user_name: string, user_password: string) {
    return this.http.post<LoginResponseModel>(
      productionEnvironment.authApiUrl + 'login',
      {
        user_name,
        user_password,
      }
    );
  }

  signup(user_name: string, user_password: string) {
    return this.http.post<SignupResponse>(
      productionEnvironment.authApiUrl + 'register',
      {
        user_name,
        user_password,
      }
    );
  }

  generateToken(user_id: number, club_id: number) {
    return this.http.post<{ access_token: string }>(
      productionEnvironment.authApiUrl + 'token_club',
      {
        user_id,
        club_id,
      }
    );
  }

  // Uses localstorage to store a token
  setToken(access_token: string): void {
    localStorage.setItem(this.authToken, access_token);
  }

  // Check if there is a token in the localstorage to obtain it
  getToken(): string | null {
    return localStorage.getItem(this.authToken);
  }

  // When you log out, the token is deleted so that no record remains.
  clearToken(): void {
    localStorage.removeItem(this.authToken);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.userId, userId);
  }

  getUserId(): number | null {
    return Number(localStorage.getItem(this.userId));
  }

  clearUserId(): void {
    localStorage.removeItem(this.userId);
  }
}
