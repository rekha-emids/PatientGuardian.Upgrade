import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { connect } from 'react-redux';
import ParticipantsList from '../Components/ParticipantSelect'
import Search from '../Components/SearchBar/search'
import {
  gotoConversationSummary,
  getLinkedParticipantsByPatients,
  getLinkedPatients,
  onCreateNewConversation,
  setLinkedPatients,
  getCareTeamIndividualsList,
} from '../../../redux/asyncMessages/actions';
import { Select, ModalPopup, CoreoFloatingInput } from '../../../components';
import AsyncStyle from './newConStyle';
import { SafeView, Navbar } from '../../../components/LevelOne';
import { USER_TYPES, NO_RESULTS_FOUND, NO_ADDITIONAL_PARTICIPANTS_CONVERSATION } from '../../../constants/constants';
import { getSelectedPatientInfo, getUserInfo, getCareTeamId } from '../../../utils/userUtil';
import { onBack } from '../../../redux/navigation/actions';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import ErrorBoundaryHOC from '../../../ErrorBoundaryHOC';
import DismissKeybaord from '../../../components/LevelOne/DismissKeyboard';
import { normalizeData, isEqualArray } from '../../../utils/appUtils';

let participantsSelected = [];
let dataList = [];

class NewConversation extends Component {

  state = {
    individualId: null,
    selectedParticipants: [],
    title: '',
    search: '',
    searchText: '',
    selectedPatientDetails: {},
    participantList: [],
    showModalOnCancel: false,
    isIpad: false
  };

  apiCall = () => {
    let conversationId = this.props.conversation && this.props.conversation.conversationId ? this.props.conversation.conversationId : 0;
    let userType = this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.PATIENT : this.props.loggedInUser && this.props.loggedInUser.userType
    if (getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM &&
      (getSelectedPatientInfo().userType === USER_TYPES.PATIENT
        || getSelectedPatientInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN)) {
      let data = {
        patientId: getSelectedPatientInfo().patientId,
        conversationId: conversationId,
        searchText: this.state.searchText,
        participantType: userType,
        userId: getUserInfo().userId,
        userType
      };
      this.props.getLinkedParticipantsByPatients(data);
    } else if (getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM) {
      if (this.state.searchText && this.state.searchText.length) {
        let data = {
          patientId: this.state.individualId,
          conversationId: conversationId,
          searchText: this.state.searchText,
          participantType: getUserInfo().userType,
          userId: getUserInfo().userId,
          userType
        };
        this.props.getLinkedParticipantsByPatients(data);
      }
      else {
        this.props.getCareTeamIndividualsList()
        this.state.individualId && this.onSelectPatient(this.state.individualId);
      }
    } else if (getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN ||
      getUserInfo() && getUserInfo().userType === USER_TYPES.GUARDIAN) {
      let data = {
        patientId: getSelectedPatientInfo().patientId,
        conversationId: conversationId,
        searchText: this.state.searchText,
        participantType: userType,
        userId: getUserInfo().userId,
        userType
      };
      this.props.getLinkedParticipantsByPatients(data);
    };


    if (this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.PATIENT) {
      let data = {
        patientId: this.props.loggedInUser.patientId,
        conversationId: conversationId,
        searchText: this.state.searchText,
        participantType: userType,
        userId: this.props.loggedInUser.userId,
        userType
      };
      this.props.getLinkedParticipantsByPatients(data);
    };

    //Guardian/Careteam with Patient impersonation
    if ((getUserInfo() && getUserInfo().userType === USER_TYPES.GUARDIAN || getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM)
      && getSelectedPatientInfo().userType === USER_TYPES.PATIENT) {
      let data = {
        patientId: getSelectedPatientInfo().patientId,
        conversationId: conversationId,
        searchText: this.state.searchText,
        participantType: userType,
        userId: getUserInfo().userId,
        userType
      };
      this.props.getLinkedParticipantsByPatients(data);
    };

    //IG with Patient imperosnation
    if (getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN
      && getSelectedPatientInfo().userType === USER_TYPES.PATIENT) {
      let data = {
        patientId: getSelectedPatientInfo().patientId,
        conversationId: conversationId,
        searchText: this.state.searchText,
        participantType: USER_TYPES.GUARDIAN,
        userId: getUserInfo().userId,
        userType
      };
      this.props.getLinkedParticipantsByPatients(data);
    }

  }

  componentDidMount() {
    this.apiCall()

  };

