import React from 'react'
import { Text, TouchableOpacity, Platform} from 'react-native';
import Icon from '../../../components/Base/Icon'
import { CoreoText } from '../../../components'
import Icons from '../../../assets/images/Icons'
import { setFontSize } from '../../../utils/deviceDimensions';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from '../../../constants/theme';

class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {isDiscardModalOpen: false}
    }

    render(){
        let icon = Icons.backArrowAndroid,
         checkMark = Icons.checkMarkAndroid

        if (Platform.OS === 'ios'){
            icon = Icons.backArrowIos
            checkMark = Icons.checkmarkIos
        }
        const {title, onClickBackButton, onClickUpdate} = this.props

        return (
            <LinearGradient colors={[
NAVBAR_COLOR1,
NAVBAR_COLOR2
]} style={[styles.navBar]}>
                <TouchableOpacity style={styles.icon} onPress={onClickBackButton}>
                    <Icon {...icon} size={setFontSize(20)} color="#ffffff" />
                </TouchableOpacity>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity style={styles.icon} onPress={onClickUpdate}>
                    <CoreoText style={[
styles.save,
!this.props.hideUpdate ? {} : {color: 'transparent'}
]}>Save</CoreoText>
                </TouchableOpacity>
            </LinearGradient>
        )
    }
}

export default Navbar