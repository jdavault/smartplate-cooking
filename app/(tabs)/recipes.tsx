import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  useColorScheme,
} from 'react-native';
import { useApplicationContext } from '@/hooks/useApplicationContext';
import { useRecipeContext } from '@/hooks/useRecipeContext';
import SearchBar from '@/components/search/SearchBar';
import AllergenFilter from '@/components/search/AllergenFilter';
import RecipeModal from '@/components/recipes/RecipeModal';
import { colors } from '@/constants/colors';
import SearchHistory from '@/components/search/SearchHistory';
import { ActivityIndicator } from 'react-native';
import ThemedView from '@/components/ThemedView';

export default function SearchScreen() {
  const { selectedAllergens } = useApplicationContext();
  const { searchRecipes, currentRecipe, isLoading, error, clearCurrentRecipe } =
    useRecipeContext();
  const [searchQuery, setSearchQuery] = useState('');

  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme];
  const styles = getStyles(colorScheme);

  const handleSearch = () => {
    if (searchQuery.trim().length === 0) return;
    searchRecipes(searchQuery, selectedAllergens);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Image
              source={require('../../assets/images/smartPlate76.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Recipe Finder</Text>
          </View>
          <Text style={styles.subtitle}>Find allergen-free recipes</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSearch={handleSearch}
          placeholder="Search recipes..."
          disabled={isLoading}
        />

        <AllergenFilter />

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text style={styles.loadingText}>
                Finding the perfect recipe...
              </Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : (
            <SearchHistory />
          )}
        </ScrollView>

        {currentRecipe && (
          <RecipeModal
            recipe={currentRecipe}
            visible={!!currentRecipe}
            onClose={clearCurrentRecipe}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const getStyles = (scheme: 'light' | 'dark') => {
  const theme = colors[scheme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.secondary,
    },
    keyboardAvoid: {
      flex: 1,
    },
    header: {
      padding: 16,
      paddingTop: 24,
      backgroundColor: theme.secondary,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 100,
      height: 100,
      marginRight: 12,
    },
    title: {
      fontFamily: 'Montserrat-Bold',
      fontSize: 24,
      color: theme.accent,
    },
    subtitle: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 14,
      color: theme.accentLight,
      marginTop: 4,
    },
    content: {
      flex: 1,
      backgroundColor: theme.secondary,
    },
    scrollContent: {
      padding: 16,
      paddingBottom: 100,
    },
    loadingContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      marginTop: 40,
    },
    loadingText: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 16,
      color: theme.accentLight,
      marginTop: 16,
      textAlign: 'center',
    },
    errorContainer: {
      padding: 16,
      backgroundColor: theme.error[50],
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.error[200],
      marginTop: 16,
    },
    errorText: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 14,
      color: theme.error[600],
    },
  });
};
