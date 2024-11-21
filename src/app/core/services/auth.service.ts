import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseModel, SignupResponse } from '../data/models';
import { productionEnvironment } from '../../../environments/environment.prod';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  /**
   * Logs in the user
   * @param user_name - The name of the user
   * @param user_password - The password of the user
   * @returns Observable<LoginResponseModel>
   */
  login(user_name: string, user_password: string) {
    return this.http.post<LoginResponseModel>(
      productionEnvironment.authApiUrl + 'login',
      {
        user_name,
        user_password,
      }
    );
  }

  /**
   * Registers a new user
   * @param user_name - The name of the new user
   * @param user_password - The password of the new user
   * @returns Observable<SignupResponse>
   */
  signup(user_name: string, user_password: string) {
    return this.http.post<SignupResponse>(
      productionEnvironment.authApiUrl + 'register',
      {
        user_name,
        user_password,
      }
    );
  }

  /**
   * Generates a token for a user and club
   * @param user_id - The ID of the user
   * @param club_id - The ID of the club
   * @returns Observable<{ access_token: string }>
   */
  generateToken(user_id: number, club_id: number) {
    return this.http.post<{ access_token: string }>(
      productionEnvironment.authApiUrl + 'token_club',
      {
        user_id,
        club_id,
      }
    );
  }

  decodeToken(): any {
    try {
      // JWTs are base64 encoded. The payload is the second part of the token.
      const payload = String(this.localStorageService.getToken()).split('.')[1]; // Split the token into its parts
      const decodedPayload = atob(payload); // Decode the base64 payload
      return JSON.parse(decodedPayload); // Parse the payload as JSON
    } catch (error) {
      console.error('Invalid token:', error); // Log the error for debugging
      return null; // Return null if decoding fails
    }
  }

  isTokenExpired(): boolean {
    const decoded = this.decodeToken(); // Decode the token
    if (!decoded || !decoded.exp) {
      return true; // Consider the token expired if it lacks the 'exp' field
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < currentTime; // Compare expiration time with current time
  }

  getRoleFromToken(): string {
    const decoded = this.decodeToken(); // Decode the token
    return decoded?.role || ''; // Safely access the 'role' field
  }
}
