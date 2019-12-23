import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import {
    View
} from 'react-native';
import {Preloader, Header} from '../../';
import UserInactivityView from '../../LevelTwo/UserInactivityView/UserInactivityView'
import { onTimeout } from '../../../redux/auth/Logout/actions'; 

class ScreenCover extends Component {
    render() {
        return (
            this.props.accessToken 
            ? <UserInactivityView
                timeForInactivity={this.props.timeForInactivity}
                inactiveUser={this.props.inactiveUser}
                style={this.props.style}
                onInactivity={this.props.onInactivity}
            > 
                {this.props.showHeader && <Header/>}
                {this.props.isLoading && <Preloader/>}
                {this.props.children}
            </UserInactivityView>
            : <View style={this.props.style}>
                {this.props.showHeader && <Header/>}
                {this.props.isLoading && <Preloader/>}
                {this.props.children}
            </View>
        );
    }
}

ScreenCover.propTypes = {
    children: PropTypes.any,
    isLoading: PropTypes.bool,
    showHeader: PropTypes.bool
}

function mapStateToProps(state) {
    let authState = state.authState && state.authState.userState

    return {
        timeForInactivity: authState ? authState.autoLogoutTime : 0,
        accessToken: authState ? authState.authData.access_token : ""
    }
}

function mapDispatchToProps(dispatch) {
    return {inactiveUser: () => dispatch(onTimeout())}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenCover);