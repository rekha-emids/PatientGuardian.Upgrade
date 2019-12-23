import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {View} from 'react-native'
import { getFavouriteServiceProviders } from '../../../redux/serviceProvidersTab/favouriteTab/actions';
import { ListScrollerAPIWrapper } from '../../../components/LevelOne';
import BrowseServiceProviderCard from '../Browse/components/BrowseServiceProviderCard';
import styles from './styles'
import { PullDownRefreshComponent } from '../../../components/LevelOne/Navbar';
import { FAVORITES } from '..';
import { INIT } from '../../../constants/AppAPIConstants';
import { isAPIFetching } from '../../../utils/AppAPIUtils';

class FavouritesTab extends PureComponent {
    IS_COMPONENT_MOUNTED = false
    constructor(props){
        super(props)
        props.navigation && props.navigation.setParams({
            onTabFocus: this.handleTabFocus
        });
    }

    handleTabFocus = () => {
        if(this.IS_COMPONENT_MOUNTED && !isAPIFetching(this.props.getFavSPStatus)){
            this.apiCall({pageNumber: 1, pageSize: 20, requestType: INIT})
        }
        this.IS_COMPONENT_MOUNTED = true
      };

    componentDidMount(){
        this.props.navigation && this.props.navigation.addListener('didFocus', (route) => {
            global.selectedTab = FAVORITES
            this.handleTabFocus()
        });
        this.IS_COMPONENT_MOUNTED = true
    }

    apiCall = (requestObject) => {
        this.props.getServiceProviders(requestObject)
    }

    render(){
        const {getFavSPStatus, serviceProviders} = this.props.favoriteState || {}
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
                    networkCallStatus={getFavSPStatus}
                    noItemsText={"No favorites have been identified at this time. Click the favorite icon on a service provider."}
                />
            </View>
            </View>
        )
    }
}

function mapStateToProps(state){
    return {
        favoriteState: state.serviceProvidersTabState && state.serviceProvidersTabState.favoriteState,
    }
}

function mapDispatchToProps(dispatch){
    return {
        getServiceProviders: (requestObject) => dispatch(getFavouriteServiceProviders(requestObject)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesTab)
