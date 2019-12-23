import React, { PureComponent } from 'react';
import { Text,  View } from 'react-native';
import { Content } from 'native-base';
import { connect } from 'react-redux'
import { reduxForm, Field, submit, reset } from 'redux-form';
import { onBack } from '../../../redux/navigation/actions'
import { deletePointService,  addPointServiceFailure} from '../../../redux/profile/PointService/actions'
import FormConstants from './FormConstants'
import EditProfileWrapper from '../index'
import ReduxFormTextInput from '../../../components/Base/ReduxFormTextInput/index'
import localValidation from './validations/localValidations'
import submitValidations from './validations/submitValidations'
import styles from './styles'
import ReduxFormCheckBox from '../../../components/Base/ReduxFormCheckBox';
import {generatePickerValues, getArrayFromNormalizedData} from '../../../utils/appUtils'
import { ActionType, NO_STATE } from '../../../constants/constants';
import { ReduxFormPicker, ModalPopup } from '../../../components';
import { PATH } from '../../../routes';


class EditPointofServiceForm extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            pointOfServiceModified: false,
            updateTextInput: false
        }
    }
    onClickUpdate = () => {
        this.props.dispatch(submit(FormConstants.EDIT_POINT_OF_SERVICE_FORM))
    }

    onNavigateBack = () => {
        this.props.dispatch(reset(FormConstants.EDIT_POINT_OF_SERVICE_FORM))
    }

    deletePointService = () => {
        const {pointOfServiceDetails } = this.props.navigation.state.params || {}
        let addressId = pointOfServiceDetails && pointOfServiceDetails.addressId;
        this.props.deletePointService(addressId, this.props.onBack)
    }

    onChangeInput = () => {
        this.setState({
            updateTextInput: !this.state.updateTextInput
        })
    }

    onFormInputChange = () =>{
        this.setState({
            pointOfServiceModified: true
        })
    }
    addPointServiceFailure = () => {
        this.props.addPointServiceFailure(false)
    }
    render() {
        const { navigation } = this.props
        __DEV__ && console.log("navigation for pos: ",navigation)
        const { type } = navigation.state.params || {}
        let stateData = generatePickerValues(
            getArrayFromNormalizedData(this.props.cityDetail), "name", "id")
        let updatedStateData = stateData.filter(state => state.value !== NO_STATE);
        return (
            <Content style={styles.contentContainer}>
            <EditProfileWrapper
            onConfirm={this.onConfirm}
            customRenderComponent={true}
                onClickUpdate={this.onClickUpdate}
                contentStyle={styles.container}
                onNavigateBack={this.onNavigateBack}
                style={styles.container}
                containerStyle={styles.containerStyle}
                customRenderComponent={true}
                title={type === ActionType.EDIT ? 'Edit Point of Service' : 'Add Point of Service'}
                pointOfServiceModified = {this.state.pointOfServiceModified}
                injectFunction
                >

                        <View style={styles.fieldWrapper}>
                        <Field
                            name={FormConstants.ADDRESS_TYPE}
                            component={ReduxFormTextInput}
                            props={{
                                label: "Address Type",
                                maxLength: 15,
                                onFormInputChange: this.onFormInputChange,
                                screen: PATH? PATH.PROFILE: null,
                                updateTextInput: this.state.updateTextInput,
                                onChangeInput: this.onChangeInput
                            }}
                        />
                        <Field
                            name={FormConstants.STREET}
                            component={ReduxFormTextInput}
                            props={{
                                label: "Street",
                                maxLength: 500,
                                onFormInputChange: this.onFormInputChange,
                                screen: PATH? PATH.PROFILE: null,
                                updateTextInput: this.state.updateTextInput,
                                onChangeInput: this.onChangeInput
                            }}
                        />
                        </View>
                        <View style={styles.fieldWrapper}>
                        <Field
                            name={FormConstants.CITY}
                            component={ReduxFormTextInput}
                            props={{
                                label: "City",
                                maxLength: 500,
                                onFormInputChange: this.onFormInputChange,
                                screen: PATH? PATH.PROFILE: null,
                                updateTextInput: this.state.updateTextInput,
                                onChangeInput: this.onChangeInput
                            }}
                        />
                        </View>
                        <View style={styles.fieldWrapper}>
                         <Field
                        name={FormConstants.STATE}
                        component={ReduxFormPicker}
                        props={{
                            label: "State",
                            placeholder:"Select State",
                            items: updatedStateData,
                                onFormInputChange: this.onFormInputChange,
                                screen: PATH? PATH.PROFILE: null,
                                updateTextInput: this.state.updateTextInput,
                                onChangeInput: this.onChangeInput
                        }}
                        />
                        </View>
                        <View style={styles.fieldWrapper}>
                        <Field
                            name={FormConstants.ZIP_CODE}
                            component={ReduxFormTextInput}
                            props={{
                                label: "Zip Code",
                                keyboardType: "numeric",
                                maxLength: 5,
                                onFormInputChange: this.onFormInputChange,
                                screen: PATH? PATH.PROFILE: null,
                                updateTextInput: this.state.updateTextInput,
                                onChangeInput: this.onChangeInput
                            }}
                        />
                        </View>

                    <Field
                            name={FormConstants.PRIMARY_ADDRESS}
                            component={ReduxFormCheckBox}
                            props={{
                                title: "Mark it as Preferred Point of Service",
                                onFormInputChange: this.onFormInputChange,
                                screen: PATH? PATH.PROFILE: null,
                                updateTextInput: this.state.updateTextInput,
                                onChangeInput: this.onChangeInput
                            }}
                        />
                    
                <ModalPopup
                        visible={this.props.isAddPointServiceFailed}
                        primaryButton="OK"
                        primaryColor="#3c1053"
                        onConfirm={this.addPointServiceFailure}
                    >
                        <Text style={styles.message}>Address entered is invalid</Text>
                    </ModalPopup>
            </EditProfileWrapper>
            </Content>
            

        )
    }
}

