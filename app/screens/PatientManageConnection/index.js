import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { CoreoText, ModalPopup } from '../../components';
import { getManageConnection, deleteRelationship, onAddIndividualDetails, onAddGuardianDetails, deleteRelationshipIndividual } from '../../redux/manageConnection/ManageConnectionData/actions'
import { navigateToScreenMainStack } from '../../redux/navigation/actions'
import {setUser}from '../../redux/profile/PersonalDetail/actions'
import Images from '../../assets/images'
import { PATH } from '../../routes';
import Header from '../Profile/Header';
import styles from './styles'
import { MY_CONNECTION_GUARDIAN, MY_CONNECTION_INDIVIDUAL, USER_TYPES } from '../../constants/constants'
import CardListViewComponent from './GeneralComponent/index'

class PatientManageConnection extends Component {
    static navigationOptions = {
        title: 'AddMemberDetails'
    }
    constructor(props) {
        super(props);
        this.state = {
            showModalOnCancel: false,
            patientName: '',
            patientId: '',
            type: ''
        }
    };
    componentDidMount() {
        this.apiCall()
    }
    apiCall = () => {
        this.props.getManageConnection(this.props.params && this.props.params.userType, this.props.params)
    }
  
    onIndividualDelete = (item) => {
        this.setState({
            showModalOnCancel: true,
            patientName: item.firstName + ' ' + item.lastName,
            patientId: item.patientId,
            type: MY_CONNECTION_INDIVIDUAL
        })

    }

    onGuardianDelete = (item) => {
        this.setState({
            showModalOnCancel: true,
            patientName: item.firstName + ' ' + item.lastName,
            patientId: item.coreoHomeUserId,
            type: MY_CONNECTION_GUARDIAN
        })

    }
    onClickButtonCancel = () => {
        this.setState({
            showModalOnCancel: true
        });
    }

    onDelete = () => {
        if(this.state.type === MY_CONNECTION_GUARDIAN){
            this.props.deleteRelationship(this.state.patientId, this.props.params, this.apiCall)
        }else{
            this.props.deleteRelationshipIndividual(this.state.patientId, this.apiCall)
        }
    }

    onPressIndividualAdd = () => {
        this.props.onAddIndividualDetails()
    }

    onPressGuardianAdd = () => {
        this.props.onAddGuardianDetails()
    }

    goToManageConnection = () => {
        this.props.goToManageConnection(this.props.params)
    }

    render() {
        let image = Images.edit
        const manageConnection=this.props.manageConnection
        let individualList=null
        let guardianList=null
        let showMyConnections = this.props.params && this.props.params.id === global.currentUserPatientId || this.props.params && this.props.params.id === this.props.currentUser
        let showViewIcon = this.props.params &&  !this.props.params.fromManageConnection && this.props.isEditable
        if(manageConnection){
            individualList= this.props.manageConnection && this.props.manageConnection.filter((item) => {
                return item.userType === USER_TYPES.PATIENT
             });
            guardianList= this.props.manageConnection && this.props.manageConnection.filter((item) => {
                return item.userType === USER_TYPES.GUARDIAN
             });  
        }

        return (
            <View>
                <View style={styles.cardContainer}>
                    <Header title="My Connections"
                        showIcon={showViewIcon}
                        icon={image}
                        onPress={this.goToManageConnection}
                    />
                </View>
        
                    <View>
                        <View style={styles.sectionViewStyle}>
                            <CoreoText style={styles.sectionTextStyle}>Individuals</CoreoText>
                        </View>
                        <CardListViewComponent emptyText={"Individual"} goToManageConnection={this.goToManageConnection} showMyConnections={showViewIcon} data={individualList} onPress={this.onIndividualDelete} setUser={this.props.setUser}  goToProfile={this.props.goToProfile} isIndividualOrGuardianMyConnection = {true}/>
                    </View>
                   

                {this.props.params && this.props.params.userType !== USER_TYPES.GUARDIAN ?
                    <View>
                        <View style={styles.guardianViewStyle}>
                            <CoreoText style={styles.sectionTextStyle}>Guardians</CoreoText>
                        </View>
                        <CardListViewComponent emptyText={`Guardian: Guardian appears once they onboard`} goToManageConnection={this.goToManageConnection} showMyConnections={showViewIcon} data={guardianList} onPress={this.onGuardianDelete} setUser={this.props.setUser}  goToProfile={this.props.goToProfile} isIndividualOrGuardianMyConnection = {true}/>
                    </View> :
                    null}

                <ModalPopup
                    visible={this.state.showModalOnCancel}
                    primaryButton="Remove"
                    secondaryButton="Cancel"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    customBtnFlag='true'
                    onConfirm={() => {
                        this.setState({
                            showModalOnCancel: !this.state.showModalOnCancel,
                        })
                        this.onDelete();
                    }}
                    onCancel={() => this.setState({
                        showModalOnCancel: !this.state.showModalOnCancel,
                    })}
                >
                    <CoreoText
                        style={styles.popupText}
                    >You have selected <CoreoText style={styles.patientNameText}>{this.state.patientName}.</CoreoText>{`\n Do you want to remove this profile?`}
                    </CoreoText>
                </ModalPopup>
            </View>
        )
    }
}


function mapDispatchToProps(dispatch) {
    return {
        setUser:(data)=>dispatch(setUser(data)),
        goToProfile: (params, showViewIcon) => dispatch(navigateToScreenMainStack(PATH ? PATH.PATIENT_PROFILE : null, params, showViewIcon)),
        getManageConnection: (data, params) => dispatch(getManageConnection(data, params)),
        deleteRelationship: (data, params, onSuccess) => dispatch(deleteRelationship(data, params, onSuccess)),
        deleteRelationshipIndividual: (data, onSuccess) => dispatch(deleteRelationshipIndividual(data, onSuccess)),
        onAddIndividualDetails: () => dispatch(onAddIndividualDetails()),
        onAddGuardianDetails: () => dispatch(onAddGuardianDetails()),
        goToManageConnection: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.MANAGE_CONNECTION : null, params))

    }
}

function mapStateToProps(state, props) {
    let params = props.params
    let authState = state.authState;
    let manageDetails = {
        manageConnection: state.manageConnectionState && state.manageConnectionState.manageConnectionDataState.manageConnection
    }
    if(params && params.id !== global.currentUserPatientId){
        const {impersonatedManageConnections} = state.manageConnectionState && state.manageConnectionState.manageConnectionDataState || {}
        manageDetails = {
            manageConnection : impersonatedManageConnections && impersonatedManageConnections[params.id] ? impersonatedManageConnections[params.id].manageConnection : []
        }
    }
    return {
        userType: authState && state.authState.userState.userInfo.userType,
        loggedInUser : authState && state.authState.userState.userInfo.userId,
        currentUser : authState && state.authState.userState.patientId,
        ...manageDetails
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientManageConnection)