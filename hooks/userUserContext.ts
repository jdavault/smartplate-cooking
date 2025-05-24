import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import type { UserContextType } from '@/types/user'; // Adjust path as needed

export function useUserContext(): UserContextType {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
}
