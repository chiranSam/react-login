import { create } from 'zustand';
import { login as loginApi, getProfile } from '../api/auth';

interface AuthState {
  user: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (username, password) => {
    try {
      const data = await loginApi(username, password);
      set({ user: data.username, isAuthenticated: true });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  fetchProfile: async () => {
    try {
      const user = await getProfile();
      set({ user: user.username, isAuthenticated: true });
    } catch (error) {
      console.error(error);
      set({ user: null, isAuthenticated: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
