import React, { ReactNode } from 'react';
import {
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../constants/colors';

type ThemedViewProps = ViewProps & {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  safe?: boolean;
};

const ThemedView: React.FC<ThemedViewProps> = ({
  children,
  safe = false,
  style,
  ...rest
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme);

  if (safe) {
    const insets = useSafeAreaInsets();

    const safeStyles: ViewStyle = {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    };

    return (
      <View style={[styles.container, safeStyles, style]} {...rest}>
        {children}
      </View>
    );
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

export default ThemedView;

const getStyles = (scheme: 'light' | 'dark' | null | undefined) => {
  const theme = colors[scheme ?? 'light'];

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.secondary,
    },
  });
};
