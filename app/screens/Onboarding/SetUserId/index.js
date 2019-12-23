import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
    View
    
} from 'react-native';
import { checkSpace, checkEmail } from '../../../utils/validations';
import { PatientNavigationData } from '../../../data/PatientNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import {
    onPreviousClick,
    sendVerificationLink,
    onCancelClick,
    formDirty,
    clearState
} from '../../../redux/onboarding/SetUserId/actions';
import {
    CoreoFloatingInput,
    ScreenCover,
    CoreoWizScreen,
    CoreoWizFlow,
    ModalPopup,
    CoreoWizNavigation,
    CoreoHighlightButton,
    CoreoText,
    CoreoImage
} from '../../../components';
import { MENUS, BUTTONS } from '../../../constants/config';
import styles from './styles';
import { error, success } from '../../../assets/images';
import { UserProfileType } from '../../../constants/constants';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';

class SetUserId extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            visible: "",
            email: null,
            emailValid: true,
            showModalOnCancel: false,
            showModalOnPrevious: false
        };
    };

    componentWillUnmount() {
        this.props.clearState();
    }

    onClickButtonPrevious = () => {
        if (this.state.email) {
            this.setState({
                showModalOnPrevious: true
            });
        }
        else {
            this.props.onClickPrevious();
        }
    }

    onClickSendVerificationLink = () => {
        if (checkEmail(this.state.email)) {
            this.setState({ emailValid: true });
            this.props.sendVerificationLink({ emailId: this.state.email });
        }
        else {
            this.setState({ emailValid: false });
            this.props.formDirty();
        }
    }

    onChangeEmail = (value) => {
        this.setState({
            email: checkSpace(value),
            emailValid: true
        });
        this.props.formDirty();
    }

    onBlurEmail = () => {
        if (checkEmail(this.state.email)) {
            this.setState({ emailValid: true });
        }
        else {
            this.setState({ emailValid: false });
        }
    }

    onCancelClickWizScreen = () => this.setState({ showModalOnCancel: true })
    showModalOnCancelConfirm = () => {
        this.setState({
            showModalOnCancel: !this.state.showModalOnCancel,
        })
        this.props.onClickCancel();
    }
    showModalOnCancel = () => this.setState({
        showModalOnCancel: !this.state.showModalOnCancel,
    })
    render() {
        const menus = [MENUS.CONTACT];
        const footerButtons = [BUTTONS.CANCEL, BUTTONS.PREVIOUS];

        const NavigationData = this.props.profileType === UserProfileType.Individual ? PatientNavigationData : GuardianNavigationData;
        return (
            <ScreenCover style={styles.screenCoverStyle}>
            <OverlayLoaderWrapper style={styles.screenCoverStyle} isLoading={this.props.isLoading}>
                <CoreoWizFlow coreoWizNavigationData={NavigationData} activeFlowId={this.props.profileType === 'Individual' ? 2 : 3} />
                <CoreoWizNavigation
                    activeFlowId={this.props.profileType === UserProfileType.Individual ? 2 : 3}
                    tablength={this.props.profileType === UserProfileType.Individual ? 5 : 6}
                />
                <CoreoWizScreen
                    menus={menus}
                    footerButtons={footerButtons}
                    onPreviousClick={this.onClickButtonPrevious}
                    onCancelClick={() => this.setState({ showModalOnCancel: true })}
                >
                    <View style={styles.container}>
                        <View>
                            <View>
                                <CoreoFloatingInput
                                    label="Email Address"
                                    maxLength={100}
                                    value={this.state.email}
                                    onChangeText={this.onChangeEmail}
                                    onBlur={this.onBlurEmail}
                                    placeholder={"Enter Email Address"}
                                />
                            </View>
                            {!this.state.emailValid &&
                                <View style={styles.messageview}>
                                    <CoreoImage
                                        style={styles.icon}
                                        source={error}
                                    />
                                    <CoreoText style={styles.errormessage}>Please enter a valid email address (e.g. abc@xyz.com)</CoreoText>
                                </View>}
                            {this.props.isSendVerificationLinkError &&
                                <View style={styles.messageview}>
                                    <CoreoImage
                                        style={styles.icon}
                                        source={error}
                                    />
                                    <CoreoText style={styles.errormessage}>Email already exist</CoreoText>
                                </View>}
                            {!this.props.isSendVerificationLinkSuccess && <View style={styles.infoview}><CoreoText style={styles.info}>{`Your email address will be your User ID. A verification link will be sent to your email address.`}</CoreoText></View>}
                            {this.props.isSendVerificationLinkSuccess &&
                                <View>
                                    <View style={styles.messageview}>
                                        <CoreoImage
                                            style={styles.icon}
                                            source={success}
                                        />
                                        <CoreoText style={styles.successmessage}>A verification link has been sent to your email address</CoreoText>
                                    </View>
                                    <View style={styles.infoview}>
                                        <CoreoText style={styles.info}>
                                            1. Go to your mail inbox.{"\n"}
                                            2. Click on the verification link.{"\n"}
                                            3. You will be redirected to set your password.{"\n"}
                                        </CoreoText>
                                    </View>
                                </View>}
                        </View>
                        <CoreoHighlightButton
                            disabled={!this.state.email}
                            style={[styles.button, { opacity: (!this.state.email ? 0.2 : 1) }]}
                            onPress={this.onClickSendVerificationLink}
                            textStyle={styles.common}
                            text="Send Verification Link"
                        />
                    </View>
                </CoreoWizScreen>
                <ModalPopup
                    visible={this.state.showModalOnCancel}
                    primaryButton="YES"
                    secondaryButton="NO"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={this.showModalOnCancelConfirm}
                    onCancel={this.showModalOnCancel}
                >
                    <CoreoText style={styles.message}>Do you want to cancel the onboarding process?</CoreoText>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.showModalOnPrevious}
                    primaryButton="YES"
                    secondaryButton="NO"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={() => {
                        this.setState({
                            showModalOnPrevious: !this.state.showModalOnPrevious,
                        })
                        this.props.onClickPrevious()
                    }}
                    onCancel={() => this.setState({
                        showModalOnPrevious: !this.state.showModalOnPrevious,
                    })}
                >
                    <CoreoText style={styles.message}>Do you want to discard changes?</CoreoText>
                </ModalPopup>
                </OverlayLoaderWrapper>
            </ScreenCover>
        )
    }
}

SetUserId.propTypes = {
    isSuccessLinkSent: PropTypes.bool,
    isLoading: PropTypes.bool,
    isLinkSentError: PropTypes.bool,
    onClickCancel: PropTypes.func,
    onClickPrevious: PropTypes.func,
    sendVerificationLink: PropTypes.func
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickPrevious: () => dispatch(onPreviousClick()),
        sendVerificationLink: (data) => dispatch(sendVerificationLink(data)),
        formDirty: () => dispatch(formDirty()),
        clearState: () => dispatch(clearState())
    }
}

function mapStateToProps(state) {
    let onboardingState = state.onboardingState;
    return {
        isSendVerificationLinkSuccess: onboardingState && state.onboardingState.setUserIdState.sendVerificationLinkSuccess,
        isLoading: state.loadingState && state.loadingState.isLoading,
        isSendVerificationLinkError: onboardingState && state.onboardingState.setUserIdState.sendVerificationLinkError,
        profileType: onboardingState && state.onboardingState.profileTypeState.profileType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetUserId);