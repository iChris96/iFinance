import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  signIn: (token: string) => void;
  signOut: () => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: null,
  signIn: async (token) => {
    await AsyncStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },
  signOut: async () => {
    await AsyncStorage.removeItem("token");
    set({ token: null, isAuthenticated: false });
  },
  hydrate: async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      console.log({ auth: token });
      set({ token, isAuthenticated: true });
      return;
    }
    console.log({ noAuth: token });
    set({ token: null, isAuthenticated: false });
  },
}));
