import React, { Component } from "react";
import { connect } from "react-redux";
import { onBack } from "../../../redux/navigation/actions";
import moment from "moment";
import { Text, View, Image, TouchableHighlight, Modal, TouchableOpacity } from "react-native";
import {
  
  CoreoWizScreen,
  
  Select,
  Calendar,
  InfoList,
  Link,
  ModalPopup,
  
  CoreoFloatingInput,
  CoreoText,
  PopUpView,
} from "../../../components";
import {
  onNextClick,
  onCancelClick,
  onPreviousClick,
  resetClick,
  getPlans,
  searchMembers,
  formDirty
} from "../../../redux/manageConnection/MemberDetailsForMC/actions";
import {getManageConnection, goToManageConnection} from '../../../redux/manageConnection/ManageConnectionData/actions'
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';
import {PATH} from '../../../routes/index.js'
import { checkSpace, checkTextNotStartWithNumber, checkSpecialCharecter, _ } from "../../../utils/validations";
import { MENUS, BUTTONS } from "../../../constants/config";
import { UserProfileType, USER_TYPES, BLOCED_RELATION_SHIPS } from "../../../constants/constants";
import { PatientNavigationData } from "../../../data/PatientNavigationData";
import { GuardianNavigationData } from "../../../data/GuardianNavigationData";
import styles from "./styles";
import { error, Commercial, Medicare, Medicaide, Not_in_List } from "../../../assets/images";
import {Navbar, SafeView} from "../../../components/LevelOne";
import {getRelationship} from '../../../redux/onboarding/AddGuardian/actions';
import { OverlayLoaderWrapper } from "../../../components/Base/Preloader/Preloader";
import { isAPIFetching } from "../../../utils/AppAPIUtils";
import { isIOS } from "../../../utils/appUtils";
import Icon from "../../../components/Base/Icon";
import { setFontSize } from "../../../utils/deviceDimensions";
import Icons from "../../../assets/Icons";
import { getUserInfo } from "../../../utils/userUtil";

const initialState = {
  searchData: {
    lastname: "",
    memberId: "",
    dob: null,
    planId: null
  },
  showModal: false,
  selectedData: {
    mpi: "",
    firstName: "",
    lastName: "",
    memberId: "",
    dob: null,
    gender: ""
  },
  showModalOnCancel: false,
  showModalOnPrevious: false,
  dobValid: true,
  isSearchCriteriaValid: true,
  relationShipId: 0,
  errorMsg:null,
  defaultErrorMsg: "",
  isRelationshipInvalid: false,
  isLastNameValid: true,
  isMemberIDValid: true,
  isPopUpViewOpen: false
}

class AddMemberDetails extends Component {
  constructor(props) {
    super(props);
    this.state = initialState
  }

  componentDidMount() {
    // this.setState({
    //   selectedData: this.props.patientProfile,
    //   searchData: {
    //     lastname: this.props.lastname,
    //     memberId: this.props.memberId,
    //     dob: this.props.dob,
    //     planId: this.props.planId
    //   }
    // });
    this.props.getPlans();
    this.props.getRelationship();
  }


  resetData =  () => {
    this.setState({
      searchData: {
        lastname: "",
        memberId: "",
        dob: null,
        planId: null
      },
      selectedData: {
        mpi: "",
        firstName: "",
        lastName: "",
        memberId: "",
        dob: null,
        gender: ""
      },
      defaultErrorMsg : "",
      relationShipId:0
    },()=>{
      this.props.resetMemberDetails()
    });
    
  };

  onChangeRelationship = (value) => {
    this.setState({ searchData: { ...this.state.searchData, relationShipId: value }, isRelationshipInvalid: false });
    this.props.formDirty();
}

  dateChanged = date => {
    const formattedDate = date
      ? moment(new Date(date.toString()),"MM/DD/YYYY")
      : null;
    this.setState({
      searchData: { ...this.state.searchData, dob: formattedDate },
      dobValid: true
    });
    this.props.formDirty();
  };

  onChangePlan = (value, index) => {
    this.setState({ searchData: { ...this.state.searchData, planId: value } });
    this.props.formDirty();
  };

  // onChangeLastName = value => {
  //   this.setState({
  //     searchData: { ...this.state.searchData, lastname: value }
  //   });
  //   this.props.formDirty();
  // };

  onChangeLastName =(value)=>{
       let isLastNameValid = true
       if(value !== '' && !checkTextNotStartWithNumber(value)){
          isLastNameValid = false
       }
       this.setState({searchData: { ...this.state.searchData, lastname: value }, isLastNameValid });
  }

