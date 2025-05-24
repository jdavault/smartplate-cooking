import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';

export function useApplicationContext() {
  const { selectedAllergens, toggleAllergen, allergensList } =
    useContext(AppContext);

  return {
    selectedAllergens,
    toggleAllergen,
    allergensList,
  };
}
