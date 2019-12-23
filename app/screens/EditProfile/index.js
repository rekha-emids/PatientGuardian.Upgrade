import React from 'react'
import {connect} from 'react-redux'
import {SafeAreaView} from 'react-navigation'
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import Navbar from './Navbar'
import {ModalPopup} from '../../components/LevelOne/ModalPopup'
import {onBack} from '../../redux/navigation/actions'
import {setFontSize, setValueBasedOnHeight} from '../../utils/deviceDimensions'
import { OverlayLoaderWrapper } from '../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../utils/AppAPIUtils';


class EditProfileWrapper extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isDiscardModalOpen: false,
            isEdited: false
        }
    }

    onClickBackButton = () => {
        if(this.props.profileModified || this.props.pointOfServiceModified){
            this.setState({isDiscardModalOpen: true})
        }else{
            if(this.state.isEdited){
                this.setState({isDiscardModalOpen: true})
            }else{
                this.props.popRoute();
                this.props.onNavigateBack &&  this.props.onNavigateBack()
            }
        }
    }

    onUpdateIsEdited = (isEdited) => {
        if(this.state.isEdited !== isEdited)
        {
            this.setState({isEdited})
        }
    }

    onClickUpdate = () => {
        this.props.onClickUpdate(this.props.popRoute)
    }

    onConfirmDiscardChanges = () => {
        this.props.onConfirm && this.props.onConfirm();
        this.setState({isDiscardModalOpen: false}, () => {
            this.props.popRoute()
            this.props.onNavigateBack &&  this.props.onNavigateBack()
        })
    }
    render(){
        const {title, contentStyle, style, containerStyle, injectFunction, renderComponent,personalDetailsStatus,clinicalConditionsStatus,
            customRenderComponent,
            pointOfServiceStatus,languageStatus, children
        } = this.props || {}
        let content = injectFunction ? children :  React.Children && React.Children.map(children, (child) =>{
            return React.cloneElement(child, {onUpdateIsEdited: this.onUpdateIsEdited})
        } 
            )
        
        let RenderComponent = ScrollView
        let otherProps = {}
        if(customRenderComponent){
                RenderComponent = View
                otherProps = style
        }
        let isLoading = isAPIFetching(personalDetailsStatus,pointOfServiceStatus,languageStatus,clinicalConditionsStatus)
        return (
            <SafeAreaView style={{flex:1}} forceInset={{top: 'always'}}>
            <OverlayLoaderWrapper style={{flex:1}} isLoading={isLoading}>
            <View style={[styles.container, containerStyle]}>
                <Navbar hideUpdate={this.props.hideUpdate} title={title} onClickBackButton={this.onClickBackButton}
                onClickUpdate={this.onClickUpdate}
                 />
                        <RenderComponent
                            style={[styles.scrollViewStyle, style, otherProps]}
                            contentContainerStyle={contentStyle}
                            behavior="padding"
                            overScrollMode='always'
                        >                 
                        {content}
                        </RenderComponent>
                 <ModalPopup
                 visible={this.state.isDiscardModalOpen}
                 primaryButton="YES"
                 secondaryButton="NO"
                 primaryColor="#3c1053"
                 secondaryColor="#6c757d"
                 onConfirm={this.onConfirmDiscardChanges}
                 onCancel={() => this.setState({
                     isDiscardModalOpen: false
                 })}
             >
                 <Text style={styles.message}>Do you want to discard the changes?</Text>
             </ModalPopup>
            </View>
            </OverlayLoaderWrapper>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    message: {
        fontSize: setFontSize(14),
        fontFamily: "OpenSans",
        color: "#444444",
        textAlign: "center"
   },
   container: {
       flex: 1
   },
   scrollViewStyle: {
       paddingVertical: setValueBasedOnHeight(20)
   }
})

const mapDispatchToProps = (dispatch) => {
    return {
        popRoute: () => dispatch(onBack())
    }
}

const mapStateToProps = state => {
    return {
        personalDetailsStatus: state.profileState && state.profileState.PersonalDetailState.isLoading,
        pointOfServiceStatus: state.profileState && state.profileState.PointServiceState.isLoading,
        clinicalConditionsStatus: state.profileState && state.profileState.ClinicalConditionState.isLoading,
        languageStatus: state.profileState && state.profileState.LanguagesState.isLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileWrapper)