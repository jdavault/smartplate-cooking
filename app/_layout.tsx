import { use, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from '@expo-google-fonts/open-sans';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppProvider } from '@/context/AppContext';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { colors } from '@/constants/colors';
import { User } from 'lucide-react-native';
import { UserProvider } from '@/context/UserContext';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  useFrameworkReady();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme];

  console.log('Color Scheme:', colorScheme);
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Regular': Montserrat_400Regular,
    'Montserrat-Medium': Montserrat_500Medium,
    'Montserrat-SemiBold': Montserrat_600SemiBold,
    'Montserrat-Bold': Montserrat_700Bold,
    'OpenSans-Regular': OpenSans_400Regular,
    'OpenSans-SemiBold': OpenSans_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <AppProvider>
          <StatusBar style="auto" />

          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: theme.primary },
              headerTintColor: theme.accent,
            }}
          >
            <Stack.Screen
              name="index"
              options={{ title: 'Home', headerShown: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="dark" />
        </AppProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;

const getStyles = (scheme: 'light' | 'dark') => {
  const theme = colors[scheme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.grayBlue[50],
    },
  });
};
