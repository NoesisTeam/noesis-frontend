import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productionEnvironment } from '../../../environments/environment.prod';
import { Quiz } from '../domain/entities';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  constructor(private http: HttpClient) {}

  getQuiz(resource_id: number) {
    return this.http.get<Quiz>(
      productionEnvironment.coreApiUrl + 'get/resources/quiz/' + resource_id
    );
  }
}
