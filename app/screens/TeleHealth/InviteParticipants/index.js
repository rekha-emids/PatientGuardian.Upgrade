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
    clearLinkedParticipants,
  
    GetAllParticipants,

    AddParticipantsToVideoConference,
} from '../../../redux/telehealth/actions';
import { ModalPopup, CoreoHighlightButton } from '../../../components';
import AsyncStyle from './styles';
import { getSelectedPatientInfo } from '../../../utils/userUtil';
import { USER_TYPES, NO_RESULTS_FOUND, NO_ADDITIONAL_PARTICIPANTS_CONFERENCE } from '../../../constants/constants';
import { SafeView } from '../../../components/LevelOne';

class InviteParticipantsTeleHealth extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedPatientDetails: {},
      showModalOnCancel: false,
      participantsSelected: [],
      dataList: []
    };
  }

  componentDidMount() {
    const {loggedInUser, contextId} = this.props
    let patientId = loggedInUser && loggedInUser.patientId
    if(loggedInUser && loggedInUser.userType === USER_TYPES.CARE_TEAM && getSelectedPatientInfo().userType !== USER_TYPES.INDIVIDUAL_GUARDIAN && getSelectedPatientInfo().userType !== USER_TYPES.GUARDIAN && getSelectedPatientInfo().userType !== USER_TYPES.PATIENT){
     patientId = contextId
    }else if(loggedInUser && loggedInUser.userType === USER_TYPES.CARE_TEAM){
      patientId = getSelectedPatientInfo().patientId
    }
    let data = {
        patientId,
        searchText: this.state.searchText,
        participantType: this.props.loggedInUser && this.props.loggedInUser.userType,
        userId: this.props.loggedInUser && this.props.loggedInUser.userId,
    };
    this.props.getAllParticipants(data);
  };

  componentWillUnmount() {
    this.setState({
      participantsSelected: [],
      dataList: []
    })
    this.props.clearLinkedParticipants()
  }

  updateSelected = (index, item) => {
    let position = this.state.participantsSelected.indexOf(item.userId);
    if (item.hasOwnProperty('selected')) {
      item.selected = !item.selected;
    } else {
      item.selected = true;
    }
    let participantsSelected = this.state.participantsSelected;
    let dataList = this.state.dataList;
    if (item.selected && position === -1) {
      participantsSelected.push(item.userId);
      dataList.push({
        userId: item.userId,
        participantType: item.participantType,
        firstName: item.firstName,
        lastName: item.lastName,
        thumbNail: item.thumbNail,
        participantId: item.participantId,
      });
    }
    if (!item.selected && position > -1) {
      participantsSelected.splice(position, 1);
      dataList.splice(position, 1);
    }
    this.setState({
      participantsSelected: participantsSelected,
      dataList: dataList
    })
  };

  onSearchTextChange = (value) => {
    this.setState({ searchText: value });
    let data = {
        searchText: value,
        contextId: this.state.selectedPatientDetails.length > 0 ? this.state.selectedPatientDetails.userId : null
      };
    this.props.getAllParticipants(data);
  };

  onBackButton = () => {
    this.setState({
      participantsSelected: [],
      dataList: []
    })
    this.setState({ showModalOnCancel: false })
    
  };

  addParticipants = () => {
    this.props.AddParticipantsToVideoConference(this.state.dataList);
    this.setState({
      participantsSelected: [],
      dataList: []
    })
  
  }

  onPressBack = () => this.state.participantsSelected.length ? this.setState({ showModalOnCancel: true }) : this.onBackButton()

  render() {
    let participants = this.props.linkedParticipants && this.props.linkedParticipants.map((participant, i) => {
      participant.selected = false;
      for (let j = 0; j < this.state.participantsSelected.length; j++) {
        if (this.state.participantsSelected[j] === participant.userId) {
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
      <SafeView>
      <View style={AsyncStyle.wrapperView}>
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
            <Text style={AsyncStyle.nCom_HeaderTextSd}> Invite Participants</Text>
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
            {this.props.linkedParticipants && this.props.linkedParticipants.length?<ScrollView showsVerticalScrollIndicator={true} >
              {participants}
            </ScrollView>:  <View style={AsyncStyle.textWrapper}>
            <Text style={AsyncStyle.emptyText}>{this.state.searchText? NO_RESULTS_FOUND: NO_ADDITIONAL_PARTICIPANTS_CONFERENCE}</Text>
              </View>}
            
            <CoreoHighlightButton
              style={AsyncStyle.button}
              onPress={this.addParticipants}
              textStyle={AsyncStyle.buttonText}
              text="Done"
              disabled={this.state.participantsSelected.length <= 0}
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
          onCancel={() => this.setState({
            showModalOnCancel: !this.state.showModalOnCancel,
          })}
        >
          <Text style={AsyncStyle.message}>Do you want to discard changes?</Text>
        </ModalPopup> 
      </View>
      </SafeView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearLinkedParticipants: () => dispatch(clearLinkedParticipants()),
    getAllParticipants: (data) => dispatch(GetAllParticipants(data)),
    AddParticipantsToVideoConference: (data) => dispatch(AddParticipantsToVideoConference(data)),
  }
}

const mapStateToProps = (state) => {
  let telehealthState = state.telehealthState
  return {
    loggedInUser: state.authState && state.authState.userState.userInfo,
    linkedPatients: telehealthState && state.telehealthState.linkedPatients,
    linkedParticipants: telehealthState && state.telehealthState.linkedParticipants,
    loadingStatus: telehealthState && state.telehealthState.isLoading,
    contextId: telehealthState && state.telehealthState.contextId
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteParticipantsTeleHealth);