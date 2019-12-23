import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setValueBasedOnHeight } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        // height: setHeight(9),
        left: 0,
        right: 0,
        // paddingTop: setHeight(1.56),
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27),
        paddingVertical: setValueBasedOnHeight(15)
    },
    groupButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    groupButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    fontStyle: {
        fontSize: setHeight(2.5),
        fontWeight: '600',
        color: '#444444'
    },
    buttonmargin: {marginLeft: setHeight(3.2)}
})