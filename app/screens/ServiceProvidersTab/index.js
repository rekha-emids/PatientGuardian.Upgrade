import React, {Component} from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux'
import { TabNavigator } from 'react-navigation';
import { THEME_PRIMARY_COLOR } from '../../constants/theme'
import RequestsTab from './RequestsTab/index'
import Browse from './Browse/index'
import FavouritesTab from './FavouritesTab/index'
import styles from './styles'
import RecentsTab from './RecentsTab';
import { NavbarWithImage } from '../../components';
import { navigateToScreenMainStack, replace } from '../../redux/navigation/actions';
import { PATH } from '../../routes';
import { getServiceCategories } from '../../redux/visitHistory/VisitServiceDetails/actions';
import { isAPIFetching } from '../../utils/AppAPIUtils';
import { getPatientRequests } from '../../redux/serviceProvidersTab/requestsTab/actions';
import { getFavouriteServiceProviders } from '../../redux/serviceProvidersTab/favouriteTab/actions';
import { INIT } from '../../constants/AppAPIConstants';
import { getRecentServiceProvider } from '../../redux/serviceProvidersTab/recentTab/actions';
import { getServiceProviders } from '../../redux/serviceProvidersTab/browseTab/actions';
import { SafeView } from '../../components/LevelOne';
import {getUserInfo} from '../../utils/userUtil'
import { USER_TYPES, OFFLINE_SCREENS } from '../../constants/constants';
import { updateNetworkConnectivity } from '../../services/OfflineSyncing';
import { store } from '../../redux/store';

export const BROWSE = "Browse"
export const SERVICEPROVIDERS_REQUESTS = " Requests"
export const FAVORITES = "Favorites"
export const RECENTS = "Recent"

class Empty extends React.Component {
  render() {
    return <View />
  }
}



const InternalTabs = TabNavigator && TabNavigator(
    {
      [BROWSE]: { screen: Browse },
      [SERVICEPROVIDERS_REQUESTS]: { screen: RequestsTab },
      [FAVORITES]: { screen: FavouritesTab },
      [RECENTS]: { screen: RecentsTab }
    },
    {
      ...TabNavigator.Presets.AndroidTopTabs,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: THEME_PRIMARY_COLOR,
      inactiveTintColor: "#8c8c8c",
      style: styles.tabBarStyle,
      showIcon : false,
      activeTabStyle : styles.activeTabStyle,
      labelStyle: styles.labelStyle,
      indicatorStyle: styles.indicatorStyle,
      upperCaseLabel: false,
      scrollEnabled: true,
      allowFontScaling:false
    },
    animationEnabled: false,
    swipeEnabled: false,
    lazy: true
  }
  );
  
  
 class ServiceProvidersTab extends Component {
  static navigationOptions = () => {
    return {
        tabBarOnPress({navigation, defaultHandler}) {

          let network = store.getState().networkReducer.network;
          __DEV__ && console.log ("network is: ",network)
                if(!network){
                    store.dispatch(replace(OFFLINE_SCREENS.SERVICEPROVIDER_SCREEN))
                }
            if (navigation.isFocused()) {
                // same tab was tapped twice
                // reset inner state
                return;
              }
            navigation.state.params && navigation.state.params.onTabFocus && navigation.state.params.onTabFocus();
            defaultHandler()
        }
    }
}
  IS_COMPONENT_MOUNTED = false
  constructor(props) {
    super(props);
    props.navigation.setParams({
        onTabFocus: this.handleTabFocus
      });
    }

  handleTabFocus = () => {
    if(this.IS_COMPONENT_MOUNTED && !isAPIFetching(this.props.loadingStatus)){
      if(global.selectedTab === SERVICEPROVIDERS_REQUESTS){
        this.props.selectedServiceRequestId && this.props.getPatientRequests(this.props.selectedServiceRequestId)
      }else if(global.selectedTab === FAVORITES){
        this.props.getFavouriteServiceProviders({pageNumber: 1, pageSize: 20, requestType: INIT})
      }else if(global.selectedTab === RECENTS){
        this.props.getRecentServiceProviders({requestType: INIT, pageNumber: 1, pageSize: 20})
      }else if(global.selectedTab === BROWSE){
        this.props.getServiceProviders(INIT, updateNetworkConnectivity)
      }
    }
  };
   componentDidMount(){
     this.props.getServiceCategories()
     this.IS_COMPONENT_MOUNTED = true
   }

   handleBelliconPressed =()=>{
    this.props.navigateToNotification()
    }

    render(){
      let RenderComponent = SafeView
      if(getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM){
        RenderComponent = View
      }
      return(
      <RenderComponent style={{ flex: 1 }}>
      <View style={{flex:1}}>
        <NavbarWithImage showImage={true} title="Service Providers" showBellIcon={false} onbelliconPressed={this.handleBelliconPressed} />
          <InternalTabs />
      </View>
      </RenderComponent>
      )
    }
  }

  function mapDispatchToProps(dispatch){
    return {
      getServiceCategories: () => dispatch(getServiceCategories()),
      getPatientRequests: (id) => dispatch(getPatientRequests(id)),
      navigateToNotification: () => dispatch(navigateToScreenMainStack(PATH ? PATH.NOTIFICATIONS_SCREEN : null)),
      getFavouriteServiceProviders: (requestObject) => dispatch(getFavouriteServiceProviders(requestObject)),
      getRecentServiceProviders: (requestObject) => dispatch(getRecentServiceProvider(requestObject)),
      getServiceProviders: (requestType, updateNetworkOnResponse) => dispatch(getServiceProviders(requestType, updateNetworkOnResponse)),
      replace: (screen) => dispatch(replace(screen)),
    }
  }

  function mapStateToProps(state) {
    return {
      loadingStatus: state.serviceProvidersTabState.requestsState.isLoading,
      selectedServiceRequestId: state.serviceProvidersTabState.requestsState.selectedServiceRequestId,
      network: state.networkReducer.network
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ServiceProvidersTab)
