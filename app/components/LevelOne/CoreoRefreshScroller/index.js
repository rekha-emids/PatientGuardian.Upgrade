import React, { Component } from 'react'
import { ScrollView, RefreshControl } from 'react-native'

import {
  API_SUCCESS,
  INIT,
  REFRESH,
  API_REFRESH_FETCHING
} from '../../../constants/AppAPIConstants'
import OverlayLoaderWrapper from '../ListScroller/OverlayLoaderWrapper'


class CoreoRefreshScroller extends Component {
  static defaultProps = {
    style: {},
    contentContainerStyle: {},
    isHorizontal: false,
    onEndReached: () => {},
    onRefresh: () => {},
    isPaginationEnabled: false,
    networkCallStatus: API_SUCCESS,
    onScroll: () => {},
    refreshControl: false,
    noItemsText: "No data to display",
    showsVerticalScrollIndicator: false,
    inverted: false,
    apiSaga: () => {},
  }

  componentDidMount () {
    this.initAPICall(INIT)
  }

  initAPICall = (requestType = INIT) => {
    let apiRequestType = requestType
    const { length, requestProps } = this.props
    let requestData = {
      length: length,
      offset: 0,
      ...requestProps
    }
    if (this.props.replaceRequestObject) {
      requestData = this.props.getRequestObject(length, 0)
    }
    this.props.apiSaga(requestData, apiRequestType)
  }

  onRefresh = () => {
    this.props.onRefresh(REFRESH)
    this.initAPICall(REFRESH)
  }

  _refreshControl = () => {
    const { refreshControl, networkCallStatus } = this.props
    if (!refreshControl) return null
    return (
      <RefreshControl
        refreshing={networkCallStatus === API_REFRESH_FETCHING}
        onRefresh={this.onRefresh}
      />
    )
  }

  handleRetry = () => {
    this.props.onPress && this.props.onPress(INIT)
    this.initAPICall(INIT)
  }

  render () {
    const { networkCallStatus, ...otherProps } = this.props
    return (
      <OverlayLoaderWrapper
        onPress={this.handleRetry}
        loadingStatus={networkCallStatus}
      >
        <ScrollView
          ref={c => {
            this.scrollView = c
          }}
          {...otherProps}
          style={{flex: 1}}
          refreshControl={this._refreshControl()}
        >
        {this.props.children}
        </ScrollView>
      </OverlayLoaderWrapper>
    )
  }
}

export default CoreoRefreshScroller