  componentWillReceiveProps(nextProps) {
    let normalizedUpdatedData = normalizeData(nextProps.linkedParticipants, "userId")
    let normalizedPrevData = normalizeData(this.state.participantList, "userId")
    let updatedDataUserIds = Object.keys(normalizedUpdatedData)
    let prevDataUserIds = Object.keys(normalizedPrevData)
    if (!isEqualArray(updatedDataUserIds, prevDataUserIds)) {
      this.setState({
        participantList: nextProps.linkedParticipants
      })
    }
  }

  updateSelected = (index, item) => {
    let participantData = this.state.participantList;
    if (item.hasOwnProperty('selected')) {
      item.selected = !item.selected;
    } else {
      item.selected = true;
    }
    participantData[index] = item;
    this.setState({ participantList: participantData });

    let position = participantsSelected.indexOf(item.userId);
    if (item.selected && position === -1) {
      participantsSelected.push(item.userId);
      dataList.push({
        userId: item.userId,
        participantType: item.participantType,
        participantId: item.participantId
      });
    }
    if (!item.selected && position > -1) {
      participantsSelected.splice(position, 1);
      dataList.splice(position, 1);
    }
  };

  onSearchTextChange = (value) => {
    this.setState({ searchText: value }, this.apiCall);
  };

  onCreateConversation = () => {
    let context = getSelectedPatientInfo() && getSelectedPatientInfo().patientId;
    if (this.state.selectedPatientDetails && this.state.selectedPatientDetails.userId) {
      context = this.state.selectedPatientDetails.userId;
    }
    let conversationData = {
      participantList: dataList,
      title: this.state.title.trim(),
      context: this.state.individualId || context
    };
    participantsSelected = [];
    dataList = [];
    this.setState({ participantList: [] })
    this.props.createNewConversation(conversationData);
  };


  onSelectPatient = (patientId) => {
    this.setState({ individualId: patientId });
    participantsSelected = [];
    let userId = this.props.loggedInUser && this.props.loggedInUser.userId;
    let userType = this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.PATIENT ? USER_TYPES.GUARDIAN : this.props.loggedInUser && this.props.loggedInUser.userType;
    let participantId = this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM ? getCareTeamId() : this.props.loggedInUser && this.props.loggedInUser.patientId;
    dataList = [];
    let patientData = {
      userId: userId,
      participantType: USER_TYPES.PATIENT,
      participantId: participantId
    };
    this.setState({ selectedPatientDetails: patientData, participantList: [] });
    let data = {
      userId: userId,
      participantType: userType,
      searchText: this.state.searchText,
      patientId: patientId,
      userType: USER_TYPES.PATIENT,
      conversationId: this.props.conversation.conversationId ? this.props.conversation.conversationId : 0
    };
    this.props.getLinkedParticipantsByPatients(data);
  };

  formatLinkedPatients = () => {
    let data = [];
    this.props.linkedPatients.map((patient) => {
      patientData = {
        label: patient && (patient.firstName + " " + patient.lastName),
        value: patient && patient.userId,
        image: patient && patient.thumbNail || ""
      }
      data.push(patientData);
    });
    return data;
  };
  onBackButton = () => {
    participantsSelected = [];
    dataList = [];
    this.setState({ showModalOnCancel: false })
    this.props.onBack()
  };

