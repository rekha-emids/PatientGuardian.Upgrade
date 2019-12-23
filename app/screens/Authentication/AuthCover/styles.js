import { StyleSheet } from 'react-native';
import { setHeight, setWidth } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: 'rgba(30,61,92,0.5)'
    },
    backgroundimage: {
        width: setWidth(100),
        height: setHeight(100)
    }
});
