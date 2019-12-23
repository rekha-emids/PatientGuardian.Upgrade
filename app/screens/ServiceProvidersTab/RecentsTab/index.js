import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'
import styles from './styles'
import { ListScrollerAPIWrapper } from '../../../components/LevelOne';
import BrowseServiceProviderCard from '../Browse/components/BrowseServiceProviderCard';
import { getRecentServiceProvider } from '../../../redux/serviceProvidersTab/recentTab/actions';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { PullDownRefreshComponent } from '../../../components/LevelOne/Navbar';
import { RECENTS } from '..';
import { INIT } from '../../../constants/AppAPIConstants';


class RecentsTab extends PureComponent {

    IS_COMPONENT_MOUNTED = false
    constructor(props){
        super(props)
        props.navigation && props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });
    }

    handleTabFocus = () => {
        if(this.IS_COMPONENT_MOUNTED && !isAPIFetching(this.props.getRecentSpStatus)){
            this.apiCall({pageNumber: 1, pageSize: 20, requestType: INIT})
        }
        this.IS_COMPONENT_MOUNTED = true
      };

    componentDidMount(){
        this.props.navigation && this.props.navigation.addListener('didFocus', (route) => {
            global.selectedTab = RECENTS
            this.handleTabFocus()
        });
        this.IS_COMPONENT_MOUNTED = true
    }

    apiCall = (requestObject) => {
        this.props.getServiceProviders(requestObject)
    }

    render(){
        const {getRecentSpStatus, serviceProviders} = this.props.recentState || {}
        return (
            <View style={{flex: 1}}>
                <PullDownRefreshComponent />
                <View style={styles.margin}>
                    <ListScrollerAPIWrapper
                        data={serviceProviders}
                        itemKey={"serviceProviderId"}
                        renderComponent={BrowseServiceProviderCard}
                        isPaginationEnabled={true}
                        apiSaga={this.apiCall}
                        networkCallStatus={getRecentSpStatus}
                        noItemsText={"No recent service provider activity at this time. This will update with new activity."}
                    />
                </View>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        recentState: state.serviceProvidersTabState && state.serviceProvidersTabState.recentState,
    }
}

function mapDispatchToProps(dispatch){
    return {
        getServiceProviders: (requestObject) => dispatch(getRecentServiceProvider(requestObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentsTab)