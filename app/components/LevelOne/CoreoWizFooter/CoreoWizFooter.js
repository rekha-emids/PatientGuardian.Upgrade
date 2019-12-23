import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { CoreoOpacityButton } from "../../";
import {BUTTONS} from '../../../constants/config';
import {BUTTON_COLOR_DISABLED, BUTTON_COLOR_ENABLED} from '../../../constants/theme';
import {checkExistDataInArray} from '../../../utils/validations';
import styles from './styles';

class CoreoWizFooter extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.footerButtons && checkExistDataInArray(this.props.footerButtons, BUTTONS.CANCEL) &&
                    <CoreoOpacityButton
                        onPress={this.props.onCancelClick}
                        disabled={false}
                        textStyle={styles.fontStyle}
                        text={'Cancel'}
                    />
                }
                <View style={styles.groupButtonsContainer}>
                
                    {this.props.screen !== "AddGuardianDetails" && this.props.footerButtons && checkExistDataInArray(this.props.footerButtons, BUTTONS.SKIP) &&
                        
                        <CoreoOpacityButton
                            onPress={this.props.onSkipClick}
                            disabled={this.props.isSkipDisabled}
                            textStyle={[
styles.fontStyle,
{color: this.props.isSkipDisabled ? BUTTON_COLOR_DISABLED : BUTTON_COLOR_ENABLED}
]}
                            text={'Skip'}
                        />
                    }
                    {this.props.footerButtons && checkExistDataInArray(this.props.footerButtons, BUTTONS.PREVIOUS) &&
                        <CoreoOpacityButton
                            onPress={this.props.onPreviousClick}
                            disabled={false}
                            textStyle={[
styles.fontStyle,
{color: BUTTON_COLOR_ENABLED}
]}
                            text={'Prev'}
                        />
                    }
                    {this.props.footerButtons && checkExistDataInArray(this.props.footerButtons, BUTTONS.ADD) &&
                        <CoreoOpacityButton
                            onPress={this.props.onNextClick}
                            disabled={this.props.isNextDisabled}
                            textStyle={[
styles.fontStyle,
{color: this.props.isNextDisabled ? BUTTON_COLOR_DISABLED : BUTTON_COLOR_ENABLED}
]}
                            text={'Add'}
                        />
                    }
                    
                    {this.props.footerButtons && checkExistDataInArray(this.props.footerButtons, BUTTONS.NEXT) &&
                        <CoreoOpacityButton
                            onPress={this.props.onNextClick}
                            disabled={this.props.isNextDisabled}
                            style={styles.buttonmargin}
                            textStyle={[
styles.fontStyle,
{color: this.props.isNextDisabled ? BUTTON_COLOR_DISABLED : BUTTON_COLOR_ENABLED}
]}
                            text={'Next'}

                        />
                    }
                     {this.props.footerButtons && checkExistDataInArray(this.props.footerButtons, BUTTONS.POST) &&
                        <CoreoOpacityButton
                            onPress={this.props.onNextClick}
                            disabled={this.props.isNextDisabled}
                            style={styles.buttonmargin}
                            textStyle={[
styles.fontStyle,
{color: this.props.isNextDisabled ? BUTTON_COLOR_DISABLED : BUTTON_COLOR_ENABLED}
]}
                            text={'Post'}

                        />
                    }
                    {this.props.footerButtons && checkExistDataInArray(this.props.footerButtons, BUTTONS.SUBMIT) &&
                        <CoreoOpacityButton
                            onPress={this.props.onSubmitClick}
                            disabled={this.props.isSubmitDisabled}
                            style={styles.buttonmargin}
                            textStyle={[
styles.fontStyle,
{color: this.props.isSubmitDisabled ? BUTTON_COLOR_DISABLED : BUTTON_COLOR_ENABLED}
]}
                            text={'Submit'}
                        />
                    }
                </View>
            </View>
        )
    }
}

CoreoWizFooter.propTypes = {
    footerButtons: PropTypes.array,
    onCancelClick: PropTypes.func,
    onNextClick: PropTypes.func,
    isNextDisabled: PropTypes.bool,
    onPreviousClick: PropTypes.func,
    onSubmitClick: PropTypes.func,
    isSubmitDisabled: PropTypes.bool,
    onSkipClick: PropTypes.func
}

export default CoreoWizFooter;