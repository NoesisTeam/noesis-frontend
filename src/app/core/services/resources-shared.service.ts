import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReadingResource } from '../domain/entities';

@Injectable({
  providedIn: 'root',
})
export class ResourcesSharedService {
  private resourcesCreatedSource = new BehaviorSubject<ReadingResource[]>([]);
  resourcesCreated$ = this.resourcesCreatedSource.asObservable();

  updateResourcesCreated(resources: ReadingResource[]) {
    this.resourcesCreatedSource.next(resources);
  }
}
