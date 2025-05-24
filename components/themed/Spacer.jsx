import { View } from 'react-native';
import PropTypes from 'prop-types';

const Spacer = ({ width = '100%', height = 40 }) => {
  return <View style={{ width, height }} />;
};

Spacer.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Spacer;
