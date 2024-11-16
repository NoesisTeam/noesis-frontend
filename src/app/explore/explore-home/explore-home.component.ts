import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClubDialogComponent } from '../../clubs/home/create-club-dialog/create-club-dialog.component';
import { Club } from '../../core/domain/entities';
import { PublicClubListComponent } from '../public-club-list/public-club-list.component';
import { ClubsService } from '../../core/services/clubs.service';
import { Subscription, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-explore-home',
  standalone: true,
  imports: [CommonModule, CreateClubDialogComponent, PublicClubListComponent],
  templateUrl: './explore-home.component.html',
  styleUrl: './explore-home.component.css',
})
export class ExploreHomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  public isDialogOpen: boolean = false;
  public clubList: Club[] = [];

  constructor(private readonly clubsService: ClubsService) {}

  public ngOnInit(): void {
    this.loadClubs();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Opens the club creation dialog
   */
  public openDialog(): void {
    this.isDialogOpen = true;
  }

  /**
   * Close the club creation dialog
   */
  public closeDialog(): void {
    this.isDialogOpen = false;
  }

  /**
   * Load the list of available clubs
   */
  private loadClubs(): void {
    const clubsSubscription = this.clubsService
      .getAllClubs(String(this.clubsService.getUserId()))
      .pipe(
        catchError((error) => {
          console.error('Error al cargar clubs:', error);
          return EMPTY;
        })
      )
      .subscribe((data: Club[]) => {
        this.clubList = data;
      });
    this.subscription.add(clubsSubscription);
  }
}
