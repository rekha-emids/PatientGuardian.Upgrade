import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text as NativeText,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from './colors';
import normalize from './normalizeText';
import ViewPropTypes from './ViewPropTypes';
import getIconType from './getIconType';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { setValueBasedOnWidth, setValueBasedOnHeight } from '../../../../utils/deviceDimensions';
import { WHITE } from '../../../../constants/theme';
import { SearchBar } from '../../../ServiceProvidersTab/Browse';
class Search extends Component {

  clearText = () => {
    this.props.onChangeText && this.props.onChangeText('');
    this.props.onClearText && this.props.onClearText();
  }

  render() {
    const {
      containerStyle,
      inputStyle,
      icon,
      noIcon,
      lightTheme,
      round,
      showLoadingIcon,
      loadingIcon,
      clearIcon,
      containerRef,
      underlineColorAndroid,
      ...attributes
    } = this.props;

    let Icon = MaterialIcons;
    if (icon.type) {
      Icon = getIconType(icon.type);
    }

    return (
      <View style={{backgroundColor: WHITE, paddingVertical: setValueBasedOnHeight(4)}}>
      <SearchBar
      onChangeText={(text) => {this.props.onChangeText(text)}}
      resetSearch={this.clearText}
      hideSearch
      searchText={this.props.value}
      inputStyle={[{width: '80%'}]}
      underlineColorAndroid={"transparent"}
      borderColor={{borderColor: "transparent"}}
    />
    </View>
    );
  }
}

Search.propTypes = {
  icon: PropTypes.object,
  noIcon: PropTypes.bool,
  lightTheme: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  inputStyle: NativeText.propTypes.style,
  round: PropTypes.bool,
  showLoadingIcon: PropTypes.bool,
  loadingIcon: PropTypes.object,
  clearIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  // Deprecated
  textInputRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  // Deprecated
  containerRef: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  underlineColorAndroid: PropTypes.string,
  onChangeText: PropTypes.func,
  onClearText: PropTypes.func,
};

Search.defaultProps = {
  placeholderTextColor: colors.grey3,
  lightTheme: false,
  noIcon: false,
  round: false,
  icon: {},
  showLoadingIcon: false,
  loadingIcon: {},
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,  
    elevation: 5,
    backgroundColor: colors.grey0,
  },
  containerLight: {
    backgroundColor: colors.grey5,
    borderTopColor: '#e1e1e1',
    borderBottomColor: '#e1e1e1',
  },
  icon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10.5,
    fontSize: wp('7.22%'),
    ...Platform.select({
      android: {
        top:10,
      },
    }),
  },
  loadingIcon: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 16,
    top: 13,
    ...Platform.select({
      android: {
        top: 10,
      },
    }),
  },
  input: {
    paddingLeft: setValueBasedOnWidth(36),
    paddingRight: setValueBasedOnWidth(19),
    borderRadius: 3,
    // overflow: 'hidden',
    backgroundColor: colors.searchBg,
    fontSize: normalize(14),
    color: colors.grey3,
    height: wp('11.11%'),
    ...Platform.select({
      ios: {
        height: wp('8.33%'),
      },
      android: {
        borderWidth: 0,
      },
    }),
  },
  inputLight: {
    backgroundColor: colors.grey4,
  },
  searchIcon: {
    left: 16,
  },
  clearIcon: {
    right: 16,
  },
});

export default Search;
