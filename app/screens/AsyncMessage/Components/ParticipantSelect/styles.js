import { StyleSheet } from 'react-native';
import {  setValueBasedOnHeight, setValueBasedOnWidth } from '../../../../utils/deviceDimensions';
import { THEME_SECONDARY_COLOR } from '../../../../constants/theme';
const conversationstyles_ps = StyleSheet.create({
    container: {
        height: 78,
        flexDirection: 'row',
        backgroundColor: '#66307f'
    },
    contentContainer: {paddingBottom: 20},
    addIcon: {
        flex: 2,
        height: '20%',
        width: '20%',
        marginLeft: '38%',
        marginBottom: 8
    },
    addIconIOS: {
        flex: 2,
        height: '35%',
        width: '35%',
        marginLeft: '78%',
        position: 'absolute',
        zIndex: 1,
        marginTop: 28
    },
    HeaderText: {fontSize: 24, color: '#fff', textAlign: 'left', marginTop: 18, marginLeft: 73},
    HeaderTextIos: {fontSize: 24, color: '#fff', textAlign: 'center', marginTop: 26, marginLeft: '50%'},
    msglistouterWrapUnread: {
        flex: 1,
        flexDirection: 'row',
        height: setValueBasedOnHeight(60),
        backgroundColor: '#fbf7f7',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    msglistouterWrap: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: setValueBasedOnHeight(60),
        paddingLeft: setValueBasedOnWidth(18),
        paddingRight: setValueBasedOnWidth(18)
    },
    msglistavtrWrap: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between'        
    },
    msgliststatsWrap: {
        flex: 3,
        flexDirection: 'column',
        paddingRight: 5,
        justifyContent: 'center'
    },
    msglistmsgWrap: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'center'
    },
   
    avtrHolderLeft: {
        width: 35,
        height: 35,
        backgroundColor: '#000',
        borderRadius: 25,
        position: 'absolute',
        top: '25%'
    },
    avtrHolderRight: {
        height: 30,
        width: 30,
        backgroundColor: THEME_SECONDARY_COLOR,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        paddingTop: 5,
        position: 'absolute',
        left: '50%',
        top: '25%'
        
    },

    avtrCountText: {
        fontSize: 12,
        color: '#3c1053',
        textAlign: 'center'

    },
    avtrHolderWrap: {width: 73},


    msglistTitleWrap: {
        height: 20,
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6'
   
    },
    msglistAttachWrap: {
        height: 20,
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 10

    },
    msglistmsgTitle: {
        flex: 1,
        fontSize: 16,
        color: '#2b2b2b',
        flexDirection: 'column',
        marginLeft: setValueBasedOnHeight(15),
        height: setValueBasedOnHeight(60),
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        paddingTop: setValueBasedOnHeight(20)

    },
    actionView: {
        borderBottomWidth: 1,
        borderBottomColor: '#e6e6e6',
        height: setValueBasedOnHeight(60),
        paddingTop: setValueBasedOnHeight(20)
    },
    msglistmsgText: {
        fontSize: 14,
        color: '#9f9f9f',
        width: '80%',
        overflow: 'hidden'
    },
    msglistdateText: {
        fontSize: 12,
        color: '#9f9f9f'
    },
    unreadHolder: {
        height: 26,
        width: 26,
        backgroundColor: 'red',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 10
    },
    msglistdateHolder: {
        width: 100,
        paddingTop: 5,
        position: 'absolute',
        right: '1%',
        top: 28
    },
    dateCountText: {
        fontSize: 12,
        color: '#fff',
        alignSelf: 'flex-end',
        marginRight: 10

    },
    unreadText: {color: '#fff'},

    searchBar: {backgroundColor: "#f7f7f7"},
    rightIcon: {
        height: setValueBasedOnHeight(16),
        width: setValueBasedOnHeight(16)
    },
    rightIconIOS: {
        height: setValueBasedOnHeight(23),
        width: setValueBasedOnHeight(23),
        top: 40,
        marginLeft: setValueBasedOnWidth(18)
    },
    profileIconOuterWrap: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start' 
    },
    profileIconinnerWrap: {
        height: 30,
        width: 30,
        zIndex: 1,
        alignSelf: 'center'
    },
    participantSelectIconWrap: {
         height: 25,
         width: 25,
         alignSelf: 'center'
    },
    imageThumbnail: {
        width: 50,
        height: 50
    },
    avtrHolderImage: {
        flex: 1,
        height: '100%',
        width: '100%',
        zIndex: 1
    },
    avtrHolderImageWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }


});


export default conversationstyles;