import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productionEnvironment } from '../../../environments/environment.prod';
import { Career } from '../domain/entities';
import { ProfileInfoUp } from '../data/models/user-profile-update.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllCareers(): Observable<Career[]> {
    return this.http.get<Career[]>(
      productionEnvironment.coreApiUrl + 'get/careers/all'
    );
  }

  checkIsAcademicUser(user_id: string) {
    return this.http.get<{ complete: boolean }>(
      productionEnvironment.coreApiUrl + 'check/user/info/' + user_id
    );
  }

  updateProfile(userProfileUpdate: ProfileInfoUp) {
    return this.http.post(
      productionEnvironment.coreApiUrl + 'update/user/profile',
      userProfileUpdate
    );
  }
}
