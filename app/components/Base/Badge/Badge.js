import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { USER_TYPES } from '../../../constants/constants';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';


export default class Badge extends Component{
    render() {
        
        return (
            <View style={this.props.label === USER_TYPES.PATIENT ? styles.memBackground_I : this.props.label === USER_TYPES.GUARDIAN ? styles.memBackground_G : styles.memBackground_S }>
                <Text style={styles.bdgCount}>{this.props.label}</Text>
            </View>
        )
}
}

const styles = StyleSheet.create({
    memBackground_I: {
        display: 'flex',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#3089d7',
        marginTop: 33,
        marginLeft: 45
    },
    memBackground_G: {
        display: 'flex',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#ef6f48',
        marginTop: 33,
        marginLeft: 45
    },
    memBackground_S: {
        display: 'flex',
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: THEME_PRIMARY_COLOR,
        marginTop: 33,
        marginLeft: 45
    },
    bdgCount: {
        fontSize: 12,
        textAlign: 'center',
        color: '#fff',
        marginTop: 1
    }
})