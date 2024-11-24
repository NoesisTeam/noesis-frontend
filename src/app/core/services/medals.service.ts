import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productionEnvironment } from '../../../environments/environment.prod';
import { MedalsResponseModel } from '../data/models';

@Injectable({
  providedIn: 'root',
})
export class MedalsService {
  constructor(private http: HttpClient) {}

  public getUserMedals(
    user_id: string | null
  ): Observable<MedalsResponseModel[]> {
    return this.http.get<MedalsResponseModel[]>(
      productionEnvironment.coreApiUrl + 'get/user/medals/' + user_id
    );
  }

  public getMedalsByClub(): Observable<MedalsResponseModel[]> {
    return this.http.get<MedalsResponseModel[]>(
      productionEnvironment.coreApiUrl + 'get/member/medals'
    );
  }
}
