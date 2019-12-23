import { Dimensions, Platform } from 'react-native';
import _ from 'lodash';

const {OS} = Platform;

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;

const BENCHMARK = 540; /* devices with width below 540 is considered as phones
                        and above 540 is considered as tablets */

export function getDeviceInfo() {
    const effectiveWidth = WIDTH < HEIGHT ? WIDTH : HEIGHT; //considering potrait and landscape mode

    let device = {};

    device.width = WIDTH;
    device.height = HEIGHT;
    device.os = OS;
    device.orientation = ""; //will be set while calling deviceInit.
    device.highestDimension = WIDTH > HEIGHT ? WIDTH : HEIGHT;
    device.lowestDimension = effectiveWidth;

    if (OS == "ios") {
        device.type = effectiveWidth < BENCHMARK ? "iosMobile" : "iosTablet";
    } else if (OS == "android") {
        device.type = effectiveWidth < BENCHMARK ? "androidMobile" : "androidTablet";
    }
    return device;
}

export function setHeight(percentage){
    return HEIGHT * percentage / 100;
}

export function setWidth(percentage){
    return WIDTH * percentage / 100;
}

export const REFERENCE_WIDTH = 360;
export const REFERENCE_HEIGHT = 640;

export const setValueBasedOnWidth = (dp) => {
    if (!_.isNil(dp)) {
      return WIDTH * dp / REFERENCE_WIDTH
    }
    return dp
  }
  
  export const setValueBasedOnHeight = (dp) => {
    if (!_.isNil(dp)) {
      return HEIGHT * dp / REFERENCE_HEIGHT
    }
    return dp
  }
  
 const scale = (fonptSize) => fontSize * (WIDTH / REFERENCE_WIDTH)

  export const setFontSize = (size, factor = 0.5) => setValueBasedOnHeight(size) // size + ( scale(size) - size ) * factor;
