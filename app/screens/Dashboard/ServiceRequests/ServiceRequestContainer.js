import React, { Component } from 'react';
import {
  View,
  Text,  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import {
  getPatientServiceRequestDetail,
  getServiceStatusDetail
} from '../../../redux/dashboard/Dashboard/actions'
import { getFormatedDate  } from '../../../utils/momentUtil';
import images from '../../../assets/images';
import { PATH } from '../../../routes';
import { navigateToScreenMainStack, resetStack } from '../../../redux/navigation/actions'
import { setValueBasedOnWidth, setFontSize } from '../../../utils/deviceDimensions'
import { CoreoImage, CoreoText } from '../../../components';
import { empty_request } from '../../../assets/images'
import { REQUESTS, SERVICE_PROVIDERS } from '../../HomeTabs';
import { SERVICEPROVIDERS_REQUESTS} from '../../ServiceProvidersTab/index'
import { getServiceIcon } from '../../../utils/appUtils'
import { CoreoProfileImage } from '../../../components/Base/Image/Image';
import { HIRED_STATUS, OPEN_STATUS } from '../../../constants/constants';
import {clearImpersination} from '../../../redux/auth/User/actions';
import Icons from '../../../assets/images/Icons';
import Icon from '../../../components/Base/Icon';
import { getServiceRequest, initialState } from '../../VisitSelection/VisitServiceList/index'
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

export const BrowseServiceProviderPlaceholder = (props) => {
  return (
    <View style={styles.emptyContentContainer}>
      <CoreoImage source={images.guideline1} style={styles.guideline1} />
      <TouchableOpacity onPress={props.browseServiceProviders} style={[styles.emptyCard, props.style]} disabled = {!props.network}>
        <CoreoImage style={styles.editImageStyle} source={images.serviceProviderSelected} />
        <Text style={styles.emptytextStyle}>Browse Providers</Text>
      </TouchableOpacity>
  </View>
  )
}

class ServiceRequestContainer extends Component {

  state = {
    showMore: false,
    showall: false,
  }

  componentWillReceiveProps(NextProps) {
    if (NextProps.serviceType !== this.props.serviceType) {
      this.props.getPatientServiceRequestDetail(NextProps.serviceType)
    }
  }

  showallText = () => {
    this.setState({ showall: !this.state.showall });
  }

  handleViewAll = () => {
    global.selectedStatusId = this.props.serviceType
    getServiceRequest(initialState)
    this.props.navigation.navigate(REQUESTS)
  }

  browseServiceProviders = () => {
    this.props.navigation.navigate(SERVICE_PROVIDERS)
  }

  goToSpProfile = (id) => {
    let params = {
      id
    }
    this.props.navigateToScreenMainStack(PATH ? PATH.SERVICE_PROVIDER_PROFILE : null, params)
  }

  goToServiceProvidersTab = () => {
    this.props.navigation.navigate(SERVICE_PROVIDERS)
    this.props.navigation.navigate(SERVICEPROVIDERS_REQUESTS)
  }

  slicedData = () => {
    let patientServiceRequest = [...this.props.patientServiceRequest];
    let sliceData = patientServiceRequest;
    if (this.state.showall) {
      sliceData = this.props.patientServiceRequest.slice(0, 5);
    }
    else {
      sliceData = this.props.patientServiceRequest.slice(0, 2);
    }
    return sliceData
  };

  lapsList() {

    return this.slicedData().map((item) => {
      let occurance = null
      let categoryTypes = item.types
      let serviceTypes = []
      let titleData = categoryTypes && categoryTypes.map(type => {
        return type.serviceTypeDescription
      })
      titleData = titleData ? titleData.join(', ') : ""

      if (item.recurringPatternDescription === 'One Time') {
        occurance = getFormatedDate(item.startDate, "DD MMM")
      } else {
        if (item.recurringPatternDescription === 'Weekly') {
          occurance = getFormatedDate(item.startDate, "DD MMM") + " - " + getFormatedDate(item.endDate, "DD MMM")
        } else {
          occurance = getFormatedDate(item.startDate, "DD MMM") + " - " + getFormatedDate(item.endDate, "DD MMM")
        }
      }
      let params = {
        serviceRequestId: item.serviceRequestId
      }
      let image = item.image
      if(!image || (image && !image.length)){
        image = item.serviceProviderThumbnail
      }
      return (
        <TouchableOpacity style={styles.serviceDetailsContainer} onPress={() => this.props.navigateToScreenMainStack(PATH.VISIT_SERVICE_DETAILS, params)} disabled = {!this.props.network}>
          <View style={styles.topContainerSR}>
            <View style={styles.paddingHorizontal}>
              <CoreoImage
                source={getServiceIcon("serviceType" + item.types[0].serviceTypeId)}
                style={styles.icon}
              />
              <View style={styles.marginVertical10}>
                <CoreoText numberOfLines={1} style={[styles.thickText, styles.srMarginRight]}>{titleData}</CoreoText>
                <CoreoText style={styles.greyText}>
                  {item.serviceCategoryDescription}
                </CoreoText>
              </View>
            </View>
          </View>
          <View style={styles.slotDetailsContainer}>
            <View style={styles.slotDetails}>
              <CoreoText style={[styles.thickText, styles.smallText]}>
                {item.recurringPatternDescription}
              </CoreoText>
              <View style={styles.verticalDivider} />
              <CoreoText style={[styles.thickText, styles.smallText]}>
                {occurance}
              </CoreoText>
            </View>
            {item.statusId === HIRED_STATUS ? <TouchableOpacity onPress={() => this.goToSpProfile(item.serviceProviderId)} style={styles.outerWrapper} disabled = {!this.props.network}>
              <CoreoProfileImage style={styles.patientImgStyle} pic={image ? {uri: image} : null} />
              <Text style={styles.nameText} numberOfLines={1}>{item.providerFirstName} {item.providerLastName}</Text>
            </TouchableOpacity>:<View/>}
           {item.statusId === OPEN_STATUS ?
           <TouchableOpacity onPress={this.goToServiceProvidersTab} disabled = {!this.props.network}>
          <Text style={styles.applicationText}>{item.numberOfApplicants} Application(s)</Text>
          </TouchableOpacity> 
          :<View/>} 
          </View>
        </TouchableOpacity>
      )
    })

  }
  render() {
    let item = [];
    item = this.slicedData;
    return (
      <View>
        {this.props.patientServiceRequest && this.props.patientServiceRequest.length > 0 ? this.lapsList() :
          <View style={styles.emptyContainer}>
            <TouchableOpacity onPress={() => this.props.createServiceRequest({navigator: this.props.navigation})} style={[styles.emptyCard, { marginRight: setValueBasedOnWidth(13) }]} disabled = {!this.props.network}>
              <CoreoImage style={styles.editImageStyle} source={empty_request} />
              <Text style={styles.emptytextStyle}>New Service Request</Text>
            </TouchableOpacity>

            <BrowseServiceProviderPlaceholder browseServiceProviders={this.browseServiceProviders} network = {!this.props.network} />
          </View>
        }
        {this.props.patientServiceRequest && this.props.patientServiceRequest.length > 2 ? !this.state.showall ?
          <TouchableOpacity onPress={this.showallText} style = {{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Text style={styles.showMoreText}>Show More</Text>
            <Icon {...Icons.arrowDown} size={setFontSize(14)} color={THEME_PRIMARY_COLOR} />
          </TouchableOpacity> :
          (this.props.network === true && this.props.patientServiceRequest.length > 5
            ?
            <TouchableOpacity onPress={this.handleViewAll} disabled={!this.props.network}>
              <Text style={styles.showMoreText}>View All</Text>
            </TouchableOpacity>
            :
            null) : null}

      </View>
    );
  };

};

function mapDispatchToProps(dispatch) {
  return {
    getPatientServiceRequestDetail: data =>
      dispatch(getPatientServiceRequestDetail(data)),
      createServiceRequest: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.REQUIREMENTS_SCREEN : null, params)),
    getServiceStatusDetail: () => dispatch(getServiceStatusDetail()),
    navigateToScreenMainStack: (url, params) => dispatch(navigateToScreenMainStack(url, params)),
    clearImpersination: () => dispatch(clearImpersination()),
    resetStack: () => dispatch(resetStack())

  }
}

function mapStateToProps(state) {
  let dashboardState =  state && state.dashboardState && state.dashboardState.dashboardState;
  return {
    conversationDetail: dashboardState.conversationDetail,
    patientServiceRequest: dashboardState.patientServiceRequest,
    impersinated: state.authState && state.authState.userState.impersinated,
    network: state.networkReducer && state.networkReducer.network,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServiceRequestContainer);