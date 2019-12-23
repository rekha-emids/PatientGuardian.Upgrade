import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import ParticipantsList from '../Components/ParticipantSelect'
import { SafeView } from '../../../components/LevelOne';
import Search from '../Components/SearchBar/search'
import {
    getLinkedParticipantsByPatients,
    createVideoConference,
    GetAllParticipants,
  
    getCareTeamIndividualsList,
    setContext,
    setStartedFromMenuStatus
} from '../../../redux/telehealth/actions';
import { Select, ModalPopup, CoreoHighlightButton, Navbar } from '../../../components';
import {onBack} from '../../../redux/navigation/actions';
import AsyncStyle from './styles';
import {USER_TYPES, NO_RESULTS_FOUND, NO_ADDITIONAL_PARTICIPANTS_CONFERENCE} from '../../../constants/constants';
import KeepAwake from 'react-native-keep-awake';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { getSelectedPatientInfo, getUserInfo } from '../../../utils/userUtil';
import { updateNetworkConnectivity } from '../../../services/OfflineSyncing';

let participantsSelected = [];
let dataList = [];

class StartVideoConference extends Component {
  static navigationOptions = () => {
    return {
        tabBarOnPress({navigation, defaultHandler}) {
            if (navigation.isFocused()) {
                return;
              }
              navigation && navigation.state && navigation.state.params && navigation.state.params.onTabFocus && navigation.state.params.onTabFocus();
            defaultHandler && defaultHandler()
        }
    }
  } 

  IS_COMPONENT_MOUNTED = false
  constructor(props){
    super(props)
    props.navigation && props.navigation.setParams && props.navigation.setParams({
      onTabFocus: this.handleTabFocus
    });
    this.state = {
      individualId: null,
      title: '',
      search: '',
      searchText: '',
      selectedPatientDetails: {},
      participantList: [],
      showModalOnCancel: false,
      isIpad: false
    };
  }

  handleTabFocus = () => {
    if(this.IS_COMPONENT_MOUNTED && this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM){
        this.apiCall()
    }
  };

  apiCall = () => {
    if (this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM && 
      (this.props.selectedPatientInfo.userType === USER_TYPES.PATIENT || this.props.selectedPatientInfo.userType === USER_TYPES.INDIVIDUAL_GUARDIAN)) {
        let data = {
          patientId: this.props.selectedPatientInfo.patientId
        }
        this.props.getLinkedParticipantsByPatients(data, updateNetworkConnectivity);
    } else if (this.props.loggedInUser.userType=== USER_TYPES.CARE_TEAM) {
        this.props.getCareTeamIndividualsList();
    } else if (this.props.loggedInUser.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ||
      this.props.loggedInUser.userType === USER_TYPES.GUARDIAN) {
        let data = {
          patientId: this.props.selectedPatientInfo.patientId
        }
        this.props.getLinkedParticipantsByPatients(data, updateNetworkConnectivity);
    }else{
      let data = {
        patientId: this.props.loggedInUser.patientId,
        searchText: this.state.searchText,
        participantType: this.props.loggedInUser.userType,
        userId: this.props.loggedInUser.userId,
        conversationId:0
      };
      this.props.setContext(this.props.loggedInUser.patientId)
      this.props.getLinkedParticipantsByPatients(data, updateNetworkConnectivity);
    }
  }
  componentDidMount() {
        this.requestCameraPermission()
        this.apiCall()
        this.IS_COMPONENT_MOUNTED = true
  }

