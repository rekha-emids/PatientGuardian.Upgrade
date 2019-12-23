import React from 'react'
import { View } from 'react-native'
import { reduxForm, Field, submit, reset } from 'redux-form';
import { connect } from 'react-redux';
import FormConstants from './FormConstants';
import EditProfileWrapper from '../index'
import styles from './styles'
import { Content } from 'native-base';
import { ReduxFormTextInput } from '../../../components';
import localValidations from './validations/localValidations';
import submitValidations from './validations/submitValidations';
import { onBack } from '../../../redux/navigation/actions';
import {updateHeightWeightDetails} from '../../../redux/profile/CoreoAssociation/actions'

class EditHeightWeightDetails extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profileModified: false
        }
    }

    onClickUpdate = () => {
        this.props.dispatch(submit(FormConstants.EDIT_HEIGHTWEIGHT_DETAILS_FORM))
    }

    onNavigateBack = () => {
        this.props.dispatch(reset(FormConstants.EDIT_HEIGHTWEIGHT_DETAILS_FORM))
    }

    onFormInputChange = () => {
        const {profileModified} = this.state
        !profileModified && this.setState({
            profileModified:true
        })
    }

    render() {
        return (<EditProfileWrapper
            onClickUpdate={this.onClickUpdate}
            contentStyle={styles.container}
            onNavigateBack={this.onNavigateBack}
            style={styles.contentStyle}
            containerStyle={styles.containerStyle}
            profileModified={this.state.profileModified}
            title={"Edit Coreo Association"}
            customRenderComponent={true}
        >
            <Content style={styles.container}>
                <View style={styles.fieldsContainer}>

                    <View style={styles.fieldsWrapper}>
                        <Field
                            name={FormConstants.HEIGHT}
                            component={ReduxFormTextInput}
                            props={{
                                label: "Height (Inches)",
                                maxLength: 5,
                                onFormInputChange: this.onFormInputChange,
                                screen: "profile",
                                keyboardType: "phone-pad",
                                decimalKeyboard:true,
                                placeholder:"00.00"
                            }}
                        />
                    </View>
                    <View style={styles.fieldsWrapper}>
                        <Field
                            name={FormConstants.WEIGHT}
                            component={ReduxFormTextInput}
                            props={{
                                label: "Weight (Lbs)",
                                maxLength: 6,
                                onFormInputChange: this.onFormInputChange,
                                screen: "profile",
                                keyboardType: "phone-pad",
                                decimalKeyboard:true,
                                placeholder:"000.00"
                            }}
                        />
                    </View>

                </View>
            </Content>
        </EditProfileWrapper>)
    }
}

const mapStateToProps = (state, props) => {
    const { heightWeightData } = props.navigation && props.navigation.state.params
    let height =heightWeightData && heightWeightData.height || ""
    let weight = heightWeightData && heightWeightData.weight || ""
    let initialValues = {
        [FormConstants.HEIGHT]: height.toString(),
        [FormConstants.WEIGHT]: weight.toString(),
    }

    return {
        initialValues
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBack: () => dispatch(onBack()),
        updateHeightWeightDetails:(data , onSuccess)=>dispatch(updateHeightWeightDetails(data, onSuccess))
    }
}

const EditHeightWeightReduxForm = reduxForm({
    form: FormConstants.EDIT_HEIGHTWEIGHT_DETAILS_FORM,
    validate: localValidations,
    onSubmit: submitValidations,
    destroyOnUnmount: true
})(EditHeightWeightDetails)

export default connect(mapStateToProps, mapDispatchToProps)(EditHeightWeightReduxForm)