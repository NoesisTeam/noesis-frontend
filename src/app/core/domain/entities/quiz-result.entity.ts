export interface QuizResult {
  id_user: number;
  id_role: number;
  id_club: number;
  id_quiz: number;
  quantity_correct_answers: number;
  time_spent: number;
  score: number;
  created_at: string;
}
