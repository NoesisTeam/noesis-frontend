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
  timeUsed: number = 0;
  hoverBack = false;
  questions: Question[] = [];
  solved = false;
  public dialogMessage = '';
  public dialogActionText = '';
  public showDialog = false;
  public isLoading: boolean = false;

  // Timer
  timeRemaining = '';
  private timer: any;
  private totalTime = 5 * 60;
  private secondsRemaining = 0;

  // refactor zone

  ngOnInit() {
    this.isLoading = true;
  
    if (this.authService.isTokenExpired()) {
      this.showDialogWithMessage('Debes iniciar sesión para ver el quiz', 'Iniciar sesión');
      return;
    }
  
    this.role = this.authService.getRoleFromToken();
    const resource_id = this.quizzesService.getReadingResourceId();
  
    if (!resource_id) {
      this.showDialogWithMessage('No hay recurso seleccionado', 'Vuelve a ingresar al recurso');
      return;
    }
  
    this.loadQuiz(resource_id);
  }
  
  private loadQuiz(resource_id: string) {
    this.quizzesService.getQuiz(resource_id).subscribe({
      next: (res: QuizResponseModel) => {
        this.mapQuestionsData(res);
        this.localStorageService.setQuizId(String(res.id_quiz));
        this.verifyQuiz(String(res.id_quiz));
      },
      error: () => {
        this.showDialogWithMessage('No hay quiz para mostrar', 'Regresa mas tarde');
      },
    });
  }
  
  private verifyQuiz(quizId: string) {
    this.quizzesService.checkQuiz(String(quizId)).subscribe({
      next: (res) => {
        if (res.answered) {
          this.solved = true;
          this.showDialogWithMessage('Ya has presentado este quiz - ¡Ve a por el siguiente!', 'Aceptar');
        } else {
          this.startTimer();
        }
        this.isLoading = false;
      },
      error: () => {
        this.showDialogWithMessage('No se ha podido verificar el quiz', 'Aceptar');
        this.isLoading = false;
      },
    });
  }
  
  private showDialogWithMessage(message: string, actionText: string) {
    this.isLoading = false;
    this.dialogMessage = message;
    this.dialogActionText = actionText;
    this.showDialog = true;
  }

  // Refactor zone

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
    this.totalTime = this.questions.length * 60

    this.secondsRemaining = this.totalTime; // Tiempo en segundos
    this.timeRemaining = ''; // Inicializa como string
  
    // Inicia el temporizador
    this.timer = setInterval(() => {
      if (this.secondsRemaining <= 0) {
        this.stopTimer(); // Detén el temporizador cuando llegue a cero
        return;
      }
  
      // Decrementa el total de segundos
      this.secondsRemaining--;
  
      // Calcula minutos y segundos
      const minutes = Math.floor(this.secondsRemaining / 60);
      const seconds = this.secondsRemaining % 60;
  
      // Actualiza la variable de tiempo restante en formato MM:SS
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
    if (this.role === 'Member' && !this.showStats) {
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
    this.calculateScore();
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
    this.timeUsed = this.totalTime - this.secondsRemaining; // Saves the time used
    console.log(this.timeUsed);
    const quizId = this.localStorageService.getQuizId();
    if (quizId){
      const quizIdNumber = parseInt(quizId);
      if (quizId != null) {
        this.quizzesService.submitQuiz(
          quizIdNumber,
          this.getSelectedLabels(),
          this.timeUsed
        ).subscribe({
          next: (data) => {
            this.score = data.score;
            this.correctAnswers = data.quantity_correct_answers;
            this.fillCorrectsOptions(data.correct_answers);
            this.showStats = true;
          },
          error: (error) => {
            this.dialogMessage =
              'No se ha podido calcular tu puntaje';
            this.dialogActionText = 'Aceptar';
            this.showDialog = true;
          },
        });
      }
    }else{
      alert("No hay quiz seleccionado")
    }
    
  }

  private fillCorrectsOptions(correct_answers: string[]): void {

    if (correct_answers.length !== this.questions.length) {
      console.error("La cantidad de respuestas correctas no coincide con la cantidad de preguntas.");
      return;
    }
  
    // Iterar con un índice para mantener sincronización entre respuestas y preguntas.
    this.questions.forEach((question, index) => {
      const correctAnswer = correct_answers[index]; // Toma la respuesta correspondiente a la pregunta.
      question.options.forEach(option => {
        if (option.label === correctAnswer) {
          option.isCorrect = true;
        }
      });
    });
  }
  // Method to obtain the labels of the selected options
  private getSelectedLabels(): string[] {
    
    // Initialize array with "Z" of the same size as the questions
    const orderedLabels = new Array(this.questions.length).fill('Z');

    this.questions.forEach((question, questionIndex) => {

      // Scroll through the options in their original order
      question.options.forEach((option, optionIndex) => {
        if (option.isSelected) {
          // If the option is selected, save your label in the order of selection.
          orderedLabels[questionIndex] = option.label;
          console.log(orderedLabels);
          return
        }
      });

    });

    return orderedLabels;
  }
}
