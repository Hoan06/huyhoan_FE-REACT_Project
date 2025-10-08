export interface User {
  id: number;
  email: string;
  userName: string;
  password: string;
  created_at: string;
}

export interface Board {
  color: string;
  id: number;
  user_id: number;
  title: string;
  description: string;
  backdrop: string;
  is_starred: boolean;
  created_at: string;
}
