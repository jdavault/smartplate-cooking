import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { generateRecipe } from '@/services/recipeGenerator';

export function useRecipeContext() {
  const {
    savedRecipes,
    saveRecipe,
    removeSavedRecipe,
    searchHistory,
    addToSearchHistory,
    setIsLoading,
    isLoading,
    error,
    setError,
    currentRecipe,
    setCurrentRecipe,
  } = useContext(AppContext);

  const searchRecipes = async (query: string, allergens: string[]) => {
    try {
      setIsLoading(true);
      setError(null);

      const recipe = await generateRecipe(query, allergens);

      // Add search query to recipe for history
      recipe.searchQuery = query;

      // Set current recipe
      setCurrentRecipe(recipe);

      // Add to search history
      addToSearchHistory(recipe);
    } catch (error) {
      console.error('Error searching recipes:', error);
      setError(
        'Something went wrong while searching for recipes. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearCurrentRecipe = () => {
    setCurrentRecipe(null);
  };

  return {
    savedRecipes,
    saveRecipe,
    removeSavedRecipe,
    searchHistory,
    searchRecipes,
    isLoading,
    error,
    currentRecipe,
    clearCurrentRecipe,
    addToSearchHistory,
    setCurrentRecipe,
  };
}
