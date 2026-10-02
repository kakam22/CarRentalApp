import { createContext, ReactNode, useContext, useState } from 'react';
import { GUEST_USER, User } from '../data/users';
import * as authService from '../services/authService';

type AuthContextValue = {
  user: User | null;
  logIn: (email: string, password: string) => Promise<void>;
  continueAsGuest: () => void;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

// Holds the logged-in user in memory. It is not persisted yet, so restarting the app logs you out.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const value: AuthContextValue = {
    user,
    logIn: async (email, password) => {
      setUser(await authService.logIn(email, password));
    },
    continueAsGuest: () => setUser(GUEST_USER),
    logOut: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
}
