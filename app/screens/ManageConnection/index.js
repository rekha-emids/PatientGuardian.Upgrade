import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View,TouchableOpacity} from 'react-native'
import {CoreoText, ModalPopup, CoreoScrollView} from '../../components';
import {getManageConnection,deleteRelationship,onAddIndividualDetails,onAddGuardianDetails, deleteRelationshipIndividual} from '../../redux/manageConnection/ManageConnectionData/actions'
import Icon from '../../components/Base/Icon';
import { setFontSize} from '../../utils/deviceDimensions';
import styles from './styles'
import {setUser}from '../../redux/profile/PersonalDetail/actions'
import {MY_CONNECTION_GUARDIAN,MY_CONNECTION_INDIVIDUAL, USER_TYPES} from '../../constants/constants'
import {onBack, navigateToScreenMainStack} from '../../redux/navigation/actions'
import CardListViewComponent from './GeneralComponent/index'
import { PATH } from '../../routes';
import { getPersonalDetail, getImage } from '../../redux/profile/PersonalDetail/actions';
import { SafeView, Navbar } from '../../components/LevelOne';
import ErrorBoundaryHOC from '../../ErrorBoundaryHOC';
import { updateNetworkConnectivity } from '../../services/OfflineSyncing';


class ManageConnection extends Component {
    static navigationOptions={
        title:'AddMemberDetails'
    }
    navigationParams = {}
    constructor(props) {
        super(props);
        this.state={
            showModalOnCancel:false,
            showDeleteModalIndividual : false, 
            patientName:'',
            patientId:'',
            type:''
        }
    };
    componentDidMount() {
        this.apiCall()
    }
         
    apiCall = () => {
        let params = this.props.navigation && this.props.navigation.state && this.props.navigation.state.params
        this.navigationParams = params
        this.props.getManageConnection(params && params.userType, params, updateNetworkConnectivity)
    }

    onIndividualDelete=(item)=>{
        this.setState({
            showDeleteModalIndividual:true,
            patientName:item.firstName+' '+item.lastName,
            patientId:item.patientId,
            type:MY_CONNECTION_INDIVIDUAL
        })
        
    }
    onGuardianDelete=(item)=>{
        this.setState({
            showModalOnCancel:true,
            patientName:item.firstName+' '+item.lastName,
            patientId:item.coreoHomeUserId,
            type:MY_CONNECTION_GUARDIAN
        })
        
    }
    onClickButtonCancel = () => {
        this.setState({
            showModalOnCancel: true
        });
    }

    onClickCancelIndividual = () => {
        this.setState({
            showDeleteModalIndividual: true
        });
    }

    onDelete=()=>{
        this.props.deleteRelationship(this.state.patientId,this.navigationParams, this.apiCall)
    }

    onDeleteIndividual=()=>{
        this.props.deleteRelationshipIndividual(this.state.patientId, this.apiCall)
    }

    onPressIndividualAdd=()=>{
        this.props.onAddIndividualDetails(this.navigationParams)
    }

    onPressGuardianAdd=()=>{
        this.props.onAddGuardianDetails(this.navigationParams)
    }

    profileView = (params) => {
        params = {
            fromManageConnection : true,
            ...params
        }
        this.props.setUser(false)
        this.props.goToProfile(params)
    }
   
