import React, { Component } from 'react';
import {
    View
} from 'react-native';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { ScreenCover, CoreoWizScreen, CoreoWizFlow, ModalPopup, CoreoWizNavigation, CoreoFloatingInput, CoreoText } from '../../../components';
import { UserProfileType } from '../../../constants/constants';
import { PatientNavigationData } from '../../../data/PatientNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';

import { MENUS, BUTTONS } from '../../../constants/config';
import { onNextClick, onCancelClick } from '../../../redux/onboarding/PersonalDetails/actions';
import { checkTextNotStartWithNumber, checkContactNumber } from '../../../utils/validations';
import { normalizePhone } from '../../../utils/renderFields';
import styles from './styles';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';

class PersonalDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModalOnCancel: false,
            firstName: '',
            lastName: '',
            contactNumber: '',
            update: false
        };
    };

    componentDidMount() {
        this.setState({
            firstName: this.props.personalDetailsfirstName,
            lastName: this.props.personalDetailslastName,
            contactNumber: this.props.personalDetailscontactNumber
        }
        );
    }

    onClickButtonCancel = () => {
        this.setState({
            showModalOnCancel: true
        });
    }

    onSubmitClick = () => {
        this.props.onClickNext(this.state);
    }

    onChangeInputText = (text) => this.setState({ firstName: text, isFirstNameInvalid: false })
    onBlur = () => {
        if (!checkTextNotStartWithNumber(this.state.firstName)) {
            this.setState({ isFirstNameInvalid: true });
        }
    }
    onChangeLastName = (text) => this.setState({ lastName: text, isLastNameInvalid: false })
    onLastNameBlur = () => {
        if (!checkTextNotStartWithNumber(this.state.lastName)) {
            this.setState({ isLastNameInvalid: true });
        }
    }
    onChangeContactNumber = (number) =>
        this.setState({
            contactNumber: normalizePhone(number),
            update: !this.state.update,
            isContactNumberInvalid: false

        })
    onContactNumberBlur = () => {
        if (!checkContactNumber(this.state.contactNumber)) {
            this.setState({ isContactNumberInvalid: true });
        }
    }
    render() {
        const menus = [MENUS.CONTACT];
        const footerButtons = [BUTTONS.CANCEL, BUTTONS.SUBMIT];

        const NavigationData = this.props.profileType === UserProfileType.Individual ? PatientNavigationData : GuardianNavigationData;
        return (
            <ScreenCover style={styles.screenCoverStyle} showHeader={false}>
                <OverlayLoaderWrapper isLoading={this.props.isLoading} style={styles.screenCoverStyle}>
                    <CoreoWizFlow coreoWizNavigationData={NavigationData} activeFlowId={2} />
                    <CoreoWizNavigation
                        activeFlowId={2}
                        tablength={6}
                    />
                    <CoreoWizScreen
                        menus={menus}
                        footerButtons={footerButtons}
                        activeFlowId={3}
                        onSubmitClick={this.onSubmitClick}
                        style={styles.wizScreenContainer}
                        onCancelClick={this.onClickButtonCancel}
                        isSubmitDisabled={!this.state.firstName || !this.state.lastName ||
                            !this.state.contactNumber || this.state.isFirstNameInvalid ||
                            this.state.isLastNameInvalid || this.state.isContactNumberInvalid || this.state.contactNumber.length < 12}>
                        <View style={styles.container}>
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="First Name"
                                    editable={true}
                                    maxLength={100}
                                    value={this.state.firstName}
                                    onChangeText={this.onChangeInputText}
                                    onBlur={this.onBlur}
                                />
                            </View>
                            {this.state.isFirstNameInvalid && <View style={styles.errorview}>
                                <CoreoText
                                    style={styles.errormessage}
                                >
                                    Please enter valid First Name
                            </CoreoText>
                            </View>}
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="Last Name"
                                    editable={true}
                                    maxLength={100}
                                    value={this.state.lastName}
                                    onChangeText={this.onChangeLastName}
                                    onBlur={this.onLastNameBlur}
                                />
                            </View>
                            {this.state.isLastNameInvalid && <View style={styles.errorview}>
                                <CoreoText
                                    style={styles.errormessage}
                                >
                                    Please enter valid Last Name
                            </CoreoText>
                            </View>}
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="Contact Number"
                                    editable={true}
                                    maxLength={12}
                                    value={this.state.contactNumber}
                                    keyboardType="numeric"
                                    keyValue={this.state.update ? '0' : '1'}
                                    onChangeText={this.onChangeContactNumber}
                                    onBlur={this.onContactNumberBlur}
                                />
                            </View>
                            {this.state.isContactNumberInvalid && <View style={styles.errorview}>
                                <CoreoText
                                    style={styles.errormessage}
                                >
                                    Please enter valid Contact Number
                            </CoreoText>
                            </View>}
                            <View style={styles.memberstyle}>
                            </View>
                        </View>
                    </CoreoWizScreen>
                    <ModalPopup
                        visible={this.state.showModalOnCancel}
                        primaryButton="YES"
                        secondaryButton="NO"
                        primaryColor="#3c1053"
                        secondaryColor="#6c757d"
                        onConfirm={() => {
                            this.setState({
                                showModalOnCancel: !this.state.showModalOnCancel,
                            })
                            this.props.onClickCancel();
                        }}
                        onCancel={() => this.setState({
                            showModalOnCancel: !this.state.showModalOnCancel,
                        })}
                    >
                        <CoreoText
                            style={styles.message}
                        >
                            Do you want to cancel the onboarding process?
                    </CoreoText>
                    </ModalPopup>
                </OverlayLoaderWrapper>
            </ScreenCover>
        )
    }
}

PersonalDetails.propTypes = {
    profileType: PropTypes.string,
    isLoading: PropTypes.bool,
    onClickCancel: PropTypes.func,
    onClickNext: PropTypes.func,
    setWorkflowDirty: PropTypes.func
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickNext: (data) => dispatch(onNextClick(data))
    }
}


function mapStateToProps(state) {
    let onboardingState = state.onboardingState;
    return {
        relationship: onboardingState && onboardingState.addGuardianState.relationship,
        isInvitationSent: onboardingState && onboardingState.addGuardianState.isInvitationSent,
        firstName: onboardingState && onboardingState.addGuardianState.firstName,
        lastName: onboardingState && onboardingState.addGuardianState.lastName,
        profileType: onboardingState && onboardingState.profileTypeState.profileType,
        personalDetailsfirstName: onboardingState && onboardingState.personalDetailsState.firstName,
        personalDetailslastName: onboardingState && onboardingState.personalDetailsState.lastName,
        personalDetailscontactNumber: onboardingState && onboardingState.personalDetailsState.contactNumber
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
