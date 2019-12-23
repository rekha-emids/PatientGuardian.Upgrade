import React from 'react'
import PropTypes from 'prop-types'
import {StyleSheet, View} from 'react-native'
import {
  isAPIFetching,
  isAPIFailed,
  isAPISuccess,
  isAPIPaginationFinished
} from '../../../utils/AppAPIUtils'
import {Spinner} from './../../Base/Preloader/Preloader'
import { setFontSize } from '../../../utils/deviceDimensions';

export const LoadingStatusText = props => {
  const { status,  hideErrorMessage } = props

  if (isAPIFailed(status)) {
    if (hideErrorMessage) {
      return null
    }
    return null
  } else if (isAPIFetching(status)) {
    return (
      <CoreoActiveIndicator />
    )
  }
  return null
}

LoadingStatusText.defaultProps = {
  size: setFontSize(15)
}

const renderOverlayLoader = props => (
  <Spinner />
)

const renderNetworkFailure = props => (
      null
    //  <CoreoText>An error occurred. Please try again.</CoreoText>
)

export default class OverlayLoaderWrapper extends React.Component {
  static defaultProps = {
    overlayStyles: '',
    showLoader: false,
    displayLoaderOneTime: false,
    renderChildrenAfterLoading: false,
    renderOverlayLoader,
    renderNetworkFailure,
    children: [],
    style: 0
  }
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    loadingStatus: PropTypes.number.isRequired,
    overlayStyles: PropTypes.string,
    renderOverlayLoader: PropTypes.func,
    renderNetworkFailure: PropTypes.func,
    onPress: PropTypes.func.isRequired,
    renderChildrenAfterLoading: PropTypes.bool,
    style: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.object,
      PropTypes.array
    ])
  }
  displayLoader = true

  componentDidUpdate () {
    if (
      (isAPISuccess(this.props.loadingStatus) ||
        isAPIPaginationFinished(this.props.loadingStatus)) &&
      this.props.displayLoaderOneTime
    ) {
      this.displayLoader = false
    }
  }

  renderChildren = () => {
    const { children, loadingStatus, renderChildrenAfterLoading } = this.props
    if (renderChildrenAfterLoading && isAPIFetching(loadingStatus)) {
      return null
    }
    return children
  }

  renderOverlayLoader () {
    if (isAPIFetching(this.props.loadingStatus) && this.displayLoader) {
      return this.props.renderOverlayLoader(this.props)
    }
    return null
  }

  renderNetworkFailure () {
    if (isAPIFailed(this.props.loadingStatus)) {
      return this.props.renderNetworkFailure(this.props)
    }
    return null
  }

  render () {
    const { style } = this.props

    return (
      <View
        style={[{flex: 1}, style]}
        collapsable={false}
      >
        {this.renderChildren()}
        {this.renderOverlayLoader()}
        {this.renderNetworkFailure()}
      </View>
    )
  }
}