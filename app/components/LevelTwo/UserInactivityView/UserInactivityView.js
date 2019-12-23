import React, { Component } from 'react';
import UserInactivity from 'react-native-user-inactivity';
import {ModalPopup, CoreoText} from '../../';
import styles from './styles';

class UserInactivityView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showInactivityModal: false
        }
    }

    onInactivity = () => {
        this.setState({
            showInactivityModal: true
        });
    }

    render() {
        return (
            <UserInactivity
                timeForInactivity={this.props.timeForInactivity}
                checkInterval={1000}
                onInactivity={this.onInactivity}
                style={this.props.style}
            >
                {this.props.children}
                <ModalPopup
                    visible={this.state.showInactivityModal}
                    primaryButton="OK"
                    primaryColor="#3c1053"
                    onConfirm={() => {
                        this.setState({
                            showInactivityModal: !this.state.showInactivityModal,
                        }, () => {
                            this.props.onInactivity ? this.props.onInactivity(this.props.inactiveUser) : this.props.inactiveUser()
                        })
                    }}
                >
                    <CoreoText style={styles.message}>Your session has timed out due to inactivity. Please log in to continue</CoreoText>
                </ModalPopup>
            </UserInactivity>
        );
    }
};

export default UserInactivityView;