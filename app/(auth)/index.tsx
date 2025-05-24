import React from 'react';
import {
  StyleSheet,
  View,
  useColorScheme,
  TextStyle,
  ViewStyle,
  Pressable,
} from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../../constants/colors';
import ThemedView from '../../components/ThemedView';
import ThemedLogo from '../../components/ThemedLogo';
import ThemedText from '../../components/ThemedText';

const Home: React.FC = () => {
  const colorScheme = useColorScheme() ?? 'light'; // Fallback to 'light'
  const styles = getStyles(colorScheme);

  // Inside your component return block:
  return (
    <ThemedView>
      <ThemedLogo />

      <Link href="/recipes" asChild>
        <ThemedText style={styles.links}>Let's get started!</ThemedText>
      </Link>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button}>
          <Link href="/login" asChild>
            <ThemedText style={{ color: colors[colorScheme].secondary }}>
              Login
            </ThemedText>
          </Link>
        </Pressable>

        <Pressable style={styles.button}>
          <Link href="/about" asChild>
            <ThemedText style={{ color: colors[colorScheme].secondary }}>
              About Us
            </ThemedText>
          </Link>
        </Pressable>

        <Pressable style={styles.button}>
          <Link href="/contact" asChild>
            <ThemedText style={{ color: colors[colorScheme].secondary }}>
              Contact Us
            </ThemedText>
          </Link>
        </Pressable>
      </View>
    </ThemedView>
  );
};
export default Home;

type Style = {
  title: TextStyle;
  links: TextStyle;
  subtitle: TextStyle;
  buttonRow: ViewStyle;
  button: ViewStyle;
};

const getStyles = (scheme: 'light' | 'dark'): Style =>
  StyleSheet.create<Style>({
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors[scheme].accent,
    },
    links: {
      color:
        scheme === 'light' ? colors[scheme].accent : colors[scheme].primary,
      fontSize: 18,
      textAlign: 'center',
      marginVertical: 10,
      marginBottom: 10,
      textDecorationLine: 'underline',
    },
    subtitle: {
      fontSize: 14,
      marginTop: 10,
      marginBottom: 30,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 2,
    },
    button: {
      marginTop: 10,
      backgroundColor: colors[scheme].primary,
      padding: 10,
      borderRadius: 5,
    },
  });
