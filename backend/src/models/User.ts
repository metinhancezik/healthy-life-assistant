export interface User {
    id: string;
    cognito_id: string;
    username: string;
    email: string;
    profile_image_url?: string;
    created_at: Date;
  }