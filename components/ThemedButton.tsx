import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { colors } from '../constants/colors';

type ThemedButtonProps = PressableProps & {
  style?: StyleProp<ViewStyle>;
};

const ThemedButton: React.FC<ThemedButtonProps> = ({ style, ...rest }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 6,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default ThemedButton;