  onFailure = (data) => {
    this.setState({defaultErrorMsg: data})
  }

  onChangeMemberId = value =>{
    this.setState({ memberId: value },()=>{
       if(this.state.memberId !== '' && !checkSpecialCharecter(this.state.memberId)){
           this.setState({ isMemberIDValid: false });
       }else{
           this.setState({ isMemberIDValid: true,  searchData: { ...this.state.searchData, memberId: value } });
       }
    }); 
  }

  onClickPreviousBtn = () => {
    this.setState({
      showModalOnPrevious: !this.state.showModalOnPrevious
    });
    this.props.resetMemberDetails();
    this.props.onClickPrevious();
    this.props.goBack()
  };

  searchPatient = () => {
    if (
      this.state.searchData.planId === null ||
      this.state.searchData.memberId === "" ||
      this.state.searchData.lastname === "" ||
      this.state.searchData.dob === null ||
      !this.state.dobValid
    ) {
      if (!this.state.dobValid) {
        this.setState({ searchData: { ...this.state.searchData, dob: null } });
      }
      this.setState({ isSearchCriteriaValid: false });
    } else {
      this.setState({ isSearchCriteriaValid: true });
      this.props.searchPatient(this.state.searchData);
    }
  };

  checkValidation=()=>{
    const {mpi} =this.state.selectedData
    const {relationShipId} = this.state
    if(relationShipId && !_.isEmpty(mpi) && relationShipId!== -1){
            return false
    }
    return true
}

onPressSupport = () => {
  this.props.goToHelp();
}

onPressInfo = () =>{
  this.setState({isPopUpViewOpen:true})
}

