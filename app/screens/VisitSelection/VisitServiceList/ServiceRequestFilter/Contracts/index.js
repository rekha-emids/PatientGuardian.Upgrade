import React, {PureComponent} from 'react'
import {View} from 'react-native'
import {connect} from 'react-redux'
import { CoreoText, CoreoScrollView } from '../../../../../components';
import { RadioButton } from '../../../../../components/LevelOne';
import {getContract} from '../../../../../redux/careTeam/Dashboard/actions'
import styles from './styles'
import { setValueBasedOnHeight } from '../../../../../utils/deviceDimensions';

class Contracts extends PureComponent {

    componentDidMount(){
        const {contracts} = this.props
        if(!contracts){
            this.props.getContract()
        }
    }

    renderCohorts = () => {
        const {contracts, selectedContractId, onPress, onChangeContractId} = this.props
        return contracts && contracts.map((contract, index) => {
            return (
                <View style={styles.itemContainer} key={index}>
                    <RadioButton onPress={() => onPress(contract.membershipId)} isSelected={selectedContractId === contract.membershipId} onChangeContractId={onChangeContractId} />
                    <CoreoText style={styles.title}>{contract.membershipName}</CoreoText>
                </View>
            )
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <CoreoText style={styles.title}>Select Contract</CoreoText>
                <CoreoScrollView style={{marginBottom:setValueBasedOnHeight(10), marginRight:setValueBasedOnHeight(5)}}>
                {this.renderCohorts()}
                </CoreoScrollView>
            </View>
        )
    }
}

function mapStateToProps(state){
    let careTeamState = state.careTeamState
    return {
        contracts: careTeamState ? careTeamState.dashboardState.contracts : [] 
    }
}

function mapDispatchToProps(dispatch){
    return {
        getContract: () => dispatch(getContract())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contracts)