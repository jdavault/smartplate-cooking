import React from 'react';
import {
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
  useColorScheme,
} from 'react-native';
import { colors } from '../constants/colors';

type ThemedTextInputProps = TextInputProps & {
  style?: StyleProp<TextStyle>;
};

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({
  style,
  ...rest
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme] ?? colors.light;

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.secondaryLighter,
          color: theme.accentDark,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      placeholderTextColor={theme.accentDark} // ← Set it here!
      {...rest}
    />
  );
};

export default ThemedTextInput;
