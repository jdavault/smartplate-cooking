import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { colors } from '../constants/colors';
//import LightLogo from '../../assets/images/icon.png';
import LightLogo from '@/assets/images/splash-icon.png';
import DarkLogo from '@/assets/images/splash-icon.png';

const ThemedLogo: React.FC = () => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = getStyles(colorScheme);

  const logo: ImageSourcePropType =
    colorScheme === 'dark' ? DarkLogo : LightLogo;

  return <Image source={logo} style={styles.logoImage} />;
};

export default ThemedLogo;

const getStyles = (scheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors[scheme].secondary,
    },
    logoImage: {
      width: 200,
      height: 200,
      marginVertical: 20,
    },
  });
