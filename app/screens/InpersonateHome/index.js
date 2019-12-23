import React, { Component } from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Home from '../Home/index'
import { onLogout } from '../../redux/auth/Logout/actions'; 
import {ScreenCover, CoreoText} from '../../components';
import { SafeView } from '../../components/LevelOne';
import styles from './styles';
import Icon from '../../components/Base/Icon'
import Icons from '../../assets/images/Icons';
import { setFontSize } from '../../utils/deviceDimensions';
import {  onBack } from '../../redux/navigation/actions';
import { clearSelectedPatientInfo } from '../../redux/auth/User/actions';

class InpersonateHome extends Component {

  onBtnPress = () =>{
    this.props.onLogout();
  }

  onPressBack = () =>{
    this.props.clearSelectedPatientInfo();
    this.props.goBack()
  }

  render() {
    let icon = Icons.backArrowAndroid
    if (Platform.OS === 'ios') {
        icon = Icons.backArrowIos
    }
    return (
      <ScreenCover>
        <View style={styles.backView}>
            <SafeView />
            <TouchableOpacity style={styles.leftView} onPress={this.onPressBack}>
                <Icon {...icon} size={setFontSize(20)}/>
                <CoreoText style={styles.backText}>Exit Individual</CoreoText>
            </TouchableOpacity>
        </View>
        <Home careteam={true}/>
      </ScreenCover>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return{
    onLogout:()=>dispatch(onLogout()),
    goBack: () => dispatch(onBack()),
    clearSelectedPatientInfo: () => dispatch(clearSelectedPatientInfo()),
    
  }
}

export default connect(null, mapDispatchToProps)(InpersonateHome);