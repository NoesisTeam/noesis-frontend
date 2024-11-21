import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizResponseModel } from '../../../core/data/models/quiz-response.model';
import { QuizzesService } from '../../../core/services/quizzes.service';
import { AuthService } from '../../../core/services/auth.service';

interface QuestionOption {
  text: string;
  isCorrect?: boolean;
  isSelected: boolean;
}

interface Question {
  title: string;
  options: QuestionOption[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  constructor(
    private quizzesService: QuizzesService,
    private authService: AuthService
  ) {}

  role = 'Member';
  isEditing = false;
  showStats = false;
  score = 0;
  correctAnswers = 0;
  timeUsed = '4:30';
  hoverBack = false;
  questions: Question[] = [];

  // Timer
  timeRemaining = '05:00';
  private timer: any;

  ngOnInit() {
    if (!this.authService.isTokenExpired()) {
      this.role = this.authService.getRoleFromToken();
      const resource_id = this.quizzesService.getReadingResourceId();
      if (resource_id != null) {
        this.quizzesService.getQuiz(resource_id).subscribe({
          next: (res: QuizResponseModel) => {
            this.mapQuestionsData(res);
          },
          error: (err) => {
            console.error('Fallo al obtener el quiz', err);
            alert('No hay quiz para mostrar');
          },
        });
      } else {
        alert('No hay recurso seleccionado');
      }
    } else {
      alert('Debes iniciar sesión para ver el quiz');
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  startTimer() {
    let totalSeconds = 300;
    this.timer = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
        const minutes = Math.floor(totalSeconds / 60)
          .toString()
          .padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        this.timeRemaining = `${minutes}:${seconds}`;
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveChanges() {
    this.isEditing = false;
  }

  selectOption(questionIndex: number, optionIndex: number) {
    if (this.role === 'usuario' && !this.showStats) {
      this.questions[questionIndex].options.forEach(
        (option) => (option.isSelected = false)
      );
      this.questions[questionIndex].options[optionIndex].isSelected = true;
    }
  }

  updateOptionText(questionIndex: number, optionIndex: number, event: Event) {
    const input = event.target as HTMLElement;
    this.questions[questionIndex].options[optionIndex].text =
      input.textContent || '';
  }

  submitQuiz() {
    this.showStats = true;
    this.calculateScore();
    clearInterval(this.timer); // Stop the timer when sending
  }

  calculateScore() {
    this.timeUsed = this.timeRemaining; // Saves the time used
  }

  regenerateQuiz() {
    this.quizzesService.regenerateQuiz().subscribe({
      next: (res: QuizResponseModel) => {
        this.mapQuestionsData(res);
      },
      error: (err) => {
        console.error('Fallo al obtener el quiz', err);
        alert('No hay quiz para mostrar');
      },
    });
  }

  private mapQuestionsData(res: QuizResponseModel): void {
    const parsedQuestions = JSON.parse(res.questions as string) as {
      question: string;
    }[];
    const parsedAnswers = JSON.parse(res.answers as string) as string[][];
    let parsedCorrectAnswers: string[] = [];
    if (res.correct_answers) {
      parsedCorrectAnswers = JSON.parse(
        res.correct_answers as string
      ) as string[];
    }
    // Transforming questions and answers
    this.questions = parsedQuestions.map((q, index) => ({
      title: q.question,
      options:
        parsedAnswers[index]?.map((answer) => ({
          text: answer, // Response text
          isCorrect: parsedCorrectAnswers[index] === answer, // Validate if correct
          isSelected: false, // Initially not selected
        })) || [],
    }));
  }
}
