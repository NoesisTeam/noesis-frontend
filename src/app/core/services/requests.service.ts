import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productionEnvironment } from '../../../environments/environment.prod';
import { ClubRequest } from '../domain/entities';
import { RankingResponseModel } from '../data/models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RequestsService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getClubRankingUsers(): Observable<RankingResponseModel[]> {
    return this.http.get<RankingResponseModel[]>(
      productionEnvironment.coreApiUrl + 'ranking'
    );
  }

  getResourceRankingUsers(): Observable<RankingResponseModel[]> {
    return this.http.get<RankingResponseModel[]>(
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

  // decodeToken(): any {
  //   try {
  //     // JWTs are base64 encoded. The payload is the second part of the token.
  //     const payload = String(this.localStorageService.getToken()).split('.')[1]; // Split the token into its parts
  //     const decodedPayload = atob(payload); // Decode the base64 payload
  //     return JSON.parse(decodedPayload); // Parse the payload as JSON
  //   } catch (error) {
  //     console.error('Invalid token:', error); // Log the error for debugging
  //     return null; // Return null if decoding fails
  //   }
  // }

  // isTokenExpired(): boolean {
  //   const decoded = this.decodeToken(); // Decode the token
  //   if (!decoded || !decoded.exp) {
  //     return true; // Consider the token expired if it lacks the 'exp' field
  //   }
  //   const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  //   return decoded.exp < currentTime; // Compare expiration time with current time
  // }

  // getRoleFromToken(): string {
  //   const decoded = this.decodeToken(); // Decode the token
  //   return decoded?.role || ''; // Safely access the 'role' field
  // }
}
