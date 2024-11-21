import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Club } from '../domain/entities';

@Injectable({
  providedIn: 'root',
})
export class ClubsSharedService {
  private clubsCreatedSource = new BehaviorSubject<Club[]>([]);
  private publicClubsSource = new BehaviorSubject<Club[]>([]);
  clubsCreated$ = this.clubsCreatedSource.asObservable();
  publicClubs$ = this.publicClubsSource.asObservable();

  updateClubsCreated(clubs: Club[]) {
    this.clubsCreatedSource.next(clubs);
  }

  updatePublicClubs(clubs: Club[]) {
    this.publicClubsSource.next(clubs);
  }
}
