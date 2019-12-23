import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import { resetStack  } from '../../../redux/navigation/actions'; 
import {CoreoText, CoreoHighlightButton, CoreoImage} from '../../../components';
import { checkEmail } from '../../../utils/validations';
import {PATH} from '../../../routes';
import AuthCover from '../AuthCover';
import {successTick} from '../../../assets/images';
import styles from './styles';

class ResetPasswordSuccess  extends Component {

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
        <View style={{flex:1,justifyContent:'space-around'}}>
        <View stylestyle={[styles.padding, styles.loginForm]}>
          <View style={styles.iconview}>
              <CoreoImage
                  style={styles.icon}
                  source={successTick}
              />
          </View>
          <CoreoText style={[styles.title, styles.common]}>Password Reset Successful!</CoreoText>
        </View>
        <View style={styles.loginHeader}>
            <CoreoHighlightButton
                onPress={this.props.goToLoginPage}
                textStyle={[styles.common, styles.loginfont, styles.semibold]}
                text="Go to Login Page"
            /> 
        </View>
        </View>
      </AuthCover>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return{
    goToLoginPage: () => dispatch(resetStack(PATH.LOGIN_SCREEN))
  }
}

export default connect(null, mapDispatchToProps)(ResetPasswordSuccess);