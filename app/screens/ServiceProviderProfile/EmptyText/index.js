import React from 'react'
import {Text, View} from 'react-native'
import styles from './styles';
import { CoreoImage } from '../../../components';
import { NoData } from '../../../assets/images/Dashboard';
class EmptyText extends React.Component {
    render(){
        return (
        <View style = {styles.noDataView}>
            <CoreoImage style={styles.noInfoIcon} source={NoData} />
            <Text style={styles.text}>No data available.</Text>
        </View>
        )
    }
}
export default EmptyText