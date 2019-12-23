import {StyleSheet} from 'react-native'
import { setValueBasedOnWidth, setFontSize, setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    heading: {
        fontSize: setFontSize(16),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans",
        fontWeight: "500"
    },
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        flexWrap: "wrap"
    },
    email: {
        fontSize: setFontSize(14),
        color: THEME_PRIMARY_COLOR,
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(4)
    },
    margin: {marginVertical: setValueBasedOnHeight(15)},
    version: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    container: {
        backgroundColor: "white",
        padding: setValueBasedOnWidth(10),
        marginBottom: setValueBasedOnHeight(56)
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#e1e1e1"
    },
    logo: {
        width: setValueBasedOnHeight(100),
        height: setValueBasedOnHeight(70),
        left: setValueBasedOnWidth(10)
    },
    container: {
        flex: 1,
        backgroundColor: "white"
    }
})