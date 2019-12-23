import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';


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
    radioBox: {flexDirection: 'row'},
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
        marginTop: setValueBasedOnHeight(15)
    },
    areaNotSelected: {
        height: setValueBasedOnHeight(22),
        width: setValueBasedOnHeight(22),
        borderRadius: setValueBasedOnHeight(11),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: '#444444'
    },
    areaSelected: {
        height: setValueBasedOnHeight(22),
        width: setValueBasedOnHeight(22),
        borderRadius: setValueBasedOnHeight(11),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: THEME_PRIMARY_COLOR,
        justifyContent: 'center'
    },
    selected: {
        width: setValueBasedOnHeight(10),
        height: setValueBasedOnHeight(10),
        borderRadius: setValueBasedOnHeight(5),
        backgroundColor: THEME_PRIMARY_COLOR,
        alignSelf: 'center',
        alignItems: 'center'
    },
    directionRow: {flexDirection: 'row'},
    dataView: {
        width: '90%',
        flexDirection: 'column',
        marginLeft: setValueBasedOnWidth(15)
    },
    detailView: {marginTop: setValueBasedOnHeight(18)}
})