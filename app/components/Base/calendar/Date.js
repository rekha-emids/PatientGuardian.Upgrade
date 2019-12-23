// @flow

import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import type Moment from 'moment';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import {_} from '../../../utils/validations'
import { getFormatedDate, getTodayDate } from '../../../utils/momentUtil';
import { DATE_FORMATS } from '../../../constants/constants';
import { THEME_PRIMARY_COLOR } from '../../../constants/theme';
const DOTS_ARRAY = [1,2,3]
const TODAY_DATE = getTodayDate("MM-DD-YYYY")
export default class Date extends PureComponent {

  props: {
    // Date to render
    date: Moment,
    // Index for `onPress` and `onRender` callbacks
    index: number,
    // Whether it's the currently selected date or no
    isActive: boolean,
    // Called when user taps a date
    onPress: (index: number) => void,
    // Called after date is rendered to pass its width up to the parent component
    onRender: (index: number, width: number) => void,
  };

  // Style helper functions that merge active date styles with the default ones
  // when rendering a date that was selected by user or was set active by default

  getContainerStyle = () => ({
    ...styles.container,
    ...(this.props.isActive ? styles.containerActive : {})
  });

  getDayStyle = (date) => ({
    ...styles.text,
    ...styles.day,
    ...(this.props.isActive || (getFormatedDate(date, "MM-DD-YYYY") === TODAY_DATE) ? styles.textActive : {})
  });

  getDateStyle = () => ({
    ...styles.text,
    ...styles.date,
    ...(this.props.isActive ? styles.textActive : {})
  });

  // Call `onRender` and pass component's with when rendered
  onLayout = (event: { nativeEvent: { layout: { x: number, y: number, width: number, height: number } } }) => {
    const {
      index,
      onRender,
    } = this.props;
    const { nativeEvent: { layout: { width } } } = event;
    onRender(index, width);
  };

  // Call `onPress` passed from the parent component when date is pressed
  onPress = () => {
    const { index, onPress } = this.props;
    onPress(index);
  };

  render() {
    const { date,serviceVisitCount} = this.props;
    let currentDateList = 0
    if(!_.isNil(serviceVisitCount[getFormatedDate(date, DATE_FORMATS.MM_DD_YYYY)])){
      currentDateList = serviceVisitCount[getFormatedDate(date, DATE_FORMATS.MM_DD_YYYY)]
    }
    return (
      <View>
      <TouchableOpacity
        style={this.getContainerStyle()}
        onLayout={this.onLayout}
        onPress={this.onPress}
        activeOpacity= {this.props.internet?undefined:1}
      >
        <Text style={this.getDayStyle(date)}>{date.format('ddd')}</Text>
        <Text style={this.getDayStyle(date)}>{date.format('D')}</Text>
      </TouchableOpacity>
      {currentDateList > 0 ?
          <View style={{flexDirection:'row',alignItems:'center', justifyContent: "center"}}>
            {DOTS_ARRAY.map((value, index)=>{
              if(index>2 || index >= currentDateList){
                return null;
              }else{
                return <View key={index} style={styles.greenDot} />
              }
          })}
          </View> : 
          null
        }
     </View>
    );
  }

}

const styles = {
  container: {
    paddingHorizontal: setValueBasedOnWidth(15),
    paddingVertical: setValueBasedOnHeight(14),
    borderRadius : setValueBasedOnWidth(30),
    borderColor : 'transparent', 
    width: setValueBasedOnWidth(60),
    height:setValueBasedOnWidth(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth : 1,
    marginBottom: setValueBasedOnHeight(3)
  },
  plusIcon: {
    width: setValueBasedOnWidth(6),
    height: setValueBasedOnWidth(6),
    borderRadius: setValueBasedOnWidth(6),
    backgroundColor: "#28a745",
    marginTop: setValueBasedOnHeight(10),
    alignSelf: 'center',
    zIndex: 0,
    marginRight:setValueBasedOnWidth(2)
  },
  containerActive: {
    borderColor : THEME_PRIMARY_COLOR
  },
  day: {
    fontSize: 14,
  },
  date: {
    fontSize: 16,
  },
  text: {
    color: '#686868',
    textAlign: 'center',
  },
  textActive: {
    color: THEME_PRIMARY_COLOR,
  },
  greenDot: {
    width: setValueBasedOnWidth(4),
    height: setValueBasedOnWidth(4),
    borderRadius: setValueBasedOnWidth(2),
    backgroundColor: "#28a745",
    marginHorizontal: setValueBasedOnWidth(1),
  }
};