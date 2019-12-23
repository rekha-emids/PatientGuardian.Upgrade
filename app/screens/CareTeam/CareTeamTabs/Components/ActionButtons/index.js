import React, { Component } from "react";
import { connect } from 'react-redux';
import {View, TouchableOpacity} from 'react-native';
import {
    CoreoImage
} from '../../../../../components';
import styles from './styles';
import {careteam_02, careteam_03, careteam_04, careteam_05 } from '../../../../../assets/images';

class ActionButtons extends Component {
 
    render() {
        return (
            <View style={styles.actionButtons}>
                {/* {this.props.onPressProfile &&
                    <TouchableOpacity onPress={this.props.onPressProfile}>
                        <CoreoImage
                            source={careteam_01}
                            style={styles.actionButton}
                        />
                    </TouchableOpacity>
                } */}
                {this.props.onPressInpersinate &&
                    <TouchableOpacity onPress={this.props.onPressInpersinate}>
                        <CoreoImage
                            source={careteam_02}
                            style={styles.actionButton}
                        />
                    </TouchableOpacity>
                }
                {this.props.onPressCall &&
                    <TouchableOpacity onPress={this.props.onPressCall}>
                        <CoreoImage
                            source={careteam_03}
                            style={styles.actionButton}
                        />
                    </TouchableOpacity>
                }
                {this.props.onPressConversation &&
                    <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPressConversation}>
                        <CoreoImage
                            source={careteam_04}
                            style={styles.actionButton}
                        />
                    </TouchableOpacity>
                }
                {this.props.onPressVideocall &&
                    <TouchableOpacity disabled={this.props.disabled} onPress={this.props.onPressVideocall}>
                        <CoreoImage
                            source={careteam_05}
                            style={styles.actionButton}
                        />
                    </TouchableOpacity>
                }
            </View>
        )
    }
}


export default connect(null, null)(ActionButtons);