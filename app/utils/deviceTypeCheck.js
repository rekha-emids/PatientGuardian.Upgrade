import { Dimensions } from 'react-native';

let isIpad = false,
 { height, width } = Dimensions.get('window');

if (height > 800) {
    isIpad = true;
}

export const isIpadDevice = isIpad;