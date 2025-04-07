export interface UserAuth {
  id: string;
  name: string;
  email: string;
  is_logged?: boolean | null;
  token?: string | null;
}

export interface LoginForm {
  email: string;
  password: string;
}
