import React from 'react'

import { ActivityIndicator, Platform } from 'react-native'
import { setValueBasedOnWidth } from '../../../utils/deviceDimensions';

export const CoreoActivityIndicator = (props) => {
  const { size, ...other } = props,
   sizeValue = Platform.select({
    android: {size},
    ios: {size: 1}
  })

  return <ActivityIndicator {...other} size={sizeValue.size} />
}

ActivityIndicator.defaultProps = {}



const PaginationLoader = () => <ActivityIndicator
    styleAttr="SmallInverse"
    type="large"
    style={{
      backgroundColor: Colors.transparent,
      height: 40,
      width: setValueBasedOnWidth(360)
    }}
  />


export default PaginationLoader
