import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#ffffff",
        flex: 1,
        alignItems: 'center' 
    },
    textStyle: {
        color: '#444444',
        fontSize: setFontSize(14),
        justifyContent: 'flex-start'
        
    },
    listItem: {
        height: setValueBasedOnHeight(50),
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    listItemIcon: {
        width: setValueBasedOnWidth(26),
        height: setValueBasedOnHeight(26),
        marginLeft: setValueBasedOnWidth(16),
        marginRight: setValueBasedOnWidth(16)
    }
 
    
})



