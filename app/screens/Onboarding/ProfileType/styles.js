import { StyleSheet } from 'react-native';
import { setHeight, setWidth, setFontSize } from '../../../utils/deviceDimensions';
export default StyleSheet.create({
    container: {
        flex: 0,
        height: setHeight(80)
    },
    title: {
        fontSize: setFontSize(16),
        color: '#373737',
        fontFamily: "OpenSans"
    },
    sidemargin: {
        paddingLeft: setWidth(5.27),
        paddingRight: setWidth(5.27)
    },
    listmargin: {marginTop: setHeight(1.56)},
    relationview: {marginTop: setHeight(5.15)},
    planstyle: { height: setHeight(6.25), fontSize: setHeight(2.5), width: '100%' },
    line: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        opacity: 0.12
    },
    screenCoverStyle: {flex: 1}
});
