import {
  StyleSheet,
  Platform
} from 'react-native';
import { setValueBasedOnWidth, setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export default StyleSheet.create({
  fullContainer: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'relative'
  },
  callContainer: {
    flex: 1,
    position: "absolute",
    zIndex: 1,
    bottom: 0,
    // top: 0,
     left: 0,
    right: 0
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  button: {marginTop: 100},
  localFullVideo: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'red'
  },
  localVideo: {flex: 1},
  localInteralVideo: {
    ...Platform.select({
      android: {
        width: setValueBasedOnWidth(360),
        height: setValueBasedOnHeight(400)
      },
      ios: {flex: 1}
    })
  },
  localVideoTopLeft: {
    position: 'absolute',
    top: 50,
    left: 30,
    zIndex: 10,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 5,
    height: 50,
    borderRadius: 5
  },
  localVideoTopRight: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    right: 30,
    zIndex: 10,
    //color:'#fff',
    padding: 5,
    paddingTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 50,
    borderRadius: 5
  },
  dotPart: {},
  localVideoCenter: {
    position: 'absolute',
    top: '49%',
    left: 30,
    padding: 5,
    zIndex: 10,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  localVideoTopTxt: {color: '#fff'},
  localVideoCenterText: {
    margin: 'auto',
    width: 100,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 5
  },
  remoteGrid: {
    flexDirection: "row",
    alignItems: 'flex-end',
    marginBottom: 100,
    display: 'flex'
    //zIndex:22,
    //zIndex: 2,
    //backgroundColor:'red',
   
  },
  remoteVideo: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    width: setValueBasedOnWidth(80),
    height: setValueBasedOnHeight(80),
    zIndex: 999

  },
  remoteParticipant: {},
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    zIndex: 22,
    backgroundColor: 'transparent',
    flexDirection: "row",
    justifyContent: "space-between"
  },
  endCall: {backgroundColor: '#c04e59'},
  activeButton: {backgroundColor: THEME_PRIMARY_COLOR},
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: '#495057',
    justifyContent: 'center',
    alignItems: "center"
  },
  optionView: {
    justifyContent: 'center',
    alignItems: "center"
  },
  optionText: {
    color: "#ffffff",
    fontFamily: "OpenSans",
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    textAlign: "left"
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: '#373737'
  },
  icon: {
    height: 26,
    width: 26,
    zIndex: 2
  }
});