  render() {
    __DEV__ && console.log("ADD MEMBER DETAIL RENDER")
    const menus = [MENUS.CONTACT];
    const footerButtons = [BUTTONS.CANCEL, BUTTONS.ADD];
    let icon = Icons.infoCircleAndroid
    if(isIOS()){
        icon = Icons.infoCircleIos
    }
    let planOptions = this.props.plans && this.props.plans.map((plan, i) => {
      return {
        label: plan.planType,
        value: plan.planId
      };
    });

    let relationshipOptions = this.props.relationship && this.props.relationship.map((item) => {
      item.label = item.name;
      item.value = item.id;
      return item;
  })

  if(getUserInfo() && getUserInfo().userType === USER_TYPES.PATIENT){
    relationshipOptions = relationshipOptions && relationshipOptions.filter(relation => BLOCED_RELATION_SHIPS.indexOf(relation.value) === -1)
  }

    const memberOptions = this.props.patientProfiles && this.props.patientProfiles.map((item, i) => {
      item.id = item.mpi;
      return item;
    });

    const memberList = memberOptions && memberOptions.map(member => {
      member.selected = this.state.selectedData.mpi === member.mpi;
      return (
        <InfoList
          profile={member}
          onSelectProfile={() => {
            this.setState({
              selectedData: {
                ...this.state.selectedData,
                mpi: member.mpi,
                firstName: member.firstName,
                lastName: member.lastName,
                dob: member.dob,
                gender: member.gender,
                memberId: member.memberId,
                relationshipId: this.props.relationshipData.selectedRelationId
              }
            });
          }}
        />
      );
    });

    const NavigationData =
      this.props.profileType === UserProfileType.Individual
        ? PatientNavigationData
        : GuardianNavigationData;
    const user =
    !this.props.relationshipData || this.props.relationshipData.selectedRelationValue === undefined
        ? `Member's`
        : `${this.props.relationshipData.selectedRelationValue}'s`;
    

    const {getRelationshipStatus,getManageConnectionStatus,searchMemberStatus} = this.props
    let selectedPlanId = this.state.searchData.planId
    return (
      <SafeView>
        <View style={{flex:1}}>
        <Navbar title="Add an Individual" showBackButton={true} showEmptyAdd />
      <OverlayLoaderWrapper isLoading={isAPIFetching(getRelationshipStatus,getManageConnectionStatus,searchMemberStatus)}>
        {/* <View style={styles.HeaderContainer}>
          <View style={styles.subContainer}>
            <View style={styles.contentCenter}>
              <CoreoText style={styles.fontLarge}>Add an Individual</CoreoText>
            </View>
          </View>
        </View> */}
        <CoreoWizScreen
          menus={menus}
          footerButtons={footerButtons}
          isNextDisabled={this.checkValidation()}
          hideKeyboardHeight={!isIOS()}
          keyboardProps={{keyboardShouldPersistTaps: "always"}}
          onNextClick={() =>
            this.setState({
              showModal: true
            })
          }
          onCancelClick={() =>
            this.setState({
              showModalOnCancel: true
            })
          }
        >
          <View style={styles.container}>
            <Text style={[styles.title, styles.fontfamily]}>
              Select your plan
            </Text>
            <View style={styles.planmargin}>
              <Select
                placeholder="Select Plan"
                selectedValue={this.state.searchData.planId}
                enabled={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                style={styles.planstyle}
                onValueChange={this.onChangePlan}
                dataArray={planOptions}
              />
              <View style={styles.line} />
            </View>
            <View style={styles.detailsmargin}>
              <Text style={styles.title}>Enter {user} Details</Text>
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
            <View style={styles.errorview}>
                                {!this.state.isLastNameValid && (!checkTextNotStartWithNumber(this.state.searchData.lastname)) &&
                                    <CoreoText style={styles.errormessage}>
                                        Please enter valid Last Name
                                    </CoreoText>
                                }
                            </View>
            <View style={styles.memberstyle}>
              <CoreoFloatingInput
                label="Member ID"
                editable={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                maxLength={50}
                value={checkSpace(this.state.searchData.memberId)}
                onChangeText={this.onChangeMemberId}
              />
              <TouchableOpacity style={styles.iconStyle} onPress={this.onPressInfo}>
                  <Icon {...icon} size={setFontSize(20)} />
              </TouchableOpacity>
            </View>
            <View style={styles.errorview}>
                                {!this.state.isMemberIDValid && (!checkSpecialCharecter(this.state.memberId)) &&
                                    <CoreoText style={styles.errormessage}>
                                        Please enter valid Member ID
                                    </CoreoText>
                                }
                            </View>
            <View style={styles.calendermargin}>
              <Calendar
                disabled={this.props.patientProfiles && this.props.patientProfiles.length <= 0}
                style={styles.calenderheight}
                label="Date Of Birth"
                date={this.state.searchData.dob && this.state.searchData.dob!=='' ?this.state.searchData.dob:null}
                maxDate={new Date()}
                placeholder="Select date"
                textStyle={styles.calendertext}
                placeHolderTextStyle={styles.calendertext}
                onDateChange={this.dateChanged}
                disabled={this.props.patientProfiles && this.props.patientProfiles.length > 0}
              />
              <View style={styles.line} />
            </View>
            {this.props.patientProfiles && !this.props.patientProfiles.length > 0 &&
              this.state.searchData.planId &&
              this.state.searchData.lastname !== "" &&
              this.state.searchData.memberId !== "" &&
              this.state.isLastNameValid && 
              this.state.isMemberIDValid &&
              this.state.searchData.dob && (
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.searchPatient}
                >
                  <Text style={styles.common}>Search</Text>
                </TouchableHighlight>
              )}
               {this.props.isMemberAddFailed &&
                <CoreoText 
                  style={styles.errormessage}
                >
                {this.state.defaultErrorMsg}
                </CoreoText>
              }
            {this.props.patientProfiles && this.props.patientProfiles.length > 0 && (
              <View style={styles.resulttitle}>
                <Text style={styles.title}>Select the Individual Profile</Text>
                <View style={styles.listmargin}>{memberList}</View>
                <View style={styles.supportView}>
                  <Text style={styles.support}>
                    Did not find your profile?{" "}
                    <Link onPress={this.resetData}>Click here</Link> to reset
                    details or Contact <Link onPress={this.onPressSupport}>Support</Link>
                  </Text>
                </View>
              </View>
            )}
            
            {this.props.patientProfiles && this.props.patientProfiles.length <= 0 &&
              this.props.isSearchMembersCompleted && (
                <View style={styles.messageview}>
                  <Image style={styles.icon} source={error} />
                  <Text style={[styles.errormessage, styles.marginLeft]}>
                    No search results found. Please contact Support at
                    +121323472343 if you believe this is a mistake.
                  </Text>
                </View>
              )}
              {
                            this.props.patientProfiles && this.props.patientProfiles.length > 0
                                ?
                                <View style={[styles.sidemargin, styles.relationview]}>
                                    <Text style={styles.title}>Select your relationship with the Primary Member</Text>
                                    <Select
                                        placeholder='Select Relationship'
                                        selectedValue={this.state.relationShipId}
                                        enabled={true}
                                        style={styles.planstyle}
                                        onValueChange={(value) => { 
                                        this.setState({ relationShipId: value }); }}
                                        dataArray={relationshipOptions} />
                                    <View style={styles.line} />
                                </View>
                                :
                                null

                        }
          </View>
        </CoreoWizScreen>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isPopUpViewOpen}
          >
            <TouchableOpacity onPress={() => this.setState({isPopUpViewOpen: false})} style={styles.transparentContainer} >
                <PopUpView image = {selectedPlanId === 1 ? Medicaide : (selectedPlanId === 2 ? Commercial :(selectedPlanId === 3 ? Medicare : Not_in_List))  } />
            </TouchableOpacity>
          </Modal>
        <ModalPopup
          visible={this.state.showModal}
          primaryButton="CONFIRM"
          secondaryButton="CANCEL"
          primaryColor="#3c1053"
          secondaryColor="#6c757d"
          customBtnFlag="true"
          onConfirm={() => {
            this.setState({showModal: !this.state.showModal});
            this.props.onClickNext({
              profileData: this.state.selectedData,
              searchData: this.state.searchData
            }, this.onFailure);
          }}
          onCancel={() =>
            this.setState({
              showModal: !this.state.showModal
            })
          }
        >
          <Text style={styles.message}>
            You have selected{" "}
            <Text style={{ color: "#4f236b" }}>
              {this.state.selectedData.firstName +
                " " +
                this.state.selectedData.lastName}
            </Text>
            . Are you sure you want to continue with this profile?
          </Text>
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
              
            });
            this.resetData();
            this.props.goBack()
          }}
          onCancel={() =>
            this.setState({
              showModalOnCancel: !this.state.showModalOnCancel
            })
          }
        >
          <Text style={styles.message}>
          Do you want to cancel the Onboarding process?
          </Text>
        </ModalPopup>
        <ModalPopup
          visible={this.state.showModalOnPrevious}
          primaryButton="YES"
          secondaryButton="NO"
          primaryColor="#3c1053"
          secondaryColor="#6c757d"
          onConfirm={() => this.onClickPreviousBtn()}
          onCancel={() =>
            this.setState({
              showModalOnPrevious: !this.state.showModalOnPrevious
            })
          }
        >
          <Text style={styles.message}>Do you want to discard changes?</Text>
        </ModalPopup>
      </OverlayLoaderWrapper></View>
      </SafeView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onClickCancel: () => dispatch(onCancelClick()),
    onClickNext: (data, onFailure) => dispatch(onNextClick(data, onFailure)),
    onClickPrevious: () => dispatch(onPreviousClick()),
    getPlans: () => dispatch(getPlans()),
    searchPatient: data => dispatch(searchMembers(data)),
    resetMemberDetails: () => dispatch(resetClick()),
    formDirty: () => dispatch(formDirty()),
    goBack: () => dispatch(onBack()),
    goToHome: () => dispatch(navigateToScreenMainStack(PATH.HOME_SCREEN)),
    getManageConnection: () => dispatch(getManageConnection()),
    goToMyConnections: () => dispatch(navigateToScreenMainStack(PATH.MANAGE_CONNECTION)),
    getRelationship: () => dispatch(getRelationship()),
    goToHelp: () => dispatch(navigateToScreenMainStack(PATH.HELP)),
    goBack : () => dispatch(onBack()),
    goToManageConnection: () => dispatch(goToManageConnection())
  };
}

