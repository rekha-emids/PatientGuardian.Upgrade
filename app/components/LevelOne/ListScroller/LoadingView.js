import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import {CoreoActivityIndicator} from './PaginationLoader'

const LoadingView = (props) => {
  const textStyles = [
styles.textStyles,
props.textStyles
]

  return (
    <View
      style={[
StyleSheet.absoluteFillObject,
props.mainViewStyle
]}
      lastLayerStyle={[
styles.mainViewStyle,
props.mainViewStyle
]}
    >
      <CoreoActivityIndicator />
      <Text style={textStyles}> {props.loadingText}</Text>
    </View>
  )
}

LoadingView.propTypes = {loadingText: PropTypes.string}

LoadingView.defaultProps = {
  loadingText: '',
  mainViewStyle: {},
  textStyles: { fontSize: 12 }
}

const styles = {
  mainViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyles: {}
}

LoadingView.propTypes = {loadingText: PropTypes.string.isRequired}

export default LoadingView
