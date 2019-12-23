import React, { Component } from 'react'
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native'
import styles from './styles'
import { CoreoImage, CoreoText } from '../../../../components';
import { getServiceOfferedImage, isIOS } from '../../../../utils/appUtils';
import { navigateToScreenMainStack } from '../../../../redux/navigation/actions'
import Icon from '../../../../components/Base/Icon';
import Icons from '../../../../assets/Icons';
import { setFontSize } from '../../../../utils/deviceDimensions';
import { PATH } from '../../../../routes';


class ServiceRequestCard extends Component {
  onClickRequestCard = (serviceRequestId) => {
    let params = {
      serviceRequestId
    }
    this.props.goToVisitServiceDetails(params)
  }
  render() {
    let icon = isIOS() ? Icons.arrowRightIos : Icons.arrowRightAndroid
    const { serviceType, month, onPress, selectedServiceRequestId, serviceRequestId, recurringPatternDescription, serviceCategoryDescription } = this.props
    return (
      <TouchableOpacity
        onPress={() => onPress(serviceRequestId, this.props)}
        style={[
          styles.cardContainer,
          selectedServiceRequestId === serviceRequestId
            ? styles.selectedBgColor
            : {}
        ]}
      >
        <View style={styles.serviceDetailsContainer}>
          <CoreoImage
            source={getServiceOfferedImage(serviceType)}
            style={styles.icon}
          />
          <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
            <CoreoText style={[styles.thickText, styles.serviceTypes]} numberOfLines={1}>{serviceType && serviceType.split(',').join(', ')}</CoreoText>
            <View>
              <CoreoText style={styles.greyText}>
                {serviceCategoryDescription}
              </CoreoText>
            </View>
            <View style={styles.slotDetailsContainer}>
                <CoreoText style={[styles.thickText, styles.smallText]}>
                  {recurringPatternDescription}
                </CoreoText>
                <View style={styles.verticalDivider} />
                <CoreoText style={[styles.thickText, styles.smallText]}>
                  {month}
                </CoreoText>
                <TouchableOpacity style={styles.arrow} onPress={() => this.onClickRequestCard(serviceRequestId)}>
                  <Icon {...icon} size={setFontSize(16)} />
                </TouchableOpacity>
            </View>
          </View>
        </View>

      </TouchableOpacity>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    goToVisitServiceDetails: (params) => dispatch(navigateToScreenMainStack(PATH.VISIT_SERVICE_DETAILS, params))
  }
};
export default connect(null, mapDispatchToProps)(ServiceRequestCard);