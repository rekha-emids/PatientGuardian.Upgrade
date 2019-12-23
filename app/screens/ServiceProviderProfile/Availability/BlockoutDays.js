import React, {PureComponent} from 'react'
import {ScrollView} from 'react-native'
import {connect} from 'react-redux'
import BlockOutDay from './BlockoutDay/index'
import EditProfileWrapper from '../../EditProfile/index'
import styles from './styles'

class BlockoutDays extends PureComponent {
    componentDidMount(){
        // this.props.getBlackOutDays(this.props.spId)
    }
    renderBlockoutDays = () => {
        const {blackoutDays} = this.props
        let content = blackoutDays && blackoutDays.blockOutDates && blackoutDays.blockOutDates.map((day, index) => {    
            return (
                <BlockOutDay isEditable={false} {...day} key={index} />
            )
        })
        return (
            <ScrollView style={styles.blockoutDays}>
                {content}
            </ScrollView>
        )
    }
    render(){
        return (
            <EditProfileWrapper 
            hideUpdate
            style={styles.contentStyle}
            title={`Blackout Days`}>
                {this.renderBlockoutDays()}
            </EditProfileWrapper>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        blackoutDays: state.impersonateProfileState.AvailabilityState.blackoutDays
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getBlackOutDays: (spId) => dispatch(getBlackOutDays(spId)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BlockoutDays)