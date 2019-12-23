import React, { Component } from "react"
import { View, Text, StyleSheet } from "react-native"
import CoreoRefreshScroller from '../CoreoRefreshScroller/index'
import { setValueBasedOnHeight } from "../../../utils/deviceDimensions";
import { isAPIFetching, isAPIInitial } from "../../../utils/AppAPIUtils";

export const EmptyText = ({
  style,
  text,
  networkCallStatus,
  onRefresh
}) => {
  let styleObject = { style: [styles.emptyView] },
   refreshControlProps = {},
   RenderComponent = View

  if (onRefresh) {
    refreshControlProps = {
      refreshControl: true,
      networkCallStatus,
      onRefresh
    }
    RenderComponent = CoreoRefreshScroller
    styleObject = {contentContainerStyle: styles.scrollStyle}
  }
  return (
    <RenderComponent
      {...refreshControlProps}
      {...styleObject}
    >
      {isAPIFetching(networkCallStatus) || isAPIInitial(networkCallStatus) ? null : <Text style={styles.emptyTextStyles}>{text}</Text>}
    </RenderComponent>
  )
}

class EmptyCaseHandler extends Component {
  render() {
    const {
      fullLength,
      refreshing,
      items,
      networkCallStatus,
      onRefresh,
      text,
      style,
      emptyViewComponent
    } = this.props,
     childrenView = 
      <View style={styles.children}>{this.props.children}</View>
    

    if (!items) {
 return null
}
    return items.length 
      ? childrenView
     : emptyViewComponent ? emptyViewComponent()
      : <EmptyText
        text={text}
        fullLength={fullLength}
        onRefresh={onRefresh}
        refreshing={refreshing}
        networkCallStatus={networkCallStatus}
        style={style}
      />
    
  }
}

const styles = StyleSheet.create({
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: setValueBasedOnHeight(200)
  },
  children: {},
  emptyTextStyles: {
    textAlign: "center",
    color: '#9e9e9e'
  },
  scrollStyle: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: setValueBasedOnHeight(250),
    // backgroundColor: "white",
    marginTop: setValueBasedOnHeight(20)
  }
})

EmptyCaseHandler.defaultProps = {
  text: "No results found.",
  fullLength: true
}

EmptyText.defaultProps = {
  style: {},
  text: "No Service Providers to display",
  fullLength: true,
  refreshing: false,
  onRefresh: null
}


export default EmptyCaseHandler