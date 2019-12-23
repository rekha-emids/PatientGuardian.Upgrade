import React, { Component } from 'react';
import {View} from 'react-native';
import styles from './styles';
import {completed, current, pending} from '../../../assets/images';
import {CoreoImage} from '../../Base';

 class CoreoWizNavigation extends Component {

    flowCheck = (index) => {
        return (
            <View style={styles.tabicon}>
                <CoreoImage
                    key={index}
                    style={index === this.props.activeFlowId ? styles.activeTab : styles.inactiveTab}
                    source={
                        (index < this.props.activeFlowId) ? completed :
                            ((index === this.props.activeFlowId) ? current : pending)
                    }
                />
            </View>
        )
    }

    render() {
        let tabs= [];
        for(let i = 1; i < this.props.tablength + 1; i++){
            tabs.push(this.flowCheck(i));
        }
        return (
            <View style={styles.navtabs}>
                {tabs}
            </View>
        );
    }
}

export default CoreoWizNavigation;