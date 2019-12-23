import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import {completed, guardian, individual} from '../../../assets/images';

class IconList extends Component {
    
    render() {
        const textColor = this.props.profile.selected ? "#f1e7f7" : "#ffffff";

        return (
            <TouchableOpacity onPress={this.props.onSelectProfile}>
                <View style={[
styles.container,
{ backgroundColor: textColor }
]}>
                    <View style={styles.optionitem}>
                        <Image
                            style={styles.center}
                            source={this.props.profile.imageClass == 'individual' ? individual : guardian}
                        />
                        <View style={styles.itemdetail}>
                            <Text style={styles.fontstyle}>{this.props.profile.name}</Text>
                            <Text style={styles.desc}>{this.props.profile.desc}</Text>
                        </View>
                    </View>
                    <View style={styles.selectedItem}>
                        {this.props.profile.selected ? <Image
                            style={styles.selected}
                            source={completed}
                        /> : null}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default IconList;