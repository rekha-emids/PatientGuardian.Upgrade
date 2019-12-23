import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { setFontSize } from '../../../utils/deviceDimensions';

import {
    Text,
    View,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    Modal
} from 'react-native';
import {isIOS} from '../../../utils/appUtils'
import {
    ScreenCover,
    CoreoWizScreen,
    CoreoWizFlow,
    Select,
    Calendar,
    InfoList,
    Link,
    ModalPopup,
    PopUpView,
    CoreoWizNavigation,
    CoreoFloatingInput,
    CoreoText
} from '../../../components';
import Icon from '../../../components/Base/Icon'
import { Popup } from '../../../components/Base/PopOver';
import {
    onNextClick,
    onCancelClick,
    resetClick,
    getPlans,
    searchMembers,
    formDirty
} from '../../../redux/onboarding/MemberDetails/actions';
import { checkSpace, checkSpecialCharecter } from '../../../utils/validations';
import { MENUS, BUTTONS } from '../../../constants/config';
import { UserProfileType, SELF_ID, BLOCED_RELATION_SHIPS } from '../../../constants/constants';
import { PatientNavigationData } from '../../../data/PatientNavigationData';    
import { GuardianNavigationData } from '../../../data/GuardianNavigationData';
import styles from './styles';
import { error } from '../../../assets/images';
import { Commercial, Medicare, Medicaide, Not_in_List } from '../../../assets/images';
import Icons from '../../../assets/Icons';
import {getRelationship} from '../../../redux/onboarding/AddGuardian/actions';
import {_} from '../../../utils/validations'
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import { PATH } from '../../../routes';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';

class MemberDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchData: {
                lastname: '',
                memberId: '',
                dob: null,
                planId: null,
                relationShipId: 0
            },
            showModal: false,
            selectedData: {
                mpi: '',
                firstName: '',
                lastName: '',
                memberId: '',
                dob: null,
                gender: '',
                relationShipId: 0
            },
            relationshipId:0,
            showModalOnCancel: false,
            showModalOnPrevious: false,
            dobValid: true,
            isSearchCriteriaValid: true,
            isPopUpViewOpen: false,
            isRelationshipInvalid: false,
            defaultErrorMsg: "Already Relationship Exists with the User"
        };
    };

    componentDidMount() {
        this.setState(
            {
                selectedData: this.props.patientProfile,
                searchData: {
                    ...this.state.searchData,
                    lastname: this.props.lastname,
                    memberId: this.props.memberId,
                    dob: null,
                    planId: this.props.planId,
                    relationShipId: this.props.relationShipId
                }
            }
        );
        this.props.getPlans();
        this.props.getRelationship();
    }

    resetData = () => {
        this.setState({
            searchData: {
                ...this.state.searchData,
                lastname: '',
                memberId: '',
                planId: null,
                dob: null,
                
            },
            selectedData: {
                ...this.state.selectedData,
                mpi: '',
                firstName: '',
                lastName: '',
                memberId: '',
                gender: '',
                relationShipId: 0
            },
            relationshipId:0
        });
        this.props.resetMemberDetails()
    }

    onPressInfo = () =>{
        this.setState({isPopUpViewOpen:true})
    }

    dateChanged = (date) => {
        const formattedDate = date ? moment(new Date(date.toString()),'MM/DD/YYYY') : null;
        this.setState({ searchData: { ...this.state.searchData, dob: formattedDate }, dobValid: true },()=>{
            this.props.formDirty();
        });
    }

    onChangePlan = (value, index) => {
        this.setState({ searchData: { ...this.state.searchData, planId: value } },()=>{
            this.props.formDirty();
        });
        
    }

    onChangeLastName = (value) => {
        this.setState({ searchData: { ...this.state.searchData, lastname: value } },()=>{
            this.props.formDirty();
        });
        
    }

    onChangeMemberId = (value) => {
            this.setState({ searchData: { ...this.state.searchData, memberId: value } },()=>{
                this.props.formDirty();
            });       
    }

    onChangeRelationship = (value) => {
        this.setState({ searchData: { ...this.state.searchData, relationShipId: value }, isRelationshipInvalid: false },()=>{
            this.props.formDirty();

        });
    }

    onFailure = (data) => {
        this.setState({defaultErrorMsg: data})
      }

    searchPatient = () => {
        if (this.state.searchData.planId === null || this.state.searchData.memberId === '' ||
            this.state.searchData.lastname === '' || this.state.searchData.dob === null || !this.state.dobValid) {
            if (!this.state.dobValid) {
                this.setState({ searchData: { ...this.state.searchData, dob: null } });
            }
            this.setState({ isSearchCriteriaValid: false });
        } else {
            this.setState({isSearchCriteriaValid: true});
            this.props.searchPatient(this.state.searchData)
        }
    }

    onPressSupport = () => {
        this.props.goToHelp();
    }
    checkValidation=()=>{
        const {relationShipId,mpi} =this.state.selectedData || {}
        if(relationShipId && !_.isEmpty(mpi) && relationShipId!== -1){
                return false
        }
        return true
    }

    onSelectProfile = (member) => {
        this.setState({
        selectedData: {
            ...this.state.selectedData,
            mpi: member && member.mpi,
            firstName: member && member.firstName,
            lastName: member && member.lastName,
            dob: member && member.dob,
            gender: member && member.gender,
            memberId: member && member.memberId
        }
    })
}
    render() {
        __DEV__ && console.log("MEMBER DETAILS")
        let navigationParams = this.props.navigation && this.props.navigation.state.params
        let navigationTitle =typeof(navigationParams)==="string" && navigationParams === "Provide Member Details" ? navigationParams: null;
        let icon = Icons.infoCircleAndroid
        if(isIOS()){
            icon = Icons.infoCircleIos
        }
        const menus = [MENUS.CONTACT];
        const footerButtons = [BUTTONS.CANCEL, BUTTONS.NEXT];

        let planOptions = this.props.plans && this.props.plans.map((plan, i) => {
            return {
              label: plan.planType,
              value: plan.planId
            };
        });

        let selectedPlanId = this.state.searchData.planId

        let relationdata = this.props.relationship;
        if(this.props.profileType !== UserProfileType.Individual){
            relationdata = this.props.relationship && this.props.relationship.filter(relation => BLOCED_RELATION_SHIPS.indexOf(relation.value) === -1);
        }

        let relationshipOptions = relationdata && relationdata.map((item) => {
            item.label = item.name;
            item.value = item.id;
            return item;
        })


        const memberOptions = this.props.patientProfiles && this.props.patientProfiles.map((item, i) => {
            item.id = item.mpi;
            return item;
        });

        

        const memberList = memberOptions && memberOptions.map((member) => {
            member.selected = this.state.selectedData.mpi === member.mpi;
            return (
                <InfoList
                    profile={member}
                    onSelectProfile={this.onSelectProfile.bind(this, member)}
                />
            );
        });

        let NavigationData = this.props.profileType === UserProfileType.Individual ? PatientNavigationData : GuardianNavigationData;
        navigationTitle? NavigationData[3].title = navigationTitle: null;
        this.props.profileType !== UserProfileType.Individual && navigationTitle === null && (NavigationData[3].title = "Set My Password")
        navigationTitle && (this.props.navigation.state.params = undefined)

        // const NavigationData = this.props.profileType === UserProfileType.Individual ? PatientNavigationData : GuardianNavigationData;
        // const user = this.props.profileType === UserProfileType.Individual ? `Member's` : `${this.props.selectedRelationValue}'s`;
        return (
            <ScreenCover style={styles.screenCoverStyle} showHeader={false}>
                <OverlayLoaderWrapper isLoading={this.props.isLoading} style={styles.screenCoverStyle}>

                <CoreoWizFlow coreoWizNavigationData={NavigationData} activeFlowId={this.props.profileType === UserProfileType.Guardian ? 5 : 4} />
                <CoreoWizNavigation
                    activeFlowId={this.props.profileType === UserProfileType.Guardian ? 5 : 4}
                    tablength={this.props.profileType === UserProfileType.Guardian ? 6 : 5}
                />
                <CoreoWizScreen 
                    menus={menus} 
                    footerButtons={footerButtons} 
                    isNextDisabled={this.checkValidation()} 
                    onNextClick={() => this.setState({
                        showModal: true
                    })}
                    onCancelClick={() => this.setState({
                        showModalOnCancel: true
                    })}
                    // style={styles.wizScreenContainer}
                >
                    <View style={styles.container}>
                        <Text style={[styles.title, styles.fontfamily]}>Select your plan</Text>
                        <View style={styles.planmargin}>
                            <Select
                                placeholder='Select Plan'
                                selectedValue={this.state.searchData.planId}
                                enabled={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                                style={styles.planstyle}
                                onValueChange={this.onChangePlan}
                                dataArray={planOptions}/>
                            <View style={styles.line}/>
                        </View>
                        <View style={styles.detailsmargin}>
                            <Text style={styles.title}>
                                Enter Member's Details
                            </Text>
                        </View>
                        <View style={styles.memberstyle}>
                            <CoreoFloatingInput
                                label="Last Name"
                                editable={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                                maxLength={100}
                                onChangeText={this.onChangeLastName}
                                value={checkSpace(this.state.searchData.lastname)}
                            />
                        </View>
                        <View style={styles.memberstyle}>
                            <View>
                            <CoreoFloatingInput
                                label="Member ID"
                                editable={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                                maxLength={50} 
                                keyboardType = {isIOS() ?"name-phone-pad" :  "default"}                     
                                value={checkSpace(this.state.searchData.memberId)} 
                                onChangeText={this.onChangeMemberId}
                            /></View>
                            <TouchableOpacity style={styles.iconStyle} onPress={this.onPressInfo}>
                                <Icon {...icon} size={setFontSize(20)} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.calendermargin}>
                        <Calendar
                                style={styles.calenderheight}
                                label="Date Of Birth"
                                date={this.state.searchData.dob && this.state.searchData.dob!=='' ? this.state.searchData.dob : null}
                                maxDate={new Date()}
                                placeholder="Select date"
                                textStyle={styles.calendertext}
                                placeHolderTextStyle={styles.calendertext}
                                onDateChange={this.dateChanged}
                                disabled={this.props.patientProfiles && this.props.patientProfiles.length > 0}
                                dateText={styles.dateText}
                                keyValue={this.state.searchData.dob!==''?"0":"1"}  />
                           
                            <View style={styles.line}/>
                        </View>
                        {

    this.props.patientProfiles && !this.props.patientProfiles.length > 0 && 
                            this.state.searchData.planId &&
                            this.state.searchData.planId !== -1 &&
                            this.state.searchData.lastname !== '' &&
                            this.state.searchData.memberId !== '' &&
                            this.state.searchData.dob &&
                            <TouchableHighlight
                                style={styles.button}
                                onPress={this.searchPatient}
                            >
                                <Text style={styles.common}>Search</Text>
                            </TouchableHighlight>
                        }
                        {this.props.isMemberAddFailed &&
                <CoreoText 
                  style={styles.errormessage}
                >
                {this.state.defaultErrorMsg}
                </CoreoText>
              }
                        {
                            this.props.patientProfiles && this.props.patientProfiles.length > 0 &&
                            <View style={styles.resulttitle}>
                                <Text style={styles.title}>Select the Individual Profile</Text>
                                <View style={styles.listmargin}>{memberList}</View>

                                <View style={styles.supportView}><Text style={styles.support}>Did not find your profile? <Link onPress={this.resetData}>Click here</Link> to reset details or Contact <Link onPress={() => {this.props.goToHelp()}}>Support</Link></Text></View>
                            </View>
                        }
                        {   (this.props.patientProfiles && this.props.patientProfiles.length <= 0 && this.props.isSearchMembersCompleted) &&
                            <View style={styles.messageview}>
                                <Image
                                    style={styles.icon}
                                    source={error}
                                />
                                <Text style={styles.errormessage}>No search results found. Please contact Support at +121323472343 if you believe this is a mistake.</Text>
                            </View>
                        }

                        {
                            this.props.patientProfiles && this.props.patientProfiles.length > 0
                                ?
                                <View style={[styles.sidemargin, styles.relationview]}>
                                    <Text style={styles.title}>Select your relationship with the Primary Member</Text>
                                    <Select
                                        placeholder='Select Relationship'
                                        selectedValue={this.state.relationshipId}
                                        enabled={true}
                                        style={styles.planstyle}
                                        onValueChange={(value) => { this.setState({ relationshipId: value ,selectedData:{...this.state.selectedData,
                                            relationShipId:value}}); }}
                                        dataArray={relationshipOptions} />
                                    <View style={styles.line} />
                                </View>
                                :null

                        }
                    </View>
                </CoreoWizScreen>
                <ModalPopup
                    visible={this.state.showModal}
                    primaryButton="CONFIRM"
                    secondaryButton="CANCEL"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={() => {
                        this.setState({
                            showModal: !this.state.showModal,
                        });
                        this.props.onClickNext({ profileData: this.state.selectedData, searchData: this.state.searchData }, this.onFailure)
                    }}
                    onCancel={() =>
                        this.setState({
                            showModal: !this.state.showModal
                        })}
                >
                    <Text style={styles.message}>You have selected <Text style={{color: '#4f236b'}}>{this.state.selectedData && (this.state.selectedData.firstName + ' ' + this.state.selectedData.lastName)}</Text>. Are you sure you want to continue with this profile?</Text>
                </ModalPopup>
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
                    <Text style={styles.message}>Do you want to cancel the onboarding process?</Text>
                </ModalPopup>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isPopUpViewOpen}
                >

                        <TouchableOpacity onPress={() => this.setState({isPopUpViewOpen: false})} style={styles.transparentContainer} >
                            <PopUpView image = {selectedPlanId === 1 ? Medicaide : (selectedPlanId === 2 ? Commercial :(selectedPlanId === 3 ? Medicare : Not_in_List))  } />
                        </TouchableOpacity>
                </Modal>
                </OverlayLoaderWrapper>
            </ScreenCover>
          
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onClickCancel: () => dispatch(onCancelClick()),
        onClickNext: (data, onFailure) => dispatch(onNextClick(data, onFailure)),
        getPlans: () => dispatch(getPlans()),
        searchPatient: (data) => dispatch(searchMembers(data)),
        resetMemberDetails: () => dispatch(resetClick()),
        formDirty: () => dispatch(formDirty()),
        getRelationship: () => dispatch(getRelationship()),
        goToHelp: () => dispatch(navigateToScreenMainStack(PATH?PATH.HELP: null)),
    }
}

function mapStateToProps(state) {
    let onboardingState = state.onboardingState;
    return {
        plans: onboardingState && state.onboardingState.memberDetailsState.plans,
        patientProfiles: onboardingState && state.onboardingState.memberDetailsState.patientProfiles,
        patientProfile: onboardingState && state.onboardingState.memberDetailsState.profileData,
        isLoading: state.loadingState && state.loadingState.isLoading,
        isSearchMembersCompleted: onboardingState && state.onboardingState.memberDetailsState.searchMembersSuccess ||
                    onboardingState &&  state.onboardingState.memberDetailsState.searchMembersError,
        planId: onboardingState && state.onboardingState.memberDetailsState.planId,
        relationShipId: onboardingState && state.onboardingState.memberDetailsState.relationShipId,
        lastname: onboardingState && state.onboardingState.memberDetailsState.lastName,
        memberId: onboardingState && state.onboardingState.memberDetailsState.memberId,
        dob: onboardingState && state.onboardingState.memberDetailsState.dob,
        profileType: onboardingState && state.onboardingState.profileTypeState.profileType,
        selectedRelationValue: onboardingState && state.onboardingState.profileTypeState.selectedRelationValue,
        relationship: onboardingState && state.onboardingState.addGuardianState.relationship,
        isMemberAddFailed: onboardingState && state.onboardingState.memberDetailsState.createPatientError,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetails);
