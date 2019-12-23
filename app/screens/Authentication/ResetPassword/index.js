import React, { Component } from 'react';
import {
    View,
    KeyboardAvoidingView,
    
} from 'react-native';
import { connect } from 'react-redux';
import { resetPassword, getEmailId } from '../../../redux/auth/ResetPassword/actions';
import { CoreoHighlightButton, CoreoTextInput, CoreoText } from '../../../components';
import { checkPassword } from '../../../utils/validations';
import AuthCover from '../AuthCover';
import styles from './styles';
import { RESPONSE_STATUS } from '../../../constants/constants';

class ResetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            confirmPass: '',
            passwordMatch: true,
            passwordCombination: true,
            resetPasswordSuccess: false
        };
    };

    componentDidMount() {
        this.props.getEmailId();
    }

    onClickButtonReset = () => {
        if (checkPassword(this.state.password)) {
            if (this.state.password === this.state.rePassword) {
                this.props.onClickReset({
                    password: this.state.password,
                    userName: this.props.userName
                });
                this.setState({ passwordCombination: true });
                return;
            } else {
                this.setState({ passwordMatch: false });
                return;
            }
        }else{
            this.setState({ passwordCombination: false });
        }
        
    }
    onPressBtn = () => this.onClickButtonReset()
    onChangepwdTextInput = (password) => {
        this.setState({ password, passwordMatch: true, passwordCombination: true });
    }
    onChangeRePwdTextInput = (rePassword) => {
        this.setState({ rePassword, passwordMatch: true, passwordCombination: true });
    }
    render() {
        return (
            this.props.resetPasswordLinkStatus !== RESPONSE_STATUS.LINK_EXPIRED ?
            <AuthCover isLoading={this.props.isLoading}>
                <View style={styles.loginHeader}>
                    <CoreoText style={[styles.title, styles.common]}>Reset Your Password</CoreoText>
                    <CoreoText style={[styles.subtitle, styles.common]}>You have requested to reset password for {this.props.userName}</CoreoText>
                </View>
                <KeyboardAvoidingView style={[styles.content, styles.padding, styles.loginForm]} behavior="padding" enabled>
                    <CoreoTextInput
                        placeholder="New Password"
                        editable={true}
                        maxLength={25}
                        value={this.state.password}
                        capitalization={"none"}
                        placeholderTextColor="#ccc"
                        inputStyle={styles.textboxField}
                        secureTextEntry={true}
                        onChangeText={this.onChangepwdTextInput}
                    />
                    <CoreoTextInput
                        placeholder="Retype New Password"
                        editable={true}
                        maxLength={25}
                        value={this.state.rePassword}
                        secureTextEntry={true}
                        placeholderTextColor="#ccc"
                        inputStyle={styles.textboxField}
                        onChangeText={this.onChangeRePwdTextInput}
                    />
                    {!this.state.passwordMatch &&
                        <CoreoText style={styles.errormessage}>Passwords do not match. Please try again.</CoreoText>
                    }
                    {!this.state.passwordCombination &&
                        <CoreoText style={styles.errormessage}>Password should contain a combination of upper case, lower case, special characters, numbers and should be at least 8 characters</CoreoText>
                    }
                    {this.props.resetPasswordStatusFail &&
                        <CoreoText style={styles.errormessage}>Invalid Password. The new password cannot be among the last 6 passwords used.</CoreoText>
                    }
                    <CoreoHighlightButton
                        style={styles.button}
                        onPress={this.onPressBtn}
                        textStyle={[styles.common, styles.loginfont]}
                        text="Reset My Password"
                    />
                </KeyboardAvoidingView>
            </AuthCover> :
            <AuthCover isLoading={this.props.isLoading}>
                <View style={[styles.loginHeader,{justifyContent:'center'}]}>
                    <CoreoText style={[styles.title, styles.common]}>Link is no longer valid. Please reset your password from the login screen.</CoreoText>
                 </View>
            </AuthCover>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickReset: (data) => dispatch(resetPassword(data)),
        getEmailId: () => dispatch(getEmailId()),
    }
}

const mapStateToProps = (state) => {
    let authState = state.authState;
    return {
        isLoading: state.loadingState && state.loadingState.isLoading,
        userName: authState && authState.resetPasswordState && state.authState.resetPasswordState.emailId,
        resetPasswordStatusFail: authState && authState.resetPasswordState && state.authState.resetPasswordState.resetPasswordStatus,
        resetPasswordLinkStatus: authState && authState.resetPasswordState && state.authState.resetPasswordState.resetPasswordLinkStatus
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);