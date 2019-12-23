import { StyleSheet } from 'react-native';
import { THEME_PRIMARY_COLOR, WHITE } from '../../../constants/theme';
import { setHeight,  setValueBasedOnHeight, setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions';

export default StyleSheet.create({
    container: {
        marginTop: setValueBasedOnHeight(10),
        marginLeft: setValueBasedOnWidth(16),
        marginRight: setValueBasedOnWidth(16)
    },
    topContainer: {
        height: setValueBasedOnHeight(80),
        marginBottom: setValueBasedOnHeight(15),
        backgroundColor: '#fff',
        borderRadius: setValueBasedOnWidth(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,  
        elevation: 3
    },
    textContainer: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        fontFamily: 'OpenSans'
    },
    calendarContainer: {
        marginTop: setValueBasedOnHeight(12),
        marginLeft: setValueBasedOnWidth(14),
        marginRight: setValueBasedOnWidth(16)
    },
    cardContainer: {marginTop: setValueBasedOnHeight(20)},
    categoryText1: {
        color: '#444444',
        fontSize: setFontSize(14),
        marginRight: setValueBasedOnWidth(30)
    },
    categoryText2: {
        fontSize: setFontSize(12),
        color: '#8c8c8c'
    },
    upperText: {
        marginLeft: setValueBasedOnWidth(15),
        paddingBottom: setValueBasedOnHeight(10),
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    dotsImage: {
        position: 'absolute',
        top: setValueBasedOnHeight(11),
        right: setValueBasedOnHeight(15)
    },
    fottorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3
    },
    imageStyle: {
        height: setValueBasedOnWidth(32),
        width: setValueBasedOnWidth(32),
        zIndex: 1,
        marginLeft: setValueBasedOnWidth(15),
        marginBottom: setValueBasedOnHeight(15)
    },
    showMoreText: {
        alignSelf: 'center',
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        marginRight: setValueBasedOnWidth(7)
    },
    mainContainer: {
        backgroundColor: '#fff',
        height: setValueBasedOnHeight(114),
        width: setValueBasedOnWidth(328),
        marginTop: setValueBasedOnHeight(9),
        borderRadius: 4
    },
    heading: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(15.5),
        fontWeight: '600'
    },
    noInfoIcon: {height: setHeight(5)},
    nameText: {
        marginLeft: setValueBasedOnWidth(11),
        color: '#444444',
        fontSize: setFontSize(12),
        textAlign: 'center',
        fontWeight: 'bold'
    },
    sectionContianer: {marginBottom: setHeight(9)},
    dropdown: {width: setHeight(6)},
    selectVisit: {
        width: setValueBasedOnWidth(135),
        marginRight: setValueBasedOnWidth(14)
    },
    colorSelect: {
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(12),
        marginLeft: setValueBasedOnWidth(25)
    },
    upperRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
         alignItems: 'center',
         marginBottom: setValueBasedOnHeight(6),
         marginTop: setValueBasedOnHeight(6)
    },
    timeSlotTextStyle: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        color: THEME_PRIMARY_COLOR,
        marginLeft: setValueBasedOnWidth(18),
        marginRight: setValueBasedOnWidth(270)
    },
    wrapperView: {marginTop: setValueBasedOnHeight(20)},

    noVisitText: {
        fontSize: setFontSize(12),
        fontFamily: "OpenSans",
        color: "#c0c5c8",
        alignSelf: 'center'
    },

    containerEmpty: {
        marginBottom: setValueBasedOnHeight(15),
        padding: setValueBasedOnHeight(20),
        backgroundColor: WHITE,
        borderRadius: setValueBasedOnWidth(5),
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyImageStyle:
    {
        height: setValueBasedOnHeight(24),
        width: setValueBasedOnWidth(19), 
        marginRight: setValueBasedOnWidth(10),
        alignSelf: 'center'
    },
    picStyle: {
        width: setValueBasedOnHeight(32),
        height: setValueBasedOnHeight(32),
        borderRadius: setValueBasedOnHeight(16),
        resizeMode: "cover",
        marginLeft: setValueBasedOnWidth(15)
    },
    picker: { 
        color: THEME_PRIMARY_COLOR,
        fontSize: setFontSize(14),
        width: setValueBasedOnWidth(130),
        marginRight: -setValueBasedOnWidth(10)
  },
  showMoreContainer: {flexDirection: "row", justifyContent: "center", alignItems: "center"},
  monthDropDownContainer: {
     flexDirection: "row",
     alignItems: "flex-end",
     justifyContent: "center",
     marginBottom: setValueBasedOnHeight(5)
  },
  todayIcon: {
      width: setValueBasedOnWidth(25),
      height: setValueBasedOnHeight(24),
      marginLeft: setValueBasedOnHeight(15)
  },
  today: {
      color: THEME_PRIMARY_COLOR,
      fontSize: setFontSize(14),
      textAlign: "right"
  },
  categoryContainer: {flex: 9, flexDirection: 'column', marginVertical: setValueBasedOnHeight(10), justifyContent: 'space-between'},
  flex: {flex: 1},
  fromText: {
      fontSize: setFontSize(14),
      fontWeight: 'bold'
  },
  requestTitle: {
    fontSize: setFontSize(14),
    color: THEME_PRIMARY_COLOR
},
textStyle: {
    color: THEME_PRIMARY_COLOR,
    fontSize: setFontSize(12),
    textAlign: "center"
},
cancelButton: {
    paddingHorizontal: setValueBasedOnWidth(10),
    paddingVertical: setValueBasedOnHeight(7),
    borderWidth: 1,
    borderColor: THEME_PRIMARY_COLOR,
    backgroundColor: "white",
    borderRadius: setValueBasedOnWidth(5),
    alignSelf: 'flex-end',
    marginLeft: setValueBasedOnWidth(7)
},
emptyCard: {
    backgroundColor: "#e8ebee",
    width: setValueBasedOnWidth(280),
    height: setValueBasedOnHeight(120),
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,  
    elevation: 5,
    padding: setValueBasedOnWidth(5),
    marginVertical: setValueBasedOnHeight(4),
    marginHorizontal: setValueBasedOnWidth(2)
},
editImageStyle: {
    width: setValueBasedOnWidth(36),
    height: setValueBasedOnHeight(42)
},
emptytextStyle: {
    marginHorizontal: setValueBasedOnWidth(10),
    fontFamily: 'OpenSans',
    fontSize: setFontSize(14),
    color: THEME_PRIMARY_COLOR,
    alignSelf: 'center',
    textAlign: "center"
},

emptyCardText: {
    fontSize: setFontSize(14),
    color: '#373737',
    alignSelf: 'center',
    textAlign: "center"
},
emptyTextView: {
    flex: 1,
    paddingTop: setValueBasedOnHeight(30),
    paddingBottom: setValueBasedOnHeight(30)
},
visitTime: {
    textAlign: 'center',
    justifyContent: 'center', 
    fontWeight: 'bold', 
    fontSize: setFontSize(12),
    color: '#444444'
},
separatorLine: {
    height: setValueBasedOnHeight(80),
    width: setValueBasedOnWidth(1),
    backgroundColor: '#f0f0f0',
    marginTop: setValueBasedOnHeight(5)
  },
  visitTimeView: {
      flex: 3,
      paddingHorizontal: setValueBasedOnHeight(2),
      marginTop: setValueBasedOnHeight(11)
    },
    visitsContainer: {
        marginTop: setValueBasedOnHeight(10),
        marginBottom: setValueBasedOnHeight(10)
    },
    message: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        color: "#444444",
        textAlign: "center"
      },
      showMoreView: { 
          flexDirection: "row", 
          justifyContent: "center", 
          alignItems: "center" 
        }
});