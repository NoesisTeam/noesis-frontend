import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ExecutedProcessDialogComponent } from '../executed-process-dialog/executed-process-dialog.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    ExecutedProcessDialogComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  private readonly hiddenRoutes: String[] = ['/', '/login', '/signup'];
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  shouldDisplayNavBar(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }

  logout() {
    this.localStorageService.clearUserId();
    this.dialogMessage = 'Has cerrado sesión correctamente';
    this.dialogActionText = 'Aceptar';
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    if (this.dialogMessage === 'Has cerrado sesión correctamente') {
      this.router.navigate(['/login']);
    }
  }

  // Custom function to determine if the route is active
  isActive(urls: string[]): boolean {
    return urls.some((url) => this.router.url.startsWith(url));
  }

  goClubsHome() {
    this.localStorageService.clearQuizId();
    this.localStorageService.clearResourceId();
    this.localStorageService.clearToken();
  }
}
