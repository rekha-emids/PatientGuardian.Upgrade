import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    
} from 'react-native';
import { Dots} from '../../../components';
import {Badge} from '../Components/Badge';
import { connect } from 'react-redux';
import styles from './styles';
import AMStyle from '../AsyncMsgStyles';
import { DasboardProfilePic } from '../../../assets/images';
import { USER_TYPES } from '../../../constants/constants';

class Participants extends Component {
    render() {
        let isCurrentLoggendInUser = false;

        if (this.props.participant && this.props.participant.firstName === 'Me') {
            isCurrentLoggendInUser = true
        }
        return (
            <View style={isCurrentLoggendInUser ? AMStyle.msglistouterWrapMe : AMStyle.msglistouterWrap}>               
                
                <View style={ styles.msglistavtrWrap}>
                    <Image
                        style={styles.profileIcon}
                        source={this.props.participant && this.props.participant.thumbNail ? {uri: this.props.participant.thumbNail} : DasboardProfilePic}
                        resizeMode="cover"
                    />
                    {!isCurrentLoggendInUser &&
                    <Badge style={styles.ps_badge} label={this.props.participant && this.props.participant.participantType} />}
                </View>
                <View style={isCurrentLoggendInUser ? styles.msglistmsgWrapMe : styles.msglistmsgWrap}>
                    <Text>
                        {isCurrentLoggendInUser ? this.props.participant && this.props.participant.firstName : this.props.participant && `${this.props.participant.firstName} ${this.props.participant.lastName}`}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                {!isCurrentLoggendInUser && this.props.participant && this.props.participant.participantType !== USER_TYPES.CARE_TEAM && this.props.isActive && <Dots isActive={this.props.conversation.isActive} firstName={this.props.participant.firstName} participantType={this.props.participant.participantType} lastName={this.props.participant.lastName} participant={this.props.participant} conversationId={this.props.conversationId} spId={this.props.participant.participantId} /> }                
                </View>
            </View>
        )
    }
}


function mapStateToProps(state) {
    return {conversation: state.asyncMessageState.conversation}
}

export default connect(mapStateToProps, null)(Participants);