import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Recipe } from '@/types/recipe';
import { colors } from '@/constants/colors';
import {
  ChevronLeft,
  Clock,
  Users,
  BookmarkCheck,
  ThumbsUp,
  Cookie,
  X,
} from 'lucide-react-native';
import { useRecipes } from '@/hooks/useRecipes';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';

interface RecipeModalProps {
  recipe: Recipe;
  visible: boolean;
  onClose: () => void;
  hideActions?: boolean;
}

export default function RecipeModal({
  recipe,
  visible,
  onClose,
  hideActions = false,
}: RecipeModalProps) {
  const [isVisible, setIsVisible] = useState(visible);
  const { saveRecipe, savedRecipes } = useRecipes();
  const [isSaved, setIsSaved] = useState(
    savedRecipes.some((r) => r.id === recipe.id)
  );
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsVisible(visible);

    if (visible) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  useEffect(() => {
    setIsSaved(savedRecipes.some((r) => r.id === recipe.id));
  }, [savedRecipes, recipe.id]);

  const handleSave = () => {
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    saveRecipe(recipe);
    setIsSaved(true);
  };

  if (!recipe) {
    return null;
  }

  // Get time estimate (total of prep and cook time)
  const totalTime = () => {
    try {
      const prepTimeNum = parseInt(recipe.prepTime.split(' ')[0]);
      const cookTimeNum = parseInt(recipe.cookTime.split(' ')[0]);
      return isNaN(prepTimeNum) || isNaN(cookTimeNum)
        ? `${recipe.prepTime} + ${recipe.cookTime}`
        : `${prepTimeNum + cookTimeNum} minutes`;
    } catch (error) {
      return `${recipe.prepTime} + ${recipe.cookTime}`;
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <ChevronLeft size={24} color={colors.grayBlue[800]} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Recipe</Text>
                <TouchableOpacity
                  style={styles.closeButtonRight}
                  onPress={onClose}
                >
                  <X size={24} color={colors.grayBlue[800]} />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                  <Text style={styles.title}>{recipe.title}</Text>
                  <Text style={styles.description}>{recipe.description}</Text>

                  <View style={styles.metaInfo}>
                    <View style={styles.metaItem}>
                      <Clock size={18} color={colors.primary} />
                      <Text style={styles.metaText}>{totalTime()}</Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Users size={18} color={colors.primary} />
                      <Text style={styles.metaText}>
                        {recipe.servings} servings
                      </Text>
                    </View>

                    <View style={styles.metaItem}>
                      <Cookie size={18} color={colors.primary} />
                      <Text style={styles.metaText}>{recipe.difficulty}</Text>
                    </View>
                  </View>

                  {recipe.allergens.length > 0 && (
                    <View style={styles.allergensContainer}>
                      <Text style={styles.allergensTitle}>Avoids:</Text>
                      <Text style={styles.allergensText}>
                        {recipe.allergens.join(', ')}
                      </Text>
                    </View>
                  )}

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ingredients</Text>
                    <View style={styles.ingredientsList}>
                      {recipe.ingredients.map((ingredient, index) => (
                        <View key={index} style={styles.ingredientItem}>
                          <View style={styles.bullet} />
                          <Text style={styles.ingredientText}>
                            {ingredient}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Instructions</Text>
                    <View style={styles.instructionsList}>
                      {recipe.instructions.map((instruction, index) => (
                        <View key={index} style={styles.instructionItem}>
                          <View style={styles.instructionNumberContainer}>
                            <Text style={styles.instructionNumber}>
                              {index + 1}
                            </Text>
                          </View>
                          <Text style={styles.instructionText}>
                            {instruction}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {recipe.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {recipe.tags.map((tag, index) => (
                        <View key={index} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>

              {!hideActions && (
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      styles.saveButton,
                      isSaved && styles.savedButton,
                    ]}
                    onPress={handleSave}
                    disabled={isSaved}
                  >
                    <BookmarkCheck
                      size={20}
                      color={isSaved ? colors.secondary : colors.primary}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        styles.saveButtonText,
                        isSaved && styles.savedButtonText,
                      ]}
                    >
                      {isSaved ? 'Saved' : 'Save Recipe'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.closeButtonBottom]}
                    onPress={onClose}
                  >
                    <ThumbsUp size={20} color={colors.grayBlue[800]} />
                    <Text style={styles.actionButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </SafeAreaView>
        </Animated.View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayBlue[200],
    backgroundColor: colors.secondary,
  },
  headerTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors.grayBlue[900],
  },
  closeButton: {
    padding: 4,
  },
  closeButtonRight: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    color: colors.grayBlue[900],
    marginBottom: 8,
  },
  description: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: colors.grayBlue[700],
    lineHeight: 22,
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  metaText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.grayBlue[700],
    marginLeft: 6,
  },
  allergensContainer: {
    backgroundColor: colors.error[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  allergensTitle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
    color: colors.error[700],
    marginRight: 4,
  },
  allergensText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.error[700],
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors.grayBlue[900],
    marginBottom: 12,
  },
  ingredientsList: {
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 8,
    marginRight: 8,
  },
  ingredientText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: colors.grayBlue[800],
    flex: 1,
  },
  instructionsList: {
    gap: 16,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  instructionNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  instructionNumber: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: colors.secondary,
  },
  instructionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: colors.grayBlue[800],
    flex: 1,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  tag: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  tagText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: colors.secondary,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.grayBlue[200],
    backgroundColor: colors.secondary,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  savedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  closeButtonBottom: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.grayBlue[300],
  },
  actionButtonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    marginLeft: 8,
  },
  saveButtonText: {
    color: colors.secondary,
  },
  savedButtonText: {
    color: colors.secondary,
  },
});
