import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useColorScheme,
} from 'react-native';
import { Recipe } from '@/types/recipe';
import { colors } from '@/constants/colors';
import { Clock, Users, Trash2 } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onDelete?: () => void;
}

const RecipeCard = ({ recipe, onPress, onDelete }: RecipeCardProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme];
  const styles = getStyles(colorScheme);

  const handleDelete = (e: any) => {
    e.stopPropagation();
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (onDelete) {
      onDelete();
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        {recipe.createdAt && (
          <Text style={styles.date}>
            Saved on {formatDate(recipe.createdAt)}
          </Text>
        )}
        {onDelete && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <Trash2 size={18} color={theme.error[700]} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {recipe.description}
      </Text>

      <View style={styles.metaInfo}>
        <View style={styles.metaItem}>
          <Clock size={16} color={theme.primary} />
          <Text style={styles.metaText}>
            {recipe.prepTime} + {recipe.cookTime}
          </Text>
        </View>

        <View style={styles.metaItem}>
          <Users size={16} color={theme.primary} />
          <Text style={styles.metaText}>{recipe.servings} servings</Text>
        </View>
      </View>

      {recipe.allergens.length > 0 && (
        <View style={styles.allergens}>
          <Text style={styles.allergensLabel}>Avoids: </Text>
          <Text style={styles.allergensText}>
            {recipe.allergens.join(', ')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RecipeCard;

const getStyles = (scheme: 'light' | 'dark') => {
  const theme = colors[scheme];
  return StyleSheet.create({
    container: {
      backgroundColor: theme.secondary,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.grayBlue[200],
      elevation: 2,
      shadowColor: theme.accentDark,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    date: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 12,
      color: theme.grayBlue[500],
    },
    deleteButton: {
      padding: 4,
    },
    title: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      color: theme.grayBlue[900],
      marginBottom: 4,
    },
    description: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 14,
      color: theme.grayBlue[700],
      marginBottom: 12,
    },
    metaInfo: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    metaItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    metaText: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 13,
      color: theme.grayBlue[700],
      marginLeft: 4,
    },
    allergens: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 4,
      flexWrap: 'wrap',
    },
    allergensLabel: {
      fontFamily: 'OpenSans-SemiBold',
      fontSize: 12,
      color: theme.error[700],
    },
    allergensText: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 12,
      color: theme.error[700],
      flex: 1,
    },
  });
};
