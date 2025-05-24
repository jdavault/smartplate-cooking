import React from 'react';
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  useColorScheme,
} from 'react-native';
import { colors } from '../constants/colors';
import ThemedView from './ThemedView';

type ThemedLoaderProps = {
  size?: ActivityIndicatorProps['size'];
};

const ThemedLoader: React.FC<ThemedLoaderProps> = ({ size = 'large' }) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme] ?? colors.light;

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ActivityIndicator size={size} color={theme.primary} />
    </ThemedView>
  );
};

export default ThemedLoader;
