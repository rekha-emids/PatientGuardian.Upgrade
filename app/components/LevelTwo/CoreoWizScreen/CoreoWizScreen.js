import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
    View,
    Keyboard,
    Text
} from 'react-native';
import {_} from '../../../utils/validations'
import { CoreoWizFooter } from '../..';
import styles from './styles';
import { Content } from 'native-base';

class CoreoWizScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyboard: false,
            keyboardHeight: 0
        }
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboard: false, keyboardHeight: 0 }))
    }

    _keyboardDidShow(e) {
        this.setState({ keyboard: true})
    }

    render() {
        return (
                <View style={[styles.container, this.props.style]}>
                    <Content>
                        {this.props.children}
                    </Content>
                    <View>
                        {this.props.showError
                            ? <View style={styles.errorContainer}>
                                <Text style={styles.errorMsg}>{this.props.errorMsg || "Please fill all mandatory fields"}</Text>
                            </View> : null
                        }
                        {!this.state.keyboard && 
                            <View> 
                                <CoreoWizFooter
                                    footerButtons={this.props.footerButtons}
                                    isNextDisabled={this.props.isNextDisabled}
                                    isSubmitDisabled={this.props.isSubmitDisabled}
                                    onNextClick={this.props.onNextClick}
                                    onCancelClick={this.props.onCancelClick}
                                    onPreviousClick={this.props.onPreviousClick}
                                    onSubmitClick={this.props.onSubmitClick}
                                    isSkipDisabled={this.props.isSkipDisabled}
                                    onSkipClick={this.props.onSkipClick}
                                    screen={this.props.screen}
                                />
                            </View>
                        }
                    </View>
                </View>
        )
    }
}

CoreoWizScreen.propTypes = {
    menus: PropTypes.array,
    footerButtons: PropTypes.array,
    isNextDisabled: PropTypes.bool,
    isSubmitDisabled: PropTypes.bool,
    onNextClick: PropTypes.func,
    onCancelClick: PropTypes.func,
    onPreviousClick: PropTypes.func,
    onSubmitClick: PropTypes.func,
    onSkipClick: PropTypes.func,
    screen: PropTypes.string
}

CoreoWizScreen.defaultProps = {
    scrollsToTop: true,
    keyboardProps: {}
}

export default CoreoWizScreen;