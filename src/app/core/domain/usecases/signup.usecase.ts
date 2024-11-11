import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthRepository } from '../../data/repositories';
import { User, UserCreate } from '../entities';

@Injectable({
  providedIn: 'root',
})
export class SignupUseCase {
  constructor(private authRepository: AuthRepository) {}

  execute(credentials: UserCreate): Observable<{ user: User }> {
    return this.authRepository.signup(credentials);
  }
}
