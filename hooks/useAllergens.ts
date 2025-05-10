import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

export function useAllergens() {
  const { selectedAllergens, toggleAllergen, allergensList } = useContext(AppContext);

  return {
    selectedAllergens,
    toggleAllergen,
    allergensList,
  };
}