function mapStateToProps(state) {
  let manageConnectionState = state.manageConnectionState;
  let onboardingState = state.onboardingState;
  return {
    isMemberAddFailed: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.createPatientError,
    plans: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.plans,
    patientProfiles: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.patientProfiles,
    patientProfile: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.profileData,
    isLoading: state.loadingState && state.loadingState.isLoading,
    isSearchMembersCompleted: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.searchMembersSuccess || manageConnectionState && state.manageConnectionState.memberDetailsForMCState.searchMembersError,
    planId: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.planId,
    lastname: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.lastName,
    memberId: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.memberId,
    dob: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.dob,
    relationShipId: onboardingState && state.onboardingState.memberDetailsState.relationShipId,
    profileType: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.profileType,
    relationshipData: manageConnectionState && state.manageConnectionState.profileTypeSelectionState,
    relationship: onboardingState && state.onboardingState.addGuardianState.relationship,

    getRelationshipStatus: onboardingState && state.onboardingState.addGuardianState.isLoading,
    getManageConnectionStatus: manageConnectionState && state.manageConnectionState.manageConnectionDataState.isLoadingManageConnection,
    searchMemberStatus: manageConnectionState && state.manageConnectionState.memberDetailsForMCState.isLoadingMemberDetails,

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMemberDetails);
