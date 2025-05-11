import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useAllergens } from '@/hooks/useAllergens';
import { colors } from '@/constants/colors';
import { X } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function AllergenFilter() {
  const { selectedAllergens, toggleAllergen, allergensList } = useAllergens();

  const handleToggle = (allergenId: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    toggleAllergen(allergenId);
  };

  if (allergensList.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Allergens to Avoid</Text>
        {selectedAllergens.length > 0 && (
          <Text style={styles.count}>{selectedAllergens.length} selected</Text>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {allergensList.map((allergen) => {
          const isSelected = selectedAllergens.includes(allergen.id);
          return (
            <TouchableOpacity
              key={allergen.id}
              style={[
                styles.allergenChip,
                isSelected && styles.allergenChipSelected,
              ]}
              onPress={() => handleToggle(allergen.id)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.allergenText,
                  isSelected && styles.allergenTextSelected,
                ]}
              >
                {allergen.name}
              </Text>

              {isSelected && (
                <X
                  size={14}
                  color={colors.secondary}
                  style={styles.closeIcon}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondaryDark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    color: colors.accent,
  },
  count: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: colors.accentLight,
  },
  scrollContent: {
    paddingHorizontal: 12,
    gap: 8,
  },
  allergenChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondaryDark,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.grayBlue[300],
  },
  allergenChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  allergenText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.accent,
  },
  allergenTextSelected: {
    color: colors.secondary,
  },
  closeIcon: {
    marginLeft: 4,
  },
});
