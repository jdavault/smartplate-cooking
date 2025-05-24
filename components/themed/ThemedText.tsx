import React, { ReactNode } from 'react';
import {
  Text,
  TextProps,
  StyleProp,
  TextStyle,
  useColorScheme,
} from 'react-native';
import { colors } from '../../constants/colors';

type ThemedTextProps = TextProps & {
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  title?: boolean;
};

const ThemedText: React.FC<ThemedTextProps> = ({
  style,
  children,
  title = false,
  ...rest
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme] ?? colors.light;

  const textColor = colorScheme === 'dark' ? theme.accent : theme.primary;

  return (
    <Text style={[{ color: textColor }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default ThemedText;
