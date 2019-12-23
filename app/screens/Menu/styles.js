import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../utils/deviceDimensions';


export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        height: setValueBasedOnHeight(80),
        backgroundColor: '#3b104f'

    },
    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(15)
    },
    fontLarge: {
        fontSize: setValueBasedOnHeight(18),
        fontWeight: '600',
        color: '#ffffff'
    },
    textStyle: {
        fontSize: setValueBasedOnHeight(2.81),
        color: '#FFF'
    },
    imageProfileView: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(40),
        borderRadius: setValueBasedOnHeight(20),
        backgroundColor: 'red'
    },
    imageProfileSize: {
        width: setValueBasedOnHeight(40),
        height: setValueBasedOnHeight(40)
    },
    cardStyle: {
        backgroundColor: '#ffffff',
        height: setValueBasedOnHeight(163),
        marginTop: setValueBasedOnHeight(15),
        borderRadius: setValueBasedOnHeight(4),
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 2
    },
    cardSubTextStyle: {
        fontSize: setFontSize(12),
        marginBottom: setValueBasedOnHeight(22)
    },
    cardViewStyle: {height: setValueBasedOnHeight(110)},
    cardRightView: {
    flex: 1,
    flexDirection: 'row',
    marginRight: setValueBasedOnWidth(20),
    marginTop: setValueBasedOnHeight(45), 
    marginBottom: setValueBasedOnHeight(45)
    },
    cardRightViewFirstIcon: {
    resizeMode: 'contain',
    width: setValueBasedOnWidth(15),
    height: setValueBasedOnHeight(15),
    marginRight: setValueBasedOnWidth(20)   
    },
    imageItemView: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16)
    },
    imagePatientView: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16)
    },
    imagePatientSize: {
        height: setValueBasedOnHeight(32),
        width: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16)
    },
    imageItemSize: {
        height: setValueBasedOnHeight(32),
        width: setValueBasedOnHeight(32)
    },
    contentCenter: {justifyContent: 'center'},
    imageMarginTop: {marginTop: setValueBasedOnHeight(22)},
    listItemStyle: {
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(51)
    },
    profileCardView: {
        justifyContent: "space-between",
        flexDirection: 'row',
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(64),
        alignItems: 'center',
    paddingHorizontal: setValueBasedOnWidth(16),
    paddingVertical: setValueBasedOnWidth(16),
    backgroundColor: "#ffffff",
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1
    },
    profileContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileImageStyle: {
        width: setValueBasedOnWidth(40),
        height: setValueBasedOnWidth(40),
        borderRadius: setValueBasedOnWidth(20),
        marginTop: setValueBasedOnWidth(14),
        marginBottom: setValueBasedOnWidth(14),
        marginRight: setValueBasedOnWidth(16),
        resizeMode: "cover"
    },
    profileTextStyle: {
        fontWeight: '600',
        fontSize: setFontSize(16)
    },
    loadingStyle: {
        flex: 0,
        justifyContent: "flex-start"
    }
  
})