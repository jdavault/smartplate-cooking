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
} from 'react-native';
import { useAllergens } from '@/hooks/useAllergens';
import { useRecipes } from '@/hooks/useRecipes';
import SearchBar from '@/components/search/SearchBar';
import AllergenFilter from '@/components/search/AllergenFilter';
import RecipeModal from '@/components/recipes/RecipeModal';
import { colors } from '@/constants/colors';
import SearchHistory from '@/components/search/SearchHistory';
import { ActivityIndicator } from 'react-native';

export default function SearchScreen() {
  const { selectedAllergens } = useAllergens();
  const { searchRecipes, currentRecipe, isLoading, error, clearCurrentRecipe } =
    useRecipes();
  const [searchQuery, setSearchQuery] = useState('');

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
          inputContainerStyle={styles.searchBar}
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
              <ActivityIndicator size="large" color={colors.primary} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: colors.secondary,
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
    color: colors.accent,
  },
  subtitle: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.accentLight,
    marginTop: 4,
  },
  content: {
    flex: 1,
    backgroundColor: colors.secondary,
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
    color: colors.accentLight,
    marginTop: 16,
    textAlign: 'center',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: colors.error[50],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error[200],
    marginTop: 16,
  },
  errorText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.error[600],
  },
});
