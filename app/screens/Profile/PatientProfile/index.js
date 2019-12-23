import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import {extractRole} from '../../../utils/roleUtil';
import {SCREENS} from '../../../constants/constants';
import { setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import Profile from '..';
import ErrorBoundaryHOC from '../../../ErrorBoundaryHOC';

class PatientProfile extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation && this.props.navigation.state.params
        this.state = {profileRole: extractRole(SCREENS.PROFILE)}
    }
  
    render() {
        return <Profile {...this.props} />
    }
}

const styles = StyleSheet.create({
    sectionContianer: {marginBottom: setValueBasedOnHeight(9)},
    footerContianer: {marginBottom: setValueBasedOnHeight(15)}
})

export default ErrorBoundaryHOC(PatientProfile)