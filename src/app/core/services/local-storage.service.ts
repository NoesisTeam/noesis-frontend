import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly userIdKey = 'userId';
  private readonly authTokenKey = 'authToken';
  private readonly resourceId = 'resourceId';
  private readonly quizId = 'quizId';

  /**
   * Stores the authentication token in local storage.
   * @param accessToken - The token to be stored.
   */
  setToken(accessToken: string): void {
    try {
      localStorage.setItem(this.authTokenKey, accessToken);
    } catch (error) {
      console.error('Error saving token to localStorage', error);
    }
  }

  /**
   * Retrieves the authentication token from local storage.
   * @returns The stored token or null if not found.
   */
  getToken(): string | null {
    try {
      return localStorage.getItem(this.authTokenKey);
    } catch (error) {
      console.error('Error retrieving token from localStorage', error);
      return null;
    }
  }

  /**
   * Removes the authentication token from local storage.
   */
  clearToken(): void {
    try {
      localStorage.removeItem(this.authTokenKey);
    } catch (error) {
      console.error('Error removing token from localStorage', error);
    }
  }

  /**
   * Stores the user id in local storage.
   * @param userId - The user id to be stored.
   */
  setUserId(userId: string): void {
    try {
      localStorage.setItem(this.userIdKey, userId);
    } catch (error) {
      console.error('Error saving userId to localStorage', error);
    }
  }

  /**
   * Retrieves the user id from local storage.
   * @returns The user id or null if not found.
   */
  getUserId(): string | null {
    try {
      return localStorage.getItem(this.userIdKey);
    } catch (error) {
      console.error('Error retrieving userId from localStorage', error);
      return null;
    }
  }

  /**
   * Removes the user id from local storage.
   */
  clearUserId(): void {
    try {
      localStorage.removeItem(this.userIdKey);
    } catch (error) {
      console.error('Error removing userId from localStorage', error);
    }
  }

  setResourceId(id_reading_resource: string): void {
    try {
      localStorage.setItem(this.resourceId, String(id_reading_resource));
    } catch (error) {
      console.error('Error saving resourceId to localStorage', error);
    }
  }

  getResourceId(): string | null {
    try {
      return localStorage.getItem(this.resourceId) ?? '';
    } catch (error) {
      console.error('Error retrieving resourceId from localStorage', error);
      return null;
    }
  }

  clearResourceId(): void {
    try {
      localStorage.removeItem(this.resourceId);
    } catch (error) {
      console.error('Error removing resourceId from localStorage', error);
    }
  }

  setQuizId(id_quiz: string): void {
    try {
      localStorage.setItem(this.quizId, id_quiz);
    } catch (error) {
      console.error('Error saving quizId to localStorage', error);
    }
  }

  getQuizId(): string | null {
    try {
      return localStorage.getItem(this.quizId);
    } catch (error) {
      console.error('Error retrieving quizId from localStorage', error);
      return null;
    }
  }

  clearQuizId(): void {
    try {
      localStorage.removeItem(this.quizId);
    } catch (error) {
      console.error('Error removing quizId from localStorage', error);
    }
  }

  clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}
