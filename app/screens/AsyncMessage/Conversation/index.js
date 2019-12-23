import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  
} from "react-native";
import { connect } from "react-redux";
import ConversationScreen from "./ConversationScreen";
import SendMessage from "./SendMessage";
import { ModalPopup } from "../../../components";
import {
  onFetchConversation,
  updateReadStatus,
  gotoEditTitle,
  gotoParticipantsList,
  onFetchConversationSummary,
  getUnreadMessageCounts,
  removeFromGroup,
  joinGroup,
  getConversationCount,
  onClearCurrentConversationState
} from '../../../redux/asyncMessages/actions';
import AsyncStyle from '../AsyncStyle';
import styles, { getOnKeyBoardStyle } from './styles';
import AMStyle from '../AsyncMsgStyles';
import { getUserInfo } from '../../../utils/userUtil';
import { USER_TYPES } from '../../../constants/constants';
import { isIOS } from '../../../utils/appUtils';
import { HEIGHT } from '../../../utils/deviceDimensions';
import { onBack } from '../../../redux/navigation/actions';
import LinearGradient from "react-native-linear-gradient";
import { NAVBAR_COLOR1, NAVBAR_COLOR2 } from "../../../constants/theme";
import { SafeView } from '../../../components/LevelOne'
import { OverlayLoaderWrapper } from '../../../components/Base/Preloader/Preloader';  
import { isAPIFetching } from "../../../utils/AppAPIUtils";
import ErrorBoundaryHOC from "../../../ErrorBoundaryHOC";

class Conversation extends Component {
constructor(props){
  super(props)
  this.state = {
    showModalOnCancel: false,
    messageText: "",
    keyboard: false,
    keyboardHeight: 0,
    displayShowAll: true,
  };
}


apiCall = () => {
  this.props.getConversations(this.props.selectedConversationId);
  this.props.getConversationsCount(this.props.selectedConversationId);
  this.props.joinGroup(this.props.selectedConversationId)
  let data = {
    conversationId: this.props.selectedConversationId
  };
  this.props.updateUnreadCount(data);
}

