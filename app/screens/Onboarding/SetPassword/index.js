import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import {
    ScreenCover,
    CoreoWizScreen,
    CoreoWizFlow,
    Link,
    CoreoWizNavigation,
    CoreoFloatingInput,
    ModalPopup,
    CoreoCheckBox,
    CoreoImage,
    CoreoText,
    ModalUserAgreement
} from '../../../components';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { PatientNavigationData } from '../../../data/PatientNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import { setPassword, onCancelClick, getEmailId } from '../../../redux/onboarding/SetPassword/actions';
import { clearState } from '../../../redux/onboarding/SetUserId/actions';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';
import { checkPassword } from '../../../utils/validations';
import { MENUS, BUTTONS } from '../../../constants/config';
import { RESPONSE_STATUS } from '../../../constants/constants';
import styles from './styles';
import {  error } from '../../../assets/images';
import { PATH } from '../../../routes';
import {SET_PASSWORD_SCREEN, setNavigateToLogin, EMPTY_SCREEN } from '../../../redux/auth/navigatedToLogin/action';
import { SafeView } from '../../../components/LevelOne';
import { getEulaContent, updateEula } from '../../../redux/auth/UserAgreement/actions';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { CHECKBOX_COLOR } from '../../../constants/theme';

export class SetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pass: '',
            confirmPass: '',
            userAgreement: false,
            passwordMatch: true,
            passwordCombination: true,
            setPasswordSuccess: false,
            showModalOnCancel: false,
            agreementModal: false,

        };
    };

    componentDidMount() {
        this.props.getEmailId({
            uid: this.props.uid,
            tokenkey: this.props.tokenkey,
            profileType: this.props.type
        });
        this.props.clearSetUserIdState();
        this.props.getEulaContent()
    }

    onClickButtonNext = () => {
        if (checkPassword(this.state.pass)) {
            if (this.state.pass === this.state.confirmPass) {
                this.setState({ passwordMatch: true });
                this.props.onClickNext(this.state.pass);
            } else {
                this.setState({ passwordMatch: false });
            }
        } else {
            this.setState({ passwordCombination: false });
        }
    }

    validatePassword = () => {
        if (checkPassword(this.state.pass)) {
            if (checkPassword(this.state.pass)) {
                this.setState({ passwordMatch: (this.state.confirmPass !== '' ? this.state.pass === this.state.confirmPass : true)});
            } 
            this.setState({ passwordCombination: true });
        } else if (this.state.pass !== '' ){
            this.setState({  passwordCombination: false });
        }
    }

    validateConfirmPassword = () => {
        if (checkPassword(this.state.confirmPass)) {
            if (checkPassword(this.state.pass)) {
                this.setState({ passwordMatch: (this.state.pass === this.state.confirmPass) });
            } else {
                this.setState({ passwordMatch: false });
            }
            this.setState({ passwordCombination: true });
        } else if (this.state.confirmPass !== '' ){
            this.setState({ passwordCombination: false });
        }
    }

    onClickButtonCancel = () => {
        this.setState({
            showModalOnCancel: true
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.currentScreen === EMPTY_SCREEN) {
            this.props.setNavigateToLogin(SET_PASSWORD_SCREEN)
            this.props.getEmailId({
                uid: this.props.uid,
                tokenkey: this.props.tokenkey,
                profileType: this.props.type
            });
            this.props.clearSetUserIdState();
        }
    }
    onPwdChange = (text) => this.setState({
        pass: text,
        passwordMatch: true,
        passwordCombination: true
    })
    onConfirmPwdChange = (text) => this.setState({
        confirmPass: text,
        passwordMatch: true,
        passwordCombination: true
    })

    onUserAgreementPress = () => this.setState({ userAgreement: !this.state.userAgreement })
    onClickCancel = () => this.props.onClickCancel()
    showModalOnCancel = () => this.setState({
        showModalOnCancel: !this.state.showModalOnCancel,
    })
    redirect = () => {
        this.props.redirect(PATH? PATH.WELCOME_SCREEN: null);
    }
    onPressUserAgreementModal = () => this.setState({
        agreementModal: !this.state.agreementModal
    }, this.props.onClickOk)
    render() {
        const menus = [MENUS.CONTACT];
        const footerButtons = [BUTTONS.CANCEL, BUTTONS.SUBMIT];
        const profileSelected = this.props.type === 'patient';
        const NavigationData = profileSelected ? PatientNavigationData : GuardianNavigationData;
        return (
            <SafeView>
            <ScreenCover style={styles.screenCoverStyle} showHeader={false}>
            <OverlayLoaderWrapper isLoading={this.props.isLoading} style={styles.screenCoverStyle}>
                <CoreoWizFlow coreoWizNavigationData={NavigationData} activeFlowId={profileSelected ? 3 : 4} />
                <CoreoWizNavigation
                    activeFlowId={profileSelected ? 3 : 4}
                    tablength={profileSelected ? 5 : 6}
                />
                <CoreoWizScreen
                    menus={menus}
                    footerButtons={footerButtons}
                    isSubmitDisabled={!this.state.passwordCombination || !this.state.passwordMatch || this.props.setPasswordSuccess || !this.state.pass || !this.state.confirmPass || !this.state.userAgreement}
                    onSubmitClick={this.onClickButtonNext}
                    onCancelClick={this.onClickButtonCancel}
                    // style={styles.wizScreenContainer}
                >
                    <View style={styles.container}>
                        <View style={styles.memberstyle}>
                            <CoreoFloatingInput
                                label="Your Email Address"
                                editable={false}
                                maxLength={100}
                                value={this.props.userName ? this.props.userName : ''}
                            />
                        </View>
                        <View style={styles.memberstyle} caretHidden={true}>
                            <CoreoFloatingInput
                                type="password"
                                label="Enter Password"
                                editable={true}
                                maxLength={25}
                                value={this.state.pass}
                                onChangeText={this.onPwdChange}
                                onBlur={this.validatePassword}
                                contextMenuHidden={true}
                                passwordMatch={this.state.passwordMatch || this.state.passwordCombination}
                                style={this.state.passwordMatch ? {} : styles.iosStyle}
                            />
                        </View>
                        <View style={styles.memberstyle} caretHidden={true}>
                            <CoreoFloatingInput
                                type="password"
                                label="Confirm Password"
                                editable={true}
                                maxLength={25}
                                value={this.state.confirmPass}
                                onChangeText={this.onConfirmPwdChange}
                                onBlur={this.validateConfirmPassword}
                                contextMenuHidden={true}
                                passwordMatch={this.state.passwordMatch || this.state.passwordCombination}
                                style={this.state.passwordMatch ? {} : styles.iosStyle}
                            />
                        </View>
                        <CoreoCheckBox
                            style={styles.termsconditions}
                            onPress={this.onUserAgreementPress}
                            checked={this.state.userAgreement}
                            checkboxColor={CHECKBOX_COLOR}
                            textStyle={styles.termsmargin}
                        >
                            By submitting, I agree that I have read and accepted the<Link onPress={() => this.setState({ agreementModal: true })}> End User License Agreement</Link>.
                        </CoreoCheckBox>
                        {!this.state.passwordMatch && !(!this.state.confirmPass) && <View style={styles.messageview}>
                            <CoreoImage
                                style={styles.icon}
                                source={error}
                            />
                            <CoreoText style={styles.errormessage}>Passwords do not match.</CoreoText>
                        </View>}
                        {!this.state.passwordCombination && <View style={styles.messageview}>
                            <CoreoImage
                                style={styles.icon}
                                source={error}
                            />
                            <CoreoText style={styles.errormessage}>Password should contain a combination of upper case, lower case, special characters and number, and should be at least 8 characters.</CoreoText>
                        </View>}
                    </View>
                </CoreoWizScreen>
                <ModalPopup
                    visible={this.state.showModalOnCancel}
                    primaryButton="YES"
                    secondaryButton="NO"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={this.onClickCancel}
                    onCancel={this.showModalOnCancel}
                >
                    <CoreoText style={styles.message}>Do you want to cancel the onboarding process?</CoreoText>
                </ModalPopup>
                <ModalPopup
                    visible={this.props.setPasswordLinkStatus === RESPONSE_STATUS.INVALID}
                    primaryButton="OK"
                    primaryColor="#3c1053"
                    onConfirm={this.redirect}
                >
                    <CoreoText style={styles.message}>Link is Inactive.</CoreoText>
                </ModalPopup>
                <ModalPopup
                    visible={this.props.currentScreen === SET_PASSWORD_SCREEN ? this.props.setPasswordLinkStatus === RESPONSE_STATUS.ONBOARDED : false}
                    primaryButton="OK"
                    primaryColor="#3c1053"
                    onConfirm={() => {
                        this.props.redirect(PATH.LOGIN_SCREEN);

                    }}
                >
                    <CoreoText style={styles.message}>User is already registered please Login to proceed.</CoreoText>
                </ModalPopup>
                <ModalUserAgreement
                    eulaContent={this.props.eulaContent}
                    visible={this.state.agreementModal}
                    onPress={this.onPressUserAgreementModal}
                />
            </OverlayLoaderWrapper>
            </ScreenCover>
            </SafeView>
        )
    }
}

