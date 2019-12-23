import React, { Component } from 'react';
import {
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import {
    onFetchConversationSummary,
    getUnreadMessageCounts,
    gotoCreateConversation,
    gotoConversation,
    onFetchConversationSummaryPaging,
    setContext
} from '../../../redux/asyncMessages/actions';
import { onBack, navigateToScreenMainStack, replace } from '../../../redux/navigation/actions'
import {
    CoreoImage, CoreoText
} from '../../../components'
import ConversationList from './ConversationList';
import AMStyle from '../AsyncMsgStyles';
import Navbar from '../../../components/LevelOne/Navbar';
import { ListScrollerAPIWrapper, SafeView } from '../../../components/LevelOne';
import { PATH } from '../../../routes';
import styles from './styles'
import images from '../../../assets/images';
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';
import { isAPIFetching } from '../../../utils/AppAPIUtils';
import { setValueBasedOnHeight } from '../../../utils/deviceDimensions';
import { INIT } from '../../../constants/AppAPIConstants';
import { USER_TYPES } from '../../../constants/constants';
import { updateNetworkConnectivity } from '../../../services/OfflineSyncing';
import {getUserInfo} from '../../../utils/userUtil'

export const EmptyConversation = (props) => {
    __DEV__ && console.log("props in emptyConversation: ",props)
    return (
        <View style={styles.center}>
            <CoreoImage source={images.emptyMsg} style={styles.emptyMsg} />
            <TouchableOpacity onPress={props.gotoCreateConversation}>
                <CoreoText style={styles.emptyText}>Tap on + icon to start conversation</CoreoText>
            </TouchableOpacity>
        </View>
    )
}

class ConversationSummary extends Component {
    static navigationOptions = () => {
        return {
            tabBarOnPress({navigation, defaultHandler}) {
                if (navigation && navigation.isFocused()) {
                    // same tab was tapped twice
                    // reset inner state
                    return;
                  }
                  navigation && navigation.state && navigation.state.params && navigation.state.params.onTabFocus && navigation.state.params.onTabFocus();
                defaultHandler && defaultHandler()
            }
        }
    }
    IS_COMPONENT_MOUNTED=false

    constructor(props){
        super(props)
        __DEV__ && console.log("props is: ",props)
        props.navigation && props.navigation.setParams && props.navigation.setParams({
            onTabFocus: this.handleTabFocus
          });
    }

    handleTabFocus = () => {
        if(this.IS_COMPONENT_MOUNTED && this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM){
            this.apiCall({pageNumber: 1, pageSize: 10, requestType: INIT})
        }
      };

    componentDidMount(){
        this.IS_COMPONENT_MOUNTED = true
    }

    componentWillMount() {
        if (!this.props.network) {
            this.props.replace(PATH && PATH.OFFLINESCREEN)
        }
    }

    combineConversationSummary = () => {
        let conversations = [...this.props.conversation];
        this.props.conversation && this.props.conversation.map(conversation => {
            this.props.unreadMsgCounts.map(unreadMsgCount => {
                if (conversation.conversationId == unreadMsgCount.conversationId) {
                    conversation.unreadMsgCount = unreadMsgCount.unreadMessageCount
                }
            })
        });
        return conversations;
    };

    gotoConversation = (item) => {
        __DEV__ && console.log("item is: ",item)
        this.props.setContext(item.context)
        this.props.gotoConversation(item.conversationId);
    }

    apiCall = (requestObject) => {
        __DEV__ && console.log("Request obj is: ",requestObject)
        this.props.onFetchConversationSummaryPaging(requestObject, updateNetworkConnectivity);
    }

    emptyView = () => {
        if(isAPIFetching(this.props.loadingStatus)) return null
        return <EmptyConversation gotoCreateConversation={this.props.gotoCreateConversation} />
    }

    render() {

        let combinedConversationSummary = this.combineConversationSummary();

        let requestProps = {
            gotoConversation: this.gotoConversation
        }

        let RenderComponent = SafeView
        if(getUserInfo() && getUserInfo().userType === USER_TYPES.CARE_TEAM){
          RenderComponent = View
        }
        return (
            <SafeView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Navbar showPullDownToRefresh title="Conversation Summary" showBackButton={true} onClickAdd={this.props.gotoCreateConversation} showAdd={true} />
                <OverlayLoaderWrapper style={{ flex: 1 }} isLoading={isAPIFetching(this.props.loadingStatus)}>
                    <View style={AMStyle.contentContainer}>
                        <ListScrollerAPIWrapper
                            data={combinedConversationSummary}
                            requestProps={requestProps}
                            renderComponent={ConversationList}
                            isPaginationEnabled={true}
                            apiSaga={this.apiCall}
                            navigation={this.props.navigator}
                            pageSize={10}
                            emptyViewComponent={this.emptyView}
                            childrenStyle={{ marginBottom: setValueBasedOnHeight(0) }}
                        />
                    </View>
                </OverlayLoaderWrapper>
            </View>
            </SafeView>
        )
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchConversationSummary: () => dispatch(onFetchConversationSummary()),
        onFetchConversationSummaryPaging: (data, updateNetworkOnResponse) => dispatch(onFetchConversationSummaryPaging(data, updateNetworkOnResponse)),
        getUnreadMsgCounts: () => dispatch(getUnreadMessageCounts()),
        gotoCreateConversation: () => dispatch(gotoCreateConversation()),
        gotoConversation: (conversationId) => dispatch(gotoConversation(conversationId)),
        goBack: () => dispatch(onBack()),
        goToHomeScreen: () => dispatch(navigateToScreenMainStack(PATH.HOME_SCREEN)),
        replace: (data) => dispatch(replace(data)),
        setContext: (data) => dispatch(setContext(data))
    }
};

function mapStateToProps(state) {
    return {
        conversation: state.asyncMessageState && state.asyncMessageState.conversationSummary,
        isLoading: state.asyncMessageState && state.asyncMessageState.isLoading,
        loggedInUser: state.authState && state.authState.userState.userInfo,
        unreadMsgCounts: state.asyncMessageState && state.asyncMessageState.unreadCounts,
        loadingStatus: state.asyncMessageState && state.asyncMessageState.isLoading,
        network: state.networkReducer && state.networkReducer.network
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationSummary);