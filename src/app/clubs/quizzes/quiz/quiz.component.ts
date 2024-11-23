import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizResponseModel } from '../../../core/data/models/quiz-response.model';
import { QuizzesService } from '../../../core/services/quizzes.service';
import { AuthService } from '../../../core/services/auth.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ExecutedProcessDialogComponent } from '../../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';

interface QuestionOption {
  text: string;
  isCorrect?: boolean;
  isSelected: boolean;
  label: string;
}

interface Question {
  title: string;
  options: QuestionOption[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ExecutedProcessDialogComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  constructor(
    private router: Router,
    private quizzesService: QuizzesService,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  role = 'Member';
  isEditing = false;
  showStats = false;
  score = 0;
  correctAnswers = 0;
  timeUsed = '4:30';
  hoverBack = false;
  questions: Question[] = [];
  public dialogMessage = '';
  public dialogActionText = '';
  public showDialog = false;
  public isLoading: boolean = false;

  // Timer
  timeRemaining = '05:00';
  private timer: any;
  private totalSeconds = 5 * 60;

  ngOnInit() {
    this.isLoading = true;
    if (!this.authService.isTokenExpired()) {
      this.role = this.authService.getRoleFromToken();
      const resource_id = this.quizzesService.getReadingResourceId();
      if (resource_id != null) {
        this.quizzesService.getQuiz(resource_id).subscribe({
          next: (res: QuizResponseModel) => {
            this.mapQuestionsData(res);
            this.localStorageService.setQuizId(String(res.id_quiz));
            this.isLoading = false;
            this.startTimer();
          },
          error: (err) => {
            this.isLoading = false;
            this.dialogMessage = 'No hay quiz para mostrar';
            this.dialogActionText = 'Reintentar';
            this.showDialog = true;
          },
        });
      } else {
        this.isLoading = false;
        this.dialogMessage = 'No hay recurso seleccionado';
        this.dialogActionText = 'Seleccionar recurso';
        this.showDialog = true;
      }
    } else {
      this.isLoading = false;
      this.dialogMessage = 'Debes iniciar sesión para ver el quiz';
      this.dialogActionText = 'Iniciar sesión';
      this.showDialog = true;
    }
  }

  public closeDialog(): void {
    this.showDialog = false;
    if (this.dialogMessage === 'Debes iniciar sesión para ver el quiz') {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.stopTimer(); // Clear the timer when the component is destroyed
  }

  private startTimer(): void {
    this.timer = setInterval(() => {
      this.totalSeconds--;

      if (this.totalSeconds <= 0) {
        this.stopTimer();
        return;
      }

      const minutes = Math.floor(this.totalSeconds / 60);
      const seconds = this.totalSeconds % 60;

      this.timeRemaining = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
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
    clearInterval(this.timer); // Stop the timer when sending
    // this.calculateScore();
    this.showStats = true;
  }

  regenerateQuiz() {
    this.isLoading = true;
    this.quizzesService.regenerateQuiz().subscribe({
      next: (res: QuizResponseModel) => {
        this.mapQuestionsData(res);
        this.isLoading = false;
      },
      error: (err) => {
        this.dialogMessage = 'No se pudo regenerar el quiz';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
        this.isLoading = false;
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

    // Array of labels for options
    const labels = ['A', 'B', 'C', 'D'];

    // Transforming questions and answers
    this.questions = parsedQuestions.map((q, index) => ({
      title: q.question,
      options:
        parsedAnswers[index]?.map((answer, optionIndex) => ({
          text: answer, // Response text
          isCorrect: parsedCorrectAnswers[index] === answer, // Validate if correct
          isSelected: false, // Initially not selected
          label: labels[optionIndex], // Add label (A, B, C, D)
        })) || [],
    }));
  }

  calculateScore() {
    this.timeUsed = this.timeRemaining; // Saves the time used
    const quizId = this.localStorageService.getQuizId();
    if (quizId != null) {
      this.quizzesService.submitQuiz(
        quizId,
        this.getSelectedLabels(),
        this.timeUsed
      );
    }
  }

  // Method to obtain the labels of the selected options
  private getSelectedLabels(): string[] {
    const selectedLabels: string[] = [];

    this.questions.forEach((question, questionIndex) => {
      // Initialize array with "Z" of the same size as the options
      const orderedLabels = new Array(question.options.length).fill('Z');

      // Counter for selection order
      let selectionOrder = 0;

      // Scroll through the options in their original order
      question.options.forEach((option, optionIndex) => {
        if (option.isSelected) {
          // If the option is selected, save your label in the order of selection.
          orderedLabels[optionIndex] = option.label;
          selectionOrder++;
        }
      });

      if (orderedLabels.some((label) => label !== null)) {
        console.log(
          `Pregunta ${
            questionIndex + 1
          }: Opciones seleccionadas - ${orderedLabels.join(', ')}`
        );
        selectedLabels.push(...orderedLabels);
      }
    });

    return selectedLabels;
  }
}
