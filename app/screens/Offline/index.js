import React, { PureComponent } from 'react';
import {
    View
    
} from 'react-native';
import { SafeView } from '../../components/LevelOne';
import { connect } from 'react-redux';
import Navbar from '../../components/LevelOne/Navbar';
import OfflineStyle from "./style"
import { CoreoText, CoreoImage, CoreoOpacityButton } from '../../components';
import {  resetStack } from '../../redux/navigation/actions';
import { PATH } from '../../routes';
class OfflineScreen extends PureComponent {
    constructor(props){
        super(props);
        this.goToDashBoard = this.goToDashBoard.bind(this)
    }

    goToDashBoard(){
        this.props.goToDashBoard()
    }

    render() {
        __DEV__ && console.log("OFFLINE RENDER")
        let screenName = this.props.navigation && this.props.navigation.state.params && this.props.navigation.state.params.screen || 'Conversation Summary'

        return (
            <SafeView>
                {/* <View style={OfflineStyle.wrapperView}> */}
                    <Navbar title={screenName} screenName={screenName}/>
                {/* </View > */}
                <View style={OfflineStyle.mainComponent}>
                    <View>
                        <CoreoImage
                            style={OfflineStyle.offlineImage}
                            source={require('../../assets/images/Offline/offline_mode.png')}
                            resizeMode="contain"
                        />
                        <CoreoText
                            style={OfflineStyle.internetText}
                            numberOfLines={2}
                        >
                            Looks like you are not connected to the internet
                </CoreoText>

                        <CoreoText
                            style={OfflineStyle.guideText}
                            numberOfLines={2}
                        >
                            This requires connectivity to the access data.
                            Please try again with network access
                </CoreoText>
                        <CoreoOpacityButton
                            onPress = {this.goToDashBoard}
                            text={"Go To Dashboard"}
                            style={OfflineStyle.btnStyle}
                            textStyle={OfflineStyle.textStyle}
                        >
                        </CoreoOpacityButton>

                    </View>

                </View>
            </SafeView>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({goToDashBoard: () => dispatch(resetStack(PATH ? PATH.HOME_SCREEN : null))})
const mapStateToProps = (state) => ({
        network: state.networkReducer && state.networkReducer.network,
        navigationState: state.navigationState
    })



export default connect(mapStateToProps, mapDispatchToProps)(OfflineScreen);