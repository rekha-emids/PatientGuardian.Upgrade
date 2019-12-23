import React, {Component} from 'react'
import {View, Platform, TouchableOpacity} from 'react-native'
import { CoreoCard } from '../../../../components/LevelOne';
import styles from './styles'
import { CoreoText, CoreoHighlightButton } from '../../../../components';
import Icon from '../../../../components/Base/Icon';
import Icons from '../../../../assets/images/Icons';
import { setFontSize, setValueBasedOnHeight, setValueBasedOnWidth } from '../../../../utils/deviceDimensions';
import { INVIE, INVITED, APPLIED, Hired, SERVICE_PROVIDER_RELATIONSHIP_ID, USER_TYPES } from '../../../../constants/constants';
import { INVITED_STATUS_COLOR, THEME_PRIMARY_COLOR } from '../../../../constants/theme';
import { CoreoProfileImage } from '../../../../components/Base/Image/Image';
import {Popup} from '../../../../components/Base/PopOver'
import {connect} from 'react-redux'
import { onCreateNewConversation } from '../../../../redux/asyncMessages/actions'
import { createVideoConference } from '../../../../redux/telehealth/actions'
import { makeACall } from '../../../../utils/communicationUtils';

class ServiceProviderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFavouriteServiceProvider: props.isFavorite 
        };
    };

    renderStatus = (status) => {
        let inviteComponent = null
        let hireComponent = null
        const {percentageMatch, onClickInvite, cancelInvitation, serviceProviderId, onClickHire, serviceRequestId, serviceProviderTypeId, firstName, lastName} = this.props
        switch(status){
            case INVIE:
                let onPressInvite = () => {
                    onClickInvite(serviceRequestId, serviceProviderId, true)
                }
                inviteComponent = percentageMatch ? <CoreoText style={[styles.thickText, styles.smallText]}>{percentageMatch}% Match</CoreoText> : <CoreoText />
                hireComponent = <CoreoHighlightButton onPress={onPressInvite} style={styles.buttonContianer} textStyle={styles.buttonText} text={status} />
                break
            case INVITED:
                let onPressCancel = () => {
                    cancelInvitation(serviceRequestId, serviceProviderId, firstName + " " + lastName)
                }
                inviteComponent = <CoreoText style={[styles.statusText, {color: INVITED_STATUS_COLOR}]}>{status}</CoreoText>
                hireComponent = <CoreoHighlightButton onPress={onPressCancel} style={styles.buttonContianer} textStyle={styles.buttonText} text={"Uninvite"} />
                break
            case APPLIED:
                    let onPressHire = () => {
                        onClickHire(serviceRequestId, serviceProviderId, serviceProviderTypeId)
                    }
                    inviteComponent = <CoreoText style={[styles.statusText, {color: INVITED_STATUS_COLOR}]}>{status}</CoreoText>
                    hireComponent = <CoreoHighlightButton onPress={onPressHire} style={styles.buttonContianer} textStyle={styles.buttonText} text="Hire" />
                    break
            case Hired:
                inviteComponent = <CoreoText style={[styles.thickText, styles.smallText]}></CoreoText>
                hireComponent =  <View style={[styles.spStatusContainer, {borderColor: THEME_PRIMARY_COLOR}]}>
                                    <CoreoText style={[styles.statusText, {color: THEME_PRIMARY_COLOR}]}>{status}</CoreoText>
                                </View>
            default:
                break
    }
    return {inviteComponent, hireComponent}
}

onSuccess = () =>{
    this.setState({
        isFavouriteServiceProvider: !this.state.isFavouriteServiceProvider
    })
}


onPhonePress = async (data) => {
    data && makeACall(data)
}

onPressConversation(data) {
        let userDetails =  [
            {
                userId: data.coreoHomeUserId,
                participantType: USER_TYPES.SERVICE_PROVIDER,
                participantId: data.serviceProviderId
            }
        ]
        let requestObject = {
            context: null,
            participantList: userDetails,
            title: null
        }
        this.props.onCreateNewConversation(requestObject)
}
onTeleHealthPress(data) {
    let dataList = [
        {
            userId: data.coreoHomeUserId,
            participantType: USER_TYPES.SERVICE_PROVIDER,
            participantId: data.serviceProviderId,
            firstName: data.firstName,
            lastName: data.lastName,
            thumbNail: data.image
        }
    ];
    this.props.createVideoConference(dataList);
}

