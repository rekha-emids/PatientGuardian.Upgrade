import React,  {Component} from 'react'
import {WebView} from 'react-native'
import {connect} from 'react-redux'
import {onBack} from '../../../redux/navigation/actions'
import {getpaymentsCardList} from '../../../redux/menu/payment/actions'
import { paymentURL, API } from '../../../services/api';
import { SafeView } from '../../../components/LevelOne';


class WebViewAddCard extends Component {
    popRoute = false
    onNavigationChange = (data) => {
        if(data.url.toLowerCase() === (paymentURL.toLowerCase() + API.successPayment.toLowerCase()) && !this.popRoute){
           this.popRoute = true
           this.props.goBack()
           this.props.getpaymentsCardList()
        }else if(data.url.toLowerCase() === paymentURL.toLowerCase() + API.closePaymentUrl.toLowerCase() && !this.popRoute){
            this.popRoute = true
            this.props.goBack()
        }
    }
    render(){
        let url = paymentURL + API.saveCard + this.props.patientId
        return (
            <SafeView>
            <WebView
                source={{uri: url}}
                style={{marginTop: 0}}
                onNavigationStateChange={this.onNavigationChange}
                scalesPageToFit
                javaScriptEnabled
                domStorageEnabled
                startInLoadingState
                mixedContentMode="always"
            />
            </SafeView>
        )
    }
}

function mapStateToProps(state){
    return {
        patientId: state.authState.userState.patientId
    }
}

function mapDispatchToProps(dispatch){
    return {
        goBack: () => dispatch(onBack()),
        getpaymentsCardList: () => dispatch(getpaymentsCardList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WebViewAddCard)
