import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productionEnvironment } from '../../../environments/environment.prod';
import { ReadingResource } from '../domain/entities/reading-resource.entity';

@Injectable({
  providedIn: 'root',
})
export class ResourcesService {
  constructor(private http: HttpClient) {}

  getClubResources(): Observable<ReadingResource[]> {
    return this.http.get<ReadingResource[]>(
      productionEnvironment.coreApiUrl + 'resource/all'
    );
  }
}
