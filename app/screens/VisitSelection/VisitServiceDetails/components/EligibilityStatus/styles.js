import { StyleSheet} from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';
export default StyleSheet.create({
    container: {marginVertical: setValueBasedOnHeight(19)},
    label: {
        fontSize: setFontSize(12),
       fontWeight: '400'
       
    },
    value: {
        fontSize: setFontSize(12),
        fontWeight: '400'
     },
     mainContainer: {marginBottom: setValueBasedOnHeight(2)},
     divider: {
        flex: 1,
        height: setValueBasedOnHeight(1),
        backgroundColor: "#dcdcdc",
        marginBottom: setValueBasedOnHeight(17)
    },
    border: {
        borderLeftWidth: setValueBasedOnWidth(3),
        borderColor: THEME_PRIMARY_COLOR
    },
    cardContainer: {
        flex: 1,
        borderRadius: setValueBasedOnWidth(4),
        backgroundColor: "white",
        paddingVertical: setValueBasedOnHeight(10),
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: setValueBasedOnWidth(1),
        borderBottomColor: "#dcdcdc",
        paddingHorizontal: setValueBasedOnWidth(16)

    },
    center: {
        alignItems: "center",
        justifyContent: "center"
    }
})