import {StyleSheet} from 'react-native'
import {setValueBasedOnHeight, setValueBasedOnWidth, setFontSize} from '../../../utils/deviceDimensions'
export default StyleSheet.create({
    container: {
        marginHorizontal: setValueBasedOnWidth(20),
        flexDirection: 'column',
              overflow: "visible",
              position: 'relative',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginLeft: setValueBasedOnWidth(30),
              marginTop: setValueBasedOnHeight(50),
              backgroundColor: "transparent",
              width: setValueBasedOnWidth(276),
              height: setValueBasedOnHeight(290)
    },
    subContainer: {position: "relative", backgroundColor: "#f4f4f4", paddingLeft: setValueBasedOnWidth(20), paddingTop: setValueBasedOnWidth(20)},
    imgStyle: {
        width: setValueBasedOnWidth(236),
        height: setValueBasedOnHeight(148),
        resizeMode: "stretch"
    },
    textStyle: {
        marginTop: setValueBasedOnWidth(19),
        fontSize: setFontSize(14),
        color: "#373737",
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnWidth(19),
        marginRight: setValueBasedOnWidth(10)
    },
    arrowDown: {
            width: setValueBasedOnWidth(0), 
            height: setValueBasedOnHeight(0),
            borderLeftWidth: setValueBasedOnWidth(10),
            borderRightWidth: setValueBasedOnWidth(10),
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderTopWidth: setValueBasedOnWidth(10),
            borderTopColor: "#f4f4f4",
            marginLeft: setValueBasedOnWidth(260)
          }
  });