  emptyView = () => {
    return (
      <View style={AsyncStyle.textWrapper}>
        <Text style={AsyncStyle.emptyText}>{this.state.searchText ? NO_RESULTS_FOUND : NO_ADDITIONAL_PARTICIPANTS_CONVERSATION}</Text>
      </View>
    )
  }
  participantsListSelection = (index, item) => {
    this.updateSelected(index, item)
  }
  onChangeTextInput = (text) => this.setState({ title: text })
  onPressSelect = () => Keyboard.dismiss()
  onClearTextSearch = () => { this.onSearchTextChange("") }
  render() {
    let contextDropDownDisplay = false;
    if (getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM && getSelectedPatientInfo().userType !== USER_TYPES.INDIVIDUAL_GUARDIAN && getSelectedPatientInfo().userType !== USER_TYPES.GUARDIAN && getSelectedPatientInfo().userType !== USER_TYPES.PATIENT) {
      contextDropDownDisplay = true
    }
    let individualsList = [];
    if (this.props.linkedPatients && this.props.linkedPatients.length > 0) {
      individualsList = [
        ...individualsList,
        ...this.formatLinkedPatients()
      ];
    }
    let participants = this.state.participantList && this.state.participantList.map((participant, i) => {

      for (let j = 0; j < participantsSelected.length; j++) {
        if (participantsSelected[j] === participant.userId) {
          participant.selected = true;
        }
      }
      return (
        <ParticipantsList
          item={participant}
          onSelection={this.participantsListSelection}
          index={i}
        />
      );
    });

    let individualsData = [{ label: "Select inividual", value: "" }];
    if (this.props.linkedPatients && this.props.linkedPatients.length > 0) {
      individualsData = this.formatLinkedPatients();
    }
    let showSave = dataList.length > 0
    let isLoading = isAPIFetching(this.props.loadingStatus)
    return (
      <SafeView>
        <OverlayLoaderWrapper style={{ flex: 1 }} isLoading={isLoading}>
          <View style={AsyncStyle.wrapperView}>
            <Navbar title="New Conversation" showSave={showSave} key={showSave} onCheckClick={participantsSelected.length ? this.onCreateConversation : null} />
            <DismissKeybaord>
              <View style={AsyncStyle.topContainerOne}>
                <CoreoFloatingInput
                  label="Title"
                  maxLength={100}
                  value={this.state.title}
                  onChangeText={this.onChangeTextInput}
                />
                {
                  contextDropDownDisplay ?
                    <View style={AsyncStyle.topContainer}>
                      {/* <Text style={AsyncStyle.pickerTitle}>Select Individual</Text> */}
                      <Select
                        placeholder='Select Individual'
                        selectedValue={this.state.individualId}
                        enabled={true}
                        style={AsyncStyle.planstyle}
                        onValueChange={
                          this.onSelectPatient
                        }
                        onPress={this.onPressSelect}
                        dataArray={individualsList} />
                    </View> : null
                }
              </View>
            </DismissKeybaord>
            <View style={AsyncStyle.topContainerTwo}>
              <Text style={AsyncStyle.addPtext}>Add Participants</Text>
              <View style={AsyncStyle.searchBar}>
                <Search
                  onChangeText={this.onSearchTextChange}
                  containerStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }}
                  inputStyle={{ backgroundColor: '#fff' }}
                  placeholder='Search'
                  placeholderTextColor='#ccc'
                  clearIcon
                  value={this.state.searchText}
                  onClearText={this.onClearTextSearch}
                />
              </View>
            </View>
            {
              !isLoading
                ?
                (
                  this.state.participantList.length > 0
                    ?
                    <ScrollView showsVerticalScrollIndicator={true} style={AsyncStyle.scrollStyle}>
                      {participants}
                    </ScrollView>
                    :
                    getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM ? (this.state.individualId ? this.emptyView() : null) : this.emptyView()

                )
                :
                null

            }

            <ModalPopup
              visible={this.state.showModalOnCancel}
              primaryButton="YES"
              secondaryButton="NO"
              primaryColor="#3c1053"
              secondaryColor="#6c757d"
              onConfirm={this.onBackButton}
              onCancel={() => this.setState({
                showModalOnCancel: !this.state.showModalOnCancel,
              })}
            >
              <Text style={AsyncStyle.message}>Do you want to discard changes?</Text>
            </ModalPopup>
          </View>
        </OverlayLoaderWrapper>
      </SafeView>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return {
    onBack: () => dispatch(onBack()),
    createNewConversation: (data) => dispatch(onCreateNewConversation(data, null, true)),
    gotoConversationSummary: () => dispatch(gotoConversationSummary()),
    getLinkedPatients: () => dispatch(getLinkedPatients()),
    getLinkedParticipantsByPatients: (data) => dispatch(getLinkedParticipantsByPatients(data)),
    setLinkedPatients: () => dispatch(setLinkedPatients()),
    getCareTeamIndividualsList: () => dispatch(getCareTeamIndividualsList()),
  }
};

const mapStateToProps = (state) => {
  return {
    selectedPatientInfo: state.authState && state.authState.userState.selectedPatientInfo,
    loggedInUser: state.authState && state.authState.userState.userInfo,
    linkedPatients: state.asyncMessageState && state.asyncMessageState.linkedPatients,
    linkedParticipants: state.asyncMessageState && state.asyncMessageState.linkedParticipants,
    conversation: state.asyncMessageState && state.asyncMessageState.conversation,
    loadingStatus: state.asyncMessageState && state.asyncMessageState.isLoading

  };
};

export default ErrorBoundaryHOC(connect(mapStateToProps, mapDispatchToProps)(NewConversation));