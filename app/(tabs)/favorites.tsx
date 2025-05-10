import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useRecipes } from '@/hooks/useRecipes';
import RecipeCard from '@/components/recipes/RecipeCard';
import { colors } from '@/constants/colors';
import EmptyState from '@/components/ui/EmptyState';
import RecipeModal from '@/components/recipes/RecipeModal';
import { useState } from 'react';
import { Recipe } from '@/types/recipe';

export default function FavoritesScreen() {
  const { savedRecipes, removeSavedRecipe } = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const handleRecipePress = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleModalClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Saved Recipes</Text>
        <Text style={styles.subtitle}>
          {savedRecipes.length > 0
            ? `You have ${savedRecipes.length} saved recipe${
                savedRecipes.length > 1 ? 's' : ''
              }`
            : 'Save your favorite recipes here'}
        </Text>
      </View>

      {savedRecipes.length === 0 ? (
        <EmptyState
          title="No saved recipes"
          message="Search for recipes and save your favorites to see them here."
          icon="bookmark"
        />
      ) : (
        <FlatList
          data={savedRecipes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => handleRecipePress(item)}
              onDelete={() => removeSavedRecipe(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {selectedRecipe && (
        <RecipeModal
          recipe={selectedRecipe}
          visible={!!selectedRecipe}
          onClose={handleModalClose}
          hideActions
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: colors.gray[900],
  },
  subtitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
});
