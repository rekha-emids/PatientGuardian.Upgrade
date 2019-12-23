import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import {THEME_PRIMARY_COLOR} from '../../../constants/theme'
export default StyleSheet.create({
    cardContainer: {
        paddingVertical: setValueBasedOnHeight(23),
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(17),
        backgroundColor: "#ffffff"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: setValueBasedOnHeight(18)
    },
    heading: {
        fontSize: setFontSize(16),
        fontWeight: "600",
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans"
    },
    skillItemContainer: {
        paddingHorizontal: setValueBasedOnWidth(10),
        paddingVertical: setValueBasedOnHeight(4),
        borderRadius: setValueBasedOnWidth(18),
        borderWidth: setValueBasedOnWidth(1),
        borderColor: "#b7b7b7",
        marginRight: setValueBasedOnWidth(9),
        marginBottom: setValueBasedOnHeight(11),
        flexDirection: 'row',
        alignItems: "center"
    },
    skillItem: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        color: "#444444"
    },
    skillItemsList: {
        flexDirection: 'row',
        padding: setValueBasedOnWidth(3),
        flexWrap: 'wrap'
    },
    flag: {
        marginRight: setValueBasedOnWidth(7),
        width: setValueBasedOnWidth(16),
        height: setValueBasedOnHeight(10)
    },
    noLanguages: {
        justifyContent: 'center', 
        alignItems: 'center'
    },
    noClinicalCondition: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})