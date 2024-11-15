export interface ClubParticipant {
  id_club: number;
  id_user: number;
  id_role: number;
  quantity_quizzes_solved: number;
  quantity_questions_answered: number;
  quantity_perfect_quizzes: number;
  quantity_reading_resources_read: number;
  created_at: string;
  nickname?: string;
  total_score: number;
  participant_status?: string;
}
