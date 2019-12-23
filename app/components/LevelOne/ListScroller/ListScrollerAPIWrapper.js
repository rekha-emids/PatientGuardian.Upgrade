/**
 * @flow
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import {
    API_SUCCESS,
    API_PAGINATION_FINISHED,
    INIT,
    LOAD_MORE,
    API_PAGINATION_FETCHING,
    REFRESH,
    API_FETCHING
  } from "../../../constants/AppAPIConstants"

import ListScroller from './index'
import { CoreoActiveIndicator } from '../../Base/Preloader/Preloader';

class ListScrollerAPIWrapper extends PureComponent {
  initialAPISuccess = false
  isRefreshing = false
  localPageNumber = 1
  componentDidMount () {
    this.initAPICall(INIT)
  }

  initAPICall = requestType => {
    this.localPageNumber = 1
    let apiRequestType = requestType || INIT
    const { pageSize, requestProps } = this.props
    let requestData = {
      pageSize,
      pageNumber: 1,
      requestType: apiRequestType,
      ...requestProps
    }
    if (this.props.replaceRequestObject) {
      requestData = this.props.getRequestObject(0, pageSize)
    }
    (this.props.alwaysInitialAPI || apiRequestType === REFRESH) && this.props.apiSaga && this.props.apiSaga(requestData, apiRequestType)
  }

  componentWillReceiveProps (nextProps) {
    if (
      !this.initialAPISuccess &&
      (nextProps.networkCallStatus === API_SUCCESS ||
        nextProps.networkCallStatus === API_PAGINATION_FINISHED)
    ) {
      this.initialAPISuccess = true
    }
  }

  onLoadMore = () => {
    const { data, networkCallStatus, hasPaginationEnded, pageSize, requestProps } = this.props
    let customPageNumber = Math.ceil(data.length / pageSize)
    let requestType = LOAD_MORE
    if(!networkCallStatus || networkCallStatus === API_PAGINATION_FETCHING) return null
    if (hasPaginationEnded || data.length < customPageNumber * pageSize) {
      return
    }
    var requestData = {
      ...requestProps,
      pageSize,
      pageNumber: customPageNumber + 1,
      requestType   
     }
    if (this.props.replaceRequestObject) {
      requestData = this.props.getRequestObject(customPageNumber, data.length)
    }
    this.props.apiSaga(requestData, requestType)
  }

  onRefresh = requestType => {
    this.props.onRefresh()
    this.props.canAutomaticRefresh && this.initAPICall(requestType)
  }

  handleRetry = () => {
    this.initAPICall()
    this.props.onRefresh(INIT)
  }

  render () {
    const {
      networkCallStatus,
    } = this.props
    if(networkCallStatus === API_FETCHING){
      return <CoreoActiveIndicator />
    }
    return (
        <ListScroller
          {...this.props}
          networkCallStatus={networkCallStatus}
          onEndReached={this.onLoadMore}
          onRefresh={this.onRefresh}
        />
    )
  }
}

ListScrollerAPIWrapper.defaultProps = {
  apiSaga: () => {},
  onRefresh: () => {},
  requestProps: {},
  pageSize:10,
  networkCallStatus: API_SUCCESS,
  alwaysInitialAPI: true,
  applyPaginationFetching: true,
  renderChildrenAfterLoading: false,
  canAutomaticRefresh: true
}

ListScrollerAPIWrapper.propTypes = {
  apiSaga: PropTypes.func.isRequired,
  onRefresh: PropTypes.func,
  requestProps: PropTypes.object,
  length: PropTypes.number,
  networkCallStatus: PropTypes.number
}

export default ListScrollerAPIWrapper
