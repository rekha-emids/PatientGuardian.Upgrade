import React, { PureComponent } from 'react';
import {
  View,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { onLogin,  clearFailFlag, onForgotPassordLinkClick } from '../../../redux/auth/Login/actions'
import { CoreoText, CoreoTextInput, CoreoHighlightButton, CoreoImage } from '../../../components';
import AuthCover from '../AuthCover';
import styles from './styles';
import images from '../../../assets/images';
import { setNavigateToLogin, LOGIN_SCREEN } from '../../../redux/auth/navigatedToLogin/action';
import { setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';

class Login extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      // username: __DEV__ ? "Vijju@grr.la" : '',
      // password: __DEV__ ? "Emids@123" : '',
      // username: __DEV__ ? "lee@mailinator.com" : '',
      // password: __DEV__ ? "Emids@987" : '',

      // username: __DEV__ ? "flintoff@mailinator.com" : '',
      // password: __DEV__ ? "Emids@123" : '',
      //  username: __DEV__ ? "Ella@grr.la" : '',
      //  password: __DEV__ ? "Emids@123" : '',

      // username: __DEV__ ? "Genne@mailinator.com" : '',
      // password: __DEV__ ? "Emids@123" : '',

      //username: __DEV__ ? "twoFoot@mailinator.com" : '',
      //password: __DEV__ ? "Emids@123" : '',

      // username: __DEV__ ? "john.william@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "",

      //   username: __DEV__ ? "eli@mailinator.com" : "",
      //  password: __DEV__ ? "Emids@123" : "",


      // username: __DEV__ ? "Avery@mailinator.com" : "",
      //  password: __DEV__ ? "Emids@123" : "",

      // username: __DEV__ ? "Denise.sims@mailinator.com" : "",
      // password: __DEV__ ? "Coreo#ome@123" : "",

      // username: __DEV__ ? "Avery@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "",

      // username: __DEV__ ? "paraveen.hombal@emids.com": "",
      // password: __DEV__ ? "Emids@123" : "",

      // username: __DEV__ ? "Kathryn.Elliott@mailinator.com" : "",
      // password: __DEV__ ? "Coreo#ome@123" : "",

      // username: __DEV__ ? "Sara.took@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "",

      // username: __DEV__ ? "lance@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "",

      // username: __DEV__ ? "winslow@mailinator.com" :"",
      // password: __DEV__ ? "Emids@1234567" : "",

      // username: __DEV__ ? "tom@mailinator.com" :"",
      // password: __DEV__ ? "Emids@123" : "",
      // username: __DEV__ ? "Denise.sims@mailinator.com" : "",
      // password: __DEV__ ? "Coreo#ome@123" : "",
      
      // username: __DEV__ ? "thomas@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "", 

      // username: __DEV__ ? "antumn@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "",

      // username : __DEV__ ? "rice.bunce@mailinator.com" : "",
      // password: __DEV__ ? "Coreo#ome@123" : "",

      // username: __DEV__ ? "john.william@mailinator.com" :"",
      // password: __DEV__ ? "Emids@123" : "",
      
      // username: __DEV__ ? "brian.grubb@mailinator.com" :"",
      // password: __DEV__ ? "Coreo#ome@123" : "",

      // username: __DEV__ ? "James.Noakes@mailinator.com" :"",
      // password: __DEV__ ? "Coreo#ome@123" : "",

      // username : __DEV__ ? "Henry.Morrison@mailinator.com" : "",
      // password: __DEV__ ? "Coreo#ome@123" : "",

      // username: __DEV__ ? "LucaModric0@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "",

      // username: __DEV__ ? "Lyon@mailinator.com" : "",
      // password: __DEV__ ? "Emids@200" : "",
      

      // username: __DEV__ ? "lori.whitfoot@mailinator.com" : "",
      // password: __DEV__ ? "Emids@500" : "",

      username: __DEV__ ? "lori.whitfoot@mailinator.com" : "",
      password: __DEV__ ? "Emids@000" : "",


      // username: __DEV__ ? "emma@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "",

      // username: __DEV__ ? "Lori.whitfoot@mailinator.com" : "",
      // password: __DEV__ ? "Emids@123" : "",

      // username: __DEV__ ? "miss@mailinator.com": "",
      // password: __DEV__ ? "Emids@321": "",

      // username: __DEV__ ? "jony@mailinator.com" : "",
      // password: __DEV__ ? "Emids@500" : "",
      
      // username: __DEV__ ? "david.warner@mailinator.com" : "",
      // password: __DEV__ ? "Emids@005" : "",

      //  username: __DEV__ ? "john.william@mailinator.com" : "",
      // password: __DEV__ ? "Emids@000" : "",


      defaultErrorMsg: "Please enter valid username and password",
      usernameError: null,
      passwordError: null
    }
  }

  onBtnPress = () => {
    this.props.onLogin(this.state);
  }
  componentDidMount() {
    this.props.setNavigateToLogin(LOGIN_SCREEN)
    __DEV__ &&  console.log("network is : ",this.props.network)
  }

  onFailure = (data) => {
    this.setState({ defaultErrorMsg: data })
  }

  onLoginBtnClick = () => {
    if (this.state.username !== undefined &&  this.state.username.length > 0 && this.state.password !== undefined && this.state.password.length > 0) {
      if (this.state.errorMsg) {
        this.setState({ errorMsg: null, usernameError: null, passwordError: null })
      }
      this.props.onLogin(this.state, this.onFailure)
    } else if (this.state.username !== undefined && this.state.username.length === 0 && this.state.password !== undefined && this.state.password.length !== 0) {
      this.setState({ usernameError: 'Email address field is required.', passwordError: null })
    }
    else if (this.state.username !== undefined && this.state.username.length !== 0 && this.state.password !== undefined && this.state.password.length === 0) {
      this.setState({ usernameError: null, passwordError: 'Password field is required.' })
    }
    else if (this.state.username !== undefined && this.state.username.length === 0 && this.state.password !== undefined && this.state.password.length === 0) {
      this.setState({ usernameError: 'Email address field is required.', passwordError: 'Password field is required.' })
    }

  }
