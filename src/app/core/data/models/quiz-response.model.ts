export interface QuizResponseModel {
  id_quiz: number;
  questions: string;
  answers: string;
  correct_answers?: string;
  quantity_questions: number;
  
}
