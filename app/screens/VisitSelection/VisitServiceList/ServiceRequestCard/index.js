import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import {
    CoreoImage,
    CoreoText,
    CoreoOpacityButton
} from '../../../../components';
import {navigateToScreenMainStack} from '../../../../redux/navigation/actions'
import { onProfileClick, onSeviceProvidersClick } from '../../../../redux/visitSelection/VisitServiceList/actions';
import { DECLINED, DEFAULT_VALUE, DATE_FORMATS, visitServiceStatus, USER_TYPES } from '../../../../constants/constants'
import styles from './styles';
import {
    View,
    TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { setValueBasedOnHeight } from '../../../../utils/deviceDimensions';
import { PATH } from '../../../../routes';
import {_} from '../../../../utils/validations'
import { getServiceIcon, caseInsensitiveComparer } from '../../../../utils/appUtils';
import { CoreoProfileImage } from '../../../../components/Base/Image/Image';
import  { empty_request } from '../../../../assets/images';
import {  THEME_PRIMARY_COLOR, DEFAULT_STATUS_COLOR } from '../../../../constants/theme';
import { setSPDetails } from '../../../../redux/visitSelection/VisitServiceDetails/actions';
const angleRight = <Icon name="angle-right" size={setValueBasedOnHeight(20)} color="#acacac" />
const angleRightPurple = <Icon name="angle-right" size={setValueBasedOnHeight(20)} color={THEME_PRIMARY_COLOR} />


class ServiceRequestCard extends Component {

    onClickRequestCard = () => {
        const {serviceRequestId,serviceProviderType, serviceProviderId} = this.props
        this.props.setSPDetails(serviceProviderId)
        const isPlanVisit = serviceProviderType === USER_TYPES.EU
        let params = {
            serviceRequestId: serviceRequestId,
            isPlanVisit
        }
        this.props.goToVisitServiceDetails(params)
    }

    onProfileClick = () => {
        this.props.onProfileClick();
    }

  

    displayStatus = (status) => {
        switch(status) { 
            case visitServiceStatus.VISIT_SERVICE_STATUS_ENGAGED: { 
                return THEME_PRIMARY_COLOR;
                break; 
             }
            default :
                return DEFAULT_STATUS_COLOR;
         } 
    }
    
    showStatusName = (statusName) => {
        switch(statusName) { 
            case visitServiceStatus.VISIT_SERVICE_STATUS_OPEN: { 
               return visitServiceStatus.VISIT_SERVICE_STATUS_OPEN;
            } 
            case visitServiceStatus.VISIT_SERVICE_STATUS_ENGAGED: { 
               return visitServiceStatus.VISIT_SERVICE_STATUS_ENGAGED;
            }
            case visitServiceStatus.VISIT_SERVICE_STATUS_CLOSED: { 
               return visitServiceStatus.VISIT_SERVICE_STATUS_CLOSED;
            }
            case visitServiceStatus.VISIT_SERVICE_STATUS_IN_PROGRESS: { 
                return visitServiceStatus.VISIT_SERVICE_STATUS_IN_PROGRESS;
             }
             default :
             return statusName
         } 
    }

    onClickServiceProviders = () => {
        const {serviceRequestId} = this.props
        this.props.onSeviceProvidersClick(serviceRequestId, this.props.navigation)
    }

    goToSPProfile = (id) => {
        this.props.setSPDetails(id)
        const {serviceRequestId, servicePlanVisitId} = this.props

        let params = {
            id,
            IsEntityUser: false,
            isProvider:true,
            serviceRequestId,
            isPlanVisit: !_.isNil(servicePlanVisitId) && servicePlanVisitId !== 0,
        }
        this.props.goToSPProfile(params);
    }

    newServiceRequestCard = () => {
        return (
                <TouchableOpacity onPress={() => this.props.createServiceRequest({ navigator: this.props.navigation })} style={styles.emptyCard} disabled={!this.props.network}>
                    <CoreoImage style={styles.editImageStyle} source={empty_request} />
                    <CoreoText style={styles.emptytextStyle}>New Service Request</CoreoText>
                </TouchableOpacity>
        )
    }

    render() {
        if(this.props.serviceRequestId === DEFAULT_VALUE){
            return this.newServiceRequestCard();
        }
        const isOpen = caseInsensitiveComparer(this.props.statusName, visitServiceStatus.VISIT_SERVICE_STATUS_OPEN);
        const isEngaged = caseInsensitiveComparer(this.props.statusName, visitServiceStatus.VISIT_SERVICE_STATUS_ENGAGED);
        const isInProgress = caseInsensitiveComparer(this.props.statusName, visitServiceStatus.VISIT_SERVICE_STATUS_IN_PROGRESS);
        const isPendingApproval = caseInsensitiveComparer(this.props.statusName, visitServiceStatus.VISIT_SERVICE_STATUS_PENDING_APPROVAL);
        const isDeclined = this.props.statusId === DECLINED
        let id = 0;
        let titleData = this.props.types && this.props.types.map((serviceType, index) => {
            if(index === 0) {
                id = serviceType.serviceTypeId
            }
            return (serviceType.serviceTypeDescription);
        });
        let title = titleData ? titleData.join(', ') : "";
        const postedDate = moment(this.props.requestDate).format(DATE_FORMATS.MMM_DD);
        let onBottomSectionPress = ()=>{isEngaged || isInProgress ||this.props.serviceProviderId ? this.goToSPProfile(this.props.serviceProviderId) : null}
        if(isOpen){
            onBottomSectionPress = this.onClickServiceProviders
        }

        return (
            <View style={styles.cardStyle}>
                <TouchableOpacity onPress={() => {this.onClickRequestCard()}} style={styles.cardInformationView}>
                    
                    <View style={[styles.imageItemView, styles.imageMarginTop]}>
                        <CoreoImage
                            source={getServiceIcon("serviceType" + id)}
                            style={styles.imageItemSize} 
                        />
                    </View>
                    <View style={styles.descriptionView}>
                        <CoreoText style={styles.requestTitle} numberOfLines={1}>{title}</CoreoText>
                        <View style={styles.dateSection}>
                            <CoreoText style={styles.requestFrequency}>{this.props.recurringPatternDescription}  |  {`Posted on ${postedDate}`}</CoreoText>
                            <View style={styles.contentCenter}>
                                {angleRight}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style = {styles.lineStyle} />
                <TouchableOpacity onPress={onBottomSectionPress} style={styles.cardPatientView}>
                    <View style={styles.cardPatientViewLeft}>
                        {isOpen  ? <View style={styles.isOpenStyle}>
                                <CoreoOpacityButton onPress={this.onClickServiceProviders} textStyle={styles.spStyle} text="Browse Providers" />
                            </View> :
                            (!isPendingApproval && !isDeclined ? <TouchableOpacity style={styles.patientDetails} onPress={() => {isEngaged || isInProgress ||this.props.serviceProviderId ? this.goToSPProfile(this.props.serviceProviderId) : null}}>
                                <View style={styles.imagePatientView}>
                                    <CoreoProfileImage
                                        pic={this.props.serviceProviderThumbnail ? {uri: this.props.serviceProviderThumbnail} : null}
                                        style={styles.imagePatientSize}/>
                                </View>
                                <View style={styles.postedDateName}>
                                    <CoreoText style={styles.patientNameStyle}>{this.props.providerFirstName} {this.props.providerLastName}</CoreoText>
                                </View>
                            </TouchableOpacity> : <View/>)
                        }
                    </View>
                    <View style={styles.cardPatientViewRight}>
                        <View style={[styles.requestStatusViewStyle, {borderColor: this.displayStatus(this.props.statusName)}]}>
                            <CoreoText style={[styles.requestStatusStyle, {color: this.displayStatus(this.props.statusName)}]}>{this.showStatusName(this.props.statusName)}</CoreoText>
                        </View>
                        <View style={styles.contentCenter}>
                            {angleRight}
                        </View>
                    </View>
                </TouchableOpacity>                   
            </View>
        );
    }
};

ServiceRequestCard.propTypes = {
    handleClick: PropTypes.func
}

function mapDispatchToProps(dispatch) {
    return {
        onProfileClick: () => dispatch(onProfileClick()),
        onSeviceProvidersClick: (data, extraProps) => dispatch(onSeviceProvidersClick(data, extraProps)),
        goToVisitServiceDetails: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_SERVICE_DETAILS, params)),
        goToSPProfile: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_SERVICE_DETAILS, params)),
        createServiceRequest: (params) => dispatch(navigateToScreenMainStack(PATH.REQUIREMENTS_SCREEN, params)),
        setSPDetails: (id) => dispatch(setSPDetails(id))

    }
};

function mapStateToProps(state){
    return {
        network: state.networkReducer.network
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestCard);