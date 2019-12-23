import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import conversationstyles from './styles';
import ParticipantSelect from '../Components/ParticipantSelect'
import {
  getLinkedParticipantsByPatients,
  onAddParticipant,
  gotoParticipantList
} from '../../../redux/asyncMessages/actions';
import { ModalPopup } from '../../../components';
import { Item,Input } from 'native-base';
import AsyncStyle from '../AsyncStyle';
import {SafeView, Navbar} from '../../../components/LevelOne'
import styles from './styles';
import { USER_TYPES, NO_RESULTS_FOUND, NO_ADDITIONAL_PARTICIPANTS_CONVERSATION } from '../../../constants/constants';
import {  getUserInfo,  getSelectedPatientInfo } from '../../../utils/userUtil';
import { onBack } from '../../../redux/navigation/actions';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import ErrorBoundaryHOC from '../../../ErrorBoundaryHOC';

let data = [];
let dataList = [];

class AddParticipants extends Component {
  constructor(props){
    super(props);
    this.state = {
      individualId: null,
      selectedParticipants: [],
      title: '',
      search: '',
      searchText: '',
      selectedPatientDetails: {},
      participantList: [],
      showModalOnCancel: false
    };
  }
  

  apiCall = () => {
    let userId = this.props.loggedInUser && this.props.loggedInUser.userId;
    let conversationId =  this.props.conversation && this.props.conversation.conversationId ? this.props.conversation.conversationId : 0;
    let userType = this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.PATIENT : this.props.loggedInUser && this.props.loggedInUser.userType;
    if (this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.PATIENT) {
      let data = {
          patientId: this.props.loggedInUser.patientId,
          conversationId: conversationId,
          searchText: this.state.searchText,
          participantType: this.props.loggedInUser.userType,
          userId: userId,
          userType
      };
      this.props.getLinkedParticipantsByPatients(data);
    };
    //Guardian or Careteam 
    if ((getUserInfo() && getUserInfo().userType === USER_TYPES.GUARDIAN 
    && getSelectedPatientInfo().userType === USER_TYPES.GUARDIAN)
        || getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM) {
        
        let patientId = null;
        if( getSelectedPatientInfo() && getSelectedPatientInfo().userType === USER_TYPES.PATIENT){
            patientId = getSelectedPatientInfo().patientId;
        };
        let data = {
            patientId: patientId ? patientId : this.props.conversation.context,
            conversationId: conversationId,
            searchText: this.state.searchText,
            participantType: this.props.loggedInUser.userType,
            userId: userId,
            userType
        };
        this.props.getLinkedParticipantsByPatients(data);
    };

    //Guardian with Patient impersonation 
    if (getUserInfo() && getUserInfo().userType === USER_TYPES.GUARDIAN 
    && getSelectedPatientInfo().userType === USER_TYPES.PATIENT) {
        let data = {
            patientId: getSelectedPatientInfo().patientId,
            conversationId: conversationId,
            searchText: this.state.searchText,
            participantType: this.props.loggedInUser.userType,
            userId: userId,
            userType
        };
        this.props.getLinkedParticipantsByPatients(data);
    };

    // IG with Patient impersonation
    if(getUserInfo() && getUserInfo().userType === USER_TYPES.INDIVIDUAL_GUARDIAN){
        let userId = getUserInfo() && getUserInfo().userId;
        let patientId = null;
        if( getSelectedPatientInfo().userType === USER_TYPES.PATIENT){
            patientId = getSelectedPatientInfo().patientId;
        };
        let data = {
            patientId: patientId ? patientId : this.props.conversation.context,
            conversationId: conversationId,
            searchText: this.state.searchText,
            participantType: USER_TYPES.GUARDIAN,
            userId: userId,
            userType
        };
        this.props.getLinkedParticipantsByPatients(data);
    }
  }

