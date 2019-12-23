import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { isIpadDevice } from '../../../utils/deviceTypeCheck';
import AsyncStyle from './styles';
import {GetParticipantByConferenceId} from '../../../redux/telehealth/actions';
import LinearGradient from 'react-native-linear-gradient';
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from '../../../constants/theme';
import ParticipantsList from '../Components/ParticipantSelect';
import { SafeView } from '../../../components/LevelOne';

class ViewParticipantsTeleHealth extends Component {

  componentDidMount() {
    this.props.getParticipantByConferenceId();
  }

  _keyExtractor = (item) => item.userId.toString();

  render() {

    let participants = this.props.existingParticipantList && this.props.existingParticipantList.map((participant, i) => {
      return (
        <ParticipantsList
          viewList={true}
          item={participant}
          index={i}
        />
      );
    });

    return (
      <SafeView>
      <View style={AsyncStyle.wrapperView}>
      
        <LinearGradient colors={[NAVBAR_COLOR1, NAVBAR_COLOR2]} style={AsyncStyle.nCom_headerContainer}>
          <View style={AsyncStyle.nCom_headerLeftWrap}>
              <TouchableOpacity
                onPress={this.props.goBack}
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
              <Text style={isIpadDevice ? AsyncStyle.nCom_HeaderTextLd : AsyncStyle.nCom_HeaderTextSd}> Participants</Text>
            </View>
        </LinearGradient>
        <View style={AsyncStyle.contentContainer}>
          <View style={AsyncStyle.ParticipantsListContainer}>
            <ScrollView showsVerticalScrollIndicator={true} >
              {participants}
            </ScrollView>
          </View>
        </View>
      </View>
      </SafeView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
      getParticipantByConferenceId: ()=> dispatch(GetParticipantByConferenceId())
  }
}

function mapStateToProps(state) {
  let telehealthState = state.telehealthState
  return {
      existingParticipantList: telehealthState && state.telehealthState.participantsByConferenceId,
      loadingStatus: telehealthState && state.telehealthState.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewParticipantsTeleHealth);
