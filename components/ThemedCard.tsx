import React, { ReactNode } from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { colors } from '../constants/colors';

type ThemedCardProps = ViewProps & {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

const ThemedCard: React.FC<ThemedCardProps> = ({
  style,
  children,
  ...rest
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme] ?? colors.light;

  return (
    <View
      style={[{ backgroundColor: theme.primary }, styles.card, style]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20,
  },
});