render(){
        const {serviceProviderImage,onClickFavourite,onClickSp, serviceProviderId, isEntityUser, serviceProviderTypeId, firstName, lastName,hourlyRate,serviceRequestStatus, isFavorite, type, rating, age, yearsOfExperience,phoneNumber} = this.props
        let icon = Platform.OS === "ios" ? Icons.starIos : Icons.starAndroid
        const {inviteComponent, hireComponent} = this.renderStatus(serviceRequestStatus)
        let isEntity = serviceProviderTypeId === SERVICE_PROVIDER_RELATIONSHIP_ID;
        return (
        <CoreoCard style={styles.cardContianer}>
            <View style={styles.detailsContainer}>
                <TouchableOpacity onPress={() => {onClickSp(serviceProviderId, isEntityUser)}} style={styles.picOuterLayer}>
                    <CoreoProfileImage pic={serviceProviderImage ? {uri: serviceProviderImage} : null}
                    style={styles.pic} />
                </TouchableOpacity>
                <View style={styles.flexContainer}>
                    <View style={styles.topText}>
                    <CoreoText style={styles.name}>{firstName} {lastName}</CoreoText>
                    <Popup showModal={true} label1='Phone Call' onPhonePress={() => this.onPhonePress(phoneNumber)} label2='Conversation' onAsyncPress={() => this.onPressConversation(this.props)} label3='Video Conference' onTelePress={() => this.onTeleHealthPress(this.props)} />
                    </View>
                    <View style={[styles.rowCenter, styles.marginSpace]}>
                        <Icon color="#e3d032" {...icon} size={setFontSize(13)} />
                        <CoreoText style={styles.greyText}>{` ${rating}`}</CoreoText>
                        {isEntity?<View/>:<View style={styles.dot} />}
                        {isEntity?<View/>:<CoreoText style={styles.greyText}>{age} Yrs Old</CoreoText>}
                        <View style={styles.dot} />
                        {isEntity  ? <CoreoText style={styles.greyText}>{yearsOfExperience} Yrs in Business</CoreoText> :
                                    <CoreoText style={styles.greyText}>{yearsOfExperience} Yrs Exp</CoreoText>}
                    </View>
                    <CoreoText style={[styles.thickText, styles.smallText,{marginRight:setValueBasedOnWidth(5)}]} numberOfLines={1} >{type}</CoreoText>
                </View>
            </View>
            <View style={[styles.costAndFavouriteContainer,{marginVertical:setValueBasedOnHeight(10)}]}>
               {isEntity ? <View/> : <View style={styles.hourTextWrapper}>
                   <CoreoText style={styles.constText}>${hourlyRate}</CoreoText>
                   <CoreoText style={styles.hourText}>/hr</CoreoText>
                   </View>
                   }
                {/* <TouchableOpacity onPress={() => onClickFavourite(serviceProviderId, !this.state.isFavouriteServiceProvider, this.onSuccess)}>
                <CoreoImage source={this.state.isFavouriteServiceProvider ? images.favourite_filled : images.favourite_outline} style={styles.likeIcon} />
                </TouchableOpacity> */}
            </View>
            <View style={styles.horizontalDivider} />
            <View style={styles.costAndFavouriteContainer}>
                {inviteComponent}
                {hireComponent}
            </View>
        </CoreoCard>
        )
    }
}

function mapStateToProps(state) {
    let authState = state.authState
    return {
     
        patientType: authState && state.authState.userState.userType,
        patientId: authState && state.authState.userState.patientId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onCreateNewConversation: (data) => dispatch(onCreateNewConversation(data)),
        createVideoConference: data => dispatch(createVideoConference(data)),
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ServiceProviderCard)
