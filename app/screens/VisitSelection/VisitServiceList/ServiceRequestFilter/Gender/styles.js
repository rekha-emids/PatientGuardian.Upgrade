import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../../../constants/theme';


export default StyleSheet.create({
    serviceAreaView: {
        paddingTop: setValueBasedOnHeight(20),
        paddingLeft: setValueBasedOnHeight(15),
        paddingRight: setValueBasedOnHeight(15)
    },
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    detailKey: {
        flex: 1,
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: '600'
    },
    detailValue: {
        flex: 2,
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    areaMarginTop: {marginTop: setValueBasedOnHeight(10)},
    typesMarginBottom: {marginBottom: setValueBasedOnHeight(20)},
    serciceAreaItem: {
        flexDirection: 'row',
        marginTop: setValueBasedOnHeight(15),
        width: setValueBasedOnWidth(173),
        height: setValueBasedOnHeight(40),
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#e1e1e1",
        borderRadius: setValueBasedOnWidth(4)
    },
    selectedItem: {borderColor: THEME_PRIMARY_COLOR},
    areaNotSelected: {
        height: setValueBasedOnHeight(15),
        width: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(7.5),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: '#444444'
    },
    areaSelected: {
        height: setValueBasedOnHeight(15),
        width: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(7.5),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: THEME_PRIMARY_COLOR,
        justifyContent: 'center'
    },
    selected: {
        width: setValueBasedOnHeight(7),
        height: setValueBasedOnHeight(7),
        borderRadius: setValueBasedOnHeight(3.5),
        backgroundColor: THEME_PRIMARY_COLOR,
        alignSelf: 'center',
        alignItems: 'center'
    },
    directionRow: {flexDirection: 'row'},
    dataView: {
        width: '70%',
        flexDirection: 'column',
        marginLeft: setValueBasedOnWidth(15)
    },
    detailView: {marginTop: setValueBasedOnHeight(18)},
    title: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: '600'

    },
    container: {
        paddingVertical: setValueBasedOnHeight(12),
        paddingHorizontal: setValueBasedOnWidth(12)
    }
})