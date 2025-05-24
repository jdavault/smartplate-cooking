import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useRecipeContext } from '@/hooks/useRecipeContext';
import { colors } from '@/constants/colors';
import { Clock, Search } from 'lucide-react-native';
import { useApplicationContext } from '@/hooks/useApplicationContext';

const SearchHistory = () => {
  const { searchHistory, setCurrentRecipe } = useRecipeContext();
  const { selectedAllergens, allergensList } = useApplicationContext();

  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme];
  const styles = getStyles(colorScheme);

  const getAllergenNames = (ids: string[]) => {
    return ids.map((id) => {
      const allergen = allergensList.find((a) => a.id === id);
      return allergen ? allergen.name : id;
    });
  };

  if (searchHistory.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Search size={48} color={theme.accent} />
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
        <Clock size={18} color={theme.accent} />
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
};
export default SearchHistory;

const getStyles = (scheme: 'light' | 'dark') => {
  const theme = colors[scheme];
  return StyleSheet.create({
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
      color: theme.accent,
      marginLeft: 8,
    },
    historyItem: {
      backgroundColor: theme.secondary,
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.secondaryDark,
    },
    searchInfo: {
      flex: 1,
    },
    searchQuery: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 13,
      color: theme.accentLight,
      marginBottom: 4,
    },
    recipeTitle: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 16,
      color: theme.accent,
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
      color: theme.warning[700],
    },
    allergensText: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 12,
      color: theme.warning[700],
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
      color: theme.accent,
      marginTop: 16,
      marginBottom: 8,
    },
    emptyText: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 14,
      color: theme.accentLight,
      textAlign: 'center',
      lineHeight: 20,
    },
  });
};
