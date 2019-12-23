import { StyleSheet} from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../utils/deviceDimensions';


const styles = StyleSheet.create({
    container: {height: '100%'},
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
      },
     plusIcon: {
      width: setValueBasedOnWidth(40), 
      height: setValueBasedOnWidth(40)
     },
      TouchableOpacityStyle: {   
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: setValueBasedOnWidth(15),
        bottom: setValueBasedOnHeight(3)
      },
     
      FloatingButtonStyle: {  
        resizeMode: 'contain',
        width: 50,
        height: 50
      },
      paddingCard: {paddingBottom: setValueBasedOnHeight(25)},
      flex: {flex: 1}
});  

export default styles;