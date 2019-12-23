import { StyleSheet } from 'react-native';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
import { setHeight, setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        marginLeft: setValueBasedOnWidth(16),
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: setValueBasedOnWidth(16),
        marginTop: setValueBasedOnHeight(10)

    },
    requestTitle: {
        color: '#444444',
        fontSize: setValueBasedOnHeight(14)
    },
    serviceTypesText: {
        color: '#444444',
        marginLeft: setValueBasedOnWidth(10)
    },
    mainContainer: {
        backgroundColor: '#fff',
        height: setValueBasedOnHeight(136),
        width: setValueBasedOnWidth(328),
        borderRadius: 4
    },
    topContainer: {
        marginHorizontal: setValueBasedOnWidth(16),
        backgroundColor: '#fff',
        marginBottom: setValueBasedOnHeight(27)

    },
    dotsImage: {
        flex: 1,
        position: 'absolute',
        top: setValueBasedOnHeight(1),
        right: setValueBasedOnHeight(1)
    },
    imageFav: {
        height: setValueBasedOnHeight(20),
        width: setValueBasedOnHeight(20)
    },
    bottomView: {
        flex: 1,
        marginLeft: setValueBasedOnWidth(15),
        flexDirection: 'row',
        bottom: setValueBasedOnHeight(10)
    },
    hourRate: {
        fontSize: setFontSize(12),
        color: THEME_PRIMARY_COLOR,
        alignSelf: 'center'
    },
    servicesText: {
        fontSize: setFontSize(12),
        marginLeft: setValueBasedOnWidth(-102),
        marginTop: setValueBasedOnHeight(5)
        // marginBottom: setValueBasedOnHeight(70)
    },
    hour: {
        top: setValueBasedOnHeight(10),
        fontSize: setFontSize(10),
        color: THEME_PRIMARY_COLOR
    },
    dotsView: {
        left: setValueBasedOnWidth(6),
        top: setValueBasedOnHeight(5)
    },
    dotsView1: {
        left: setValueBasedOnWidth(15),
        top: setValueBasedOnHeight(5)
    },
    starImage: {
        height: setValueBasedOnWidth(12),
        width: setValueBasedOnHeight(12)

    },
    dots: {
        width: setValueBasedOnWidth(5),
        height: setValueBasedOnHeight(6)
    },
    row2: {
        flex: 1,
        flexDirection: 'row',
        marginTop: setValueBasedOnHeight(5),
        left: setValueBasedOnWidth(67)
    },
    leftText2: {
        marginLeft: setValueBasedOnWidth(5),
        fontSize: setFontSize(12),
        marginRight: setValueBasedOnWidth(12),
        color: '#8c8c8c'
    },
    dots: {
        width: setValueBasedOnWidth(5),
        height: setValueBasedOnHeight(8),
        alignSelf: 'center'
    },
    leftText3: {
        marginLeft: setValueBasedOnWidth(12),
        fontSize: setFontSize(12),
        marginRight: setValueBasedOnWidth(12),
        color: '#8c8c8c'
    },
    leftText4: {
        marginLeft: setValueBasedOnWidth(12),
        fontSize: setFontSize(12),
        marginRight: setValueBasedOnWidth(12),
        color: '#8c8c8c'
    },
    textOverlay: {
        flex: 3,
        flexDirection: 'column',
        marginTop: -40

        // left: setValueBasedOnWidth(99),
        // top: setValueBasedOnHeight(10)
    },
    imageStyle: {
        height: setValueBasedOnHeight(50),
        width: setValueBasedOnWidth(50),
        top: setValueBasedOnHeight(15),
        //    borderRadius:50, 
        //    borderColor:'#C0C0C0', 
        //    borderWidth:2, 
        zIndex: 1,
        marginLeft: setValueBasedOnWidth(10)
    },
    containContainer: {
        flex: 1,
        marginLeft: setValueBasedOnWidth(16),
        marginTop: setValueBasedOnHeight(29),
        flexDirection: 'row'
    },
    textDescription1: {
        color: '#444444',
        fontSize: setFontSize(14),
        marginBottom: setValueBasedOnHeight(4)
    },
    heading1: {
        color: THEME_PRIMARY_COLOR,
        width: setValueBasedOnWidth(133),
        height: setValueBasedOnHeight(20),
        fontSize: setFontSize(15.5)

    },
    serviceContainer: {marginTop: setValueBasedOnHeight(19)},
    heading2: {
        color: THEME_PRIMARY_COLOR,
        marginTop: 10,
        fontSize: setFontSize(12),
        marginLeft: setValueBasedOnWidth(160)
    },
    noInfoIcon: {height: setHeight(5)},
    noInfoBox: {},

    heading: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(16),
        fontWeight: '600'
    },
    headingViewALL: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        paddingRight: setValueBasedOnWidth(10)
    },
    cardContainer: {
        marginHorizontal: setValueBasedOnWidth(16),
        backgroundColor: '#ffffff',
        marginBottom: setValueBasedOnHeight(7.5),
        marginTop: setValueBasedOnHeight(7.5),
        padding: setValueBasedOnWidth(10),
        borderRadius: setValueBasedOnWidth(5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
    row: {flexDirection: 'row'},
    column: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    dot: {
        height: setValueBasedOnWidth(4),
        width: setValueBasedOnWidth(4),
        backgroundColor: '#8c8c8c',
        marginBottom: setValueBasedOnWidth(1),
        borderRadius: setValueBasedOnWidth(2)
    },
    // 
    starCard: { alignItems: 'center', marginBottom: setValueBasedOnHeight(4) },
    picStyle: {
        width: setValueBasedOnWidth(50),
        height: setValueBasedOnWidth(50),
        borderRadius: setValueBasedOnWidth(25),
        resizeMode: 'cover'
    },
    picOuterLayer: {
        width: setValueBasedOnWidth(60),
        height: setValueBasedOnWidth(60),
        borderColor: "#dcdcdc",
        borderWidth: 2,
        borderRadius: setValueBasedOnWidth(30),
        alignItems: "center",
        justifyContent: "center",
        marginRight: setValueBasedOnWidth(10)
    },
    showMoreText: {
        alignSelf: 'center',
        color: THEME_PRIMARY_COLOR,
        marginVertical: setValueBasedOnHeight(10)
    }
});