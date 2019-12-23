import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';


export default StyleSheet.create({
    title: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans", 
       fontWeight: '600'

    },
    container: {
        paddingVertical: setValueBasedOnHeight(12),
        paddingHorizontal: setValueBasedOnWidth(12)
    },
    radioButtonOuterCircle: {
        height: setValueBasedOnHeight(15),
        width: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(7.5),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: '#444444',
        justifyContent: 'center',
        alignItems: "center",
        marginRight: setValueBasedOnWidth(11)
    },
    radioButtonInnerCircle: {
        width: setValueBasedOnHeight(7),
        height: setValueBasedOnHeight(7),
        borderRadius: setValueBasedOnHeight(3.5),
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    selectedRadioButtonOuterLayer: {borderColor: THEME_PRIMARY_COLOR},
    selectedRadioButtonInnerLayer: {backgroundColor: THEME_PRIMARY_COLOR},
    itemContainer: {
        flexDirection: "row", alignItems: "center",
        marginBottom: setValueBasedOnHeight(12)
    },
    addressContainer: {marginVertical: setValueBasedOnHeight(22)},
    item: {marginLeft: setValueBasedOnWidth(44)},
    heading: {
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: "600",
        flex: 1
    },
    value: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        flex: 3
    },
    errorMsg: {
        fontSize: setValueBasedOnHeight(10),
        color: "#c04e59",
        fontFamily: "OpenSans"
    
      },
      errorMsgContainer: {
        flexDirection: "row",
        alignItems: "center"
      }
})