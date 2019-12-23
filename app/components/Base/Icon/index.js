import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcon
  from 'react-native-vector-icons/MaterialCommunityIcons'

import EvilIcon from 'react-native-vector-icons/EvilIcons'
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';

const Icon = (props) => {
  const {
    name,
    size,
    color,
    style,
    type,
    bgStyle,
    text,
    onPress,
    backgroundColor
  } = props

  switch (type) {
    case 'Ionicons':
      return (
        <Ionicon
          type={'Ionicons'}
          name={name}
          size={size}
          color={color}
          style={[
style,
bgStyle
]}
        />
      )
    case 'Entypo':
      return (
        <EntypoIcon
          type={'Entypo'}
          name={name}
          size={size}
          color={color}
          style={[
style,
bgStyle
]}
        />
      )
    case 'FontAwesome':
      return (
        <FontAwesomeIcon
          type={'FontAwesome'}
          name={name}
          size={size}
          color={color}
          style={[
style,
bgStyle
]}
        />
      )
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcon
          type={'MaterialCommunityIcons'}
          name={name}
          size={size}
          color={color}
          style={[
style,
bgStyle
]}
        />
      )

    case 'EvilIcons':
      return (
        <EvilIcon
          type={'EvilIcons'}
          name={name}
          size={size}
          color={color}
          style={[
style,
bgStyle
]}
        />
      )
    // case 'FontAwesome5':
    //   return (
    //     <FontAwesome5Icon
    //       type={'FontAwesome5'}
    //       name={name}
    //       size={size}
    //       color={color}
    //       style={[style, bgStyle]}
    //     />
    //   )
    case 'FontAwesomeButton':
      return (
        <FontAwesomeIcon.Button
          type={'FontAwesome'}
          name={name}
          size={size}
          color={color}
          backgroundColor={backgroundColor}
          style={[
style,
bgStyle
]}
          onPress={onPress}
        >
          {text}
        </FontAwesomeIcon.Button>
      )
    default:
      return (
        <Ionicon
          type={'Ionicons'}
          name={name}
          size={size}
          color={color}
          style={[
style,
bgStyle
]}
          onPress={onPress}
        />
      )
  }
}

Icon.defaultProps = {
  style: {},
  bgStyle: { backgroundColor: 'transparent' },
  color: THEME_PRIMARY_COLOR,
  size: 12,
  type: 'Ionicons'
}

export default Icon