  componentDidMount() {
    this.apiCall()
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow.bind(this)
    );
    this.keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () =>
      this.setState({ keyboard: false })
    );
  }

  componentWillUnmount() {
    this.props.removeFromGroup(this.props.selectedConversationId);
  }

  _keyboardDidShow(e) {
    let keyboardHeight = e.endCoordinates.height;
    let normalHeight = HEIGHT;
    this.shortHeight = HEIGHT - e.endCoordinates.height;
    this.setState({ keyboard: true, keyboardHeight: keyboardHeight });
  }

  onBackButton = () => {
    this.setState({
      showModalOnCancel: false
    });
    let userId = getUserInfo() ? getUserInfo().userId : '';

    let data = {
      userId: userId,
      conversationId: this.props.selectedConversationId
    };
    let hideLoader = true

    this.props.goBack();
    this.props.onClearCurrentConversationState();
    this.props.fetchConversationSummary(hideLoader);
    this.props.updateUnreadCount(data);
    this.props.removeFromGroup(data.conversationId)
  };

  updateMessageText = text => {
    this.setState({ messageText: text });
  };

  onLoadMore = () =>{
    this.props.getConversations(this.props.selectedConversationId, 'all');
    this.setState({displayShowAll: false});
  };

  render() {
    let isDisabled = this.props.conversation && !this.props.conversation.isActive;
    if(this.props.loggedInUser && this.props.loggedInUser.userType === USER_TYPES.CARE_TEAM){
        isDisabled = !this.props.conversation.isActive || (this.props.conversation.createdByType !== USER_TYPES.CARE_TEAM && this.props.conversation.createdBy !== this.props.loggedInUser.userId) ? true : false;
    }
    return (
      <SafeView>
        <OverlayLoaderWrapper isLoading={isAPIFetching(this.props.loadingStatus)}>
          <KeyboardAvoidingView
            behavior={isIOS() ? "padding" : undefined}
            style={AMStyle.wrapperView}
          >
            <LinearGradient colors={[NAVBAR_COLOR1, NAVBAR_COLOR2]} style={AMStyle.headerContainer}>
              <View style={AMStyle.headerLeftWrap}>
                <TouchableOpacity
                  onPress={() =>
                    this.state.messageText
                      ? this.setState({ showModalOnCancel: true })
                      : this.onBackButton()
                  }
                >
                  <Image
                    style={AMStyle.headerRightIcons}
                    source={require("../Images/back.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={AMStyle.headerMidWrap}>
                <Text
                  numberOfLines={1}
                  style={AMStyle.HeaderTextLd}
                >
                  {this.props.conversation && this.props.conversation.title
                    ? this.props.conversation.title
                    : "Add Title"}
                </Text>
              </View>
              <View style={AMStyle.headerRightWrap}>
                <TouchableOpacity
                  onPress={() => this.props.gotoEditTitle(this.props.conversation.title)}
                  style={AsyncStyle.headerRightIcons}
                  disabled={isDisabled}
                >
                  <Image
                    style={AsyncStyle.headerRightIcons}
                    source={require("../Images/edit.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={AsyncStyle.headerRightIcons}
                  onPress={this.props.gotoParticipantsList}
                >
                  <Image
                    style={AsyncStyle.headerRightIcons}
                    source={require("../Images/Participants.png")}
                  />
                </TouchableOpacity>
              </View>
            </LinearGradient>
            <View style={styles.chatView}>
            {this.props.conversation && this.props.conversation.messages && this.props.conversationCount > 10   && this.state.displayShowAll &&
                <View style={styles.loadMore}> 
                <TouchableOpacity  onPress={this.onLoadMore}>
                <Text style = {styles.alignCenter}>Show all</Text>
            </TouchableOpacity>
            </View>}
              {this.props.conversation && this.props.conversation.messages &&
                this.props.conversation.messages.length > 0 ? (
                  <FlatList
                    ref={ref => (this.scrollView = ref)}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                      setTimeout(() => this.scrollView && this.scrollView.scrollToEnd(), 100)
                    }}
                    bounces={false}
                    data={this.props.conversation.messages}
                    renderItem={({ item }) => <ConversationScreen message={item} />}
                  />
                ) : null}
            </View>
            <View
              style={
                this.state.keyboard
                  ? getOnKeyBoardStyle(this.state.keyboardHeight)
                  : styles.sendContainer
              }
            >
              <SendMessage updateMessageText={this.updateMessageText} isDisabled={isDisabled}/>
            </View>
            <ModalPopup
              visible={this.state.showModalOnCancel}
              primaryButton="YES"
              secondaryButton="NO"
              primaryColor="#3c1053"
              secondaryColor="#6c757d"
              onConfirm={this.onBackButton}
              onCancel={() =>
                this.setState({
                  showModalOnCancel: !this.state.showModalOnCancel
                })
              }
            >
              <Text style={styles.message}>Do you want to discard changes?</Text>
            </ModalPopup>
          </KeyboardAvoidingView>
        </OverlayLoaderWrapper>
      </SafeView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getConversations: (conversationId, loadMore) => dispatch(onFetchConversation(conversationId, loadMore)),
    getConversationsCount : (conversationId)=> dispatch(getConversationCount(conversationId)),
    gotoEditTitle: (data) => dispatch(gotoEditTitle(data)),
    gotoParticipantsList: () => dispatch(gotoParticipantsList()),
    updateUnreadCount: (data) => dispatch(updateReadStatus(data)),
    clearCurrentConversationState: () => dispatch(clearCurrentConversationState()),
    goBack: () => dispatch(onBack()),
    fetchConversationSummary: () => dispatch(onFetchConversationSummary()),
    getUnreadMsgCounts: () => dispatch(getUnreadMessageCounts()),
    removeFromGroup: (data) => dispatch(removeFromGroup(data)),
    joinGroup: (data) => dispatch(joinGroup(data)),
    onClearCurrentConversationState: () => dispatch(onClearCurrentConversationState()),
  }
};

const mapStateToProps = state => {
  return {
    conversation: state.asyncMessageState && state.asyncMessageState.conversation,
    conversationCount: state.asyncMessageState && state.asyncMessageState.conversationCount,
    loggedInUser: state.authState && state.authState.userState.userInfo,
    selectedConversationId: state.asyncMessageState && state.asyncMessageState.selectedConversationId,
    loadingStatus: state.asyncMessageState && state.asyncMessageState.isLoading,
    currentUser: state.authState && state.authState.userState
  };
};

export default ErrorBoundaryHOC(connect(
  mapStateToProps,
  mapDispatchToProps
)(Conversation));