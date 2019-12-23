import {StyleSheet} from 'react-native'
import { setHeight, setValueBasedOnHeight, setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
    serviceAreaView: {
        paddingTop: setValueBasedOnHeight(20),
        paddingLeft: setValueBasedOnHeight(15),
        paddingRight: setValueBasedOnHeight(15)
    },
    radioBox: {flexDirection: 'row'},
    text: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontWeight: '600',
        fontFamily: "OpenSans"
       
    },
    detailKey: {
        flex: 1,
        fontSize: setFontSize(14),
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
    areaMarginTop: {
        marginTop: setValueBasedOnHeight(10),
        marginBottom: setValueBasedOnHeight(20)
    },
    typesMarginBottom: {marginBottom: setValueBasedOnHeight(20)},
    serciceAreaItem: {
        flexDirection: 'row',
        marginVertical: setValueBasedOnHeight(20)
        
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
    directionRow: {
        flexDirection: 'row',
        marginBottom: setValueBasedOnHeight(2)
    },
    dataView: {
        width: '90%',
        flexDirection: 'column',
        marginLeft: setValueBasedOnWidth(15)
    },
    detailView: {marginTop: setValueBasedOnHeight(18)},
    stateLabel: {
        fontSize: setHeight(1.87),
        color: '#000000', 
        marginBottom: setValueBasedOnHeight(10)
    }
})