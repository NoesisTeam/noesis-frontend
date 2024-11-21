import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productionEnvironment } from '../../../environments/environment.prod';
import { ReadingResource } from '../domain/entities/reading-resource.entity';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getClubResources(): Observable<ReadingResource[]> {
    return this.http.get<ReadingResource[]>(
      productionEnvironment.coreApiUrl + 'get/resources/all'
    );
  }

  addResource(formData: FormData) {
    return this.http.post<{ message: string }>(
      productionEnvironment.coreApiUrl + 'add/resource',
      formData
    );
  }

  getReadingResourceUrl() {
    return this.http.get<string>(
      productionEnvironment.coreApiUrl +
        'get/resources/id/' +
        this.localStorageService.getResourceId()
    );
  }
}
