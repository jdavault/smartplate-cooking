import { Tabs } from 'expo-router';
import { StyleSheet, Platform, useColorScheme } from 'react-native';
import { Search, BookmarkCheck, Settings } from 'lucide-react-native';
import { colors } from '@/constants/colors';

const TabLayout = () => {
  const colorScheme = useColorScheme() ?? 'light'; // Default to 'light' if colorScheme is null
  const theme = colors[colorScheme];
  const styles = getStyles(colorScheme);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.secondary,
        tabBarInactiveTintColor: theme.secondaryDark,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Search size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <BookmarkCheck size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
};
export default TabLayout;

const getStyles = (scheme: 'light' | 'dark') => {
  const theme = colors[scheme];
  return StyleSheet.create({
    tabBar: {
      backgroundColor: theme.primary,
      borderTopWidth: 1,
      borderTopColor: theme.primaryDark,
      height: Platform.OS === 'ios' ? 88 : 64,
      paddingBottom: Platform.OS === 'ios' ? 28 : 8,
      paddingTop: 8,
      elevation: 8,
      shadowColor: theme.accentDark,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    tabBarLabel: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 12,
      marginTop: 2,
      color: theme.secondary,
    },
  });
};