onChangePwdTextInput = (password) => {
  this.setState({ password, passwordError: null });
  if (this.props.isLoginFailed) {
    this.props.onChangeText();
  } 
}
onChangeEmailTextInput = (username) => {
  this.setState({ username, usernameError: null });
  if (this.props.isLoginFailed) {
    this.props.onChangeText();
  }
}
onCoreoHighlightBtnPress = () => { this.onLoginBtnClick(); }
  render() {
    return (
      <OverlayLoaderWrapper isLoading={this.props.isLoading}>
        <AuthCover>
          <View style={styles.loginHeader}>
            <CoreoImage
              source={images.logoWhite}
              style={styles.logo}
            />
            {/* <CoreoText style={[styles.subtitle, styles.common]}>Welcome to Coreo Home</CoreoText> */}
          </View>
          <KeyboardAvoidingView style={[styles.padding, styles.loginForm]} behavior="padding" enabled>
          <View style={{alignSelf: "center"}}>
            <CoreoTextInput
              placeholder="Enter Email Address"
              editable={true}
              maxLength={100}
              value={this.state.username}
              inputStyle={styles.textboxField}
              placeholderTextColor="#ccc"
              onChangeText={this.onChangeEmailTextInput}
            />
              {this.state.usernameError !== null ?
              <CoreoText
                style={styles.errormessageOne}
              >
               {this.state.usernameError}
              </CoreoText> : null
            }
            </View>
            <View style={styles.spaceBetUnPW}>
            <CoreoTextInput
              placeholder="Enter Password"
              secureTextEntry={true}
              editable={true}
              maxLength={100}
              value={this.state.password}
              auto-capitalization={false}
              inputStyle={[styles.textboxField, this.props.isLoginFailed || this.state.errorMsg ? { marginBottom: setValueBasedOnHeight(20) } : null]}
              placeholderTextColor="#ccc"
              onChangeText={this.onChangePwdTextInput}
            />
             {this.state.passwordError !== null ?
              <CoreoText
                style={styles.errormessageTwo}
              >
               {this.state.passwordError}
              </CoreoText> : null
            }
            {this.props.isLoginFailed &&
              <CoreoText
                style={styles.errormessage}
              >
                {this.props.errorMessage || this.state.defaultErrorMsg}
              </CoreoText>
            }</View>
            <CoreoHighlightButton
              style={styles.button}
              onPress={this.onCoreoHighlightBtnPress}
              textStyle={[styles.common, styles.loginfont]}
              text="Login"
            />
          </KeyboardAvoidingView>
          <View style={styles.login}>
            <CoreoHighlightButton
              disabled={!this.props.network}
              onPress={this.props.onForgotPassordLinkClick}
              textStyle={[styles.common, styles.frgPassword]}
              text="Forgot Password?"
            />
          </View>
        </AuthCover>
      </OverlayLoaderWrapper>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin: (data, onFailure) => dispatch(onLogin(data, onFailure)),
    onChangeText: () => dispatch(clearFailFlag()),
    onForgotPassordLinkClick: () => dispatch(onForgotPassordLinkClick()),
    setNavigateToLogin: (data) => dispatch(setNavigateToLogin(data))
  }
}

const mapStateToProps = (state) => {
  return {
    isLoginFailed: state.authState && state.authState.loginState.isFailed,
    isLoading: state.loadingState && state.loadingState.isLoading,
    network: state.networkReducer && state.networkReducer.network,
    errorMessage: state.authState && state.authState.loginState.error.message
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
