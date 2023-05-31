import {Dimensions} from 'react-native';

const windowDimensions = Dimensions.get('window');
const {width, height} = windowDimensions;
const mpx = (1 / 375) * width;
// const primaryColor = '#FCD015';
// const secondaryColor = '#3D7AD6';

export const commonStyles = {
  width,
  height,
  mpx,
};
