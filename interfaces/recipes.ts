export interface Recipe extends GeneratedRecipe {
  id: string;
  imageUrl: string;
}
export interface GeneratedRecipe {
  title: string;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  allergens: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  tags: string[];
  searchQuery?: string; // Optional property for search history
  createdAt?: string;
  updatedAt?: string;
  isFavorite?: boolean;
}

// Down the line, we can add more properties to the Recipe interface
// nutrition?: {
//   calories: number;
//   protein: number;
//   fat: number;
//   carbs: number;
//   fiber: number;
//   sugar: number;
// };
// cuisine?: string;
// dietaryRestrictions?: string[];
// source?: string;
// sourceUrl?: string;
// notes?: string;
// rating?: number;
// reviews?: number;
// isSaved?: boolean;
// isShared?: boolean;
// isMealPrep?: boolean;
// isQuick?: boolean;
// isHealthy?: boolean;
// isVegan?: boolean;
// isVegetarian?: boolean;
// isGlutenFree?: boolean;
// isDairyFree?: boolean;
// isNutFree?: boolean;
// isSoyFree?: boolean;
// isEggFree?: boolean;
// isShellfishFree?: boolean;
// isPeanutFree?: boolean;
// isFishFree?: boolean;
// isSesameFree?: boolean;
// isLowCarb?: boolean;
// isLowFat?: boolean;
// isLowSugar?: boolean;
// isLowSodium?: boolean;
// isLowCalorie?: boolean;
