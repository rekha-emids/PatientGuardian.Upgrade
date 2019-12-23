import { StyleSheet } from 'react-native';
import { setHeight, setFontSize, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    common: {
        color: "#FFF",
        fontFamily: "OpenSans",
        textAlign: 'center'
    },
    title: {
        marginTop: setHeight(5),
        alignItems: "center",
        justifyContent: "center",
        fontSize: setFontSize(15),
        fontWeight: "600"

    },
    subtitle: {
        paddingHorizontal: setValueBasedOnWidth(10),
        fontSize: setFontSize(13),
        marginTop: setValueBasedOnHeight(15)
    },

    subtitleBottom: {
        paddingHorizontal: setValueBasedOnWidth(10),
        fontSize: setFontSize(13)
    },

    loginHeader: {
        flex: 3,
        justifyContent: 'center',
        paddingHorizontal: setValueBasedOnWidth(10)
    },
    semibold: {fontWeight: '600'},
    login: {
        flex: 1,
        justifyContent: 'center'
    },
    loginfont: {fontSize: setFontSize(13)},
    icon: { width: setHeight(8.43), height: setHeight(8.43) },
    iconview: { marginTop: setHeight(7.65), alignSelf: 'center' },
    fntSize: {fontSize: 16}
});
