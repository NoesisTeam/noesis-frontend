import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productionEnvironment } from '../../../environments/environment.prod';
import { QuizResponseModel } from '../data/models/quiz-response.model';
import { QuizScoreResponseModel } from '../data/models';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  constructor(private http: HttpClient) {}

  getReadingResourceId(): string | null {
    return localStorage.getItem('resourceId');
  }

  getQuiz(resource_id: string) {
    return this.http.get<QuizResponseModel>(
      productionEnvironment.coreApiUrl + 'get/resources/quiz/' + resource_id
    );
  }

  regenerateQuiz() {
    return this.http.get<QuizResponseModel>(
      productionEnvironment.coreApiUrl +
        'regenerate/resources/quiz/' +
        this.getReadingResourceId()
    );
  }

  submitQuiz(id_quiz: string, answers: string[], time_spent: string) {
    return this.http.post<QuizScoreResponseModel>(
      productionEnvironment.coreApiUrl + 'submit/quiz',
      { id_quiz, answers, time_spent }
    );
  }
}
