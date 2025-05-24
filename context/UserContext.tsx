import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from 'react';
import { account } from '../libs/appwrite';
import { ID } from 'react-native-appwrite';
import { useRouter } from 'expo-router';
import { User } from '@/types/user';

interface UserContextType {
  user: User | null;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  authChecked: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

// Default values for context
const defaultUserContext: UserContextType = {
  user: null,
  authChecked: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  async function login(email: string, password: string) {
    try {
      try {
        await account.deleteSession('current');
      } catch (error: any) {
        if (error.code !== 401) {
          throw error;
        }
      }

      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      console.log('User logged in successfully:', user);

      const mappedUser: User = {
        id: user.$id,
        email: user.email,
        name: user.name,
        firstName: user.name?.split(' ')[0],
        lastName: user.name?.split(' ').slice(1).join(' '),
      };
      setUser(mappedUser);
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw new Error(error.message || 'Login failed');
    }
  }

  async function register(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  async function logout() {
    await account.deleteSession('current');
    setUser(null);
    router.replace('/');
  }

  const value: UserContextType = useMemo(
    () => ({
      user,
      authChecked,
      login,
      logout,
      register,
    }),
    [user, authChecked]
  );

  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = await account.get();

        const mappedUser: User = {
          id: user.$id,
          email: user.email,
          name: user.name,
          firstName: user.name?.split(' ')[0],
          lastName: user.name?.split(' ').slice(1).join(' '),
        };

        setUser(mappedUser);
      } catch {
        setUser(null);
      } finally {
        setAuthChecked(true);
      }
    };

    initializeUser();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
