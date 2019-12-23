import React, { PureComponent } from 'react';
import {  View } from 'react-native';
import {  Content } from 'native-base';
import { connect } from 'react-redux'
import { reduxForm, Field, submit, reset } from 'redux-form';
import { updatePersonalDetail, uploadImg } from '../../../redux/profile/PersonalDetail/actions'
import { onBack } from '../../../redux/navigation/actions'
import FormConstants from './FormConstants'
import EditProfileWrapper from '../index'
import ImagePicker from '../../../components/LevelOne/ImagePicker/index'
import ReduxFormTextInput from '../../../components/Base/ReduxFormTextInput/index'
import ReduxFormPicker from '../../../components/Base/ReduxFormPicker'
import localValidation from './validations/localValidations'
import submitValidations from './validations/submitValidations'
import styles from './styles'
import { generatePickerValues, getArrayFromNormalizedData, normalizeData } from '../../../utils/appUtils'
import { DasboardProfilePic } from '../../../assets/images';
import { USER_TYPES, PREFERENCE_ID,NOT_DISCLOSED } from '../../../constants/constants';
import { setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import { isEmpty } from '../../../utils/EmptyObjCheck';
import { normalizePhone } from '../../../utils/renderFields';

class EditPersonalDetailsForm extends PureComponent {
    updatedProfilePic = null
    constructor(props) {
        super(props);
        this.state = {
            profileModified: false,
            updatedTextInput: false
        }
    }
    onClickUpdate = () => {
        if (this.updatedProfilePic) {
            let patientId = this.props.navigation.state.params && this.props.navigation.state.params.imageData.patientId
            this.props.uploadImg(this.updatedProfilePic, patientId)
        }
        this.props.dispatch(submit(FormConstants.EDIT_PERSONAL_DETAILS_FORM))
    }

    onNavigateBack = () => {
        this.props.dispatch(reset(FormConstants.EDIT_PERSONAL_DETAILS_FORM))
    }

    onPickImage = (data) => {
        __DEV__ && console.log("onPickImage  data is: ", data)
        this.setState({ profileModified: true })
        this.updatedProfilePic = data
    }

    onFormInputChange = () => {
        this.setState({
            profileModified: true
        })
    }

    onChangeTextInput = () => {
        this.setState({
            updatedTextInput: !this.state.updatedTextInput
        })
    }

    render() {
        let title = "Edit Personal Details"
        const { EditPersonalDetailsFormState } = this.props
        __DEV__ && console.log("RENDER IN EDIT PERSONAL DETAIL", EditPersonalDetailsFormState)
        const { values } = EditPersonalDetailsFormState || {}
        let genderList = this.props.genderList;
        if (this.props.userType === USER_TYPES.PATIENT) {
            !isEmpty(genderList) ? genderList[PREFERENCE_ID].name = NOT_DISCLOSED : null;
        }

        const { isPatient } = this.props.navigation.state.params

        return (

            <EditProfileWrapper
                onConfirm={this.onConfirm}
                onClickUpdate={this.onClickUpdate}
                contentStyle={styles.container}
                onNavigateBack={this.onNavigateBack}
                style={styles.contentStyle}
                containerStyle={styles.containerStyle}
                profileModified={this.state.profileModified}
                title={title}
                customRenderComponent={true}
            >
                <Content style={styles.container}>
                    <View style={styles.fieldsContainer}>
                        <Field
                            name={FormConstants.IMAGE}
                            component={ImagePicker}
                            props={{
                                containerStyle: styles.imagePickerStyle,
                                pic: values && values[FormConstants.IMAGE] ? { uri: values[FormConstants.IMAGE] } : DasboardProfilePic,
                                onChange: this.onPickImage
                            }}
                        />
                        <View style={styles.fieldsWrapper}>
                            <Field
                                name={FormConstants.FIRST_NAME}
                                component={ReduxFormTextInput}
                                props={{
                                    label: "First Name",
                                    maxLength: 100,
                                    onFormInputChange: this.onFormInputChange,
                                    screen: "profile"
                                }}
                            />
                        </View>
                        <View style={styles.fieldsWrapper}>
                            <Field
                                name={FormConstants.LAST_NAME}
                                component={ReduxFormTextInput}
                                props={{
                                    label: "Last Name",
                                    maxLength: 100,
                                    onFormInputChange: this.onFormInputChange,
                                    screen: "profile"
                                }}
                            />
                        </View>
                        <View style={styles.fieldsWrapper}>
                            <Field
                                name={FormConstants.GENDER}
                                component={ReduxFormPicker}
                                props={{
                                    label: "Gender",
                                    placeholder: "Select gender",
                                    items: generatePickerValues(
                                        getArrayFromNormalizedData(genderList), "name", "id"),
                                    onFormInputChange: this.onFormInputChange,
                                    screen: "profile"
                                }}
                            />
                        </View>
                        <View style={styles.fieldsWrapper}>
                            <Field
                                name={FormConstants.AGE}
                                component={ReduxFormTextInput}
                                props={{
                                    label: "Age",
                                    keyboardType: "numeric",
                                    maxLength: 3,
                                    onFormInputChange: this.onFormInputChange,
                                    screen: "profile",
                                }}
                            />
                        </View>
                        <View style={styles.fieldsWrapper}>
                            <Field
                                name={FormConstants.DESCRIPTION}
                                component={ReduxFormTextInput}
                                props={{
                                    label: "Description",
                                    maxLength: 2000,
                                    onFormInputChange: this.onFormInputChange,
                                    screen: "profile",
                                    multiline: true,
                                    numberOfLines: 100,
                                    style: [styles.descriptionStyle],
                                    containerStyle: [styles.descriptionWrapper]
                                }}
                            />
                        </View>
                        <View style={styles.fieldsWrapper}>
                            <Field
                                name={FormConstants.PHONE}
                                component={ReduxFormTextInput}
                                props={{
                                    label: "Phone Number",
                                    keyboardType: "numeric",
                                    maxLength: 12,
                                    onFormInputChange: this.onFormInputChange,
                                    screen: "profile",
                                }}
                            />
                        </View>
                        {isPatient?<View style={styles.fieldsWrapper}>
                            <Field
                                name={FormConstants.EMERGENCY_CONTACT}
                                component={ReduxFormTextInput}
                                props={{
                                    label: "Emergency Contact",
                                    keyboardType: "numeric",
                                    maxLength: 12,
                                    onFormInputChange: this.onFormInputChange,
                                    screen: "profile",
                                }}
                            />
                        </View>:null}
                        {/* </KeyboardAvoidingView> */}
                    </View>
                </Content>
            </EditProfileWrapper>

        )
    }
}

const mapStateToProps = (state, props) => {
    const { personalDetails, imageData } = props.navigation && props.navigation.state.params || {}
    let genderName = personalDetails && personalDetails.gender ? personalDetails && personalDetails.gender.genderName : personalDetails && personalDetails.genderName ? personalDetails && personalDetails.genderName : ""
    let genderId = personalDetails && personalDetails.gender ? personalDetails.gender.id : "";
    let genderList = state.DashboardState && state.DashboardState.dashboardState.lookupDetails.gender
    genderList = normalizeData(genderList, "id")
    Object.keys(genderList).map(key => {
        if (genderList[key].genderName && genderList[key].genderName || genderList[key].name === genderName) {
            genderId = key
        }
    })
    let phoneNumber = personalDetails && personalDetails.contactNumber || personalDetails && personalDetails.phoneNumber
    let emergencyContact  = personalDetails && personalDetails.emergencyContact || ""
    let initialValues = {
        [FormConstants.FIRST_NAME]: personalDetails && personalDetails.firstName,
        [FormConstants.LAST_NAME]: personalDetails && personalDetails.lastName,
        [FormConstants.GENDER]: genderId ? parseInt(genderId) : '',
        [FormConstants.AGE]: personalDetails && personalDetails.age ? personalDetails.age.toString() : "",
        [FormConstants.DESCRIPTION]: personalDetails && personalDetails.description,
        [FormConstants.PHONE]: phoneNumber ? normalizePhone(phoneNumber) : "",
        [FormConstants.IMAGE]: imageData && imageData.image,
        [FormConstants.EMERGENCY_CONTACT]: emergencyContact ? normalizePhone(emergencyContact) : ""

    }
    let dashboardState = state.DashboardState
    let authState = state.authState;
    return {
        initialValues,
        EditPersonalDetailsFormState: state.form && state.form[FormConstants ? FormConstants.EDIT_PERSONAL_DETAILS_FORM : null],
        cityDetail: dashboardState && dashboardState.dashboardState.lookupDetails.state,
        genderList: normalizeData(dashboardState && dashboardState.dashboardState.lookupDetails.gender, "id"),
        userType: authState && authState.userState.userType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePersonalDetail: (data, onSuccess, params) => dispatch(updatePersonalDetail(data, onSuccess, params)),
        onBack: () => dispatch(onBack()),
        uploadImg: (data, params) => dispatch(uploadImg(data, params))
    }
}

const EditPersonalDetailsReduxForm = reduxForm({
    form: FormConstants.EDIT_PERSONAL_DETAILS_FORM,
    validate: localValidation,
    onSubmit: submitValidations,
    destroyOnUnmount: true
})(EditPersonalDetailsForm)

export default connect(mapStateToProps, mapDispatchToProps)(
    EditPersonalDetailsReduxForm
)