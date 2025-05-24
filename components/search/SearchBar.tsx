import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  useColorScheme,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
  disabled?: boolean;
}

const SearchBar = ({
  value,
  onChangeText,
  onSearch,
  placeholder = 'Search...',
  disabled = false,
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const colorScheme = useColorScheme() ?? 'light';
  const theme = colors[colorScheme];
  const styles = getStyles(colorScheme);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onSearch();
  };

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
        disabled && styles.containerDisabled,
      ]}
    >
      <View style={styles.inputContainer}>
        <Search size={20} color={theme.grayBlue[500]} style={styles.icon} />
        <TextInput
          style={[
            styles.input,
            { borderColor: isFocused ? '#FF8866' : '##FF8866' }, // Custom focus color
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.grayBlue[400]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!disabled}
        />
      </View>

      {value.trim().length > 0 && (
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
          disabled={disabled}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const getStyles = (scheme: 'light' | 'dark') => {
  const theme = colors[scheme];
  return StyleSheet.create({
    container: {
      backgroundColor: theme.secondary,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: theme.primaryDark,
    },
    containerFocused: {
      borderBottomColor: theme.primary,
    },
    containerDisabled: {
      backgroundColor: theme.rice[200],
      opacity: 0.8,
    },
    inputContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 4,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      height: 48,
      fontFamily: 'OpenSans-Regular',
      fontSize: 16,
      padding: 5,
      color: theme.grayBlue[900],
      backgroundColor: '#fff',
    },
    searchButton: {
      marginLeft: 8,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4,
      backgroundColor: theme.primary,
    },
    searchButtonText: {
      fontFamily: 'Montserrat-SemiBold',
      fontSize: 14,
      color: theme.secondary,
    },
  });
};
