import React, { Component } from 'react';
import {
  View, 
  Text, Image, TouchableOpacity
} from 'react-native';
import styles from './styles';
import {
  getServiceProviderDetail
} from '../../../redux/dashboard/Dashboard/actions';
import { favouriteSp } from '../../../redux/serviceProvidersTab/requestsTab/actions'
import { connect } from 'react-redux';
import { Popup } from '../../../components/Base/PopOver';
import { CoreoText } from '../../../components';
import { CoreoCard } from '../../../components/LevelOne';
import { _ } from '../../../utils/validations'
import {ModalPopup} from '../../../components/LevelOne/ModalPopup'
import images from '../../../assets/images';
import { CoreoProfileImage } from '../../../components/Base/Image/Image';
import { PATH } from '../../../routes';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions'
import { createVideoConference } from "../../../redux/telehealth/actions";
import { onCreateNewConversation } from "../../../redux/asyncMessages/actions";
import { SERVICEPROVIDERS_REQUESTS } from '../../ServiceProvidersTab';
import { SERVICE_PROVIDERS, CONVERSATIONS } from '../../HomeTabs';
import {clearImpersination} from '../../../redux/auth/User/actions';
import { USER_TYPES } from '../../../constants/constants';
import { setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { makeACall } from '../../../utils/communicationUtils';

class ServiceProvideContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: { label: 'Favorites', value: 'favorite' },
      showall: false,
      showPopup: false,
      isFavouriteServiceProvider: props.isFavourite,
      showCallModal: false,
      showNoNumber: false
    }
  }
  
  showallText = () => {
    this.setState({ showall: !this.state.showallText });
  }
  slicedData() {
    let serviceProviderData = this.props.serviceProvider && [...this.props.serviceProvider];
    let sliceData = serviceProviderData && serviceProviderData.slice(0, 2);
    return sliceData || [];
  };

  handleThreeDots = () => {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  onSuccess = () => {
    this.setState({
      isFavouriteServiceProvider: !this.state.isFavouriteServiceProvider
    })
  }

  handleFavorite = (spId, isFavourite) => {
    this.props.favouriteSp(spId,!isFavourite, this.props.getServiceProviderDetail)
}
timeout = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

onPhonePress= async (data) => {
  if(data === null || data === '' ){
    this.showNoNumberModal();
}else{
    makeACall(data)
}
}
  onPressConversation(data) {
    let userDetails = [{
        userId: data.entitySpCoreoHomeUserId,
        participantType: USER_TYPES.SERVICE_PROVIDER,
        participantId: data.serviceProviderId
    }]
    let requestObject = {
      participantList: userDetails,
      title: null,
      context: null
    }
    this.props.onCreateNewConversation(requestObject, this.onSuccessConversation)
  };

  onTeleHealthPress(data) {
    let dataList = [
      {
        userId: data.entitySpCoreoHomeUserId,
        participantType: USER_TYPES.SERVICE_PROVIDER,
        participantId: data.serviceProviderId,
        firstName: data.firstName,
        lastName: data.lastName,
        thumbNail: data.thumbnail
      }
    ];
    this.props.createVideoConference(dataList);
  }

  handleViewAll(){
    this.props.navigation.navigate(SERVICE_PROVIDERS)
    this.props.navigation.navigate(SERVICEPROVIDERS_REQUESTS)
  }

  onSuccessConversation = () => {
    this.props.navigation && this.props.navigation.navigate(CONVERSATIONS)
  }
  showNoNumberModal = () => {
    this.setState({showNoNumber : true})
}

  lapsList() {

    return this.slicedData() && this.slicedData().map((item) => {
      let items = item.serviceTypes && item.serviceTypes.map((value) => {
        return value
      })
      let title = items ? items.join(', ') : ""
      let params = {
        id: item.serviceProviderId
      }
      return (
        <CoreoCard style={styles.cardContainer}>
          <CoreoCard style={styles.row}>
            <TouchableOpacity style={styles.picOuterLayer} onPress={() => this.props.navigateToScreenMainStack(PATH.SERVICE_PROVIDER_PROFILE, params)} disabled = {!this.props.network}>
              <CoreoProfileImage style={styles.picStyle} pic={item.thumbnail ? {uri: item.thumbnail} : null} />
            </TouchableOpacity>
            <CoreoCard style={styles.column}>
              <CoreoText style={styles.textDescription1}>{item.firstName} {item.lastName}</CoreoText>
              <CoreoCard style={[styles.row, styles.starCard]}>
                <Image
                  style={styles.starImage}
                  source={require('../../../assets/images/Icons/Star-01.png')}
                  resizeMode="contain"
                />
                <Text style={styles.leftText2}>{` ${item.rating}`}</Text>
                {item.isEntityUser ? <View /> : <View style={styles.dot}></View>}
                {item.isEntityUser ? <View /> : <Text style={styles.leftText3}>{item.age} Yrs Old</Text>}
                <View style={styles.dot}></View>
                <Text style={styles.leftText4}>{item.yearOfExperience} Yrs Exp</Text>
              </CoreoCard>
              <CoreoText style={styles.requestTitle} numberOfLines={1}>{title}</CoreoText>
            </CoreoCard>
          </CoreoCard>
          <CoreoCard style={[styles.row,{alignItems:'center',justifyContent:'space-between'}]}>
          {item.isEntityUser?<View/>:<View style={{width:setValueBasedOnWidth(60),alignContent:'center'}}><Text style={styles.hourRate}>${item.hourlyRate}/hr</Text></View>}    
          <TouchableOpacity onPress={ () => this.handleFavorite(item.serviceProviderId, item.isFavorite)}  disabled = {!this.props.network}>
          <Image
            style={styles.imageFav}
            source={item.isFavorite ? images.favourite_filled : images.favourite_outline}
            resizeMode="contain"
          />
          </TouchableOpacity>
          <ModalPopup
                    visible={this.state.showCallModal}
                    primaryButton="OK"
                    primaryColor="#3c1053"
                    onConfirm={() => {
                        this.setState({
                            showCallModal: !this.state.showCallModal,
                        })
                    }}
                >
                    <CoreoText style={styles.message}>{ item.phoneNumber}</CoreoText>
                </ModalPopup>
                <ModalPopup
                        visible={this.state.showNoNumber}
                        primaryButton="OK"
                        primaryColor="#3c1053"
                        onConfirm={() => {
                            this.setState({
                                showNoNumber: false,
                            })
                        }}
                    >
                        <Text style={styles.message}>No number found.</Text>
                    </ModalPopup>
          </CoreoCard>

           <View style={styles.dotsImage}>
              <Popup showModal={true} label1='Phone Call' onPhonePress={()=>item.phoneNumber && this.onPhonePress(item.phoneNumber)} label2='Conversation' onAsyncPress={()=>this.onPressConversation(item)}  label3='Video Conference' onTelePress={() =>this.onTeleHealthPress(item)} network = {this.props.network}/>
            </View>
        </CoreoCard>
      )
    })
  }

  render() {
    return (
      <View>
        {this.lapsList()}
        </View> 
    );
  };

};


function mapDispatchToProps(dispatch) {
  return {
    onCreateNewConversation: (data, onSuccessConversation) => dispatch(onCreateNewConversation(data, onSuccessConversation)),
    createVideoConference: data => dispatch(createVideoConference(data)),
    getServiceProviderDetail: () => dispatch(getServiceProviderDetail()),
    favouriteSp: (spId,isFavourite, onSuccess) => dispatch(favouriteSp(spId,isFavourite, onSuccess)),
    navigateToScreenMainStack: (url, params) => dispatch(navigateToScreenMainStack(url, params)),
    clearImpersination: () => dispatch(clearImpersination())
  }
}

function mapStateToProps(state) {
  return {
    patientType: state.authState && state.authState.userState.userType,
    patientId: state.authState && state.authState.userState.patientId,
    serviceProvider: state.dashboardState && state.dashboardState.dashboardState.serviceProvider,
    impersinated: state.authState && state.authState.userState.impersinated,
    network: state.networkReducer && state.networkReducer.network
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServiceProvideContainer);