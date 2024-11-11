import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginUseCase } from '../domain/usecases';
import { SignupUseCase } from '../domain/usecases';
import { User, UserCreate } from '../domain/entities';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userId = 'userId';
  private tokenKey = 'authToken';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private loginUseCase: LoginUseCase,
    private signupUseCase: SignupUseCase
  ) {}

  login(
    user_name: string,
    user_password: string
  ): Observable<{ message: string; user: User }> {
    const credentials: UserCreate = { user_name, user_password };

    return this.loginUseCase.execute(credentials).pipe(
      tap((response) => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

  signup(user_name: string, user_password: string): Observable<{ user: User }> {
    const credentials: UserCreate = { user_name, user_password };

    return this.signupUseCase.execute(credentials).pipe(
      tap((response) => {
        this.currentUserSubject.next(response.user);
      })
    );
  }

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
