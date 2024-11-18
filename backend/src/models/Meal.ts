export interface Meal {
  id: string;
  user_id: string;
  meal_type: string;
  food_name: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  meal_date: Date;
  image_url?: string;
}