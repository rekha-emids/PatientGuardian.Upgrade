import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  
  View,
  StyleSheet,
  Platform,
  Text as NativeText,
} from 'react-native';
import colors from './colors';
import ViewPropTypes from './ViewPropTypes';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { setValueBasedOnWidth, setValueBasedOnHeight, setFontSize } from '../../../../utils/deviceDimensions';
import { SearchBar } from '../../../ServiceProvidersTab/Browse';
import { WHITE } from '../../../../constants/theme';
class Search extends Component {
  getRef = () => {
    return this.input || this.refs[this.props.textInputRef];
  };

  getRefHandler = () => {
    if (this.props.textInputRef) {
      if (typeof this.props.textInputRef === 'function') {
        return input => {
          this.input = input;
          this.props.textInputRef(input);
        };
      } else {
        return this.props.textInputRef;
      }
    } else {
      return input => (this.input = input);
    }
  };

  focus() {
    this.getRef() && this.getRef().focus();
  }

  blur() {
    this.getRef() && this.getRef().blur();
  }

  clearText =() => {
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

    return (
      <View style={{backgroundColor: WHITE, paddingVertical: setValueBasedOnHeight(4)}}>
        <SearchBar
        onChangeText={this.props.onChangeText}
        resetSearch={this.clearText}
        hideSearch
        searchText={this.props.value}
        inputStyle={[{width: '80%'}]}
        borderColor={{borderColor:'transparent'}}
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
    top: 15,
    fontSize: wp('7.22%'),
    ...Platform.select({
      android: {
        top:15,
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
    fontSize: setFontSize(14),
    color: colors.grey3,
    ...Platform.select({
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
