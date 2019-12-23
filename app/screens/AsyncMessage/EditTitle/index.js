import React, { Component } from 'react';
import {
    View,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import {
    onSaveTitle,
    gotoConversation,
    onFetchConversation
} from '../../../redux/asyncMessages/actions';
import { ModalPopup, CoreoFloatingInput, Navbar } from '../../../components';
import styles from './styles';
import AMStyle from '../AsyncMsgStyles';
import { USER_TYPES } from '../../../constants/constants';
import { onBack } from '../../../redux/navigation/actions';
import { SafeView } from '../../../components/LevelOne';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';

class EditTitle extends Component {
   
    constructor(props){
        super(props)
        this.state = {
            title: props.navigation && props.navigation.state.params.data,
            showModalOnCancel: false,
            disabledSave:false   
        };
    }
    componentDidMount() {
        this.props.getConversations(this.props.selectedConversationId);
    };

    onChangeTitle = (value) => {
        this.setState({ title: value });
    };

    onSubmitChangeTitle = () => {
        let userId = this.props.loggedInUser && this.props.loggedInUser.userId;
        let userType = this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.INDIVIDUAL_GUARDIAN ? USER_TYPES.GUARDIAN : this.props.loggedInUser && this.props.loggedInUser.userType;
        let title = this.state.title ? this.state.title.trim() : '';
        if ((title !== this.props.conversationData.title) || (title.length === 0 && this.props.conversationData.title.length > 0)) {
            this.setState({disabledSave: true});
            let data = {
                conversationId: this.props.conversationData.conversationId,
                title: title,
                modifiedBy: userId,
                oldTitle: this.props.conversationData.title,
                modifiedByType: userType
            }
            this.props.onSaveTitle(data, this.onSuccessUpdate);
        }
    };

    onSuccessUpdate = () => {
        this.props.gotoConversation(this.props.conversationData.conversationId);
    }

    gotoConversation = () => {
        this.props.gotoConversation(this.props.selectedConversationId);
    };

    onBackButton = () => {
        this.setState({
            showModalOnCancel: false,
            title: ''
        });
        this.props.goBack()
        // this.gotoConversation();
    };
    onClickBackButton = () => {
        if(this.state.title !== this.props.conversationData.title){
            this.setState({ showModalOnCancel: true }) 
        }else {
            this.props.goBack()
        }
    }
    showModalOnCancel = () => {
        this.setState({
            showModalOnCancel: !this.state.showModalOnCancel,
        })
    }
    render() {
        // if (this.state.title === '' && this.props.conversationData.title && this.props.conversationData.title.length > 0) {
        //     this.setState({ title: this.props.conversationData.title })
        // };
        return (
            <SafeView>
            <OverlayLoaderWrapper style={{flex: 1}} isLoading = {isAPIFetching(this.props.loadingStatus)}>
            <View style={AMStyle.wrapperView}>
                <Navbar title="Edit Title" onClickBackButton={this.onClickBackButton} showSave
                 onCheckClick={this.onSubmitChangeTitle} disabled={this.state.disabledSave}/>
                <View style={AMStyle.contentContainer}>
                    <View style={styles.titleEdit}>
                        <CoreoFloatingInput
                            label="Title"
                            value={this.state.title}
                            maxLength={100}
                            onChangeText={this.onChangeTitle}
                        />
                    </View>
                </View>
                <ModalPopup
                    visible={this.state.showModalOnCancel}
                    primaryButton="YES"
                    secondaryButton="NO"
                    primaryColor="#3c1053"
                    secondaryColor="#6c757d"
                    onConfirm={this.onBackButton}
                    onCancel={this.showModalOnCancel}
                >
                    <Text style={styles.message}>Do you want to discard changes?</Text>
                </ModalPopup>
            </View>
            </OverlayLoaderWrapper>
            </SafeView>
        )
    };
};

function mapDispatchToProps(dispatch) {
    return {
        goBack: () => dispatch(onBack()),
        onSaveTitle: (data, onSuccess) => dispatch(onSaveTitle(data, onSuccess)),
        gotoConversation: (id) => dispatch(gotoConversation(id)),
        getConversations: (conversationId) => dispatch(onFetchConversation(conversationId)),
    }
};

function mapStateToProps(state) {
    return {
        conversation: state.asyncMessageState && state.asyncMessageState.conversationSummary,
        conversationData: state.asyncMessageState && state.asyncMessageState.conversation,
        conversationTitle: state.asyncMessageState && state.asyncMessageState.conversationTitle,
        loggedInUser: state.authState && state.authState.userState.userInfo,
        selectedConversationId: state.asyncMessageState && state.asyncMessageState.selectedConversationId,
        loadingStatus: state.asyncMessageState && state.asyncMessageState.isLoading,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTitle);