import { Stack } from 'expo-router';
import { StatusBar, View } from 'react-native';

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="default" />
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="about" options={{ title: 'About' }} />
      <Stack.Screen name="logout" options={{ title: 'Logout' }} />
      <Stack.Screen name="contact" options={{ title: 'Contact' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
      <Stack.Screen name="support" options={{ title: 'Support' }} />
    </View>
  );
}
