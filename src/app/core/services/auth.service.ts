import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  // Uses localstorage to store a token
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Check if there is a token in the localstorage to obtain it
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // When you log out, the token is deleted so that no record remains.
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