const mapStateToProps = (state, props) => {

    const { type, pointOfServiceDetails } = props.navigation && props.navigation.state.params || {}
    let initialValues = {}
    let addressId = 0
    if(type === ActionType.EDIT){
        initialValues = {
            [FormConstants.ADDRESS_TYPE]: pointOfServiceDetails.addressTypeId,
            [FormConstants.STREET]: pointOfServiceDetails.street,
            [FormConstants.CITY]: pointOfServiceDetails.city,
            [FormConstants.STATE]: pointOfServiceDetails.stateId,
            [FormConstants.PRIMARY_ADDRESS]: pointOfServiceDetails.isPrimaryAddress,
            [FormConstants.ZIP_CODE]: pointOfServiceDetails.zip ? pointOfServiceDetails.zip.toString() : "",
        }
        addressId = pointOfServiceDetails.addressId
    }
    let dashboardState = state.DashboardState;
    let form = state.form;
    return {
        initialValues,
        addressId,
        PointServiceList: state.profileState.PointServiceState.PointServiceList,
        addPointServiceSuccess: state.profileState.PointServiceState
            .addPointServiceSuccess,
            isAddPointServiceFailed: state.profileState.PointServiceState
            .addPointServiceFailure,
        PointServiceFieldDetails: state.profileState.PointServiceState
            .PointServiceFieldDetails,
        EditPointofServiceFormState: form && form[FormConstants.EDIT_POINT_OF_SERVICE_FORM],
        cityDetail: dashboardState && dashboardState.dashboardState.lookupDetails.state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: () => dispatch(onBack()),
        // getPointService: () => dispatch(getPointService()),
        // addPointService: data => dispatch(addPointService(data)),
        // updatePointService: data => dispatch(updatePointService(data)),
        deletePointService: (data, onSuccesss) => dispatch(deletePointService(data, onSuccesss)),
        addPointServiceFailure: (data) => dispatch(addPointServiceFailure(data))
    }
}

const EditPointofServiceReduxForm = reduxForm({
    form: FormConstants.EDIT_POINT_OF_SERVICE_FORM,
    validate: localValidation,
    onSubmit: submitValidations,
    destroyOnUnmount: true
})(EditPointofServiceForm)

export default connect(mapStateToProps, mapDispatchToProps)(
    EditPointofServiceReduxForm
)
