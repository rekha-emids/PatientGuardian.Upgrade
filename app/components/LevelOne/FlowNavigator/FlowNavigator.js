import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Text, View } from 'react-native';
import styles from './styles';
import images from '../../../assets/images';
import { CoreoImage } from '../../Base';

class FlowNavigator extends Component {
    render() {
        let dotsComponent = [],
         textComponent = []
        const menuList = this.props.coreoWizNavigationData && this.props.coreoWizNavigationData.map((menu, index) => {
                menu.id === this.props.activeFlowId
                    ? menu.status = 'active'
                    : menu.id < this.props.activeFlowId
                        ? menu.status = 'visited'
                        : menu.status = '';
                    if (menu.status === "visited"){
                        dotsComponent.push(<CoreoImage key={index} source={images.completed} style={styles.icon} />)
                        textComponent.push(<Text key={index} style={[
                        styles.textStyle,
                        styles.activeTextStyle
                        ]}>{menu.title}</Text>)
                    } else if (menu.status === "active"){
                        dotsComponent.push(<CoreoImage key={index} source={images.current} style={styles.icon} />)
                        textComponent.push(<Text key={index} style={[
                        styles.textStyle,
                        styles.activeTextStyle
                        ]}>{menu.title}</Text>)
                    } else {
                        dotsComponent.push(<View key={index} style={styles.emptyDot} />)
                        textComponent.push(<Text key={index} style={styles.textStyle}>{menu.title}</Text>)
                    }
            }),
         {connectorStyle, containerStyle} = this.props

        return (
            <View style={[
                styles.container,
                containerStyle
            ]}>
                <View style={[
                    styles.connector,
                    connectorStyle
                    ]} 
                />
                <View style={styles.contentContainer}>
                    {dotsComponent}
                </View>
                <View style={styles.contentTextContainer}>
                    {textComponent}
                </View>
            </View>
        )
    }
}

FlowNavigator.propTypes = {
    coreoWizNavigationData: PropTypes.array,
    activeFlowId: PropTypes.number
}

export default FlowNavigator;