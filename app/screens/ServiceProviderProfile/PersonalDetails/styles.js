import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, WIDTH, setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
const styles = StyleSheet.create({
    container: {},
    starIconView: {flex: 1, flexDirection: 'row', justifyContent: 'center'},
    starIcon: {
       marginLeft: setValueBasedOnWidth(4),
       marginTop: setValueBasedOnHeight(2),
       color: '#efcf49',
       fontSize: setFontSize(16)
    },
    navBarContainer: {
        flexDirection: 'row',
        marginTop: setValueBasedOnHeight(20),
        marginBottom: setValueBasedOnHeight(19),
        alignItems: "center"
    },
    bg: {
        position: "absolute",
        width: setValueBasedOnWidth(249),
        height: setValueBasedOnHeight(249),
        transform: [{ rotate: '180deg'}],
        resizeMode: 'stretch',
        top: setValueBasedOnHeight(-249 / 2),
        left: setValueBasedOnWidth(-40)
    },
    arrow: {padding: setValueBasedOnWidth(14)},
    heading: {
        fontSize: setFontSize(18),
        color: "#444444",
        fontWeight: '600',
        fontFamily: "OpenSans",
        marginLeft: setValueBasedOnWidth(42)
    },
    editIcon: {
       marginLeft: setValueBasedOnWidth(200),
       width: setValueBasedOnWidth(16),
       height: setValueBasedOnHeight(16),
       resizeMode: 'contain'
    },
    profilePicAndDetailsContainer: {
        marginLeft: setValueBasedOnWidth(24),
        // marginBottom: setValueBasedOnHeight(23),
        marginBottom: setValueBasedOnHeight(10),
        flexDirection: 'row'
    },
    profilePic: {
        width: setValueBasedOnWidth(107),
        height: setValueBasedOnWidth(107),
        borderRadius: setValueBasedOnWidth(107 / 2)
    },
    profilePicView: {marginRight: setValueBasedOnWidth(17)},
  
    userDetails: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    name: {
        fontSize: setFontSize(18),
        color: "#444444",
        fontWeight: '600',
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(5)
    },
    gender: {
        fontSize: setFontSize(12),
        color: "#444444",
        fontFamily: "OpenSans"
    },
    feesBorder: {},
    fee: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(21.5),
        fontWeight: '600',
        fontFamily: "OpenSans"
    },
    duration: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        fontWeight: '600',
        fontFamily: "OpenSans"
    },
    serviceDataContainer: {
        marginLeft: setValueBasedOnWidth(27),
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(12)
    },
    addressDetails: {
        marginLeft: setValueBasedOnWidth(27),
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(11),
        flex: 1,
        alignItems: "center"
    },
    icon: {
        width: setValueBasedOnWidth(15),
        height: setValueBasedOnHeight(15),
        marginRight: setValueBasedOnWidth(9),
        resizeMode: 'contain'

    },
    addressFieldTitle: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontWeight: '600',
        fontFamily: "OpenSans",
        marginRight: setValueBasedOnWidth(30),
        flex: 2
    },
    addressFieldValue: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        flex: 4
    },
    ratingAndExperianceTable: {
        marginVertical: setValueBasedOnHeight(23),
        borderWidth: setValueBasedOnWidth(1),
        height: setValueBasedOnHeight(58),
        width: WIDTH,
        borderColor: "#d8d8d8",
        flex: 1,
        flexDirection: "row"
    },
    column: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    columnTextPadding: {
        color: "#a7a7a7",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        marginTop: setValueBasedOnHeight(9)
    },
    columnText: {
        color: "#a7a7a7",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans"
    },
    columnValue: {
        color: "#444444",
        fontSize: setFontSize(16),
        fontFamily: "OpenSans"
    },
    divider: {
        width: setValueBasedOnWidth(1),
        height: setValueBasedOnHeight(58),
        backgroundColor: "#d8d8d8"
    },
    descriptionHeader: {
color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        fontWeight: '600',
        marginTop: setValueBasedOnHeight(10),
        marginLeft: setValueBasedOnWidth(16) 
},
    description: {
        marginLeft: setValueBasedOnWidth(16),
        color: "#444444",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(26)
    },
    serviceName: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontFamily: "OpenSans"
    },
    showDetails: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    arrowIcon: {
        marginLeft: setValueBasedOnWidth(8),
        resizeMode: 'contain'
    },
    wrapperView: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        paddingTop: setValueBasedOnHeight(10)
    },
    dot: {
        height: setValueBasedOnWidth(5),
        width: setValueBasedOnWidth(5),
        backgroundColor: THEME_PRIMARY_COLOR,
        borderRadius: setValueBasedOnWidth(2.5),
        marginHorizontal: setValueBasedOnWidth(6)
    },
    genderContainer: {
         flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
         marginBottom: setValueBasedOnHeight(5) 
    },
    ratingView: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    paddingSingleLine: {paddingRight: setValueBasedOnWidth(130)}
})

export default styles