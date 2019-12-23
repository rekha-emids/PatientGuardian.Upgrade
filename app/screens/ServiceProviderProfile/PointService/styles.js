import { StyleSheet } from 'react-native';
import { setValueBasedOnHeight, WIDTH, setFontSize, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
const styles = StyleSheet.create({
    container: {},
    navBarContainer: {
        flexDirection: 'row',
        marginTop: setValueBasedOnHeight(35),
        marginBottom: setValueBasedOnHeight(19),
        alignItems: "center"
    },
    cardContainer: {
        paddingVertical: setValueBasedOnHeight(21),
        paddingLeft: setValueBasedOnWidth(15),
        paddingRight: setValueBasedOnWidth(17),
        backgroundColor: "#ffffff"
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
    arrow: {marginLeft: setValueBasedOnWidth(14)},
    heading: {
        fontSize: setFontSize(18),
        color: "#444444",
        fontWeight: '600',
        fontFamily: "OpenSans",
        marginLeft: setValueBasedOnWidth(42)
    },
    editIcon: {
       width: setValueBasedOnWidth(16),
       height: setValueBasedOnHeight(16),
       resizeMode: 'contain',
       marginLeft: setValueBasedOnWidth(7)
    },
    deleteIcon: {
        marginRight: setValueBasedOnWidth(10),
        width: setValueBasedOnWidth(16),
        height: setValueBasedOnHeight(16),
        resizeMode: 'contain'
     },
    profilePicAndDetailsContainer: {
        marginLeft: setValueBasedOnWidth(24),
        marginBottom: setValueBasedOnHeight(23),
        flexDirection: 'row'
    },
    profilePic: {
        width: setValueBasedOnWidth(107),
        height: setValueBasedOnWidth(107),
        borderRadius: setValueBasedOnWidth(107 / 2),
        marginRight: setValueBasedOnWidth(17)
    },
    userDetails: {flex: 1},
    name: {
        fontSize: setFontSize(18),
        color: "#444444",
        fontWeight: '600',
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(13)
    },
    gender: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        marginBottom: setValueBasedOnHeight(13)
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
        marginBottom: setValueBasedOnHeight(16)
    },
    addressDetails: {
        marginLeft: setValueBasedOnWidth(32),
        flexDirection: "row",
        marginBottom: setValueBasedOnHeight(5),
        flex: 1,
        alignItems: "center"
    },
    badgeIcon: {
        width: setValueBasedOnWidth(16),
        height: setValueBasedOnHeight(16),
        marginRight: setValueBasedOnWidth(9),
        resizeMode: 'contain'

    },
    addressFieldTitle: {
        color: "#444444",
        fontSize: setFontSize(12),
        fontWeight: '600',
        fontFamily: "OpenSans",
        marginRight: setValueBasedOnWidth(30),
        flex: 1
    },
    addressFieldValue: {
        color: "#444444",
        fontSize: setFontSize(12),
        fontFamily: "OpenSans",
        flex: 5
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
        height: setValueBasedOnHeight(1),
        flex: 1,
        marginTop: setValueBasedOnHeight(20),
        opacity: 0.2,
        backgroundColor: "#c0c0c0",
        marginBottom: setValueBasedOnHeight(20)
    },
    descriptionHeader: {
color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        fontFamily: "OpenSans",
        fontWeight: '600',
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
    editDeleteContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end"
        
    },
    primary: {
        color: "#444444",
        fontSize: setFontSize(14),
        fontWeight: '600',
        fontFamily: "OpenSans",
        marginRight: setValueBasedOnWidth(8)
    },
    popupText: {
        fontSize: setFontSize(14),
        textAlign: "center"
    },

    addressTypeText: {
        fontSize: setFontSize(16),
        fontWeight: '600',
        fontFamily: "OpenSans",
        color: '#444444',
        marginLeft: setValueBasedOnWidth(9)
       
    },
    headerCard: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: setValueBasedOnHeight(9)}
})

export default styles