    render(){
        const {navigation} = this.props || {};
        let params = navigation && navigation.state && navigation.state.params
        const manageConnection=this.props.manageConnection
        let individualList=null
        let guardianList=null
        if(manageConnection){
            individualList=this.props.manageConnection.filter((item) => {
                return item.userType === USER_TYPES.PATIENT
             });
            guardianList=this.props.manageConnection.filter((item) => {
                return item.userType === USER_TYPES.GUARDIAN
             });  
        }
         
        return (
            <SafeView>
                {/* <OverlayLoaderWrapper isLoading ={isAPIFetching(this.props.loadingStatus)}> */}
                <Navbar title="My Connections" showEmptyAdd={true}/>
                <CoreoScrollView>
                <TouchableOpacity style={styles.sectionViewStyle} onPress={this.onPressIndividualAdd}>
                    <CoreoText style={styles.sectionTextStyle}>Individuals</CoreoText>
                    <Icon name="md-add"  size={setFontSize(20)} style={styles.sectionIconStyle}/></TouchableOpacity>
                <CoreoScrollView>
               <CardListViewComponent goToProfile = {this.profileView} data={individualList} onPress={this.onIndividualDelete}/>
               </CoreoScrollView>
               {params && params.userType !== USER_TYPES.GUARDIAN ?
               <View>
                <TouchableOpacity style={styles.sectionViewStyle} onPress={this.onPressGuardianAdd}>
                    <CoreoText style={styles.sectionTextStyle}>Guardians</CoreoText>
                   <Icon name="md-add"  size={setFontSize(20)} style={styles.sectionIconStyle}/></TouchableOpacity>
                <CoreoScrollView>
                <CardListViewComponent goToProfile = {this.profileView} data={guardianList} onPress={this.onGuardianDelete}/>
                </CoreoScrollView>
                </View> :null}
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
                    >You have selected <CoreoText style={styles.patientNameText}>{this.state.patientName}.</CoreoText>{ `\n Do you want to remove this profile?`}       
                    </CoreoText>
                </ModalPopup>
                <ModalPopup
                    visible={this.state.showDeleteModalIndividual}
                    primaryButton="Remove"
                    secondaryButton="Cancel"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    customBtnFlag='true'
                    onConfirm={() => {
                        this.setState({
                            showDeleteModalIndividual: !this.state.showDeleteModalIndividual,
                        })
                        this.onDeleteIndividual();
                    }}
                    onCancel={() => this.setState({
                        showDeleteModalIndividual: !this.state.showDeleteModalIndividual,
                    })}
                >
                    <CoreoText 
                        style={styles.popupText}
                    >You have selected <CoreoText style={styles.patientNameText}>{this.state.patientName}.</CoreoText>{ `\n Do you want to remove this profile?`}       
                    </CoreoText>
                </ModalPopup>
                </CoreoScrollView>
                {/* </OverlayLoaderWrapper> */}
                    </SafeView>
        )
    }

    componentWillUnmount(){
        this.props.getPersonalDetail({});
        this.props.getImage({});
    }
}


function mapDispatchToProps(dispatch){
    return {
        getManageConnection:(data, params, updateNetworkOnResponse) => dispatch(getManageConnection(data, params, updateNetworkOnResponse)),
        deleteRelationship:(data, params, onSuccess)=>dispatch(deleteRelationship(data, params, onSuccess)),
        deleteRelationshipIndividual: (data, onSuccess) => dispatch(deleteRelationshipIndividual(data, onSuccess)),
        onAddIndividualDetails:(params)=>dispatch(onAddIndividualDetails(params)),
        onAddGuardianDetails:(params)=>dispatch(onAddGuardianDetails(params)),
        goBack: () => dispatch(onBack()),
        goToProfile: (params) => dispatch(navigateToScreenMainStack(PATH ? PATH.PATIENT_PROFILE : null, params)),
        getPersonalDetail: (data) => dispatch(getPersonalDetail(data)),
        getImage: (data) => dispatch(getImage(data)),
        setUser:(data)=>dispatch(setUser(data)),
        //  deleteGuardian: (data) => dispatch(deleteGuardian(data))
    }
}

function mapStateToProps(state, props) {
    let params = props.navigation && props.navigation.state.params
    let manageDetails = {
        manageConnection: state.manageConnectionState && state.manageConnectionState.manageConnectionDataState.manageConnection
    }
    if(params && params.id !== global.currentUserPatientId){
        const {impersonatedManageConnections} = state.manageConnectionState && state.manageConnectionState.manageConnectionDataState
        manageDetails = {
            manageConnection : impersonatedManageConnections && impersonatedManageConnections[params.id] ? impersonatedManageConnections[params.id].manageConnection : []
        }
    }
    return {
        ...manageDetails,
        guardianList: state.manageConnectionState && state.manageConnectionState.manageConnectionDataState.guardianList,
        userType: state.authState && state.authState.userState.userInfo.userType
    };
};

export default ErrorBoundaryHOC(connect(mapStateToProps, mapDispatchToProps)(ManageConnection))