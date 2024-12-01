export type UserRole = 'student' | 'educator' | 'trainer';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export interface LoginCredentials {
  username: string;
  password: string;
}