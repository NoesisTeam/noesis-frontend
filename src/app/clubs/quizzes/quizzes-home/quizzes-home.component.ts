import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { QuizComponent } from '../quiz/quiz.component';

@Component({
  selector: 'app-quizzes-home',
  standalone: true,
  imports: [RouterLink, QuizComponent],
  templateUrl: './quizzes-home.component.html',
  styleUrl: './quizzes-home.component.css',
})
export class QuizzesHomeComponent {}
