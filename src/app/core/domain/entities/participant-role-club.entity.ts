export interface ParticipantRoleClub {
  id_user: number;
  id_role: number;
  id_club: number;
  nickname?: string;
  real_name?: string;
  quantity_quizzes_solved: number;
  quantity_questions_answered: number;
  quantity_perfect_quizzes: number;
  quantity_reading_resources_read: number;
  created_at: string;
}
