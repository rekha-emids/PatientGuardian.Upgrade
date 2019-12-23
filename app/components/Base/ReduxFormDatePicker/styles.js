import { StyleSheet } from 'react-native';
import {setValueBasedOnHeight, setHeight, setValueBasedOnWidth, setFontSize} from '../../../utils/deviceDimensions'

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
  },
labelStyle: {
    position: 'absolute',
    left: setValueBasedOnWidth(2),
    top: 0,
    fontSize: setHeight(1.87),
    color: '#373737'
  },
  valueContainer: {
      borderBottomColor: "#B8B3B3",
      borderBottomWidth: 1,
      marginBottom: setValueBasedOnHeight(7),
      paddingBottom: setValueBasedOnHeight(3),
      marginHorizontal: setValueBasedOnWidth(2)
  },
  textStyle: {
      padding: 0,
      paddingTop: setValueBasedOnHeight(3),
      color: "#373737",
      fontSize: setFontSize(16)
  }
});
