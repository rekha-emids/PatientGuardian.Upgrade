import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { CoreoText, CoreoImage } from '../../../components';
import Images from '../../../assets/images/index'
import styles from '../styles'
import { extractRole } from '../../../utils/roleUtil';
import { SCREENS, USER_TYPES } from '../../../constants/constants';
import images from '../../../assets/images/index'
import { CoreoProfileImage } from '../../../components/Base/Image/Image';
import EmptyMsgText from '../../Profile/EmptyText';

import {_} from '../../../utils/validations'
import EmptyText from '../../ServiceProviderProfile/EmptyText';
export default class CardListViewComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileRole: extractRole(SCREENS.PROFILE)
        }
    };

    profileView = (params) => {
        this.props.setUser(false)
        this.props.goToProfile(params)
    }
    render() {
        let content = null
        content = this.props.data && this.props.data.map(item => {
            let id = (item.userType === USER_TYPES.GUARDIAN) ? item.coreoHomeUserId : item.patientId;;
                                let canEditable = this.props.showMyConnections
                                let params = {
                                    id: id,
                                    userType: item.userType,
                                    canEditable,
                                    isIndividualOrGuardianMyConnection: this.props.isIndividualOrGuardianMyConnection
                                }
            return (
                <View style={styles.manageContainer}>
                    <View style={styles.conHolder}>
                        <CoreoProfileImage style={styles.thumbnailStyle} pic={item.image ? {uri: item.image} : null} />

                        <View style={{flex:1}}>
                            <CoreoText style={styles.cardMainTextStyle} numberOfLines={1}>{item.firstName} {item.lastName}</CoreoText>
                            <CoreoText style={styles.cardSubTextStyle}>{item.name}</CoreoText>
                            <View style={styles.cardRightView}>
                            { this.props.showMyConnections && <TouchableOpacity onPress={() => {
                                this.state.profileRole.Read && this.profileView(params)
                            }}><CoreoImage style={styles.cardRightViewFirstIcon} source={Images.profileDetails} /></TouchableOpacity> }
                             { this.props.showMyConnections && <TouchableOpacity onPress={() => this.props.onPress(item)}><CoreoImage style={styles.cardRightViewFirstIcon}  source={Images.trash}/></TouchableOpacity> }
                            </View>
                        </View>
                    </View>
                </View>
            )
        })
        let emptyContent = false
        if(_.isNil(this.props.data) || (this.props.data && !this.props.data.length)){
            content = this.props.showMyConnections ? <EmptyMsgText onPress={this.props.goToManageConnection} text={this.props.emptyText} icon={images.AddIcon}/> :
            <EmptyText/>
            emptyContent = true
        }
        return (
            <View style={[styles.rowContainer, emptyContent ? styles.empptyContainer : {}]}>
                {content}
            </View>
        )
    }
}

