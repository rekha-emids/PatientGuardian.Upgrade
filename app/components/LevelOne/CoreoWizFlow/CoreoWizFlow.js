import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';
import {PATH} from '../../../routes/index.js'
import styles from './styles';
import {elayer} from '../../../assets/images';
import {CoreoImage} from '../../';
import LinearGradient from 'react-native-linear-gradient';
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from '../../../constants/theme';

class CoreoWizFlow extends Component {
    render() {
        const {coreoWizNavigationData} = this.props

        const menuList = coreoWizNavigationData && coreoWizNavigationData.map((menu) => {
                menu.id === this.props.activeFlowId
                    ? menu.status = 'active'
                    : menu.id < this.props.activeFlowId
                        ? menu.status = 'visited'
                        : menu.status = '';

                if (menu.status === 'active') {
                    return (
                        <View key={menu.id}>
                            <Text style={styles.textStyle}>{menu.title}</Text>
                        </View>
                    )
                }
            });

        return (
            <LinearGradient colors={[
NAVBAR_COLOR1,
NAVBAR_COLOR2
]} style={styles.container}>
                <View style={styles.subContainer}>
                    <View style={{justifyContent: 'center'}}>{menuList}</View>
                    <TouchableOpacity onPress={this.props.goToHelp}>
                    <CoreoImage
                        style={styles.imagestyle}
                        source={elayer}
                    />
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
    }
}

CoreoWizFlow.propTypes = {
    coreoWizNavigationData: PropTypes.array,
    activeFlowId: PropTypes.number
}


function mapDispatchToProps(dispatch) {
    return {goToHelp: () => dispatch(navigateToScreenMainStack(PATH ? PATH.HELP : ''))};
  }
export default connect(
    null,
    mapDispatchToProps
  )(CoreoWizFlow);
