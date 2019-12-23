import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import { backToForgotPassword  } from '../../../redux/auth/ForgetPassword/actions'; 
import {CoreoText, CoreoHighlightButton, CoreoImage} from '../../../components';
import { checkEmail } from '../../../utils/validations';
import AuthCover from '../AuthCover';
import {successTick} from '../../../assets/images';
import styles from './styles';
import { setValueBasedOnHeight } from '../../../utils/deviceDimensions';

class SentEmailConfirmation  extends Component {

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

  render() {
      return (
        <AuthCover isLoading={this.props.isLoading}>
        <View style={styles.loginHeader}>
          <View style={styles.iconview}>
              <CoreoImage
                  style={styles.icon}
                  source={successTick}
              />
          </View>
          <CoreoText style={[styles.title, styles.common]}>A reset password link has been sent to email address {this.props.emailId}</CoreoText>
          <CoreoText style={[styles.subtitle, styles.common]}>Click on the link in the email to set your new password.</CoreoText>
        </View>
        <View style={styles.login}>
          <CoreoText style={[styles.subtitle, styles.common]}>Didn't receive the email yet?</CoreoText>
          <CoreoText style={[styles.subtitle, styles.common,{marginTop:setValueBasedOnHeight(1)}]}>Please check your Spam folder, or </CoreoText>
          <View style={{flexDirection:'row',justifyContent:'center'}}>
          <CoreoHighlightButton
                  onPress={this.props.resendEmail}
                  textStyle={[styles.common, styles.loginfont, styles.semibold]}
                  text="Resend"
              />
          <CoreoText style={[styles.subtitleBottom, styles.common]}>email.</CoreoText>
          </View>
        </View>
      </AuthCover>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return{
    resendEmail: (data) => dispatch(backToForgotPassword())
  }
}

const mapStateToProps = (state) =>{
  return{
      isLoading: state.loadingState && state.loadingState.isLoading,
      emailId: state.authState && state.authState.forgetPasswordState && state.authState.forgetPasswordState.emailId
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SentEmailConfirmation);