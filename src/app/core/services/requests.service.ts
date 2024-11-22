import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productionEnvironment } from '../../../environments/environment.prod';
import { ClubRequest } from '../domain/entities';
import { ClubRanking } from '../data/models';
import { ResourceRanking } from '../data/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getClubRankingUsers(): Observable<ClubRanking[]> {
    return this.http.get<ClubRanking[]>(
      productionEnvironment.coreApiUrl + 'ranking'
    );
  }

  getResourceRankingUsers(): Observable<ResourceRanking[]> {
    return this.http.get<ResourceRanking[]>(
      productionEnvironment.coreApiUrl +
        'get/resources/ranking/' +
        this.localStorageService.getResourceId()
    );
  }

  getAllMemberRequests(): Observable<ClubRequest[]> {
    return this.http.get<ClubRequest[]>(
      productionEnvironment.coreApiUrl + 'get/requests/all'
    );
  }

  approveMembership(id_user: number) {
    return this.http.patch<{ message: string }>(
      productionEnvironment.coreApiUrl + 'membership/approve',
      { id_user }
    );
  }

  rejectMembership(id_user: number) {
    return this.http.patch<{ message: string }>(
      productionEnvironment.coreApiUrl + 'membership/reject',
      { id_user }
    );
  }
}
