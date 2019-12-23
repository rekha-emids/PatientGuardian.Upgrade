import { StyleSheet } from 'react-native';
import {setValueBasedOnHeight, setValueBasedOnWidth} from '../../../utils/deviceDimensions'

export default StyleSheet.create({
    errorMsg: {
    fontSize: setValueBasedOnHeight(10),
    color: "#c04e59",
    marginHorizontal: setValueBasedOnWidth(5),
    fontFamily: "OpenSans"

  },
  errorMsgContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});
