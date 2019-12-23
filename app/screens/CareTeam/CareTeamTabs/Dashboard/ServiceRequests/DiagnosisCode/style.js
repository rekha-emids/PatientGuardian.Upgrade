import { StyleSheet } from "react-native";

import {
  setValueBasedOnHeight,
  setValueBasedOnWidth,
  setFontSize,
  
} from "../../../../../../utils/deviceDimensions";

import { THEME_PRIMARY_COLOR } from "../../../../../../constants/theme";

const styles = StyleSheet.create({
  emptyCheckMark: {
    width: setValueBasedOnHeight(20),
    height: setValueBasedOnHeight(20),
    borderRadius: setValueBasedOnHeight(10),
    borderWidth: 1,
    borderColor: "#acacac"
},
  itemView: {flex: 1},
  descView: {flex: 3},
  checkTextStyle: {fontSize: setFontSize(14), color: '#222222', marginLeft: setValueBasedOnWidth(5), marginRight: setValueBasedOnWidth(5)},
  checkStyle: {flexDirection: 'row', justifyContent: 'flex-end'},
  listItem: {
    paddingTop: setValueBasedOnHeight(24),
    paddingBottom: setValueBasedOnHeight(21),
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: setValueBasedOnHeight(1),
    borderBottomColor: '#e1e1e1',
    paddingLeft: setValueBasedOnHeight(15),
    paddingRight: setValueBasedOnHeight(15)
},
descText: {marginLeft: setValueBasedOnWidth(15)},
requestTitle: {fontSize: setValueBasedOnHeight(14)},
  mainCard: {
    backgroundColor: "#ffffff",

    flex: 0.9
  },

  searchBar: {backgroundColor: THEME_PRIMARY_COLOR},

  button: {
    backgroundColor: THEME_PRIMARY_COLOR,
    justifyContent: "center",
    borderRadius: setValueBasedOnWidth(5),
    marginLeft: setValueBasedOnWidth(10),
    marginRight: setValueBasedOnWidth(10),
    flex: 0.1,
    marginBottom: setValueBasedOnHeight(5)
  },

  buttonTextStyle: {
    color: "#ffffff",
    alignSelf: "center"
  },

  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  }
});

export default styles;
