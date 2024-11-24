import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productionEnvironment } from '../../../environments/environment.prod';
import { Career } from '../domain/entities';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient
  ) {}

  getAllCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(
      productionEnvironment.coreApiUrl + 'get/careers/all'
    );
  }

  CheckIsAcademicUser(user_id: string) {
    return this.http.get<{ complete: boolean }>(
      productionEnvironment.coreApiUrl + 'check/user/info/' + user_id
    );
  }

}