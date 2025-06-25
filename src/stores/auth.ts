import { defineStore } from 'pinia';
import axios from 'axios';

import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  error: string | null;
  _initialized: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    error: null,
    _initialized: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    isInitialized: (state) => state._initialized,
  },
  actions: {
    async login(credentials: { username: string; password: string }) {
      this.error = null;
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/login`,
          {
            username: credentials.username,
            password: credentials.password,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        this.token = response.data.accessToken;
        this.user = response.data;
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.error = error.response?.data?.message || 'Login failed';
        } else {
          this.error = 'An unexpected error occurred';
        }
        throw error;
      }
    },

    async register(userData: { username: string; password: string; email: string }) {
      this.error = null;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/users/add`,
          {
            username: userData.username,
            password: userData.password,
            email: userData.email,
          },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (error) {
        if (axios.isAxiosError(error)) {
          this.error = error.response?.data?.message || 'Registration failed';
        } else {
          this.error = 'An unexpected error occurred';
        }
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    initializeAuth() {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
      this._initialized = true;
    },
  },
});
