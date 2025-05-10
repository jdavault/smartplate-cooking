import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Allergen } from '@/types/allergen';
import { Recipe } from '@/types/recipe';
import { allergens } from '@/constants/allergens';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface AppContextType {
  selectedAllergens: string[];
  toggleAllergen: (allergenId: string) => void;
  allergensList: Allergen[];
  
  savedRecipes: Recipe[];
  saveRecipe: (recipe: Recipe) => void;
  removeSavedRecipe: (recipeId: string) => void;
  searchHistory: Recipe[];
  addToSearchHistory: (recipe: Recipe) => void;
  
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  currentRecipe: Recipe | null;
  setCurrentRecipe: (recipe: Recipe | null) => void;
}

export const AppContext = createContext<AppContextType>({
  selectedAllergens: [],
  toggleAllergen: () => {},
  allergensList: [],
  
  savedRecipes: [],
  saveRecipe: () => {},
  removeSavedRecipe: () => {},
  searchHistory: [],
  addToSearchHistory: () => {},
  
  isLoading: false,
  setIsLoading: () => {},
  error: null,
  setError: () => {},
  currentRecipe: null,
  setCurrentRecipe: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

// In-memory storage for web platform
const memoryStorage: Record<string, string> = {};

// Storage helper function that works with both SecureStore and localStorage
const storeData = async (key: string, value: string) => {
  try {
    if (Platform.OS === 'web') {
      memoryStorage[key] = value;
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

const getData = async (key: string): Promise<string | null> => {
  try {
    if (Platform.OS === 'web') {
      return memoryStorage[key] || null;
    }
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error('Error retrieving data:', error);
    return null;
  }
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [searchHistory, setSearchHistory] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

  // Load data from storage on app start
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        // Load allergens
        const allergensData = await getData('allergens');
        if (allergensData) {
          setSelectedAllergens(JSON.parse(allergensData));
        }
        
        // Load saved recipes
        const recipesData = await getData('savedRecipes');
        if (recipesData) {
          setSavedRecipes(JSON.parse(recipesData));
        }
        
        // Load search history
        const historyData = await getData('searchHistory');
        if (historyData) {
          setSearchHistory(JSON.parse(historyData));
        }
      } catch (error) {
        console.error('Error loading data from storage:', error);
      }
    };
    
    loadSavedData();
  }, []);

  // Save allergens whenever they change
  useEffect(() => {
    if (selectedAllergens.length > 0 || selectedAllergens.length === 0) {
      storeData('allergens', JSON.stringify(selectedAllergens));
    }
  }, [selectedAllergens]);

  // Save recipes whenever they change
  useEffect(() => {
    storeData('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);
  
  // Save search history whenever it changes
  useEffect(() => {
    storeData('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const toggleAllergen = (allergenId: string) => {
    setSelectedAllergens(prev => {
      if (prev.includes(allergenId)) {
        return prev.filter(id => id !== allergenId);
      } else {
        return [...prev, allergenId];
      }
    });
  };

  const saveRecipe = (recipe: Recipe) => {
    const recipeWithTimestamp = {
      ...recipe,
      savedAt: Date.now(),
    };
    setSavedRecipes(prev => {
      // Don't add duplicates
      const exists = prev.some(r => r.id === recipe.id);
      if (exists) return prev;
      return [recipeWithTimestamp, ...prev];
    });
  };

  const removeSavedRecipe = (recipeId: string) => {
    setSavedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };
  
  const addToSearchHistory = (recipe: Recipe) => {
    setSearchHistory(prev => {
      // Limit history to 10 items
      const newHistory = [recipe, ...prev.filter(r => r.id !== recipe.id)];
      if (newHistory.length > 10) {
        return newHistory.slice(0, 10);
      }
      return newHistory;
    });
  };

  return (
    <AppContext.Provider
      value={{
        selectedAllergens,
        toggleAllergen,
        allergensList: allergens,
        
        savedRecipes,
        saveRecipe,
        removeSavedRecipe,
        searchHistory,
        addToSearchHistory,
        
        isLoading,
        setIsLoading,
        error,
        setError,
        currentRecipe,
        setCurrentRecipe,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};