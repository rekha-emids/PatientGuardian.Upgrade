import React from 'react'
import {Text, View} from 'react-native'
import {connect} from 'react-redux'
import styles from './styles'
import { getHeightWeight } from '../../../redux/profile/CoreoAssociation/actions';
import Header from '../Header'
import images from '../../../assets/images';
import { PATH } from '../../../routes';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';

class HeightWeightDetails extends React.Component {

    componentDidMount(){
        this.props.getHeightWeight()
    }

    onPressEdit = () => {
        const params = {
            heightWeightData: this.props.heightWeightData,
        }
        this.props.goToEditHeightWeightDetails(PATH.EDIT_HEIGHTWEIGHT_DETAILS, params)
    }

    render(){
        const {height, weight, emergencyContact} = this.props.heightWeightData

        return (
            <View style={styles.cardContainer}>
                <Header title="Vitals"
                showIcon={this.props.isEditable}
                isEditable={this.props.isEditable}
                icon = {images.edit}
                onPress={this.onPressEdit}/>
                <Text style={styles.fieldTitle}>Height</Text>
                <Text style={styles.fieldValue}>{`${height} Inches`}</Text>
                <Text style={styles.fieldTitle}>Weight</Text>
                <Text style={styles.fieldValue}>{`${weight} Lbs`}</Text>
            </View>
        )
    }
}
mapStateToProps = (state) => {
    return {
        heightWeightData: state.profileState && state.profileState.CoreoAssociationState.heightWeightData
    }
}

mapDispatchToProps = (dispatch) => {
    return {
        getHeightWeight: () => dispatch(getHeightWeight()),
        goToEditHeightWeightDetails: (path,params) => dispatch(navigateToScreenMainStack(path, params)),

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HeightWeightDetails)