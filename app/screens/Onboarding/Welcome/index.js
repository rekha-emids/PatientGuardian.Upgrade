import React, { PureComponent } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Linking,
  AppState,
  PermissionsAndroid,
  Platform,
  AsyncStorage
} from 'react-native';
import Carousel from 'react-native-carousel-view';
import images, { landing1, landing2, landing3, landing4, landing5, landing6 } from '../../../assets/images';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { isIOS } from '../../../utils/appUtils';
import RNANAndroidSettingsLibrary from 'react-native-android-settings-library';
import styles from './styles';
import { onGetStartedClick, onLoginClick, deepLinkRoute, getCanOnboardFlag } from '../../../redux/onboarding/Welcome/actions';
import { PATH } from '../../../routes';
import { CoreoHighlightButton, ModalPopup, CoreoText, CoreoImage } from '../../../components';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions'
import { deepLinkRoute as deepLinkTelehealth } from '../../../redux/telehealth/actions';
import { 
  getLatestMessages,
  checkConversationExist,
  checkConversationCreated, setSelectedConversationId } from '../../../redux/asyncMessages/actions';
import { getUserInfo,  getUserIdAndType } from '../../../utils/userUtil';
import { USER_TYPES, RESET_PASSWORD, USER_INFO, PLATFORM } from '../../../constants/constants';
import { checkTeleHealth } from '../../../redux/telehealth/actions';
import {removeToken} from '../../../redux/auth/Logout/actions'
import {connection, startConnection, onConnectionClosed} from '../../../utils/signalrUtility';

class WelcomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isModalPopupVisible: false,
      appState: AppState.currentState,
      onBoarding: true
    };
  };

  requestCameraPermission =
    async () => {
      try {
        const granted =
          await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
            {
              'title':
                'Camera Permission',
              'message':
                'App needs access to your camera '
            }
          )
        if (granted ===
          PermissionsAndroid.RESULTS.GRANTED) {
        } else {

        }
      } catch (err) {

      }
    }

  async componentDidMount() {
    this.props.getCanOnboardFlag()
    if (Platform.OS === 'android') {
      this.requestCameraPermission().then(() => {

      }).catch(() => { })
    }
    Linking.addEventListener('url', this._handleOpenURL);
    this.runPassCodeCheck();
    AppState.addEventListener('change', this._handleAppStateChange);

    connection.on("ConversationCreated", data => {
      if (data) {
        this.props.checkConversationCreated(data)
      }
    });

    connection.on("UpdateMesssageCount", data => {
      if (data) {
        this.props.checkConversationExist(data)
      }
    });

    connection.on("UpdateChat", data => {
      if (data) {
        let index = -1
        let userId = getUserInfo().userId;
        let userType = getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : getUserInfo().userType;
        if (userType === USER_TYPES.CARE_TEAM) {
          let idAndTypeDetails = getUserIdAndType()
          userId = idAndTypeDetails.userId
          userType = idAndTypeDetails.userType
        };
        let ParticipantList = data.result ? [...data.result.participantList] : [...data.participantList];
        index = ParticipantList.indexOf(
          ParticipantList.filter(el => el.userId === userId && el.participantType === userType)[0]
        );
        if (index !== -1) {
          let conversationId = data.result ? data.result.conversationId : data.conversationId;
          this.props.getLatestMessages(conversationId);
          this.props.setConversationId(conversationId)
        };
      };
    });

    connection.on("TeleHealth", data => {
      this.props.checkTeleHealth(data);
    });

    startConnection()

    onConnectionClosed()

    AsyncStorage.getItem(USER_INFO).then((resp=>{
      if(resp){
        let parsedData =  JSON.parse(resp)
      let os = PLATFORM.ANDROID
      if(isIOS()){
        os=PLATFORM.IOS
      }

      let userID = parsedData.userId
      let deviceId = DeviceInfo.getUniqueID()

      if(parsedData.userType === USER_TYPES.PATIENT){
        userID= parsedData.patientId
      }

      let model = {
          "deviceUserId": userID,
          "deviceToken": parsedData.firebaseToken,
          "userType": parsedData.userType,
          "osType": os,
          "deviceId":deviceId
      }
      
      this.props.removeToken(model)
      }
    }));
   
  }

  componentWillUnmount() {
    // Linking.removeEventListener('url', this._handleOpenURL);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  runPassCodeCheck = () => {
    DeviceInfo.isPinOrFingerprintSet()(isPinOrFingerprintSet => {
      this.setState({ isModalPopupVisible: !isPinOrFingerprintSet })
    });
  }
  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.runPassCodeCheck()
    }
    this.setState({ appState: nextAppState });
  }

  _handleOpenURL = (event) => {
    let route = event.url.split('/');
    if (event.url.toLowerCase().includes(RESET_PASSWORD.toLowerCase())) {
      let tokenkey = route[route.length - 2];
      let uid = route[route.length - 3];
      this.props.deepLinkRoute({
        uid: uid,
        tokenkey: tokenkey,
        profiletype: '',
        path: PATH? PATH.RESET_PASSWORD_SCREEN: null
      });
    } else if (event.url.toLowerCase().includes(PATH? PATH.SET_PASSWORD_SCREEN.toLowerCase(): null)) {
      let tokenkey = route[route.length - 1];
      let uid = route[route.length - 2];
      let profiletype = route[route.length - 3];
      this.props.deepLinkRoute({
        uid: uid,
        tokenkey: tokenkey,
        profiletype: profiletype,
        path: PATH.SET_PASSWORD_SCREEN
      });
    } else if (event.url.toLowerCase().includes(PATH? PATH.TELEHEALTH_INVITE.toLowerCase(): null)) {
      let roomId = route[route.length - 1];
      this.props.deepLinkTelehealth({
        roomId: roomId,
        path: PATH.TELEHEALTH_INVITE
      });
    }
  }

  carouselComponent = (image, text) => {
    return (
      <View>
        <ImageBackground
          source={image}
          style={styles.backgroundimage}
        >
          <CoreoImage
            source={images.logoWhite}
            style={styles.logo}
          />
          <Text style={[styles.subtitle, styles.common]}>{text} Your Caring Companion</Text>
          <Text style={[styles.description, styles.common]}>Instantly matching Service Providers to seamlessly fulfill your needs</Text>
        </ImageBackground>
      </View>
    )
  }

  onBoardingFun(){
    if(this.props.network === true){
      this.setState({
        onBoarding: true
      })
      this.props.onGetStartedClick();
    }else{
      this.setState({
        onBoarding: false
      })
    }
    
  }

  render() {
    var ImageArray = [landing1, landing2, landing3, landing4, landing5, landing6];
    return (
      <View style={{ alignItems: 'center' }}>
        <Carousel
          height={setValueBasedOnHeight(640)}
          width={setValueBasedOnWidth(360)}
          delay={isIOS() ? 2000 : 10000}
          indicatorAtBottom={true}
          indicatorSize={setValueBasedOnHeight(9)}
          indicatorOffset={setValueBasedOnHeight(220)}
          indicatorText="●"
          indicatorColor="#FFF"
          animate={true}
          loop={true}
          onPageChange={(number) => this.setState({ image: ImageArray[number] })}
        >
          {this.carouselComponent(ImageArray[0])}
          {this.carouselComponent(ImageArray[1])}
          {this.carouselComponent(ImageArray[2])}
        </Carousel>
        <View style={styles.buttonsContainer}>
        {this.props.canOnboard ? <CoreoHighlightButton
            style={styles.button}
            onPress={this.onBoardingFun.bind(this)}
            textStyle={[styles.common, styles.loginfont, styles.semibold]}
            text="Get Started"
          /> : <View style={styles.emptyButton} />}
          {/* <CoreoHighlightButton
            style={styles.button}
            onPress={this.onBoardingFun.bind(this)}
            textStyle={[styles.common, styles.loginfont, styles.semibold]}
            text="Get Started"
          /> */}
           <View style={styles.network}>
            {
              this.state.onBoarding === false ?
                <CoreoText style={[styles.onBoardingfont]}>Initial Onboarding requires network access. Please check your network and try again.</CoreoText>
                :
                null
            }
          </View>
          <Text style={[styles.account, styles.loginfont, styles.common]}>Already have an account?</Text>
          <CoreoHighlightButton
            style={styles.loginButton}
            onPress={this.props.onLoginClick}
            textStyle={[styles.common, styles.bigFont, styles.semibold]}
            text="Login"
          />
        </View>
        <ModalPopup
          visible={this.state.isModalPopupVisible}
          primaryButton="OK"
          primaryColor="#3c1053"
          onConfirm={() => {
            isIOS() ? Linking.openURL('app-settings:') : RNANAndroidSettingsLibrary.main()
          }}
        >
          <CoreoText style={styles.message}>To use this application, Passcode/Pattern Lock must be enabled on your mobile Device for secure access, click "Ok" to continue.</CoreoText>
        </ModalPopup>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.authState &&state.authState.userState,
    network: state.networkReducer && state.networkReducer.network,
    canOnboard: state.onboardingState && state.onboardingState.welcomeState.canOnboard
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onGetStartedClick: () => dispatch(onGetStartedClick()),
    onLoginClick: () => dispatch(onLoginClick()),
    deepLinkRoute: (data) => dispatch(deepLinkRoute(data)),
    goToCareTeam: () => dispatch(navigateToScreenMainStack(PATH.CARETEAM_SCREEN)),
    deepLinkTelehealth: (data) => dispatch(deepLinkTelehealth(data)),
    checkTeleHealth: (data) => dispatch(checkTeleHealth(data)),
    removeToken:(model)=>dispatch(removeToken(model)),
    getLatestMessages: (conversationId) => dispatch(getLatestMessages(conversationId)),
    checkConversationExist: (conversationId) => dispatch(checkConversationExist(conversationId, true)),
    checkConversationCreated: (data) => dispatch(checkConversationCreated(data)),
    setConversationId: (id) => dispatch(setSelectedConversationId(id)),
    getCanOnboardFlag: () => dispatch(getCanOnboardFlag())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
