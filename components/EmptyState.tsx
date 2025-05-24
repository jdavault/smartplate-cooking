import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { colors } from '@/constants/colors';
import { Bookmark, Search } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: 'search' | 'bookmark';
}

const EmptyState = ({ title, message, icon = 'search' }: EmptyStateProps) => {
  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme];
  const styles = getStyles(colorScheme);

  return (
    <View style={styles.container}>
      {icon === 'search' ? (
        <Search size={48} color={theme.grayBlue[300]} />
      ) : (
        <Bookmark size={48} color={theme.grayBlue[300]} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default EmptyState;
const getStyles = (scheme: 'light' | 'dark') => {
  const theme = colors[scheme];
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      marginTop: 20,
    },
    title: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 18,
      color: theme.grayBlue[800],
      marginTop: 16,
      marginBottom: 8,
    },
    message: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 14,
      color: theme.grayBlue[600],
      textAlign: 'center',
      lineHeight: 20,
    },
  });
};
