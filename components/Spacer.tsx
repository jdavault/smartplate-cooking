import React from 'react';
import { View, DimensionValue, ViewStyle } from 'react-native';

interface SpacerProps {
  width?: DimensionValue;
  height?: DimensionValue;
}

const Spacer: React.FC<SpacerProps> = ({
  width = '100%' as DimensionValue,
  height = 40,
}) => {
  const style: ViewStyle = {
    width,
    height,
  };

  return <View style={style} />;
};

export default Spacer;
