import React from "react";
import { connect } from 'react-redux';
import {
    View,
    Image,
    Keyboard
} from 'react-native';
import {onBack} from '../../../redux/navigation/actions'
import { sendGuardianDetails, getRelationship, onNextClick } from '../../../redux/manageConnection/AddGuardianDetails/actions';
import {
    sendVerificationLink,
} from '../../../redux/onboarding/SetUserId/actions';
import {  
    CoreoWizScreen, 
    CoreoFloatingInput, 
    Select,
    ModalPopup,
    CoreoText,
    CoreoHighlightButton
} from '../../../components';
import { PatientNavigationData } from '../../../data/PatientNavigationData';
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import { MENUS, BUTTONS } from '../../../constants/config';
import { UserProfileType, BLOCED_RELATION_SHIPS } from '../../../constants/constants';
import { checkTextNotStartWithNumber, checkEmail, checkSpace } from '../../../utils/validations';
import { normalizePhone } from '../../../utils/renderFields';
import styles from './styles';
import { success } from '../../../assets/images';
import { PATH } from '../../../routes';
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import {Navbar, SafeView} from '../../../components/LevelOne';
import { DEFAULT_VALUE } from "../../../components/Base/Select/Select";
import { OverlayLoaderWrapper } from "../../../components/Base/Preloader/Preloader";
import { isAPIFetching } from "../../../utils/AppAPIUtils";
import { isIOS } from "../../../utils/appUtils";
class AddGuardianDetails extends React.Component {

