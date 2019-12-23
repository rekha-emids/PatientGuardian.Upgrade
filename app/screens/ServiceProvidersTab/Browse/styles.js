import {StyleSheet} from 'react-native'
import { setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, SELECTED_CARD_BACKGROUND } from '../../../constants/theme';

export default StyleSheet.create({
    categoryItemContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: setValueBasedOnWidth(5),
        borderRadius: setValueBasedOnWidth(2),
        height: setValueBasedOnHeight(30),
        marginTop: setValueBasedOnHeight(2)
    },
    background: {
        // backgroundColor: "#7a7c7e",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: setValueBasedOnWidth(10)
    },
    categoryDesc: {
        fontSize: setFontSize(12),
        color: "white",
        fontFamily: "openSans",
        marginHorizontal: setValueBasedOnWidth(12),
        fontWeight: '400'
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    bgImage: {
       position: "absolute",
       resizeMode: "cover",
       borderRadius: setValueBasedOnWidth(8)
     },
    serviceProvidersContainer: 
    {
        marginTop: setValueBasedOnHeight(10),
        height: "70%"
    },
    sortFilterStyle: {
        borderBottomLeftRadius: setValueBasedOnWidth(4),
        borderBottomRightRadius: setValueBasedOnWidth(4),
        height: setValueBasedOnHeight(40),
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3
    },
    sort: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderRightColor: '#e0e0e0'
    },
    filter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        backgroundColor: THEME_PRIMARY_COLOR,
        width: setValueBasedOnWidth(55),
        height: setValueBasedOnHeight(28),
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(8)
    },
    closeSearchContainer: {
        // backgroundColor: '#ffffff',
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnHeight(28),
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(5)
    },
    textStyle: {
        color: "white",
        fontSize: setFontSize(13),
        fontWeight: "600"
    },
    closeTextStyle: {
        color: "#000000",
        fontSize: setFontSize(20),
        fontWeight: "600"
    },
    searchBarContianer: {
        marginTop: setValueBasedOnHeight(7),
        backgroundColor: '#ffffff'
    },
    likeIcon: {
        width: setValueBasedOnWidth(20),
        height: setValueBasedOnHeight(17)
    },
    waterMark: {
        textAlign: "center",
        fontSize: setFontSize(14)
    }, 
    categoryImage: {
        width: setValueBasedOnHeight(118),
        height: setValueBasedOnHeight(119),
        marginRight: setValueBasedOnWidth(9),
        borderRadius: setValueBasedOnWidth(6),
        flex: 1,
        flexDirection: "column"
    },
    bgContainer: {
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: SELECTED_CARD_BACKGROUND,
        borderRadius: setValueBasedOnWidth(6)
    },
    categoryText: {
        fontSize: setFontSize(13),
        color: "white",
        fontWeight: "500",
        width: setValueBasedOnWidth(90),
        textAlign: "center",
        alignSelf: "center",
        marginTop: setValueBasedOnHeight(73)
    },
    innerBorder: {
        width: setValueBasedOnHeight(108),
        height: setValueBasedOnHeight(109),
        marginHorizontal: setValueBasedOnWidth(5),
        marginVertical: setValueBasedOnHeight(5),
        borderWidth: setValueBasedOnWidth(0.7),
        borderColor: "white",
        borderRadius: setValueBasedOnWidth(4),
        alignSelf: "center",
        flexDirection: "row",
        position: "absolute",
        top: 0,
        bottom: 0
    },
    emptyContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    clearSearch: {marginHorizontal: setValueBasedOnWidth(7)},
    crossText: {
        fontSize: setFontSize(16),
        fontWeight: "600",
        paddingHorizontal: setValueBasedOnWidth(6)
    },
    hourTextWrapper: {flexDirection: 'row'},
    spListContainer: {
        paddingTop: setValueBasedOnHeight(10),
        flex: 1
    },
    requestTitle: {
        fontSize: setFontSize(14)
    },
    categoryContainer: {
        paddingTop:setValueBasedOnHeight(5)
    },
    selectedCategoryBackground:{backgroundColor:'rgba(30,61,92,0.5)'},
    unselectedCategoryBackground:{backgroundColor: 'rgba(0, 0, 0, 0.2)'}
})