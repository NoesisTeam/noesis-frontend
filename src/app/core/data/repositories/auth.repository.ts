import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UserMapper } from '../mappers';
import { User, UserCreate } from '../../domain/entities';
import { LoginResponseModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: UserCreate): Observable<{ message: string; user: User }> {
    const url = `${this.baseUrl}/login`;

    return this.http
      .post<LoginResponseModel>(url, credentials)
      .pipe(map((response) => UserMapper.fromLoginResponse(response)));
  }

  signup(credentials: UserCreate): Observable<{ user: User }> {
    const url = `${this.baseUrl}/register`;

    return this.http
      .post<User>(url, credentials)
      .pipe(map((response) => UserMapper.fromSignupResponse(response)));
  }
}