    constructor(props) {
        super(props);
        isSubmitted= false
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
            isFirstNameValid: true,
            isLastNameValid: true,
            isEmailValid: true,
            isContactValid: true,
            errorMessageForEmptyFields: '',
            errorMessageForValidFields: '',
            isError: false,
            skip_flag: true,
            next_flag: true,
            isScreenRefreshed: true,
            showModalOnCancel: false,
            updateTextInput: false,
            keyboard: false,
            keyboardHeight: 0
        };
        this.arr = [];
        this.errorMessage = 0;
        this.form_data = ''
    }

    componentDidMount() {
        this.props.getRelationship();
        this.setState({ skip_flag: false });
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this._keyboardDidShow.bind(this),
          );
          this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this._keyboardDidHide.bind(this),
          );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow(e) {
        this.setState({ keyboard: true, keyboardHeight: e.endCoordinates.height });
    }

    _keyboardDidHide() {
        this.setState({ keyboard: false, keyboardHeight: 0 });
    }

    onClickButtonNext = () => {
        this.props.onClickNext();
    }

    onClickButtonSkip = () => {
        this.props.onClickNext();
    }

    onClickSendInvitation = () => {
        this.isSubmitted = true
        if (this.state.firstName === '' || this.state.lastName === '' || this.state.emailAddress === '' ||
            this.state.contactNumber === '' || !checkTextNotStartWithNumber(this.state.firstName) || !checkEmail(this.state.emailAddress)
        || !checkTextNotStartWithNumber(this.state.lastName) || !(this.state.contactNumber.split('').length > 11) || !this.state.relationshipId) {
            this.setState({ isFormValid: false });
        }
        else {
            let datavalue = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailId: this.state.emailAddress,
                contactNumber: this.state.contactNumber,
                relationshipId: this.state.relationshipId
            }
            this.props.onClickSendInvitation(datavalue);
            this.setState({
                isFormValid: true,
                isInvitationStatus: true,
                firstName: '',
                lastName: '',
                emailAddress: '',
                contactNumber: '',
                relationshipId: null,
                isScreenRefreshed: false,
                scrollToTop:!this.state.scrollToTop
            });
        }
    }

    onClickButtonCancel = () => {
        this.setState({
            showModalOnCancel: true,
            isInvitationSent: false
        });
    }
    onFirstNameChange =(value)=>{
        this.setState({ firstName: value },()=>{
            if(this.state.firstName !== '' && !checkTextNotStartWithNumber(this.state.firstName)){
                this.setState({ isFirstNameValid: false });
            }else{
                this.setState({ isFirstNameValid: true });
            }
        })
    }
    onChangeLastName =(value)=>{
         this.setState({ lastName: value },()=>{
            if(this.state.lastName !== '' && !checkTextNotStartWithNumber(this.state.lastName)){
                this.setState({ isLastNameValid: false });
            }else{
                this.setState({ isLastNameValid: true });
            }
         }); 
    }

    onBlurEmail =(value)=>{
            if(this.state.emailAddress !== '' && !checkEmail(this.state.emailAddress)){
                this.setState({ isEmailValid: false });
            }else{
                this.setState({ isEmailValid: true });
            }
        
    }

    onBlurContact =(value)=>{  
        if(this.state.contactNumber !== '' && (this.state.contactNumber.length < 12)){
            this.setState({ isContactValid: false });
        } else {
            this.setState({ isContactValid: true });
        }
    }

    onChangeEmail =(value)=>{
        this.setState({ emailAddress: value });
    }

    onChangeContactNumber= (value)=>{
        this.setState({ 
            contactNumber: normalizePhone(value),
            updateTextInput: !this.state.updateTextInput
         }); 
    }

    render() {
        __DEV__ && console.log("MANAGE CONNECTION ADD GUARDIAN")
        const menus = [MENUS.CONTACT];
        const footerButtons = [BUTTONS.CANCEL, BUTTONS.SKIP];
        const NavigationData = this.props.profileType === UserProfileType.Individual ? PatientNavigationData : GuardianNavigationData;
        let relationshipOptions = this.props.relationship && this.props.relationship.map((relation, i) => {
            return {
              label: relation.name,
              value: relation.id
            };
        });

        let updatedReleationShipOptions = relationshipOptions && relationshipOptions.filter(relation => BLOCED_RELATION_SHIPS.indexOf(relation.value) === -1)
        
        let isSkipDisabled = (checkSpace(this.state.firstName) !== '' || checkSpace(this.state.lastName) !== '' || checkSpace(this.state.emailAddress) !== '' || checkSpace(this.state.contactNumber) !== '' || this.state.relationshipId);
        let isSendInvitationDisabled = (checkSpace(this.state.firstName) !== '' && checkSpace(this.state.lastName) !== '' && checkSpace(this.state.emailAddress) !== '' && checkSpace(this.state.contactNumber) !== '' && this.state.relationshipId && this.state.relationshipId !== DEFAULT_VALUE);
        const {addGuardianStatus,sendVarificationStatus} = this.props
        return (
            <SafeView>
            <OverlayLoaderWrapper style={{justifyContent: 'flex-start'}} isLoading={isAPIFetching(addGuardianStatus,sendVarificationStatus)} >
            <Navbar title="Add Guardian" showBackButton={false} showEmptyAdd/>
                <CoreoWizScreen 
                    menus={menus}
                    footerButtons={footerButtons}
                    activeFlowId={5}
                    isNextDisabled={!this.props.isInvitationSent}
                    isSkipDisabled={isSkipDisabled}
                    screen={"AddGuardianDetails"}
                    onNextClick={this.onClickButtonNext}
                    onSkipClick={this.onClickButtonSkip}
                    onCancelClick={() => {
                        this.setState({showModalOnCancel: true});
                    }}
                    hideKeyboardHeight={!isIOS()}
                    keyboardProps={{keyboardShouldPersistTaps:"always"}}
                >
                    <View style={[styles.containerWrapper,{paddingBottom: isIOS() && this.state.keyboard ? this.state.keyboardHeight : 0}]}>
                        <View style={styles.container}>
                            {
                                this.props.isInvitationSent && !this.state.isScreenRefreshed &&
                                <View style={styles.messageview}>
                                    <Image
                                        style={styles.icon}
                                        source={success}
                                    />
                                    <CoreoText style={styles.successmessage}>An invitation has been sent to {this.props.firstName} {this.props.lastName}</CoreoText>
                                </View>
                            }
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="First Name"
                                    editable={true}
                                    maxLength={100}
                                    onChangeText={this.onFirstNameChange}
                                    value={this.state.firstName}
                                />
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isFirstNameValid && (!checkTextNotStartWithNumber(this.state.firstName)) &&
                                    <CoreoText style={styles.errormessage}>
                                        Please enter valid First Name
                                    </CoreoText>
                                }
                            </View>
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="Last Name"
                                    editable={true}
                                    maxLength={100}
                                    onChangeText={this.onChangeLastName}
                                    value={this.state.lastName}
                                />
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isLastNameValid && (!checkTextNotStartWithNumber(this.state.lastName)) &&
                                    <CoreoText style={styles.errormessage}>
                                        Please enter valid Last Name
                                    </CoreoText>
                                }
                            </View>
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="Email Address"
                                    editable={true}
                                    maxLength={100}
                                    onChangeText={this.onChangeEmail}
                                    onBlur={this.onBlurEmail}
                                    value={this.state.emailAddress}
                                />
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isEmailValid && (!checkEmail(this.state.emailAddress)) &&
                                    <CoreoText style={styles.errormessage}>
                                        Please enter valid Email Address
                                    </CoreoText>
                                }
                            </View>
                            <View style={styles.memberstyle}>
                                <CoreoFloatingInput
                                    label="Contact Number"
                                    name="phone number"
                                    editable={true}
                                    maxLength={12}
                                    keyboardType="numeric"
                                    onChangeText={this.onChangeContactNumber}
                                    onBlur={this.onBlurContact}
                                    value={this.state.contactNumber}
                                />
                            </View>
                            <View style={styles.errorview}>
                                {!this.state.isContactValid && this.state.contactNumber.length < 12 &&
                                    <CoreoText style={styles.errormessage}>
                                        Please enter valid Contact Number
                                    </CoreoText>
                                }
                            </View>
                            <View style={styles.relationview}>
                                <CoreoText style={styles.title}>Relationship with Guardian</CoreoText>
                                <Select
                                    placeholder='Select Relationship'
                                    selectedValue={this.state.relationshipId}
                                    enabled={true}
                                    style={styles.planstyle}
                                    onValueChange={(value) => { this.setState({ relationshipId: value }); }}
                                    dataArray={updatedReleationShipOptions}/>
                                <View style={styles.line}/>
                            </View>
                            <View style={styles.errorview}>
                                { !this.state.relationshipId === null && this.state.relationshipId !== DEFAULT_VALUE &&
                                    <CoreoText style={styles.errormessage}>
                                        Please select Relationship with Guardian
                                    </CoreoText>
                                }
                            </View>
                        </View>
                        <View style={styles.sidemargin}>
                            <CoreoHighlightButton
                                disabled={!isSendInvitationDisabled}
                                style={[styles.button,{opacity: (!isSendInvitationDisabled ? 0.2: 1)}]}
                                onPress={this.onClickSendInvitation}
                                text='Send Invitation'
                                textStyle={styles.common}
                            />
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
                        this.props.goToHome();
                    }}
                    onCancel={() => this.setState({
                        showModalOnCancel: !this.state.showModalOnCancel,
                    })}
                >
                    <CoreoText 
                        style={styles.message}
                    >
                        Do you want to cancel the Add Guardian process?
                    </CoreoText>
                </ModalPopup>
            </OverlayLoaderWrapper>
            </SafeView>
        )
    }
}

/*AddGuardianDetails.propTypes = {
    relationship: PropTypes.array,
    isInvitationSent: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    isLoading: PropTypes.bool,
    onClickSendInvitation: PropTypes.func,
    getRelationship: PropTypes.func
}*/

function mapDispatchToProps(dispatch) {
    return {
        onClickSendInvitation: (data) => dispatch(sendGuardianDetails(data)),
        getRelationship: () => dispatch(getRelationship()),
        sendVerificationLink: (data) => dispatch(sendVerificationLink(data)),
        onClickNext: () => dispatch(onNextClick()),
        goBack: () => dispatch(onBack()),
        goToHome: () => dispatch(navigateToScreenMainStack(PATH.HOME_SCREEN)),
        goToMyConnections: () => dispatch(navigateToScreenMainStack(PATH.MANAGE_CONNECTION))
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
        profileType: manageConnectionState && state.manageConnectionState.profileTypeSelectionState.profileType,
        addGuardianStatus: manageConnectionState && state.manageConnectionState.addGuardianDetailsState.isLoadingAddGuardian,
        sendVarificationStatus: state.onboardingState && state.onboardingState.setUserIdState.isLoadingUserId,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGuardianDetails);
