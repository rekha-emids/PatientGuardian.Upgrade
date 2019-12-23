import React from "react";
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import { sendGuardianDetails, getRelationship, onNextClick, onCancelClick } from '../../../redux/manageConnection/AddGuardianDetails/actions';
import {
    sendVerificationLink,
} from '../../../redux/onboarding/SetUserId/actions';
import { 
    ScreenCover, 
    CoreoWizScreen, 
    CoreoFloatingInput, 
    Select,
    ModalPopup,
    CoreoText
} from '../../../components';
import { PatientNavigationData } from '../../../data/PatientNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import { MENUS, BUTTONS } from '../../../constants/config';
import { UserProfileType } from '../../../constants/constants';
import { checkTextNotStartWithNumber, checkEmail, checkSpace } from '../../../utils/validations';
import { normalizePhone } from '../../../utils/renderFields';
import styles from './styles';
import { success } from '../../../assets/images';
import Navbar from '../../../components/LevelOne/Navbar';
import { DEFAULT_VALUE } from "../../../components/Base/Select/Select";
class AddGuardianDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModalOnCancel: false,
            firstName: '',
            lastName: '',
            emailAddress: '',
            contactNumber: '',
            relationshipId: null,
            isInvitationSent: false,
            isEmptyForm: true,
            isFormValid: true,
            errorMessageForEmptyFields: '',
            errorMessageForValidFields: '',
            isError: false,
            skip_flag: true,
            next_flag: true,
            showModalOnCancel: false
        };
        this.arr = [];
        this.errorMessage = 0;
        this.form_data = ''
    };

    componentDidMount() {
        this.props.getRelationship();
        this.setState({ skip_flag: false });
    }

    onClickButtonNext = () => {
        this.props.onClickNext();
    }

    onClickButtonSkip = () => {
        this.props.onClickNext();
    }

    onClickSendInvitation = () => {
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.emailAddress === '' ||
            this.state.contactNumber === '' || !checkTextNotStartWithNumber(this.state.firstName) || !checkEmail(this.state.emailAddress)
        || !checkTextNotStartWithNumber(this.state.lastName) || !(this.state.contactNumber.split('').length > 11) || !this.state.relationshipId) {
            this.setState({ isFormValid: false });
        }
        else {
            this.setState({
                isFormValid: true,
                isInvitationStatus: true 
            });
            let datavalue = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailId: this.state.emailAddress,
                contactNumber: this.state.contactNumber,
                relationshipId: this.state.relationshipId
            }
            this.props.onClickSendInvitation(datavalue);
        }
    }

    onClickButtonCancel = () => {
        this.setState({
            showModalOnCancel: true
        });
    }

    render() {
        const menus = [MENUS.CONTACT];
        const footerButtons = [BUTTONS.CANCEL, BUTTONS.SKIP, BUTTONS.NEXT];
        const NavigationData = this.props.profileType === UserProfileType.Individual ? PatientNavigationData : GuardianNavigationData;
        let relationshipOptions = this.props.relationship && this.props.relationship.map((relation, i) => {
            return {
              label: relation.name,
              value: relation.id
            };
        });
        relationshipOptions && relationshipOptions.unshift({
          label: 'Select Relation',
          value: null
        });

        let isSkipDisabled = (checkSpace(this.state.firstName) !== '' || checkSpace(this.state.lastName) !== '' || checkSpace(this.state.emailAddress) !== '' || checkSpace(this.state.contactNumber) !== '' || this.state.relationshipId);
        let isSendInvitationDisabled = (checkSpace(this.state.firstName) !== '' && checkSpace(this.state.lastName) !== '' && checkSpace(this.state.emailAddress) !== '' && checkSpace(this.state.contactNumber) !== '' && this.state.relationshipId && this.state.relationshipId !== DEFAULT_VALUE);

        return (
            <ScreenCover isLoading={this.props.isLoading} showHeader={false}>
            <Navbar title="Add Guardian" showBackButton={true} />
                <CoreoWizScreen 
                    menus={menus}
                    footerButtons={footerButtons}
                    activeFlowId={5}
                    isNextDisabled={!this.props.isInvitationSent}
                    isSkipDisabled={isSkipDisabled}
                    onNextClick={this.onClickButtonNext}
                    onSkipClick={this.onClickButtonSkip}
                    onCancelClick={() => {
                        this.setState({showModalOnCancel: true});
                    }}
                >
                    <View style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                        <View style={styles.container}>
                            {
                                this.props.isInvitationSent &&
                                <View style={styles.messageview}>
                                    <Image
                                        style={styles.icon}
                                        source={success}
                                    />
                                    <Text style={styles.successmessage}>An invitation has been sent to {this.props.firstName} {this.props.lastName}</Text>
                                </View>
                            }
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="First Name"
                                    editable={true}
                                    maxLength={100}
                                    onChangeText={(value) => { this.setState({ firstName: value }); }}
                                    value={this.state.firstName}
                                />
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isFormValid && (!checkTextNotStartWithNumber(this.state.firstName)) &&
                                    <Text style={styles.errormessage}>
                                        Please enter valid First Name
                                    </Text>
                                }
                            </View>
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="Last Name"
                                    editable={true}
                                    maxLength={100}
                                    onChangeText={(value) => { this.setState({ lastName: value }); }}
                                    value={this.state.lastName}
                                />
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isFormValid && (!checkTextNotStartWithNumber(this.state.lastName)) &&
                                    <Text style={styles.errormessage}>
                                        Please enter valid Last Name
                                    </Text>
                                }
                            </View>
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="Email Address"
                                    editable={true}
                                    maxLength={100}
                                    onChangeText={(value) => { this.setState({ emailAddress: value }); }}
                                    value={this.state.emailAddress}
                                />
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isFormValid && (!checkEmail(this.state.emailAddress)) &&
                                    <Text style={styles.errormessage}>
                                        Please enter valid Email Address
                                    </Text>
                                }
                            </View>
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="Contact Number"
                                    name="phone number"
                                    editable={true}
                                    maxLength={12}
                                    keyboardType="numeric"
                                    onChangeText={(value) => { this.setState({ contactNumber: normalizePhone(value) }); }}
                                    value={this.state.contactNumber}
                                />
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isFormValid && (this.state.contactNumber === '' || (this.state.contactNumber.split('').length < 12)) &&
                                    <Text style={styles.errormessage}>
                                        Please enter valid Phone Number
                                    </Text>
                                }
                            </View>
                            <View style={styles.relationview}>
                                <Text style={styles.title}>Relationship with Guardian</Text>
                                <Select
                                    placeholder='Select Relationship'
                                    selectedValue={this.state.relationshipId}
                                    enabled={true}
                                    style={styles.planstyle}
                                    onValueChange={(value) => { this.setState({ relationshipId: value }); }}
                                    dataArray={relationshipOptions}/>
                                <View style={styles.line}/>
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isFormValid && !this.state.relationshipId &&
                                    <Text style={styles.errormessage}>
                                        Please select Relationship
                                    </Text>
                                }
                            </View>
                        </View>
                        <View style={styles.sidemargin}>
                            <TouchableHighlight
                                disabled={!isSendInvitationDisabled}
                                style={[styles.button,{opacity: (!isSendInvitationDisabled ? 0.2: 1)}]}
                                onPress={this.onClickSendInvitation}
                            >
                                <Text style={styles.common}>Send Invitation</Text>
                            </TouchableHighlight>
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
                        Do you want to cancel the add guardian process?
                    </CoreoText>
                </ModalPopup>
            </ScreenCover>
        )
    }
}

AddGuardianDetails.propTypes = {
    relationship: PropTypes.array,
    isInvitationSent: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isLoading: PropTypes.bool,
    onClickSendInvitation: PropTypes.func,
    getRelationship: PropTypes.func
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickSendInvitation: (data) => dispatch(sendGuardianDetails(data)),
        getRelationship: () => dispatch(getRelationship()),
        sendVerificationLink: (data) => dispatch(sendVerificationLink(data)),
        onClickNext: () => dispatch(onNextClick()),
        onClickCancel: () => dispatch(onCancelClick())
    }
}

function mapStateToProps(state) {
    let manageConnectionState = state.manageConnectionState;
    return {
        relationship: manageConnectionState && state.manageConnectionState.addGuardianDetailsState.relationship,
        isInvitationSent: manageConnectionState && state.manageConnectionState.addGuardianDetailsState.isInvitationSent,
        firstName: manageConnectionState && state.manageConnectionState.addGuardianDetailsState.firstName,
        lastName: manageConnectionState && state.manageConnectionState.addGuardianDetailsState.lastName,
        isLoading: state.loadingState && state.loadingState.isLoading,
        profileType: manageConnectionState && state.manageConnectionState.profileTypeSelectionState.profileType
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGuardianDetails);