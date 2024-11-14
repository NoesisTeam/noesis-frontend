import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from '../domain/entities';
import { productionEnvironment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  private userId = 'userId';
  constructor(private http: HttpClient) {}

  createClub(
    id_user: number,
    is_academic: boolean,
    club_name: string,
    club_desc: string,
    is_private: boolean
  ) {
    return this.http.post<{ message: string }>(
      productionEnvironment.coreApiUrl + 'create',
      { id_user, is_academic, club_name, club_desc, is_private }
    );
  }

  getFoundedClubs(id: string | null): Observable<Club[]> {
    return this.http.get<Club[]>(
      productionEnvironment.coreApiUrl + 'get/founded/' + id
    );
  }

  getJoinedClubs(id: string | null): Observable<Club[]> {
    return this.http.get<Club[]>(
      productionEnvironment.coreApiUrl + 'get/joined/' + id
    );
  }

  getUserId(): number | null {
    return Number(localStorage.getItem(this.userId));
  }

  clearUserId(): void {
    localStorage.removeItem(this.userId);
  }
}