  componentDidMount() {
    this.apiCall()
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.linkedParticipants != prevState.participantList) {
      return {
        participantList: nextProps.linkedParticipants
      };
    }
  };

  updateSelected = (index, item) => {
    let participantData = [...this.state.participantList]
    if (item.hasOwnProperty('selected')) {
      item.selected = !item.selected;
    } else {
      item.selected = true;
    }
    participantData[index] = item;
    this.setState({ participantList: participantData });

    let position = data.indexOf(item.userId);
    if (item.selected && position === -1) {
      data.push(item.userId);
      dataList.push({
        userId: item.userId,
        participantType: item.participantType,
        participantId: item.participantId,
        firstName: item.firstName,
        lastName: item.lastName
      });
    }
    else {
      data.splice(position, 1);
      dataList.splice(position, 1);
    }
  };

  onSearchTextChange = (value) => {
    this.setState({ searchText: value }, this.apiCall);
  };


  onAddParticipants = () => {
    let userId = this.props.loggedInUser && this.props.loggedInUser.userId;
    let userType = this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : this.props.loggedInUser && this.props.loggedInUser.userType;
    let participantData = {
      title: this.props.conversation.title,
      conversationId: this.props.conversation.conversationId,
      participants: data.toString(),
      createdBy: userId,
      participantList: dataList,
      participantType: userType
    };
    this.props.addParticipants(participantData);
    data = [];
    dataList = [];
  };

  onBackButton = () => {
    data = [];
    dataList = [];
    this.setState({ showModalOnCancel: false })
    this.props.onBack()
    // this.props.gotoParticipantList(this.props.conversation.conversationId);
  };

  onClickBackButton = () => {
    if(data.length || this.state.title.length){
      this.setState({ showModalOnCancel: true })
    }else{
      this.props.onBack()
      // this.props.gotoParticipantList(this.props.conversation.conversationId)
    }
  }
  
showModalOnCancel(){
   this.setState({
    showModalOnCancel: !this.state.showModalOnCancel,
  })
}
  render() {
    __DEV__ && console.log("state.asyncMessageState is: ",this.props)
    let participants = this.state.participantList && this.state.participantList.map((participant, i) => {
      for (let j = 0; j < data.length; j++) {
        if (data[j] === participant.userId) {
          participant.selected = true;
        }
      };

      return (
        <ParticipantSelect
          item={participant}
          onSelection={(index, item) => {
            this.updateSelected(index, item)
          }}
          index={i}
        />
      );
    });
    let loadingStatus = isAPIFetching(this.props.loadingStatus)
    return (
      <SafeView>
        <OverlayLoaderWrapper style={{flex: 1}} isLoading={loadingStatus}>
      <View style={AsyncStyle.wrapperView}>
        <View style={AsyncStyle.headerContainerAdd}>
        <Navbar title="Add Participants" onClickBackButton={this.onClickBackButton}
        showSave onCheckClick={data.length ? this.onAddParticipants : null} /> 
          <View style={AsyncStyle.headerContainerBtm}>

              <Item>
                {
                  <Image
                    style={[styles.rightIcon]}
                    source={require('../../../assets/images/search.png')}
                  />
                }
                <Input placeholder="Search" onChangeText={this.onSearchTextChange} />
              </Item>
          </View>
        </View>

        <View style={AsyncStyle.contentContainer}>
              {
                !loadingStatus
                  ?
                  (
                    this.state.participantList && this.state.participantList.length > 0 ?
                      <ScrollView showsVerticalScrollIndicator={true} >
                        {participants}
                      </ScrollView> :

                      <View style={styles.textWrapper}>
                        <Text style={styles.emptyText}>{this.state.searchText ? NO_RESULTS_FOUND : NO_ADDITIONAL_PARTICIPANTS_CONVERSATION}</Text>
                      </View>
                  )
                  :
                  null
              }
        </View>
        <ModalPopup
          visible={this.state.showModalOnCancel}
          primaryButton="YES"
          secondaryButton="NO"
          primaryColor="#3c1053"
          secondaryColor="#6c757d"
          onConfirm={this.onBackButton}
          onCancel={this.showModalOnCancel}
        >
          <Text style={conversationstyles.message}>Do you want to discard changes?</Text>
        </ModalPopup>
      </View >
      </OverlayLoaderWrapper>
      </SafeView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onBack: () => dispatch(onBack()),
    addParticipants: (data) => dispatch(onAddParticipant(data)),
    gotoParticipantList: (conversationId) => dispatch(gotoParticipantList(conversationId)),
    getLinkedParticipantsByPatients: (data) => dispatch(getLinkedParticipantsByPatients(data))
  }
};

const mapStateToProps = (state) => {
  let asyncMessageState = state.asyncMessageState;
  return {
    loggedInUser: state.authState.userState && state.authState.userState.userInfo,
    linkedPatients: asyncMessageState && state.asyncMessageState.linkedPatients,
    linkedParticipants: asyncMessageState && state.asyncMessageState.linkedParticipants,
    conversation: asyncMessageState && state.asyncMessageState.conversation,
    loadingStatus: asyncMessageState && state.asyncMessageState.isLoading
  };
}

export default ErrorBoundaryHOC(connect(mapStateToProps, mapDispatchToProps)(AddParticipants));