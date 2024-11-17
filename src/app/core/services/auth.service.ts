import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponseModel, SignupResponse } from '../data/models';
import { productionEnvironment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
}
