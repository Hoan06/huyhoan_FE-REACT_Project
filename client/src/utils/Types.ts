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

export interface List {
  id: number;
  board_id: number;
  title: string;
  created_at: string;
}

export interface Task {
  id: number;
  list_id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  created_at: string;
}

export interface Tag {
  id: number;
  task_id: number;
  content: string;
  color: string;
}
