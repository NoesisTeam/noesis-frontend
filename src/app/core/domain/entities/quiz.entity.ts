export interface Quiz {
  id_quiz: number;
  questions: string;
  answers: string;
  correct_answers: string;
  quantity_questions: number;
  minutes_to_answer: number;
  id_reading_resource: number;
}
