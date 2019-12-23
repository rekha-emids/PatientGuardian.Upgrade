import { StyleSheet } from 'react-native';
import { setHeight, setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR, WHITE } from '../../../constants/theme';
export default StyleSheet.create({
    container: {backgroundColor: '#f8f8f8', flex: 1},
    sliderMarker: {height: setValueBasedOnWidth(20), width: setValueBasedOnWidth(20), borderRadius: setValueBasedOnWidth(10), backgroundColor: WHITE, borderWidth: setValueBasedOnWidth(2), borderColor: THEME_PRIMARY_COLOR},
    areaNotSelected: {
        height: setValueBasedOnHeight(22),
        width: setValueBasedOnHeight(22),
        borderRadius: setValueBasedOnHeight(11),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: '#444444'

    },
    areaSelected: {
        height: setValueBasedOnHeight(22),
        width: setValueBasedOnHeight(22),
        borderRadius: setValueBasedOnHeight(11),
        borderWidth: setValueBasedOnHeight(1),
        borderColor: THEME_PRIMARY_COLOR,
        justifyContent: 'center'
    },
    radioBox: {flexDirection: 'row'},
    selected: {
        width: setValueBasedOnHeight(10),
        height: setValueBasedOnHeight(10),
        borderRadius: setValueBasedOnHeight(5),
        backgroundColor: THEME_PRIMARY_COLOR,
        alignSelf: 'center',
        alignItems: 'center'
    },
    headingView: {
        height: setValueBasedOnHeight(80),
        backgroundColor: THEME_PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: setValueBasedOnHeight(18),
        fontWeight: '600',
        color: '#ffffff'
    },
    title: {
        height: setValueBasedOnHeight(50),
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
        paddingLeft: setValueBasedOnWidth(15)
    },
    titleText: {
        fontSize: setValueBasedOnHeight(16),
        fontWeight: '600',
        color: THEME_PRIMARY_COLOR
    },
    subTitle: {height: setValueBasedOnHeight(50), backgroundColor: '#f8f8f8', justifyContent: 'center', paddingLeft: setValueBasedOnWidth(15)},
    subTitleText: {fontSize: setValueBasedOnHeight(16), color: THEME_PRIMARY_COLOR},
    content: {backgroundColor: '#ffffff', paddingLeft: setValueBasedOnWidth(15), paddingRight: setValueBasedOnWidth(15)},
    scheduleType: {fontSize: setValueBasedOnHeight(14), fontWeight: '600', color: '#444444', paddingTop: setValueBasedOnHeight(20)},
    preferencesFields: {fontSize: setValueBasedOnHeight(14), fontWeight: '600', color: '#444444', paddingTop: setValueBasedOnHeight(30)},
    occurencesMargin: {marginTop: setValueBasedOnHeight(5)},
    occurencesOptionMargin: {marginTop: setValueBasedOnHeight(15), flexDirection: 'row', alignItems: "center"},
    occurenceOptionText: {fontSize: setValueBasedOnHeight(14), color: '#444444', textAlign: 'center'},
    slotBox: {marginTop: setValueBasedOnHeight(10), height: setValueBasedOnHeight(150), width: setValueBasedOnHeight(150), borderRadius: setValueBasedOnHeight(8), borderWidth: setValueBasedOnHeight(1), borderColor: '#e2e2e2', marginBottom: setValueBasedOnHeight(10)},
    addressFieldsMargin: {
marginTop: setValueBasedOnHeight(20), marginBottom: setValueBasedOnHeight(20)
    // paddingBottom: setValueBasedOnHeight(10)
},
    inputViewstyle: {marginBottom: setValueBasedOnHeight(10)},
    marginBottom: {marginBottom: setValueBasedOnHeight(20)},
    slider: {marginBottom: setValueBasedOnHeight(30), marginLeft: setValueBasedOnWidth(10)},
    actionButtons: {height: setValueBasedOnHeight(96), backgroundColor: "#f8f8f8", justifyContent: 'center', flexDirection: 'column'},
    experience: {flexDirection: 'row', justifyContent: 'space-between', marginTop: setValueBasedOnHeight(15)},
    years: {flexDirection: 'row', justifyContent: 'space-between', marginTop: setValueBasedOnHeight(8)},
    displayYears: {flexDirection: 'row', justifyContent: 'center', marginTop: setValueBasedOnHeight(5)},
    line: {
        borderBottomColor: '#000000',
        borderBottomWidth: setValueBasedOnHeight(1),
        opacity: 0.12,
        marginTop: setValueBasedOnHeight(7)
    },
    unselectedLine: {
        marginTop: setValueBasedOnHeight(7),
        borderBottomColor: '#c04e59',
        borderBottomWidth: setValueBasedOnHeight(1),
        opacity: 0.12

    },
    itemTextStyle: {fontSize: setHeight(1.87), color: '#000000'},
    planstyle: { height: setHeight(6.25), width: '100%', marginTop: setValueBasedOnHeight(5), color: '#444444' },
    boxStyle: {paddingTop: setValueBasedOnWidth(13), paddingLeft: setValueBasedOnWidth(15), paddingRight: setValueBasedOnWidth(15), flexDirection: 'row', justifyContent: 'space-between'},
    dayStyle: {color: '#494949', fontSize: setValueBasedOnHeight(14), fontWeight: '600'},
    slotTextStyleChecked: {color: '#4f4f4f', fontSize: setValueBasedOnHeight(14)},
    slotTextStyleUnchecked: {color: '#e2e2e2', fontSize: setValueBasedOnHeight(14)},
    slotItemViewSelected: {alignItems: 'center', marginTop: setValueBasedOnHeight(2), height: setValueBasedOnHeight(24), backgroundColor: 'rgba(30,61,92,0.5)', flexDirection: 'row', justifyContent: 'flex-start'},
    slotItemViewNotSelected: {alignItems: 'center', marginTop: setValueBasedOnHeight(2), height: setValueBasedOnHeight(24), backgroundColor: '#ffffff', flexDirection: 'row', justifyContent: 'flex-start'},
    selectedSlotDot: {backgroundColor: '#39ae99', height: setValueBasedOnHeight(7), width: setValueBasedOnHeight(7), borderRadius: setValueBasedOnHeight(3.5)},
    emptyDot: {backgroundColor: "#4f4f4f"},
    imageCompletedSize: {height: setValueBasedOnHeight(20), width: setValueBasedOnHeight(20)},
    dotView: {width: setValueBasedOnWidth(40), flexDirection: 'row', justifyContent: 'center'},
    slotViewMargin: {marginTop: setValueBasedOnHeight(25)},
    inputStyle: {width: setValueBasedOnWidth(143)},
    slotsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start"
    },
    slotBoxMargin: {marginRight: setValueBasedOnWidth(15)},
    errorMsg: {
        fontSize: setValueBasedOnHeight(10),
        color: "#c04e59",
        marginHorizontal: setValueBasedOnWidth(5),
        fontFamily: "OpenSans"
      },
      errorMsgContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: setValueBasedOnHeight(10)
      },
      blueDivider: {
        width: setValueBasedOnWidth(17),
        height: 1,
        backgroundColor: THEME_PRIMARY_COLOR,
        marginTop: setValueBasedOnHeight(7),
        marginLeft: setValueBasedOnWidth(16)
    },
    customErrorMsg: {
        fontSize: setValueBasedOnHeight(10),
        color: "#c04e59",
        fontFamily: "OpenSans"
    },
    patternPaddingBottom: {paddingBottom: setValueBasedOnHeight(10)},
    genderDesclaimer: {
        color: "#8c8c8c",
        fontSize: setFontSize(12),
        marginTop: setValueBasedOnHeight(10)
    }
});