  componentWillUnmount(){
    participantsSelected=[]
  }

  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO],
        {
          title: 'Audio Permission',
          message: 'Allow camera permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      const permissionGranted = PermissionsAndroid.RESULTS.GRANTED;
      if (granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === permissionGranted && granted[PermissionsAndroid.PERMISSIONS.CAMERA] === permissionGranted) {
      } else {
        this.props.goBackFromVideoConference();
      }
    } catch (err) {
      __DEV__ && console.log("audio/video permission ",err)
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.linkedParticipants != prevState.participantList) {
      return {
        participantList: nextProps.linkedParticipants
      };
    }
  };

  updateSelected = (index, item) => {
    let participantData = this.state.participantList;
    if (item.hasOwnProperty('selected')) {
      item.selected = !item.selected;
    } else {
      item.selected = true;
    }
    participantData && participantData.length>0?participantData[index] = item:null;
    this.setState({ participantList: participantData });

    let position = participantsSelected.indexOf(item.userId);
    if (item.selected && position === -1) {
      participantsSelected.push(item.userId);
      dataList.push({
        userId: item.userId,
        participantType: item.participantType,
        firstName: item.firstName,
        lastName: item.lastName,
        thumbNail: item.thumbNail,
        participantId: item.participantId
      });
    }
    if (!item.selected && position > -1) {
      participantsSelected.splice(position, 1);
      dataList.splice(position, 1);
    }
  };

  onSearchTextChange = (value) => {
    this.setState({ searchText: value });
    let data = {
      searchText: value,
      contextId: this.state.selectedPatientDetails.length > 0 ? this.state.selectedPatientDetails.userId : null
    };
    this.props.getAllParticipants(data);
  };

  onSelectPatient = (patientId) => {
    this.setState({ individualId: patientId });
    participantsSelected = [];
    dataList = [];
    let patientData = {
      userId: patientId === "" ? 0 : patientId,
      participantType: 'I'
    };
    this.setState({ selectedPatientDetails: patientData, participantList: [] });
    let data = {
      userId: this.props.loggedInUser.userId,
      participantType: this.props.loggedInUser.userType,
      searchText: this.state.searchText,
      patientId: patientId,
      conversationId: 0,
      userType: USER_TYPES.PATIENT
    };
    this.props.setContext(patientId)
    this.props.getLinkedParticipantsByPatients(data, updateNetworkConnectivity);
  };

  formatLinkedPatients = () => {
    let data = [];
    this.props.linkedPatients.map((patient) => {
      patientData = {
        label: patient.firstName + " " + patient.lastName,
        value: patient.userId,
        image: patient.thumbNail ? patient.thumbNail : ""
      }
      data.push(patientData);
    });
    return data;
  };

  onBackButton = () => {
    participantsSelected = [];
    dataList = [];
    this.setState({ showModalOnCancel: false })
    this.props.goBackFromVideoConference();
  };

  onClickBackButton = () => {
    participantsSelected.length ? this.setState({ showModalOnCancel: true }) : this.onBackButton()
  }

  emptyView = () => {
    return (
      <View style={AsyncStyle.textWrapper}>
        <Text style={AsyncStyle.emptyText}>{this.state.searchText ? NO_RESULTS_FOUND : NO_ADDITIONAL_PARTICIPANTS_CONFERENCE}</Text>
      </View>
    )
  }

  onPressCancle = () => this.setState({
    showModalOnCancel: !this.state.showModalOnCancel,
  })

  onPressStartVideoCall = () => {
    this.props.setStartedFromMenuStatus(true)
    this.props.createVideoConference(dataList, () => {
     participantsSelected = [];
     dataList = [];
    this.setState({individualId: null, selectedPatientDetails: {}, participantList: []})
  })}

  render() {
    let individualsList = [];
    if (this.props.linkedPatients && this.props.linkedPatients.length > 0) {
      individualsList = this.formatLinkedPatients();
    }
    let loggedInUserType = this.props.loggedInUser && this.props.loggedInUser.userType
    let selectedPatientInfo = getSelectedPatientInfo()
    let showBackButton = true
    let showDropDown = false
    if(loggedInUserType === USER_TYPES.CARE_TEAM && selectedPatientInfo && selectedPatientInfo.userType !== USER_TYPES.INDIVIDUAL_GUARDIAN && selectedPatientInfo.userType !== USER_TYPES.GUARDIAN && selectedPatientInfo.userType !== USER_TYPES.PATIENT){
      showBackButton = false
      showDropDown = true
    }
    let participants = this.state.participantList && this.state.participantList.map((participant, i) => {
      for (let j = 0; j < participantsSelected.length; j++) {
        if (participantsSelected[j] === participant.userId) {
          participant.selected = true;
        }
      }
      return (
        <View>
        <ParticipantsList
          item={participant}
          onSelection={(index, item) => {
            this.updateSelected(index, item)
          }}
          index={i}
        /></View>
      );
    });
    let isLoading = isAPIFetching(this.props.loadingStatus)
    return (
      <SafeView>
      <KeepAwake />
      <OverlayLoaderWrapper style={{flex: 1}} isLoading={isAPIFetching(this.props.loadingStatus)}>
      <Navbar title="Video Conference" onClickBackButton={this.onClickBackButton} showBackButton={!showBackButton} showEmptyAdd/>
        <View style={AsyncStyle.nCom_contentContainer}>
            {
              showDropDown &&
              <View style={AsyncStyle.topContainerOne}>
                <View style={AsyncStyle.topContainer}>
                  <Text style={AsyncStyle.pickerTitle}>Select Individual</Text>
                  <Select
                      placeholder='Select Individual'
                      selectedValue={this.state.individualId}
                      enabled={true}
                      style={AsyncStyle.planstyle}
                      onValueChange={
                        this.onSelectPatient
                      }
                      dataArray={individualsList} />
                  <Text>Only those related to the selected individual will be potential participants.</Text>
                </View> 
                </View>
              
            }
          <View style={AsyncStyle.topContainerTwo}>
            <Text style={AsyncStyle.addPtext}>Invite Participants</Text>
            <View style={AsyncStyle.searchBar}>
                <Search            
                  onChangeText={this.onSearchTextChange}
                  containerStyle={{backgroundColor:'#fff',borderColor:'transparent'}}
                  inputStyle={{backgroundColor:'#fff'}}
                  placeholder='Find something...'
                  value={this.state.searchText}
                  placeholderTextColor='#fff' />
            </View>
          </View>
          <View style={this.props.loggedInUser && this.props.loggedInUser.userType !== USER_TYPES.PATIENT ? AsyncStyle.ParticipantsListGaurdianContainer : AsyncStyle.ParticipantsListIndividualContainer}>
              {
                !isLoading
                  ?
                  (this.state.participantList && this.state.participantList.length > 0
                    ?
                    <ScrollView showsVerticalScrollIndicator={true} >
                      {participants}
                    </ScrollView>
                    :
                    getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM ? (this.state.individualId ? this.emptyView(): null): this.emptyView()
                      
                  )
                  :
                  null
              }
              </View>
            <CoreoHighlightButton
              style={AsyncStyle.button}
              onPress={this.onPressStartVideoCall}
              textStyle={AsyncStyle.buttonText}
              text="Start Video Call"
              disabled={this.props.linkedParticipants && this.props.linkedParticipants.length <= 0 || participantsSelected.length <= 0}
            />
        </View>      
        <ModalPopup
          visible={this.state.showModalOnCancel}
          primaryButton="YES"
          secondaryButton="NO"
          primaryColor="#3c1053"
          secondaryColor="#6c757d"
          onConfirm={this.onBackButton}
          onCancel={this.onPressCancle}
        >
          <Text style={AsyncStyle.message}>Do you want to discard changes?</Text>
        </ModalPopup> 
        </OverlayLoaderWrapper>
      </SafeView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLinkedParticipantsByPatients: (data, updateNetworkOnResponse) => dispatch(getLinkedParticipantsByPatients(data, updateNetworkOnResponse)),
    createVideoConference: (data, onSuccess) => dispatch(createVideoConference(data,onSuccess)),
    getAllParticipants: (data) => dispatch(GetAllParticipants(data)),
    getCareTeamIndividualsList: () => dispatch(getCareTeamIndividualsList()),
    goBackFromVideoConference: () => dispatch(onBack()),
    setContext: (data) => dispatch(setContext(data)),
    setStartedFromMenuStatus: (data) => dispatch(setStartedFromMenuStatus(data))
  }
}

const mapStateToProps = (state) => {
  let authState = state.authState;
  let telehealthState = state.telehealthState;
  return {
    loggedInUser: authState && state.authState.userState.userInfo,
    selectedPatientInfo: authState && state.authState.userState.selectedPatientInfo,
    linkedPatients: telehealthState && state.telehealthState.linkedPatients,
    linkedParticipants: telehealthState && state.telehealthState.linkedParticipants,
    loadingStatus: telehealthState && state.telehealthState.isLoading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StartVideoConference);
