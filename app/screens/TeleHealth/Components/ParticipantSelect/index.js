import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  Badge
} from '../../../AsyncMessage/Components/Badge/index';
import conversationstyles_ps from './styles_ps';
import { CoreoProfileImage } from '../../../../components/Base/Image/Image';
import { setValueBasedOnWidth } from '../../../../utils/deviceDimensions';

class ParticipantSelect extends Component {
  render() {
    return (
      <View style={conversationstyles_ps.ps_outerWrap}>
        <View style={conversationstyles_ps.ps_innerLeftWrap}>
        <CoreoProfileImage
          resizeMode="cover"
          pic={this.props.item && this.props.item.thumbNail ? {uri: this.props.item.thumbNail} : null}
          style={conversationstyles_ps.profileIconinnerWrap}/>
            {this.props.item && this.props.item.participantType
            ? <Badge 
            style={conversationstyles_ps.ps_badge}
            label={this.props.item.participantType}/>
            : <View style={{width: setValueBasedOnWidth(18)}} /> } 
        </View>
        <View style={conversationstyles_ps.ps_innerMidWrap}>
          <Text style={conversationstyles_ps.msglistmsgTitle} numberOfLines={1}>{this.props.item && this.props.item.firstName} {this.props.item && this.props.item.lastName}</Text>
        </View>
        {this.props.viewList && 
          <View style={conversationstyles_ps.ps_innerRightWrapStatus}>
            <Text>{this.props.item.status}</Text>
          </View>
        }
        {!this.props.viewList && <View style={conversationstyles_ps.ps_innerRightWrap}>
          <View>
            {this.props.item && !this.props.item.selected
                ? <TouchableOpacity onPress={() => this.props.onSelection(this.props.index, this.props.item)}>
                  <Image
                    style={conversationstyles_ps.participantSelectIconWrap}
                    source={require('../../../../assets/images/TeleHealth/addperson.png')}
                    resizeMode="contain"
                  />

                </TouchableOpacity>
                : <TouchableOpacity onPress={() => this.props.onSelection(this.props.index, this.props.item)}>
                  <Image
                    style={conversationstyles_ps.participantSelectIconWrap}
                    source={require('../../../../assets/images/TeleHealth/green_tick.png')}
                    resizeMode="contain"
                  />
                </TouchableOpacity>}
          </View>
        </View>}   
      </View>
    
    );
  }
}

export default ParticipantSelect;