SetPassword.propTypes = {
    email: PropTypes.string,
    isLoading: PropTypes.bool,
    userName: PropTypes.string,
    setPasswordSuccess: PropTypes.bool,
    setPasswordLinkStatus: PropTypes.bool,
    onClickCancel: PropTypes.func,
    onClickNext: PropTypes.func,
    getEmailId: PropTypes.func,
    redirect: PropTypes.func
}

export function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickNext: (data) => dispatch(setPassword(data)),
        getEmailId: (data) => dispatch(getEmailId(data)),
        redirect: (data) => dispatch(navigateToScreenMainStack(data)),
        clearSetUserIdState: () => dispatch(clearState()),
        setNavigateToLogin: (data) => dispatch(setNavigateToLogin(data)),
        getEulaContent: () => dispatch(getEulaContent()),
        onClickOk: () => dispatch(updateEula()), 
    }
}

export function mapStateToProps(state) {
    let onboardingState = state.onboardingState;
    let authState = state.authState;
    return {
        isLoading: state.loadingState && state.loadingState.isLoading,
        userName: onboardingState && state.onboardingState.setPasswordState.emailId,
        setPasswordSuccess: onboardingState && state.onboardingState.setPasswordState.setPasswordSuccess,
        setPasswordLinkStatus: onboardingState && state.onboardingState.setPasswordState.setPasswordStatus,
        profileType: onboardingState && state.onboardingState.profileTypeState.profileType,
        uid: onboardingState && state.onboardingState.welcomeState.uid,
        tokenkey: onboardingState && state.onboardingState.welcomeState.tokenkey,
        type: onboardingState && state.onboardingState.welcomeState.profiletype,
        currentScreen: authState && state.authState.navigateToLoginReducer.screen,
        eulaContent: authState && state.authState.userAgreementState.eulaContent
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);