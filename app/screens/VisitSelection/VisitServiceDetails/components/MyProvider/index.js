import React, {PureComponent} from 'react'
import ServiceProviderProfile from '../../../../ServiceProviderProfile';
import {connect} from 'react-redux'
import { OPEN_STATUS } from '../../../../../constants/constants';
import { BrowseServiceProviderPlaceholder } from '../../../../Dashboard/ServiceRequests/ServiceRequestContainer';
import { SERVICE_PROVIDERS } from '../../../../HomeTabs';
import { onBack } from '../../../../../redux/navigation/actions';

class MyProvider extends PureComponent {

    browseServiceProviders = () => {
        this.props.goBack()
        this.props.tabNavigation.navigate(SERVICE_PROVIDERS)
    }

    render(){
        const {serviceProviderId,visitServiceDetails, network} = this.props
        const customProps = {
            state: {
                params: {
                    id: serviceProviderId,
                    hideNavbar: true
                }
            }
        }
        if(visitServiceDetails && visitServiceDetails.statusId === OPEN_STATUS){
            return <BrowseServiceProviderPlaceholder browseServiceProviders={this.browseServiceProviders} network={network} />
        }else if(serviceProviderId)
        return (
            <ServiceProviderProfile navigation={customProps} />
        )
        return null
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        goBack: () => dispatch(onBack())
    }
}
const mapStateToProps = (state) => {
    let visitServiceDetailsState = state.visitSelectionState && state.visitSelectionState.VisitServiceDetailsState;
    return {
        visitServiceDetails: visitServiceDetailsState.VisitServiceDetails,
        serviceProviderId: visitServiceDetailsState.serviceProviderId,
        tabNavigation: state.dashboardState.dashboardState.tabNavigation,
        network: state.networkReducer.network,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProvider)
