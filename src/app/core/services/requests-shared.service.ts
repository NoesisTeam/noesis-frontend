import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ClubRequest } from '../domain/entities';

@Injectable({
  providedIn: 'root',
})
export class RequestsSharedService {
  private requestsSource = new BehaviorSubject<ClubRequest[]>([]);
  requests$ = this.requestsSource.asObservable();

  updateRequests(requests: ClubRequest[]) {
    this.requestsSource.next(requests);
  }
}
