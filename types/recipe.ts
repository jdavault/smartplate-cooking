export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  tags: string[];
  allergens: string[];
  savedAt?: number;
  searchQuery?: string;
}