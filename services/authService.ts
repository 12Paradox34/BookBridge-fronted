
import { User } from '../types';
import { API_URL } from './config';

const TOKEN_KEY = 'bookbridge_auth_token';
const USER_KEY = 'bookbridge_user';

export const authService = {
  // Login
  login: async (email: string, password: string): Promise<User> => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    
    return data.user;
  },

  // Signup
  signup: async (name: string, email: string, password: string): Promise<User> => {
    console.log(name,email,password);
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log(data);
    if (!response.ok) throw new Error(data.error || 'Signup failed');

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));

    return data.user;
  },

  // Update Profile
  updateProfile: async (formData: any): Promise<User> => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) throw new Error('Not authenticated');

    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Update failed');

    // Update local user data
    localStorage.setItem(USER_KEY, JSON.stringify(data));
    return data;
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};
