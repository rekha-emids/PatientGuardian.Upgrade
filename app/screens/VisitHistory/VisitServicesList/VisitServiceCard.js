import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import { CoreoImage, CoreoText } from '../../../components';
import { connect } from 'react-redux';
import styles from './styles'
import {setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import {getFormatedDate} from '../../../utils/momentUtil'
import ProgressBar from '../../../components/LevelOne/ProgressBar';
import {getServiceIcon, getSlot } from '../../../utils/appUtils';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
import {PATH} from '../../../routes/index'
import { navigateToScreenMainStack } from '../../../redux/navigation/actions'

import Icon from 'react-native-vector-icons/FontAwesome';
import { getTimeInHoursAndMins } from '../../VisitSelection/VisitServiceDetails/components/ServiceScheduleDetails';
import { DATE_FORMATS } from '../../../constants/constants';
const angleRight = <Icon name="angle-right" size={setValueBasedOnHeight(20)} color="#acacac" />

const PROGRESSBAR_WIDTH = setValueBasedOnWidth(100)

class VisitServiceCard extends Component {
    goToSPProfile = (id) => {
        let params = {
            id
        }
        this.props.goToSPProfile(params);
    }
    render(){
        const {visitDate, serviceRequestVisitId,serviceRequestVisitNumber, slotDescription, providerImage,serviceCategory,
         serviceTypes, totalTask, totalTaskCompleted, providerFirstName,
         providerLastName,index, onPress, visitStartTime, visitEndTime, serviceProviderId, billedTotalDuration, originalTotalDuration} = this.props
        let visitDetails = `${getFormatedDate(visitDate, DATE_FORMATS.DDD)}, ${getFormatedDate(visitDate, DATE_FORMATS.DD_MMM)}${(getSlot(slotDescription) ? ", " + getSlot(slotDescription) : "" )}`
        let id = 0
        let titleData = serviceTypes && serviceTypes.map((item, index) => {
            if(index === 0){
                id =item.serviceTypeId
            }
            return item.serviceTypeDescription;
        });
        let percent = Math.round((totalTaskCompleted/totalTask) * 100)
        percent = totalTask !== 0 ? percent : 0
        let progressBarWidth = PROGRESSBAR_WIDTH * (percent / 100)
        let totalTime = getTimeInHoursAndMins(billedTotalDuration || originalTotalDuration) + " (HH:MM)"
        let title = titleData ? titleData.join(', ') : "";
        return (
            <View style={styles.cardStyle} key={index}>
                <TouchableOpacity onPress={() => onPress(serviceRequestVisitId,this.props)}>
                    <View style={styles.slotTimingsContainer}>
                        <CoreoText style={styles.requestTitle}>{visitDetails}</CoreoText>
                        <View style={styles.divider} />
                        <CoreoText style={styles.requestTitle}>{totalTime}</CoreoText>
                    </View>
                    <View style={styles.lineStyle} />
                    <View style={styles.rowStyle}>
                        <View style={{flex: 9}}>
                            <View style={styles.cardInformationView}>
                                <CoreoImage
                                    source={getServiceIcon("serviceType"+id)}
                                    style={styles.imageItemSize}
                                />
                                <View style={styles.descriptionView}>
                                    <CoreoText style={styles.services} numberOfLines={1}>{title}</CoreoText>
                                    {/* <CoreoText style={styles.requestDescription}>{serviceCategory}</CoreoText> */}
                                    <View style={styles.tasksProgress}>
                                        <CoreoText style={styles.requestTitle}>Tasks</CoreoText>
                                        <ProgressBar containerStyle={{width: PROGRESSBAR_WIDTH}} progressStyle={{width: progressBarWidth,  backgroundColor: THEME_PRIMARY_COLOR}} />
                                        <CoreoText style={styles.requestTitle}>{percent} %</CoreoText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.arrowStyle}>
                            {angleRight}
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.lineStyle} />
                <TouchableOpacity onPress={this.goToSPProfile.bind(this,serviceProviderId)} style={styles.cardPatientView}>
                    <View style={styles.detailsContainer}>
                        <CoreoImage
                            source={{uri:providerImage}}
                            style={styles.imagePatientSize}
                        />
                        <CoreoText style={styles.patientNameStyle}>{providerFirstName} {providerLastName}</CoreoText>
                    </View>
                    <CoreoText style={styles.patientNameStyle}>{serviceRequestVisitNumber || ""}</CoreoText>
                </TouchableOpacity>                    
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
      goToSPProfile: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.SERVICE_PROVIDER_PROFILE : null, params)),
    }
  }

  
export default connect(null, mapDispatchToProps)(VisitServiceCard);