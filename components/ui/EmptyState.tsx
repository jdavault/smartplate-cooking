import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { Bookmark, Search } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: 'search' | 'bookmark';
}

export default function EmptyState({
  title,
  message,
  icon = 'search',
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      {icon === 'search' ? (
        <Search size={48} color={colors.gray[300]} />
      ) : (
        <Bookmark size={48} color={colors.gray[300]} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    color: colors.gray[800],
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
  },
});