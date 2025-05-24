import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  useColorScheme,
} from 'react-native';
import { Link } from 'expo-router';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import ThemedTextInput from '@/components/ThemedTextInput';
import Spacer from '@/components/Spacer';
import ThemedButton from '@/components/ThemedButton';
import { useUserContext } from '@/hooks/userUserContext';
import { colors } from '@/constants/colors';
const register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { register } = useUserContext();

  const colorScheme = useColorScheme() ?? 'light'; // Default to 'light' if colorScheme is null
  const styles = getStyles(colorScheme);

  const handleSubmit = async () => {
    try {
      setError(null);
      await register(email, password);
      console.log(
        `Registering user, email: ${email} and password: ${password} registered`
      );
    } catch (error: Error | any) {
      setError(error.message.replace(/^AppwriteException:\s*/, ''));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Register Your Account
        </ThemedText>

        <ThemedTextInput
          placeholder="Email"
          style={{ width: '80%', marginBottom: 20 }}
          keyboardType="email-address"
          value={email}
          onSubmitEditing={() => handleSubmit()}
          onChangeText={(text) => setEmail(text)}
        />

        <ThemedTextInput
          placeholder="Password"
          secureTextEntry={true}
          style={{ width: '80%', marginBottom: 20 }}
          value={password}
          onSubmitEditing={() => handleSubmit()}
          onChangeText={(text) => setPassword(text)}
        />

        {error && <ThemedText style={styles.error}>{error}</ThemedText>}

        <ThemedButton onPress={() => handleSubmit()}>
          <ThemedText style={{ color: '#f2f2f2', textAlign: 'center' }}>
            Register
          </ThemedText>
        </ThemedButton>

        <Link href="/login" replace>
          <ThemedText style={{ textAlign: 'center' }}>
            (Back to Login)
          </ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default register;

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
