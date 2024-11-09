import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId = 'userId';
  private tokenKey = 'authToken';

  // Uses localstorage to store a token
  setTokenKey(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Check if there is a token in the localstorage to obtain it
  getTokenKey(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // When you log out, the token is deleted so that no record remains.
  clearTokenKey(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this.userId, userId);
  }

  getUserId(): string | null {
    return localStorage.getItem(this.userId);
  }

  clearUserId(): void {
    localStorage.removeItem(this.userId);
  }
}
