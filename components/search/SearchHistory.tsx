import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRecipes } from '@/hooks/useRecipes';
import { colors } from '@/constants/colors';
import { Clock, Search } from 'lucide-react-native';
import { useAllergens } from '@/hooks/useAllergens';

export default function SearchHistory() {
  const { searchHistory, setCurrentRecipe } = useRecipes();
  const { selectedAllergens, allergensList } = useAllergens();

  const getAllergenNames = (ids: string[]) => {
    return ids.map((id) => {
      const allergen = allergensList.find((a) => a.id === id);
      return allergen ? allergen.name : id;
    });
  };

  if (searchHistory.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Search size={48} color={colors.accent} />
        <Text style={styles.emptyTitle}>Looking for recipes?</Text>
        <Text style={styles.emptyText}>
          Search for recipes above and we'll find something delicious that
          matches your dietary needs!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Clock size={18} color={colors.accent} />
        <Text style={styles.title}>Recent Searches</Text>
      </View>

      <ScrollView>
        {searchHistory.map((recipe) => (
          <TouchableOpacity
            key={recipe.id}
            style={styles.historyItem}
            onPress={() => setCurrentRecipe(recipe)}
          >
            <View style={styles.searchInfo}>
              <Text style={styles.searchQuery}>
                {recipe.searchQuery || 'Recipe search'}
              </Text>
              <Text style={styles.recipeTitle}>{recipe.title}</Text>

              {selectedAllergens.length > 0 && (
                <View style={styles.allergensContainer}>
                  <Text style={styles.allergensLabel}>Avoids: </Text>
                  <Text style={styles.allergensText}>
                    {getAllergenNames(selectedAllergens).join(', ')}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: colors.accent,
    marginLeft: 8,
  },
  historyItem: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.secondaryDark,
  },
  searchInfo: {
    flex: 1,
  },
  searchQuery: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: colors.accentLight,
    marginBottom: 4,
  },
  recipeTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: colors.accent,
    marginBottom: 4,
  },
  allergensContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  allergensLabel: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 12,
    color: colors.warning[700],
  },
  allergensText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: colors.warning[700],
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 32,
  },
  emptyTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors.accent,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.accentLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});
