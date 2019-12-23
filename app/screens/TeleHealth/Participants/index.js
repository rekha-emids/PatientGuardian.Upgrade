import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import ParticipantsList from '../Components/ParticipantSelect'
import Search from '../Components/SearchBar/search'
import {
    getLinkedParticipantsByPatients,
    AddParticipantsToVideoConference
} from '../../../redux/telehealth/actions';
import { ModalPopup, CoreoHighlightButton } from '../../../components';
import { isIpadDevice } from '../../../utils/deviceTypeCheck';
import AsyncStyle from './styles';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';

let participantsSelected = [];
let dataList = [];

class ParticipantsTeleHealth extends Component {

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


  componentDidMount() {
    let loggedInUser = this.props.loggedInUser;
    let data = {
        patientId: loggedInUser && this.props.loggedInUser.userId,
        searchText: this.state.searchText,
        participantType: loggedInUser && this.props.loggedInUser.userType,
        userId: loggedInUser && this.props.loggedInUser.userId,
    };
    this.props.getLinkedParticipantsByPatients(data);
  };
  
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
    participantData && participantData.length>0 ? participantData[index] = item:null;
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
    let data = {};
    if (this.state.selectedPatientDetails && this.state.selectedPatientDetails.userId) {
      data = {
        searchText: value,
        patientId: this.state.selectedPatientDetails.userId,
        conversationId: 0,
        userId: this.props.loggedInUser.userId,
        participantType: this.props.loggedInUser.userType
      };
    }
    if (this.props.loggedInUser.userType === 'I') {
      data = {
        searchText: value,
        patientId: this.props.loggedInUser.userId,
        conversationId: 0,
        userId: this.props.loggedInUser.userId,
        participantType: this.props.loggedInUser.userType
      };
    }
    this.props.getLinkedParticipantsByPatients(data);
  };

  formatLinkedPatients = () => {
    let data = [];
    this.props.linkedPatients && this.props.linkedPatients.map((patient) => {
      patientData = {
        label: patient.firstName + " " + patient.lastName,
        value: patient.userId
      }
      data.push(patientData);
    });
    return data;
  };

  onBackButton = () => {
    participantsSelected = [];
    dataList = [];
    this.setState({ showModalOnCancel: false })
    
  };

  addParticipants = () => {
    this.props.AddParticipantsToVideoConference(participantsSelected);

  }

  onPressBack = () => participantsSelected.length ? this.setState({ showModalOnCancel: true }) : this.onBackButton()

  onPressCancle = () => this.setState({
    showModalOnCancel: !this.state.showModalOnCancel,
  })
  
  render() {
    let participants = this.state.participantList && this.state.participantList.map((participant, i) => {
      for (let j = 0; j < participantsSelected.length; j++) {
        if (participantsSelected[j] === participant.userId) {
          participant.selected = true;
        }
      }
      return (
        <ParticipantsList
          item={participant}
          onSelection={(index, item) => {
            this.updateSelected(index, item)
          }}
          index={i}
        />
      );
    });
    return (
      <View style={AsyncStyle.wrapperView}>
        <OverlayLoaderWrapper style={{flex: 1}} isLoading={isAPIFetching(this.props.loadingStatus)}>
        <View style={AsyncStyle.nCom_headerContainer}>
          <View style={AsyncStyle.nCom_headerLeftWrap}>
          <TouchableOpacity
              onPress={this.onPressBack}
            >
              <Image
                style={AsyncStyle.headerRightIcons}
                source={require('../../../assets/images/TeleHealth/back.png')}
                resizeMode="contain"
                on
              />
            </TouchableOpacity>
          </View>
          <View style={AsyncStyle.nCom_headerMidWrap}>
            <Text style={isIpadDevice ? AsyncStyle.nCom_HeaderTextLd : AsyncStyle.nCom_HeaderTextSd}> Invite Participants</Text>
            <View style={AsyncStyle.searchBar}>
                <Search            
                  onChangeText={this.onSearchTextChange}
                  containerStyle={{backgroundColor:'#fff',borderColor:'transparent'}}
                  inputStyle={{backgroundColor:'#fff'}}
                  placeholder='Search'
                  value={this.state.searchText}
                  placeholderTextColor='#fff' />
            </View>
          </View>
        </View>
        <View style={AsyncStyle.nCom_contentContainer}>
          <View style={AsyncStyle.ParticipantsListContainer}>
            <ScrollView showsVerticalScrollIndicator={true} >
              {participants}
            </ScrollView>
            <CoreoHighlightButton
              style={AsyncStyle.button}
              onPress={this.addParticipants}
              textStyle={AsyncStyle.buttonText}
              text="Done"
              disabled={participantsSelected.length <= 0}
            />
          </View>
        </View>        
        <ModalPopup
          visible={this.state.showModalOnCancel}
          primaryButton="YES"
          secondaryButton="NO"
          primaryColor="#3c1053"
          secondaryColor="#6c757d"
          onConfirm={this.onBackButton}
          onCancel={this.onPressCancel}
        >
          <Text style={AsyncStyle.message}>Do you want to discard changes?</Text>
        </ModalPopup> 
        </OverlayLoaderWrapper>
      </View >
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getLinkedParticipantsByPatients: (data) => dispatch(getLinkedParticipantsByPatients(data)),
    AddParticipantsToVideoConference: (data) => dispatch(AddParticipantsToVideoConference(data))
  }
}

const mapStateToProps = (state) => {
  let telehealthState = state.telehealthState
  return {
    loggedInUser: state.authState && state.authState.userState.userInfo,
    linkedPatients: telehealthState && state.telehealthState.linkedPatients,
    linkedParticipants: telehealthState && state.telehealthState.linkedParticipants,
    loadingStatus: telehealthState && state.telehealthState.isLoading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsTeleHealth);