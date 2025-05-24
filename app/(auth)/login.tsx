import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardTypeOptions,
  useColorScheme,
} from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import Spacer from '@/components/Spacer';
import ThemedButton from '@/components/ThemedButton';
import ThemedTextInput from '@/components/ThemedTextInput';
import { useUserContext } from '@/hooks/userUserContext';
import { colors } from '@/constants/colors';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login, user } = useUserContext();

  const colorScheme = useColorScheme() ?? 'light'; // Default to 'light' if colorScheme is null
  const styles = getStyles(colorScheme);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await login(email, password);
      console.log('User logged in successfully');
    } catch (error: any) {
      setError(
        error?.message?.replace(/^AppwriteException:\s*/, '') ?? 'Login failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Login to Your Account
        </ThemedText>
        <ThemedTextInput
          placeholder="Email"
          style={{ width: '80%', marginBottom: 20 }}
          keyboardType="email-address"
          value={email}
          onSubmitEditing={handleSubmit}
          onChangeText={(text: string) => setEmail(text)}
        />
        <ThemedTextInput
          placeholder="Password"
          secureTextEntry={true}
          style={{ width: '80%', marginBottom: 20 }}
          value={password}
          onSubmitEditing={handleSubmit}
          onChangeText={(text: string) => setPassword(text)}
        />
        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
        <ThemedButton onPress={handleSubmit} disabled={loading}>
          <ThemedText style={{ color: '#f2f2f2', textAlign: 'center' }}>
            Login
          </ThemedText>
        </ThemedButton>
        <Link href="/register" replace>
          <ThemedText
            style={{ textAlign: 'center', textDecorationLine: 'underline' }}
          >
            (or Register instead)
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const getStyles = (scheme: 'light' | 'dark') => {
  const theme = colors[scheme] ?? colors.light;
  return StyleSheet.create({
    title: {
      textAlign: 'center',
      fontSize: 18,
      marginBottom: 30,
    },
    error: {
      color: 'red',
      padding: 10,
      backgroundColor: theme.secondary,
      borderWidth: 1,
      borderRadius: 6,
      marginHorizontal: 20,
      fontSize: 16,
      textAlign: 'center',
    },
  });
};
