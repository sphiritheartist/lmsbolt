import { create } from 'zustand';
import { AuthState, LoginCredentials, User } from '../types/auth';

// Simulated user data (replace with actual API calls)
const MOCK_USERS = [
  {
    id: '1',
    username: 'student1',
    password: 'password123',
    role: 'student',
    name: 'John Doe',
    email: 'john@example.com',
  },
  {
    id: '2',
    username: 'educator1',
    password: 'password123',
    role: 'educator',
    name: 'Jane Smith',
    email: 'jane@example.com',
  },
];

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials: LoginCredentials) => {
    // Simulate API call
    const user = MOCK_USERS.find(
      (u) => u.username === credentials.username && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password, ...userWithoutPassword } = user;
    set({ user: userWithoutPassword as User, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));