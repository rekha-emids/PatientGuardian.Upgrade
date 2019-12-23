import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight } from '../../../../../utils/deviceDimensions';

const styles = StyleSheet.create({
    tabData: {
        backgroundColor: "#f9f9f9",
        height: '100%',
        paddingTop: setValueBasedOnHeight(2)
    }
});  

export default styles;