import React, { Component } from 'react'
import { View, WebView } from 'react-native'
import { connect } from 'react-redux'
import Navbar from '../../../components/LevelOne/Navbar';
import { CoreoImage } from '../../../components';
import {getAboutUs} from '../../../redux/menu/aboutUs/actions'
import styles from './styles'
import images from '../../../assets/images';
import { SafeView } from '../../../components/LevelOne';
import { updateNetworkConnectivity } from '../../../services/OfflineSyncing';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { CoreoActiveIndicator } from '../../../components/Base/Preloader/Preloader';


class AboutUs extends Component {

    componentDidMount(){
        this.props.getAboutUsCode()
    }

    onLoadEnd = () => {
        if (!this.props.network){
            updateNetworkConnectivity(true)
        }
    }
    render() {
        __DEV__ && console.log("RENDER IN ABOUT US")
        const {code, buildVersion, loadingStatus} = this.props
        let content;

        if (isAPIFetching(loadingStatus)){
            return <CoreoActiveIndicator />
        } else if (!code) { 
            return null
        } else {
            const versionContent = `<span class=\"AboutUsVersion\">Version ${buildVersion}</span>`

            content = code.replace('<span class=\"AboutUsVersion\">Version 1.0</span>', versionContent);
        }
        return (
            <SafeView>
            <View style={styles.container}>
                <Navbar title="About Us" showEmptyAdd={true} />
                <CoreoImage style={styles.logo} source={images.logo} />
                <WebView
                originWhitelist={['*']}
                source={{html: content}}
                onLoadEnd = {this.onLoadEnd}
                 />
            </View>
            </SafeView>
        )
    }
}

function mapStateToProps(state){
    let menuState = state.menuState;
    return {
        code: menuState && state.menuState.aboutUsState.contentCode,
        buildVersion: menuState && state.menuState.aboutUsState.buildVersion,
        network: state.networkReducer && state.networkReducer.network,
        loadingStatus: menuState && state.menuState.aboutUsState.loadingStatus
    }
}

function mapDispatchToProps(dispatch){
    return {
        getAboutUsCode: () => dispatch(getAboutUs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs)