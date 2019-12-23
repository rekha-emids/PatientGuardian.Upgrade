import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { sendResetPasswordLink, clearErrorFlag, backToLogin  } from '../../../redux/auth/ForgetPassword/actions';
import {CoreoTextInput, CoreoHighlightButton, CoreoText} from '../../../components';
import { checkEmail } from '../../../utils/validations';
import AuthCover from '../AuthCover';
import styles from './styles';

class ForgetPassword  extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: '',
        emailValid: true
    }
  }

  onClicksendResetPasswordLink = () => {
        if (checkEmail(this.state.email)) {
            this.setState({ emailValid: true });
            this.props.sendResetPasswordLink({ emailId: this.state.email });
        }
        else {
            this.setState({ emailValid: false });
        }
    }
  onChangeTextInput = (email) => {
    this.setState({ email, emailValid: true });
    if (this.props.isSendResetPasswordLinkError) {
      this.props.clearErrorFlag();
    }
  }
  backToLogin = () => this.props.backToLogin()
  render() {
      return (
        <AuthCover isLoading={this.props.isLoading}>
        <View style={styles.container}>
          <View style={styles.loginHeader}>
            <CoreoText style={[styles.title, styles.common]}>Forgot your password?</CoreoText>
            <CoreoText style={[styles.subtitle, styles.common]}>Don't worry. Resetting password is easy. Just tell us your email address registered with Coreo Home.</CoreoText>
          </View>
          <KeyboardAvoidingView style={[styles.padding, styles.loginForm]} behavior="padding" enabled>
            <CoreoTextInput
              placeholder="Enter Email Address"
              editable={true}
              maxLength={100}
              value={this.state.username}
              inputStyle={styles.textboxField}
              placeholderTextColor="#ccc"
              onChangeText={this.onChangeTextInput}
            />
            {!this.state.emailValid &&
              <View style={styles.messageview}>
                <CoreoText style={styles.errormessage}>Please enter a valid User ID(e.g. abc@xyz.com)</CoreoText>
              </View>}
            {this.props.isSendResetPasswordLinkError &&
              <CoreoText style={styles.errormessage}>Invalid User ID. Please try again</CoreoText>
            }
            <CoreoHighlightButton
              style={styles.button}
              onPress={this.onClicksendResetPasswordLink}
              textStyle={[styles.common, styles.loginfont, styles.semibold]}
              text="Send Link"
            />
          </KeyboardAvoidingView>
          <View style={styles.login}>
            <CoreoHighlightButton
              onPress={this.backToLogin}
              textStyle={[styles.common, styles.loginfont]}
              text="Back to Login"
            />
          </View>
        </View>
      </AuthCover>
    );
    }
}

function mapDispatchToProps(dispatch) {
  return{
    sendResetPasswordLink: (data) => dispatch(sendResetPasswordLink(data)),
    clearErrorFlag: () => dispatch(clearErrorFlag()),
    backToLogin: () => dispatch(backToLogin())
  }
}

const mapStateToProps = (state) =>{
  return{
      isLoading: state.loadingState && state.loadingState.isLoading,
      isSendResetPasswordLinkError: state.authState && state.authState.forgetPasswordState.sendResetPasswordLinkError
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);