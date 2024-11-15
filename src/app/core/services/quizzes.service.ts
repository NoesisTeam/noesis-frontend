import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productionEnvironment } from '../../../environments/environment.prod';
import { QuizResponseModel } from '../data/models/quiz-response';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  constructor(private http: HttpClient) {}

  getReadingResourceId(): string | null {
    return localStorage.getItem('resourceId');
  }

  getQuiz(resource_id: string) {
    console.log(resource_id);
    return this.http.get<QuizResponseModel>(
      productionEnvironment.coreApiUrl + 'get/resources/quiz/' + resource_id
    );
  }
}
