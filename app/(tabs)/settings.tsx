import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useAllergens } from '@/hooksTBD/useAllergens';
import { colors } from '@/constants/colors';
import { CircleAlert as AlertCircle, ExternalLink } from 'lucide-react-native';

export default function SettingsScreen() {
  const { allergensList, selectedAllergens, toggleAllergen } = useAllergens();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your dietary preferences</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allergens to Avoid</Text>
          <Text style={styles.sectionDescription}>
            Select the allergens you want to avoid in your recipes. These will
            be excluded from your search results.
          </Text>

          <View style={styles.allergensList}>
            {allergensList.map((allergen) => (
              <View key={allergen.id} style={styles.allergenItem}>
                <View>
                  <Text style={styles.allergenName}>{allergen.name}</Text>
                  <Text style={styles.allergenDescription}>
                    {allergen.description}
                  </Text>
                </View>
                <Switch
                  value={selectedAllergens.includes(allergen.id)}
                  onValueChange={() => toggleAllergen(allergen.id)}
                  trackColor={{ false: colors.gray[300], true: colors.primary }}
                  thumbColor={colors.white}
                />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.disclaimerBox}>
            <AlertCircle
              size={20}
              color={colors.warning[700]}
              style={styles.disclaimerIcon}
            />
            <Text style={styles.disclaimerText}>
              This app is designed to help find recipes that avoid common
              allergens, but it should not replace professional medical advice.
              Always verify ingredients if you have severe allergies.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL('https://example.com/terms')}
          >
            <Text style={styles.linkText}>Terms of Service</Text>
            <ExternalLink size={16} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL('https://example.com/privacy')}
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
            <ExternalLink size={16} color={colors.primary} />
          </TouchableOpacity>

          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
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
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.white,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: colors.gray[900],
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 16,
  },
  allergensList: {
    marginTop: 8,
  },
  allergenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  allergenName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    color: colors.gray[900],
  },
  allergenDescription: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: colors.gray[600],
    marginTop: 2,
  },
  disclaimerBox: {
    backgroundColor: colors.warning[50],
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 16,
  },
  disclaimerIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  disclaimerText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.warning[700],
    flex: 1,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  linkText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    color: colors.primary,
    flex: 1,
  },
  versionText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: 24,
  },
});
