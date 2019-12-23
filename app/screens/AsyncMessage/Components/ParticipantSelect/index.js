import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Badge,
} from '../Badge';
import conversationstyles_ps from './styles_ps';
import { DasboardProfilePic } from '../../../../assets/images';
import conversationstyles from '../../ConversationSummary/styles';

class ParticipantSelect extends Component {
  constructor(props){
    super(props)
  }
  onSelect = () => {
     this.props.onSelection(this.props.index, this.props.item)
  }
  render() {
    return (
      <View style={conversationstyles.msglistouterWrapUnread}>
        <View style={conversationstyles.imageViewWrap}>
          <Image
            style={conversationstyles.avtrHolderWrap}
            source={this.props.item && this.props.item.thumbNail ? { uri : this.props.item.thumbNail} : DasboardProfilePic }
            resizeMode="cover"
          />
          <Badge style={conversationstyles_ps.ps_badge} label={this.props.item && this.props.item.participantType}/>
        </View>
        <Text style={conversationstyles_ps.msglistmsgTitle} numberOfLines={1}>{this.props.item && this.props.item.firstName} {this.props.item && this.props.item.lastName}</Text>
        <View style={conversationstyles_ps.actionView} >
        {this.props.item && !this.props.item.selected ?
            <TouchableOpacity onPress={this.onSelect}>
              <Image
                style={conversationstyles_ps.participantSelectIconWrap}
                source={require('../../../../assets/images/addperson.png')}
                resizeMode="contain"
              />

            </TouchableOpacity> :
            <TouchableOpacity onPress={this.onSelect}>
              <Image
                style={conversationstyles_ps.participantSelectIconWrap}
                source={require('../../../../assets/images/green_tick.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>}
        </View>
      </View>
    
    );
  }
}

export default ParticipantSelect;