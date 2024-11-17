export interface Activity {
  id: string;
  user_id: string;
  activity_type: string;
  duration_minutes: number;
  calories_burned?: number;
  activity_date: Date;
}
