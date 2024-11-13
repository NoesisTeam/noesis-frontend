export interface Club {
  id_club: number;
  club_code: string;
  club_name: string;
  club_desc?: string;
  is_private: boolean;
  is_academic: boolean;
  created_at: string;
  clubs_status: string;
}
